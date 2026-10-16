import { createHash } from "crypto";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const roots = [
  "D:\\Projects\\BABAI\\images",
  path.join(process.cwd(), "images"),
];

const destRoot = path.join(process.cwd(), "public", "gallery");
const manifestPath = path.join(process.cwd(), "src", "data", "gallery-manifest.ts");

const allowed = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const skipName = /(istockphoto|stock-photo|shutterstock|adobe-stock|gettyimages)/i;

type Category =
  | "invisible-grills"
  | "balcony-safety-nets"
  | "children-safety-nets"
  | "pet-safety-nets"
  | "cloth-hangers"
  | "cricket-nets"
  | "duct-area-nets"
  | "mosquito-nets"
  | "anti-bird-spikes"
  | "installations";

type Tag = "balcony" | "window" | "children" | "pet" | "hanger" | "cricket" | "duct" | "mosquito" | "spikes" | "general";

type Item = {
  id: string;
  src: string;
  alt: string;
  category: Category;
  tag: Tag;
  services: string[];
};

const labels: Record<Category, string> = {
  "invisible-grills": "Invisible grill installation",
  "balcony-safety-nets": "Balcony safety net installation",
  "children-safety-nets": "Children safety net installation",
  "pet-safety-nets": "Pet safety net installation",
  "cloth-hangers": "Cloth hanger installation",
  "cricket-nets": "Cricket and sports net installation",
  "duct-area-nets": "Duct area net installation",
  "mosquito-nets": "Mosquito net installation",
  "anti-bird-spikes": "Bird spike installation",
  installations: "Home safety installation",
};

const related: Record<Category, string[]> = {
  "invisible-grills": ["invisible-grills", "transparent-balcony-nets"],
  "balcony-safety-nets": [
    "balcony-safety-nets",
    "safety-nets",
    "terrace-safety-nets",
    "staircase-safety-nets",
    "transparent-balcony-nets",
    "building-covering-nets",
  ],
  "children-safety-nets": ["children-safety-nets", "safety-nets", "staircase-safety-nets"],
  "pet-safety-nets": ["pet-safety-nets", "cat-safety-nets", "monkey-safety-nets"],
  "cloth-hangers": ["cloth-hangers"],
  "cricket-nets": ["cricket-nets", "sports-nets"],
  "duct-area-nets": ["duct-area-nets", "pigeon-nets", "bird-nets", "building-covering-nets"],
  "mosquito-nets": ["mosquito-nets"],
  "anti-bird-spikes": ["anti-bird-spikes", "pigeon-nets", "bird-nets"],
  installations: ["invisible-grills", "balcony-safety-nets", "safety-nets"],
};

function classify(folder: string): { category: Category; tag: Tag } {
  const name = folder.toLowerCase();
  if (name.includes("children")) return { category: "children-safety-nets", tag: "children" };
  if (name.includes("cloth")) return { category: "cloth-hangers", tag: "hanger" };
  if (name.includes("cricket") || name.includes("sport")) return { category: "cricket-nets", tag: "cricket" };
  if (name.includes("duct")) return { category: "duct-area-nets", tag: "duct" };
  if (name.includes("invisible") && name.includes("window")) return { category: "invisible-grills", tag: "window" };
  if (name.includes("invisible")) return { category: "invisible-grills", tag: "balcony" };
  if (name.includes("mosquito")) return { category: "mosquito-nets", tag: "mosquito" };
  if (name.includes("pet") || name.includes("monkey") || name.includes("cat")) return { category: "pet-safety-nets", tag: "pet" };
  if (name.includes("spike")) return { category: "anti-bird-spikes", tag: "spikes" };
  if (name.includes("safety")) return { category: "balcony-safety-nets", tag: "balcony" };
  return { category: "installations", tag: "general" };
}

function walk(dir: string, out: string[] = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function parentFolder(file: string) {
  return path.basename(path.dirname(file));
}

const seen = new Map<string, Item>();
let copied = 0;
let skipped = 0;

async function ingest() {
for (const root of roots) {
  if (!fs.existsSync(root)) continue;
  for (const file of walk(root)) {
    const ext = path.extname(file).toLowerCase();
    if (!allowed.has(ext)) continue;
    const base = path.basename(file);
    if (skipName.test(base) || skipName.test(file)) {
      skipped += 1;
      continue;
    }
    const buffer = fs.readFileSync(file);
    if (buffer.length < 8_000) {
      skipped += 1;
      continue;
    }
    const digest = createHash("sha1").update(buffer).digest("hex");
    if (seen.has(digest)) {
      skipped += 1;
      continue;
    }
    const { category, tag } = classify(parentFolder(file));
    const id = digest.slice(0, 12);
    const fileName = `${tag}-${id}.webp`;
    const destDir = path.join(destRoot, category);
    fs.mkdirSync(destDir, { recursive: true });
    const dest = path.join(destDir, fileName);
    const webp = await sharp(buffer, { failOn: "none" }).rotate().webp({ quality: 82 }).toBuffer();
    fs.writeFileSync(dest, webp);
    const src = `/gallery/${category}/${fileName}`;
    const alt = `${labels[category]} in Andhra Pradesh — ${tag} opening fitted by Sri Ganesha Home Safety Solutions`;
    seen.set(digest, { id, src, alt, category, tag, services: related[category] });
    copied += 1;
  }
}

const items = [...seen.values()].sort((a, b) => a.src.localeCompare(b.src));
const byCategory = items.reduce<Record<string, number>>((acc, item) => {
  acc[item.category] = (acc[item.category] ?? 0) + 1;
  return acc;
}, {});

fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
fs.writeFileSync(
  manifestPath,
  `export type GalleryCategory =
  | "invisible-grills"
  | "balcony-safety-nets"
  | "children-safety-nets"
  | "pet-safety-nets"
  | "cloth-hangers"
  | "cricket-nets"
  | "duct-area-nets"
  | "mosquito-nets"
  | "anti-bird-spikes"
  | "installations";

export type GalleryTag = "balcony" | "window" | "children" | "pet" | "hanger" | "cricket" | "duct" | "mosquito" | "spikes" | "general";

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  tag: GalleryTag;
  services: string[];
};

export const galleryPhotos: GalleryPhoto[] = ${JSON.stringify(items, null, 2)};
`,
);

console.log(JSON.stringify({ copied, skipped, unique: items.length, byCategory }, null, 2));
}

ingest().catch((error) => {
  console.error(error);
  process.exit(1);
});
