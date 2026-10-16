import type { Metadata } from "next";
import { pageAt } from "./catalog";

export function metadataFor(path: string): Metadata {
  const page = pageAt(path);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.canonical },
    robots: page.index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: page.ogTitle,
      description: page.ogDescription,
      url: page.canonical,
      images: [{ url: page.image, alt: page.imageAlt }],
    },
  };
}
