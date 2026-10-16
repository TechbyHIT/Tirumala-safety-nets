import { readRegistry } from "@/seo/registry";
import { TEMPLATE_VERSION, type PageRecord } from "@/seo/types";

let byPath: Map<string, PageRecord> | null = null;

export function registryByPath() {
  if (byPath) return byPath;
  byPath = new Map();
  const file = readRegistry();
  if (!file || file.templateVersion !== TEMPLATE_VERSION) return byPath;
  for (const record of file.records) byPath.set(record.path, record);
  return byPath;
}

export function publishedRecords() {
  return [...registryByPath().values()].filter((record) => record.status === "publish" && record.index);
}

export function recordAt(path: string) {
  return registryByPath().get(path);
}
