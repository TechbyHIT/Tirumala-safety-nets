import fs from "fs";
import path from "path";
import type { PageRecord, PageStatus } from "./types";

const registryPath = path.join(process.cwd(), "data", "seo", "registry.json");
const overridePath = path.join(process.cwd(), "data", "seo", "overrides.json");

export type RegistryFile = {
  generatedAt: string;
  templateVersion: number;
  records: PageRecord[];
};

export function readRegistry(): RegistryFile | null {
  if (!fs.existsSync(registryPath)) return null;
  return JSON.parse(fs.readFileSync(registryPath, "utf8")) as RegistryFile;
}

export function writeRegistry(data: RegistryFile) {
  fs.mkdirSync(path.dirname(registryPath), { recursive: true });
  fs.writeFileSync(registryPath, JSON.stringify(data));
}

export function readOverrides(): Record<string, PageStatus> {
  if (!fs.existsSync(overridePath)) return {};
  return JSON.parse(fs.readFileSync(overridePath, "utf8")) as Record<string, PageStatus>;
}
