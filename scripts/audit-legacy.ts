import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { cities } from "../src/data/cities";
import { priceGuides } from "../src/data/materials";
import { services } from "../src/data/services";
import { localityBySlug, serviceById } from "../src/pseo/database";
import { assessedPageAt } from "../src/seo/catalog";
import { indexPolicy, isSyntheticLocalitySlug } from "../src/seo/eligibility";
import { legacyRedirect, serviceAliases } from "../src/seo/legacy";
import { areaPath, cityPath, guidePath, servicePath, statePath } from "../src/seo/urls";

type Row = {
  path: string;
  kind: string;
  redirect: string | null;
  renders: boolean;
  index: boolean;
  status: string;
  synthetic: boolean;
  duplicateOf: string | null;
  overlapsLocality: string | null;
  sitemap: boolean;
  reasons: string[];
};

const candidates: { path: string; kind: string }[] = [
  { path: statePath(), kind: "state" },
  ...services.map((service) => ({ path: `/services/${service.slug}`, kind: "service" })),
  ...services.flatMap((service) => service.intents.map((intent) => ({ path: guidePath(intent.slug), kind: "guide" }))),
  ...priceGuides.map((guide) => ({ path: guidePath(guide.slug), kind: "price-guide" })),
  ...cities.map((city) => ({ path: cityPath(city.slug), kind: "city" })),
  ...cities.flatMap((city) => city.areas.map((area) => ({ path: areaPath(city.slug, area.slug), kind: "area" }))),
];

const titleOwner = new Map<string, string>();
const skeletonOwner = new Map<string, string>();
const rows: Row[] = [];

for (const candidate of candidates) {
  const redirect = legacyRedirect(candidate.path);
  const page = redirect ? undefined : assessedPageAt(candidate.path);
  const last = candidate.path.split("/").pop() ?? "";
  const synthetic = candidate.kind === "area" && isSyntheticLocalitySlug(last);
  const reasons: string[] = [];
  let duplicateOf: string | null = null;
  if (page) {
    const titleKey = page.title.trim().toLowerCase();
    const prior = titleOwner.get(titleKey) ?? (page.skeleton ? skeletonOwner.get(page.skeleton) : undefined);
    if (prior && page.index) duplicateOf = prior;
    if (page.index) {
      titleOwner.set(titleKey, candidate.path);
      if (page.skeleton) skeletonOwner.set(page.skeleton, candidate.path);
    }
    if (!page.index) reasons.push(...page.reasons.slice(-2));
  }
  const overlapsLocality = (candidate.kind === "city" || candidate.kind === "area") && localityBySlug.has(last) ? last : null;
  const serviceSlug = candidate.kind === "service" ? last : "";
  if (redirect) reasons.push(`308 redirect to ${redirect}`);
  if (!redirect && !page) reasons.push("Does not render (404)");
  if (synthetic) reasons.push("Road, border or approach label rather than a locality");
  if (duplicateOf) reasons.push(`Duplicate title or template skeleton of ${duplicateOf}`);
  if (serviceAliases[serviceSlug]) reasons.push(`Superseded by ${servicePath(serviceAliases[serviceSlug]!)}`);
  if (serviceById.has(serviceSlug)) reasons.push("Listed in the services sitemap as a primary service hub");
  if (candidate.kind === "state") reasons.push("Listed in the locations sitemap");
  if (overlapsLocality) reasons.push(`Same place as the new ${localityBySlug.get(overlapsLocality)!.kind} locality "${overlapsLocality}"; kept live because it may already be indexed`);

  const sitemap =
    !redirect &&
    Boolean(page?.index) &&
    page?.status === "publish" &&
    indexPolicy(candidate.path) === "index" &&
    !synthetic &&
    !duplicateOf &&
    !serviceAliases[serviceSlug] &&
    !serviceById.has(serviceSlug) &&
    candidate.kind !== "state";

  rows.push({
    path: candidate.path,
    kind: candidate.kind,
    redirect,
    renders: Boolean(redirect || page),
    index: Boolean(page?.index),
    status: page?.status ?? (redirect ? "redirect" : "missing"),
    synthetic,
    duplicateOf,
    overlapsLocality,
    sitemap,
    reasons,
  });
}

const count = (filter: (row: Row) => boolean) => rows.filter(filter).length;
const byKind = Object.fromEntries(
  [...new Set(rows.map((row) => row.kind))].map((kind) => [
    kind,
    {
      total: count((row) => row.kind === kind),
      indexable: count((row) => row.kind === kind && row.index),
      noindex: count((row) => row.kind === kind && !row.index && !row.redirect),
      redirected: count((row) => row.kind === kind && Boolean(row.redirect)),
      inSitemap: count((row) => row.kind === kind && row.sitemap),
      overlapsNewLocality: count((row) => row.kind === kind && Boolean(row.overlapsLocality)),
    },
  ]),
);

const reasonCounts: Record<string, number> = {};
for (const row of rows) {
  if (row.sitemap) continue;
  for (const reason of row.reasons) {
    const key = reason.replace(/\/[\w/-]+/g, "<path>").replace(/"[^"]+"/g, '"<slug>"');
    reasonCounts[key] = (reasonCounts[key] ?? 0) + 1;
  }
}

const summary = {
  generatedAt: new Date().toISOString(),
  candidates: rows.length,
  neighbourhoodRecords: count((row) => row.kind === "area"),
  inSitemap: count((row) => row.sitemap),
  indexableNotInSitemap: count((row) => row.index && !row.sitemap),
  noindex: count((row) => !row.index && !row.redirect),
  redirected: count((row) => Boolean(row.redirect)),
  missing: count((row) => !row.renders),
  synthetic: count((row) => row.synthetic),
  duplicates: count((row) => Boolean(row.duplicateOf)),
  overlapsNewLocality: count((row) => Boolean(row.overlapsLocality)),
  byKind,
  exclusionReasons: reasonCounts,
};

const root = process.cwd();
mkdirSync(join(root, "reports", "pseo"), { recursive: true });
writeFileSync(join(root, "reports", "pseo", "legacy-audit.json"), `${JSON.stringify({ summary, rows }, null, 2)}\n`);
writeFileSync(
  join(root, "data", "pseo", "legacy-index.json"),
  `${JSON.stringify({
    generatedAt: summary.generatedAt,
    indexable: rows.filter((row) => row.sitemap).map((row) => row.path),
    noindex: Object.fromEntries(
      rows
        .filter((row) => row.duplicateOf)
        .map((row) => [row.path, `Near-duplicate of ${row.duplicateOf}: the page body matches once place names are removed. Kept live as noindex.`]),
    ),
  })}\n`,
);
console.log(JSON.stringify(summary, null, 2));
