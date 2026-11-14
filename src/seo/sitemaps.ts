import legacyIndex from "../../data/pseo/legacy-index.json";
import { posts } from "@/data/blog";
import { libraryItems } from "@/data/library";
import { canonicalOrigin, site } from "@/config/site";
import { circles, pinCodes, services as targetServices, wards, zones } from "@/pseo/database";
import { galleryPhotos, viewSrc } from "@/data/gallery";
import { CONTENT_UPDATED, programmaticSitemapCount, publishedProgrammaticRecords, recordForSlug, recordsForSitemap } from "@/pseo/generator";
import { circlePath, pinPath, wardPath, zonePath } from "@/pseo/paths";
import { publishedRecords } from "@/seo/indexable";
import { servicePath, statePath } from "./urls";

export const SITEMAP_LIMIT = 50_000;

const staticPaths = [
  "/",
  "/services",
  "/gallery",
  "/about",
  "/blog",
  "/faq",
  "/contact",
  "/sitemap",
  ...libraryItems.map((item) => `/services/library/${item.slug}`),
];

const legacyIndexable = legacyIndex.indexable as string[];

export const fixedGroups = ["core", "services", "locations", "zones", "wards", "localities", "legacy-locations", "images"] as const;
export type FixedGroup = (typeof fixedGroups)[number];

export function xmlEscape(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const publicHosts = new Set(["tirumalasafetynetsinvisiblegrills.in", "www.tirumalasafetynetsinvisiblegrills.in"]);

export function sitemapOrigin(request: Request) {
  const hostHeader = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
  const hostname = hostHeader.split(",")[0]?.trim().toLowerCase().replace(/:\d+$/, "") ?? "";
  if (publicHosts.has(hostname)) return canonicalOrigin;
  return site.url.replace(/\/$/, "");
}

export function absoluteLoc(path: string, origin = site.url) {
  const base = origin.replace(/\/$/, "");
  if (path === "/" || path === "") return base;
  return `${base}${path}`;
}

export function urlsFor(group: FixedGroup): string[] {
  if (group === "core") {
    const guides = legacyIndexable.filter((path) => path.startsWith("/guides/"));
    return [...staticPaths, ...posts.map((post) => `/blog/${post.slug}`), ...guides];
  }
  if (group === "services") {
    const legacyOnly = legacyIndexable.filter((path) => /^\/services\/[^/]+$/.test(path));
    return [...new Set([...targetServices.map((service) => servicePath(service.id)), ...legacyOnly])];
  }
  if (group === "locations") return [statePath(), ...circles.map((circle) => circlePath(circle.id))];
  if (group === "zones") return zones.map((zone) => zonePath(zone.id));
  if (group === "wards") return wards.map((ward) => wardPath(ward.id));
  if (group === "localities") return pinCodes.map((pin) => pinPath(pin));
  if (group === "images") return [];
  return legacyIndexable.filter((path) => path.startsWith("/locations/hyderabad/"));
}

export const publicSitemaps = ["pages", "programmatic", "images"] as const;
export type PublicSitemap = (typeof publicSitemaps)[number];

export function pageSitemapPaths() {
  const paths = fixedGroups.filter((group) => group !== "images").flatMap((group) => urlsFor(group));
  return [...new Set(paths)];
}

export function programmaticSitemapPaths() {
  return publishedProgrammaticRecords().map((record) => record.path);
}

export function programmaticSitemapNames() {
  return Array.from({ length: programmaticSitemapCount() }, (_, index) => `programmatic-${String(index + 1).padStart(3, "0")}`);
}

export function programmaticUrlsFor(name: string) {
  if (name === "programmatic") return programmaticSitemapPaths();
  const match = /^programmatic-(\d{3})$/.exec(name);
  if (!match) return undefined;
  const shard = Number(match[1]) - 1;
  if (shard < 0 || shard >= programmaticSitemapCount()) return undefined;
  return recordsForSitemap(shard).map((record) => record.path);
}

export function imageCount() {
  return galleryPhotos.length;
}

export function allSitemapNames() {
  return [...publicSitemaps];
}

export function sitemapIndex(origin = site.url) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allSitemapNames()
  .map((name) => `  <sitemap><loc>${xmlEscape(absoluteLoc(`/sitemaps/${name}.xml`, origin))}</loc></sitemap>`)
  .join("\n")}
</sitemapindex>`;
}

export function urlsForSitemap(name: string) {
  if (name === "pages") return pageSitemapPaths();
  if (name === "programmatic" || name.startsWith("programmatic-")) return programmaticUrlsFor(name);
  if ((fixedGroups as readonly string[]).includes(name)) return urlsFor(name as FixedGroup);
  return undefined;
}

export function urlset(paths: string[], origin = site.url) {
  const modified = new Map(publishedRecords().map((record) => [record.path, record.updatedAt.slice(0, 10)]));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map((path) => {
    const programmatic = path.slice(1).length > 0 && !path.slice(1).includes("/") ? recordForSlug(path.slice(1)) : undefined;
    const lastmod = modified.get(path) ?? (programmatic || path.startsWith("/locations/hyderabad") ? CONTENT_UPDATED : undefined);
    const loc = xmlEscape(absoluteLoc(path, origin));
    return `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${xmlEscape(lastmod)}</lastmod>` : ""}</url>`;
  })
  .join("\n")}
</urlset>`;
}

export function imageUrlset(origin = site.url) {
  const images = galleryPhotos
    .map((photo) => {
      const src = viewSrc(photo.src);
      return `    <image:image><image:loc>${xmlEscape(absoluteLoc(src, origin))}</image:loc><image:caption>${xmlEscape(photo.alt)}</image:caption></image:image>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url><loc>${xmlEscape(absoluteLoc("/gallery", origin))}</loc>
${images}
  </url>
</urlset>`;
}
