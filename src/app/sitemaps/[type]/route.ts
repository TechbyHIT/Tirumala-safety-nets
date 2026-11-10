import { imageUrlset, sitemapOrigin, urlset, urlsForSitemap } from "@/seo/sitemaps";

export async function GET(request: Request, context: { params: Promise<{ type: string }> }) {
  const { type } = await context.params;
  const name = type.replace(/\.xml$/, "");
  const origin = sitemapOrigin(request);
  if (name === "images") {
    return new Response(imageUrlset(origin), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
  }
  const paths = urlsForSitemap(name);
  if (!paths?.length) return new Response("Not found", { status: 404 });
  return new Response(urlset(paths, origin), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
