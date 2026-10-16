import { readdir, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const skipDir = new Set(["node_modules", ".next", ".git"]);
const raster = /\.(?:jpe?g|png|avif)$/i;

async function collect(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory() && !skipDir.has(entry.name))
      .map((entry) => collect(path.join(dir, entry.name))),
  );
  const here = entries
    .filter((entry) => entry.isFile() && raster.test(entry.name))
    .map((entry) => path.join(dir, entry.name));
  return [...here, ...nested.flat()];
}

async function convertOne(file: string) {
  const dest = file.replace(raster, ".webp");
  const brand = file.includes(`${path.sep}public${path.sep}brand${path.sep}`);
  await sharp(file, { failOn: "none" })
    .rotate()
    .webp({ quality: brand ? 90 : 82 })
    .toFile(dest);
  await unlink(file);
}

async function main() {
  const files = (await collect(root)).filter((file) => !file.endsWith(`${path.sep}src${path.sep}app${path.sep}icon.png`));
  let converted = 0;
  let failed = 0;
  const queue = [...files];
  async function worker() {
    for (;;) {
      const file = queue.shift();
      if (!file) return;
      try {
        await convertOne(file);
        converted += 1;
        if (converted % 100 === 0) console.log(`converted ${converted}/${files.length}`);
      } catch (error) {
        failed += 1;
        console.error(file, error);
      }
    }
  }
  await Promise.all(Array.from({ length: 4 }, () => worker()));
  console.log(JSON.stringify({ files: files.length, converted, failed }));
  if (failed > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
