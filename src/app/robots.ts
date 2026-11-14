import type { MetadataRoute } from "next";
import { canonicalOrigin } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${canonicalOrigin}/sitemaps.xml`,
  };
}
