import fs from "fs";
import path from "path";
import { seoPageRecords } from "../src/pseo/generator";
import legacyIndex from "../data/pseo/legacy-index.json";

// Fetches every sitemap URL from a running build and checks HTTP 200, a self-referencing canonical and no noindex.
// VERIFY_BASE        server origin (default http://localhost:3000)
// VERIFY_CONCURRENCY parallel requests (default 12)
// VERIFY_RESUME=1    continue from reports/pseo/http-verification-progress.json after an interrupted run
// VERIFY_LIMIT       only check the first N sitemap URLs

const base = (process.env.VERIFY_BASE ?? "http://localhost:3000").replace(/\/$/, "");
const concurrency = Number(process.env.VERIFY_CONCURRENCY ?? 12);
const reportDirectory = path.join(process.cwd(), "reports", "pseo");
const progressPath = path.join(reportDirectory, "http-verification-progress.json");

type Result = { status: number; canonical?: string; robots?: string; location?: string };
type Progress = { next: number; passed: number; failures: string[] };

async function fetchPage(pathname: string): Promise<Result> {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(`${base}${pathname}`, { redirect: "manual" });
      const html = response.status === 200 ? await response.text() : "";
      if (response.status !== 200) await response.body?.cancel();
      const canonical = /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i.exec(html)?.[1] ?? /<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i.exec(html)?.[1];
      const robots = /<meta[^>]+name="robots"[^>]+content="([^"]+)"/i.exec(html)?.[1];
      // Copy the matches so the result does not keep the whole HTML string alive.
      const copy = (value?: string) => (value === undefined ? undefined : Buffer.from(value).toString());
      return { status: response.status, canonical: copy(canonical), robots: copy(robots), location: response.headers.get("location") ?? undefined };
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
  return { status: 0 };
}

async function pool<T>(items: T[], start: number, worker: (item: T) => Promise<void>, onProgress?: (safeNext: number) => void) {
  let next = start;
  let done = start;
  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (next < items.length) {
        const index = next++;
        await worker(items[index]!);
        done += 1;
        if (done % 500 === 0) {
          console.log(`checked ${done}/${items.length} heap=${Math.round(process.memoryUsage().heapUsed / 1e6)}MB`);
          // Every index below this one has finished or is being re-checked on resume.
          onProgress?.(Math.max(start, next - concurrency));
        }
      }
    }),
  );
}

const locs = (xml: string) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]!.replace(/&amp;/g, "&"));

async function main() {
  fs.mkdirSync(reportDirectory, { recursive: true });
  const index = await (await fetch(`${base}/sitemap.xml`)).text();
  const files = locs(index);
  const entries: { loc: string; pathname: string }[] = [];
  for (const file of files) {
    const xml = await (await fetch(`${base}${new URL(file).pathname}`)).text();
    for (const loc of locs(xml)) {
      const pathname = new URL(loc).pathname;
      if (/\.(webp|avif|jpe?g|png|gif|svg)$/i.test(pathname)) continue;
      entries.push({ loc, pathname });
    }
  }
  console.log(`sitemap files ${files.length}, urls ${entries.length}`);
  if (process.env.VERIFY_LIMIT) entries.length = Math.min(entries.length, Number(process.env.VERIFY_LIMIT));

  const resumed: Progress | undefined = process.env.VERIFY_RESUME && fs.existsSync(progressPath) ? JSON.parse(fs.readFileSync(progressPath, "utf8")) : undefined;
  const start = resumed?.next ?? 0;
  const failed = new Set<string>(resumed?.failures ?? []);
  if (start) console.log(`resuming at ${start} with ${failed.size} earlier failures`);

  await pool(
    entries,
    start,
    async (entry) => {
      const result = await fetchPage(entry.pathname);
      if (result.status !== 200) failed.add(`${entry.pathname}: HTTP ${result.status}${result.location ? ` -> ${result.location}` : ""}`);
      else if (!result.canonical || new URL(result.canonical).href !== new URL(entry.loc).href) failed.add(`${entry.pathname}: canonical ${result.canonical ?? "missing"} != ${entry.loc}`);
      else if (result.robots?.includes("noindex")) failed.add(`${entry.pathname}: robots ${result.robots}`);
    },
    (next) => fs.writeFileSync(progressPath, JSON.stringify({ next, passed: 0, failures: [...failed] } satisfies Progress)),
  );
  const sitemapFailures = failed.size;

  const inSitemap = new Set(entries.map((entry) => entry.pathname));
  const noindexRecords = seoPageRecords().filter((record) => record.robots === "noindex,follow");
  const sampleNoindex = noindexRecords.filter((_, i) => i % Math.ceil(noindexRecords.length / 300) === 0);
  const auditedNoindex = Object.keys(legacyIndex.noindex as Record<string, string>).slice(0, 100);
  const noindexPaths = [...sampleNoindex.map((record) => record.path), ...auditedNoindex];
  await pool(noindexPaths, 0, async (pathname) => {
    const result = await fetchPage(pathname);
    if (result.status !== 200) failed.add(`noindex ${pathname}: HTTP ${result.status}`);
    else if (!result.robots?.includes("noindex")) failed.add(`noindex ${pathname}: robots ${result.robots ?? "missing"}`);
    if (inSitemap.has(pathname)) failed.add(`noindex ${pathname}: listed in a sitemap`);
  });

  const consolidated = seoPageRecords().filter((record) => record.consolidation);
  const consolidatedSample = consolidated.filter((_, index) => index % Math.ceil(consolidated.length / 40) === 0);
  await pool(consolidatedSample.map((record) => record.path), 0, async (pathname) => {
    const result = await fetchPage(pathname);
    const record = seoPageRecords().find((row) => row.path === pathname);
    const canonicalPath = result.canonical ? new URL(result.canonical).pathname : "";
    if (result.status !== 200) failed.add(`consolidated ${pathname}: HTTP ${result.status}`);
    else if (canonicalPath !== record?.primaryPath) failed.add(`consolidated ${pathname}: canonical ${canonicalPath || "missing"} != ${record?.primaryPath}`);
    else if (result.robots?.includes("noindex")) failed.add(`consolidated ${pathname}: noindex conflicts with the canonical`);
    if (inSitemap.has(pathname)) failed.add(`consolidated ${pathname}: listed in a sitemap`);
  });

  const redirects: [string, string][] = [
    ["/services/children-safety-nets", "/services/child-safety-nets"],
    ["/services/pigeon-nets", "/services/pigeon-safety-nets"],
    ["/services/bird-nets", "/services/bird-protection-nets"],
    ["/services/anti-bird-spikes", "/services/bird-spikes"],
    ["/services/duct-area-nets", "/services/duct-area-safety-nets"],
    ["/services/cricket-nets", "/services/cricket-practice-nets"],
    ["/locations", "/locations/hyderabad"],
  ];
  for (const [from, to] of redirects) {
    const result = await fetchPage(from);
    const target = result.location ? new URL(result.location, base).pathname : "";
    if (![301, 308].includes(result.status) || target !== to) failed.add(`redirect ${from}: ${result.status} -> ${target || "none"}`);
  }

  const failures = [...failed];
  const report = {
    checkedAt: new Date().toISOString(),
    base,
    sitemapFiles: files.length,
    sitemapUrls: entries.length,
    sitemapPassed: entries.length - sitemapFailures,
    resumedFrom: start,
    noindexSampled: noindexPaths.length,
    consolidatedSampled: consolidatedSample.length,
    redirectsChecked: redirects.length,
    failures,
  };
  fs.writeFileSync(path.join(reportDirectory, "http-verification.json"), JSON.stringify(report, null, 2));
  if (fs.existsSync(progressPath)) fs.unlinkSync(progressPath);
  console.log(JSON.stringify({ ...report, failures: failures.slice(0, 40), failureCount: failures.length }, null, 2));
  if (failures.length) process.exit(1);
}

main();
