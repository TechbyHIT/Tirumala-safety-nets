import { sitemapIndex, sitemapOrigin } from "@/seo/sitemaps";

export function GET(request: Request) {
  return new Response(sitemapIndex(sitemapOrigin(request)), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
