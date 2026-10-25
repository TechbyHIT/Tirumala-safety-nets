import { sitemapOrigin, urlset, urlsFor } from "@/seo/sitemaps";

const groups = new Set(["core", "services", "locations"]);

export async function GET(request: Request, context: { params: Promise<{ type: string }> }) {
  const { type } = await context.params;
  const group = type.replace(/\.xml$/, "");
  if (!groups.has(group)) return new Response("Not found", { status: 404 });
  return new Response(urlset(urlsFor(group as "core" | "services" | "locations"), sitemapOrigin(request)), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
