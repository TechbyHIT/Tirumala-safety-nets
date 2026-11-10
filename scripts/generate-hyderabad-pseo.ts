import fs from "fs";
import path from "path";
import { apartments, colonies, databaseCounts, localities, locationSources, pinCodes, services, wards, zones, circles } from "../src/pseo/database";
import {
  generationStats,
  MIN_LOCAL_FACTS,
  pageForSlug,
  primarySlug,
  programmaticSitemapCount,
  recordForSlug,
  recordsForSitemap,
  seoPageRecords,
  serviceDuplicates,
  similarity,
  TARGET_PAGE_COUNT,
} from "../src/pseo/generator";
import { circlePath, pinPath, wardPath, zonePath } from "../src/pseo/paths";
import { allSitemapNames, imageCount, urlsForSitemap } from "../src/seo/sitemaps";

const checkOnly = process.argv.includes("--check");
const writeRecords = process.argv.includes("--write-records");
const failures: string[] = [];

function check(name: string, condition: boolean, detail: string) {
  if (!condition) failures.push(`${name}: ${detail}`);
}

function duplicatesOf<T>(rows: T[], key: (row: T) => string) {
  const seen = new Map<string, number>();
  for (const row of rows) seen.set(key(row), (seen.get(key(row)) ?? 0) + 1);
  return [...seen.entries()].filter(([, count]) => count > 1);
}

const records = seoPageRecords();
const stats = generationStats();
const published = records.filter((record) => record.published);

const duplicate = {
  paths: duplicatesOf(records, (row) => row.path).length,
  canonicals: duplicatesOf(records, (row) => row.canonical).length,
  titles: duplicatesOf(records, (row) => row.title).length,
  descriptions: duplicatesOf(records, (row) => row.description).length,
  h1s: duplicatesOf(records, (row) => row.h1).length,
  publishedTitles: duplicatesOf(published, (row) => row.title).length,
  publishedDescriptions: duplicatesOf(published, (row) => row.description).length,
};

const hubPaths = new Set([
  ...zones.map((row) => zonePath(row.id)),
  ...circles.map((row) => circlePath(row.id)),
  ...wards.map((row) => wardPath(row.id)),
  ...pinCodes.map((pin) => pinPath(pin)),
  "/locations/hyderabad",
  "/",
  ...services.map((row) => `/services/${row.id}`),
]);

const quality = { checked: 0, thin: [] as string[], fewFacts: [] as string[], fewFaqs: [] as string[], fewNearby: [] as string[], words: { min: Infinity, max: 0, total: 0 } };
const brokenLinks: string[] = [];
const linksToNoindex: string[] = [];
const bodyFingerprints = new Map<string, string>();
const bodyDuplicates: string[] = [];

function linkTarget(href: string) {
  if (hubPaths.has(href)) return "hub";
  const record = recordForSlug(href.slice(1));
  if (!record) return "broken";
  if (record.noindexReason) return "noindex";
  return "ok";
}

for (const record of published) {
  const page = pageForSlug(record.slug);
  if (!page) {
    failures.push(`render ${record.path}: page did not compose`);
    continue;
  }
  quality.checked += 1;
  const text = [page.introduction, ...page.serviceBody, ...page.intentSections.map((row) => row.text), page.maintenance, page.safety, ...page.faqs.map((row) => `${row.q} ${row.a}`)].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  quality.words.min = Math.min(quality.words.min, words);
  quality.words.max = Math.max(quality.words.max, words);
  quality.words.total += words;
  if (words < 400) quality.thin.push(record.path);
  if (page.localFacts.length < MIN_LOCAL_FACTS) quality.fewFacts.push(record.path);
  if (page.faqs.length < 3) quality.fewFaqs.push(record.path);
  if (page.nearby.length < 3) quality.fewNearby.push(record.path);
  if (record.profile.searchIntent === "service" && record.primaryPath !== record.path) failures.push(`primary ${record.path}: primary page is not its own primary`);
  if (record.profile.searchIntent !== "service" && page.intentSections[0]?.title.toLowerCase() !== `${page.service.name} ${record.profile.label}`.toLowerCase()) {
    failures.push(`focus ${record.path}: variant page does not lead with its own section`);
  }
  if (!record.canonical.endsWith(record.path)) failures.push(`canonical ${record.path}: indexable page is not self-referencing`);

  const fingerprint = [page.locality.id, ...page.localFacts.map((row) => row.value)].join("|") + page.service.id + record.profile.id;
  const prior = bodyFingerprints.get(fingerprint);
  if (prior) bodyDuplicates.push(`${record.path} = ${prior}`);
  else bodyFingerprints.set(fingerprint, record.path);

  const hrefs = [
    record.primaryPath,
    ...page.variants.map((row) => row.href),
    ...page.nearby.map((row) => `/${primarySlug(page.service.id, row.slug)}`),
    ...page.relatedServices.map((row) => `/${primarySlug(row.id, page.locality.slug)}`),
    `/services/${page.service.id}`,
    ...(page.zone ? [zonePath(page.zone.id)] : []),
    ...(page.circle ? [circlePath(page.circle.id)] : []),
    ...(page.ward ? [wardPath(page.ward.id)] : page.locality.pinCodes[0] ? [pinPath(page.locality.pinCodes[0])] : []),
  ];
  for (const href of hrefs) {
    const target = linkTarget(href);
    if (target === "broken") brokenLinks.push(`${record.path} -> ${href}`);
    if (target === "noindex") linksToNoindex.push(`${record.path} -> ${href}`);
  }
}

const serviceSimilarity = services.flatMap((left, i) =>
  services.slice(0, i).map((right) => {
    const a = pageForSlug(primarySlug(left.id, localities[0]!.slug));
    const b = pageForSlug(primarySlug(right.id, localities[0]!.slug));
    const score = a && b ? similarity(a.serviceBody.join(" "), b.serviceBody.join(" ")) : 0;
    return { pair: `${left.id} / ${right.id}`, score: Number(score.toFixed(3)) };
  }),
).sort((a, b) => b.score - a.score);

// How much of each variant page's text is shared with the primary page for the same service and locality.
const pageText = (slug: string) => {
  const page = pageForSlug(slug);
  return page ? [page.introduction, ...page.serviceBody, ...page.intentSections.map((row) => `${row.title} ${row.text}`), ...page.faqs.map((row) => `${row.q} ${row.a}`)].join(" ") : "";
};
const variantScores: number[] = [];
for (const service of services) {
  const primary = pageForSlug(primarySlug(service.id, localities[0]!.slug));
  if (!primary) continue;
  const primaryText = pageText(primary.slug);
  for (const variant of primary.variants) {
    const variantRecord = recordForSlug(variant.href.slice(1));
    if (variantRecord?.consolidation) variantScores.push(similarity(primaryText, pageText(variant.href.slice(1))));
  }
}
const variantSimilarity = variantScores.length
  ? {
      sampled: variantScores.length,
      min: Number(Math.min(...variantScores).toFixed(3)),
      average: Number((variantScores.reduce((sum, score) => sum + score, 0) / variantScores.length).toFixed(3)),
      max: Number(Math.max(...variantScores).toFixed(3)),
    }
  : { sampled: 0 };

const sitemapNames = allSitemapNames();
const sitemapUrls = new Map<string, string>();
let repeatedSitemapUrls = 0;
let largestSitemap = 0;
for (const name of sitemapNames) {
  const urls = name === "images" ? [] : (urlsForSitemap(name) ?? []);
  largestSitemap = Math.max(largestSitemap, urls.length);
  for (const url of urls) {
    if (sitemapUrls.has(url)) repeatedSitemapUrls += 1;
    sitemapUrls.set(url, name);
    const record = url.startsWith("/") && !url.slice(1).includes("/") ? recordForSlug(url.slice(1)) : undefined;
    if (record && !record.indexEligible) failures.push(`sitemap ${name}: lists noindex ${url}`);
  }
}
const programmaticInSitemaps = [...sitemapUrls.values()].filter((name) => name.startsWith("programmatic-")).length;

const noindexByReason: Record<string, { count: number; sample: string[] }> = {};
for (const record of records) {
  if (!record.noindexReason) continue;
  const row = (noindexByReason[record.noindexReason] ??= { count: 0, sample: [] });
  row.count += 1;
  if (row.sample.length < 3) row.sample.push(`${record.path} -> ${record.primaryPath}`);
}

const missing = {
  colonies: colonies.length === 0 ? "No source publishes colony-to-ward relationships for the 2025 GHMC wards; none generated." : `${colonies.length} sourced`,
  apartments: apartments.length === 0 ? "No source publishes apartment-to-locality relationships; none generated." : `${apartments.length} sourced`,
  wardsWithoutPin: localities.filter((row) => row.kind === "ghmc-ward" && row.pinCodes.length === 0).length,
  localitiesWithFewFacts: localities.filter((row) => !pageForSlug(primarySlug(services[0]!.id, row.slug)) || pageForSlug(primarySlug(services[0]!.id, row.slug))!.localFacts.length < MIN_LOCAL_FACTS).length,
  primaryCombinationsOutsideTarget: services.length * localities.length - records.filter((row) => row.profile.searchIntent === "service").length,
};

check("target page count", records.length === TARGET_PAGE_COUNT, String(records.length));
check("unique URLs", duplicate.paths === 0, `${duplicate.paths} duplicates`);
check("unique indexable canonicals", duplicatesOf(published, (row) => row.canonical).length === 0, "shared canonical among indexable pages");
check("unique titles", duplicate.titles === 0, `${duplicate.titles} duplicates`);
check("unique published descriptions", duplicate.publishedDescriptions === 0, `${duplicate.publishedDescriptions} duplicates`);
check("service count", services.length === 17, String(services.length));
check("zone count", databaseCounts.zones === 12, String(databaseCounts.zones));
check("circle count", databaseCounts.circles === 60, String(databaseCounts.circles));
check("ward count", databaseCounts.wards === 300, String(databaseCounts.wards));
check("verified localities", localities.every((row) => row.verified && row.sourceId), "unsourced locality");
check("location sources", locationSources.length >= 2, String(locationSources.length));
check("metadata complete", records.every((row) => row.title && row.description && row.h1 && row.canonical), "one or more empty fields");
check(
  "canonical paths",
  records.every((row) => (row.consolidation ? row.canonical.endsWith(row.primaryPath) : row.canonical.endsWith(row.path))),
  "canonical mismatch",
);
check(
  "consolidation does not noindex",
  records.every((row) => !row.consolidation || (!row.noindexReason && row.robots === "index,follow" && !row.indexEligible)),
  "a consolidated URL is also noindex or index-eligible",
);
check(
  "noindex stays self-canonical",
  records.every((row) => !row.noindexReason || (row.robots === "noindex,follow" && row.canonical.endsWith(row.path) && !row.consolidation)),
  "noindex combined with a foreign canonical",
);
check("published gate", records.every((row) => !row.published || row.indexEligible), "published non-eligible page");
check("every primary combination generated", missing.primaryCombinationsOutsideTarget === 0, String(missing.primaryCombinationsOutsideTarget));
check("programmatic sitemap matches published", programmaticInSitemaps === published.length, `${programmaticInSitemaps} != ${published.length}`);
check("sitemap URLs unique", repeatedSitemapUrls === 0, String(repeatedSitemapUrls));
check("sitemap limit", largestSitemap <= 50_000, String(largestSitemap));
check("no broken internal links", brokenLinks.length === 0, brokenLinks.slice(0, 5).join(", "));
check("no thin published pages", quality.thin.length === 0, quality.thin.slice(0, 5).join(", "));
check("published local facts", quality.fewFacts.length === 0, quality.fewFacts.slice(0, 5).join(", "));
check("no duplicate published bodies", bodyDuplicates.length === 0, bodyDuplicates.slice(0, 5).join(", "));

const report = {
  generatedAt: new Date().toISOString(),
  sourceAsOf: { ghmc: "2025-12-25", postal: locationSources.find((row) => row.id === "india-post-pincode-directory")?.accessedAt },
  database: databaseCounts,
  pages: {
    generated: records.length,
    indexable: stats.indexEligible,
    noindex: stats.noindex,
    published: stats.published,
    canonicalConsolidations: stats.canonicalConsolidations,
    classification: {
      uniqueValuable: stats.indexEligible,
      nearDuplicateConsolidated: stats.canonicalConsolidations,
      duplicateIntent: records.filter((row) => row.consolidation && (row.profile.searchIntent === "installation" || row.profile.searchIntent === "replacement")).length,
      thin: records.filter((row) => row.noindexReason === "INSUFFICIENT_LOCAL_FACTS").length,
      usefulLongTailConsolidated: stats.canonicalConsolidations,
      locationSpecific: stats.indexEligible,
    },
    variantSimilarityToPrimary: variantSimilarity,
    noindexByReason,
    hubsIndexable: hubPaths.size - 2 - services.length,
  },
  duplicates: { ...duplicate, publishedBodyDuplicates: bodyDuplicates.length, nearDuplicateServices: Object.fromEntries(serviceDuplicates()), topServiceSimilarity: serviceSimilarity.slice(0, 5) },
  publishedQuality: {
    checked: quality.checked,
    wordsMin: quality.words.min,
    wordsMax: quality.words.max,
    wordsAverage: Math.round(quality.words.total / Math.max(1, quality.checked)),
    thin: quality.thin.length,
    fewFaqs: quality.fewFaqs.length,
    fewNearby: quality.fewNearby.length,
  },
  internalLinks: { broken: brokenLinks.length, toNoindex: linksToNoindex.length, sampleBroken: brokenLinks.slice(0, 10) },
  missing,
  sitemaps: {
    files: sitemapNames.length,
    programmaticFiles: programmaticSitemapCount(),
    urls: sitemapUrls.size,
    byFile: Object.fromEntries(sitemapNames.map((name) => [name, urlsForSitemap(name)?.length ?? 0])),
    largest: largestSitemap,
    imageSitemapImages: imageCount(),
    firstProgrammatic: recordsForSitemap(0)[0]?.path,
  },
  failures,
};

if (!checkOnly) {
  const reportDirectory = path.join(process.cwd(), "reports", "pseo");
  fs.mkdirSync(reportDirectory, { recursive: true });
  fs.writeFileSync(path.join(reportDirectory, "generation-report.json"), JSON.stringify(report, null, 2));
  const csv = ["path,robots,reason,primary_path"];
  for (const record of records) csv.push([record.path, record.robots.replace(",", " "), record.noindexReason ?? "", record.primaryPath].join(","));
  fs.writeFileSync(path.join(reportDirectory, "page-index-audit.csv"), `${csv.join("\n")}\n`);
  if (writeRecords) {
    const output = records.map((record) => JSON.stringify(record)).join("\n");
    fs.writeFileSync(path.join(process.cwd(), "data", "pseo", "page-records.ndjson"), `${output}\n`);
  }
}

console.log(JSON.stringify(report, null, 2));
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
