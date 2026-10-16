import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.join(process.cwd(), "public", "gallery");
const thumbs = path.join(root, "thumbs");
const views = path.join(root, "view");

async function filesIn(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory() && entry.name !== "thumbs" && entry.name !== "view")
      .map((entry) => filesIn(path.join(dir, entry.name))),
  );
  const here = entries
    .filter((entry) => entry.isFile() && /\.(?:jpe?g|png|webp)$/i.test(entry.name))
    .map((entry) => path.join(dir, entry.name));
  return [...here, ...nested.flat()];
}

async function fresh(target: string, sourceTime: number) {
  try {
    const info = await stat(target);
    return info.mtimeMs >= sourceTime && info.size > 0;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(thumbs, { recursive: true });
  await mkdir(views, { recursive: true });
  const files = await filesIn(root);
  let written = 0;
  let skipped = 0;
  for (const file of files) {
    const id = path.basename(file).match(/-([a-f0-9]{12})\.(?:jpe?g|png|webp)$/i)?.[1];
    if (!id) continue;
    const source = await stat(file);
    const thumb = path.join(thumbs, `${id}.webp`);
    const view = path.join(views, `${id}.webp`);
    if ((await fresh(thumb, source.mtimeMs)) && (await fresh(view, source.mtimeMs))) {
      skipped += 1;
      continue;
    }
    const image = sharp(file, { failOn: "none" }).rotate();
    await image.clone().resize({ width: 720, withoutEnlargement: true }).webp({ quality: 62 }).toFile(thumb);
    await image.clone().resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 70 }).toFile(view);
    written += 1;
  }
  console.log(JSON.stringify({ files: files.length, written, skipped }));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
