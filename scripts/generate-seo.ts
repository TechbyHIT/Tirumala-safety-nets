import fs from "fs";
import path from "path";
import { getCatalog } from "../src/seo/catalog";
import { pageText } from "../src/seo/quality";
import { readRegistry, writeRegistry } from "../src/seo/registry";
import { TEMPLATE_VERSION, type PageRecord } from "../src/seo/types";

const checkOnly = process.argv.includes("--check");
const batchSize = 80;

function run() {
  const catalog = getCatalog();
  const previous = new Map((readRegistry()?.records ?? []).map((record) => [record.id, record]));
  const now = new Date().toISOString();
  const records: PageRecord[] = [];
  const pages = catalog.pages;

  for (let offset = 0; offset < pages.length; offset += batchSize) {
    const batch = pages.slice(offset, offset + batchSize);
    for (const page of batch) {
      let record: PageRecord | undefined;
      try {
        record = toRecord(page, previous.get(page.id), now);
      } catch (error) {
        record = toRecord(page, previous.get(page.id), now);
        if (!record) throw error;
      }
      records.push(record);
    }
  }

  const counts = {
    publish: records.filter((record) => record.status === "publish").length,
    review: records.filter((record) => record.status === "review").length,
    exclude: catalog.rejected.length,
  };
  const report = {
    generatedAt: now,
    templateVersion: TEMPLATE_VERSION,
    batchSize,
    counts,
    rejected: catalog.rejected.slice(0, 40),
    review: records.filter((record) => record.status === "review").slice(0, 20),
    samples: ["service:invisible-grills", "service-city:invisible-grills:visakhapatnam", "service-city:invisible-grills:kurnool", "city:visakhapatnam"].map((id) => {
      const page = pages.find((item) => item.id === id);
      return page ? { id, path: page.path, status: page.status, score: page.score, title: page.title, reasons: page.reasons } : { id, missing: true };
    }),
  };

  assertRepresentative(catalog);
  if (!checkOnly) {
    writeRegistry({ generatedAt: now, templateVersion: TEMPLATE_VERSION, records });
    const reportDir = path.join(process.cwd(), "reports", "seo");
    fs.mkdirSync(reportDir, { recursive: true });
    fs.writeFileSync(path.join(reportDir, "quality-report.json"), JSON.stringify(report, null, 2));
  }
  console.log(JSON.stringify(report.counts));
  console.log(JSON.stringify(report.samples, null, 2));
}

function toRecord(page: ReturnType<typeof getCatalog>["pages"][number], prior: PageRecord | undefined, now: string): PageRecord {
  const changed = !prior || prior.inputHash !== page.inputHash || prior.status !== page.status;
  return {
    id: page.id,
    path: page.path,
    kind: page.kind,
    status: page.status,
    index: page.index,
    version: changed ? (prior?.version ?? 0) + 1 : prior.version,
    inputHash: page.inputHash,
    score: page.score,
    title: page.title,
    reasons: page.reasons,
    updatedAt: changed ? now : prior.updatedAt,
  };
}

function assertRepresentative(catalog: ReturnType<typeof getCatalog>) {
  const byId = new Map(catalog.pages.map((page) => [page.id, page]));
  const vizag = byId.get("service-city:invisible-grills:visakhapatnam");
  const kurnool = byId.get("service-city:invisible-grills:kurnool");
  if (!vizag || vizag.status !== "publish") throw new Error("Visakhapatnam invisible grills should publish");
  if (!kurnool || kurnool.status !== "publish") throw new Error("Kurnool invisible grills should publish");
  const vizagText = pageText(vizag);
  const kurnoolText = pageText(kurnool);
  if (!/salt|SS316/i.test(vizagText)) throw new Error("Visakhapatnam page is missing the coastal material fact");
  if (!/UV|SS304/i.test(kurnoolText)) throw new Error("Kurnool page is missing the inland material fact");
  if (vizag.skeleton === kurnool.skeleton) throw new Error("City pages collapsed to the same skeleton");
  const cricketArea = catalog.rejected.find((item) => item.path === "/services/cricket-nets/visakhapatnam/madhurawada");
  if (!cricketArea) throw new Error("Cricket nets in Madhurawada should be rejected for lack of local overlap");
  const titles = new Set<string>();
  for (const page of catalog.pages.filter((item) => item.status === "publish")) {
    if (titles.has(page.title)) throw new Error(`Duplicate title: ${page.title}`);
    titles.add(page.title);
  }
}

run();
