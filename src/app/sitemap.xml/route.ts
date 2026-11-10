import { absoluteLoc, allSitemapNames, sitemapOrigin, xmlEscape } from "@/seo/sitemaps";

export function GET(request: Request) {
  const origin = sitemapOrigin(request);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allSitemapNames()
  .map((name) => `  <sitemap><loc>${xmlEscape(absoluteLoc(`/sitemaps/${name}.xml`, origin))}</loc></sitemap>`)
  .join("\n")}
</sitemapindex>`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
