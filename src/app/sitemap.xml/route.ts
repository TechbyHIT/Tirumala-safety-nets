import { absoluteLoc, xmlEscape } from "@/seo/sitemaps";

export function GET() {
  const groups = ["core", "services", "locations"];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${groups.map((group) => `  <sitemap><loc>${xmlEscape(absoluteLoc(`/sitemaps/${group}.xml`))}</loc></sitemap>`).join("\n")}
</sitemapindex>`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
