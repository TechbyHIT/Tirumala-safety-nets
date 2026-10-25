import { posts } from "@/data/blog";
import { cities } from "@/data/cities";
import { libraryItems } from "@/data/library";
import { priceGuides } from "@/data/materials";
import { services } from "@/data/services";
import { canonicalOrigin, site } from "@/config/site";
import { publishedRecords } from "@/seo/indexable";
import { isSyntheticLocalitySlug } from "./eligibility";
import { areaPath, cityPath, guidePath, servicePath, statePath } from "./urls";

const staticPaths = [
  "/",
  "/services",
  "/locations",
  "/gallery",
  "/about",
  "/blog",
  "/faq",
  "/contact",
  "/sitemap",
  ...libraryItems.map((item) => `/services/library/${item.slug}`),
];

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
  return `${origin.replace(/\/$/, "")}${path}`;
}

export function urlsFor(group: "core" | "services" | "locations") {
  if (group === "core") {
    const guides = services.flatMap((service) => service.intents.map((intent) => guidePath(intent.slug)));
    const prices = priceGuides.map((guide) => guidePath(guide.slug));
    return [...staticPaths, ...posts.map((post) => `/blog/${post.slug}`), ...guides, ...prices];
  }
  if (group === "services") return services.map((service) => servicePath(service.slug));
  if (group === "locations") {
    return [
      statePath(),
      ...cities.map((city) => cityPath(city.slug)),
      ...cities.flatMap((city) => city.areas.filter((area) => !isSyntheticLocalitySlug(area.slug)).map((area) => areaPath(city.slug, area.slug))),
    ];
  }
  return [];
}

export function urlset(paths: string[], origin = site.url) {
  const modified = new Map(publishedRecords().map((record) => [record.path, record.updatedAt.slice(0, 10)]));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map((path) => {
    const lastmod = modified.get(path);
    const loc = xmlEscape(absoluteLoc(path, origin));
    return `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${xmlEscape(lastmod)}</lastmod>` : ""}</url>`;
  })
  .join("\n")}
</urlset>`;
}
