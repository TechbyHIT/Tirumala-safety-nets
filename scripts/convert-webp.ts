import { mkdir, readFile, readdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.join(process.cwd(), "public", "gallery");
const manifest = path.join(process.cwd(), "src", "data", "gallery-manifest.ts");

async function filesIn(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory() && entry.name !== "thumbs" && entry.name !== "view")
      .map((entry) => filesIn(path.join(dir, entry.name))),
  );
  const here = entries
    .filter((entry) => entry.isFile() && /\.(?:jpe?g|png|avif)$/i.test(entry.name))
    .map((entry) => path.join(dir, entry.name));
  return [...here, ...nested.flat()];
}

async function main() {
  const files = await filesIn(root);
  let converted = 0;
  let failed = 0;
  for (const file of files) {
    const dest = file.replace(/\.(?:jpe?g|png|avif)$/i, ".webp");
    const id = path.basename(file).match(/-([a-f0-9]{12})\./i)?.[1];
    try {
      const image = sharp(file, { failOn: "none" }).rotate();
      await image.clone().webp({ quality: 82 }).toFile(dest);
      if (id) {
        await mkdir(path.join(root, "thumbs"), { recursive: true });
        await mkdir(path.join(root, "view"), { recursive: true });
        await image.clone().resize({ width: 720, withoutEnlargement: true }).webp({ quality: 62 }).toFile(path.join(root, "thumbs", `${id}.webp`));
        await image.clone().resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 70 }).toFile(path.join(root, "view", `${id}.webp`));
      }
      await unlink(file);
      converted += 1;
    } catch (error) {
      failed += 1;
      console.error(file, error);
    }
  }
  if (failed === 0) {
    const source = await readFile(manifest, "utf8");
    const next = source.replace(/\.jpe?g"/g, '.webp"').replace(/\.png"/g, '.webp"').replace(/\.avif"/g, '.webp"');
    await writeFile(manifest, next);
  }
  console.log(JSON.stringify({ files: files.length, converted, failed }));
  if (failed > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
