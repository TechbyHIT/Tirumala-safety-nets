import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import { services } from "@/data/services";
import { zones } from "@/pseo/database";
import { TARGET_PAGE_COUNT } from "@/pseo/generator";
import { zonePath } from "@/pseo/paths";
import { imageCount, pageSitemapPaths } from "@/seo/sitemaps";
import { absoluteUrl, servicePath, statePath } from "@/seo/urls";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Sitemap for Tirumala Safety Nets: main pages, Hyderabad service pages, and the gallery.",
  alternates: { canonical: absoluteUrl("/sitemap") },
  robots: { index: true, follow: true },
};

const files = [
  {
    href: "/sitemaps.xml",
    title: "sitemaps.xml",
    text: "Index. Search engines start here.",
  },
  {
    href: "/sitemaps/pages.xml",
    title: "pages.xml",
    text: `Home, services, guides, blog, wards, zones, and locality hubs. ${pageSitemapPaths().length.toLocaleString("en-IN")} URLs.`,
  },
  {
    href: "/sitemaps/programmatic.xml",
    title: "programmatic.xml",
    text: `Service and locality pages. ${TARGET_PAGE_COUNT.toLocaleString("en-IN")} URLs.`,
  },
  {
    href: "/sitemaps/images.xml",
    title: "images.xml",
    text: `Gallery photographs. ${imageCount().toLocaleString("en-IN")} images.`,
  },
];

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/locations", label: "Locations" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function SitemapPage() {
  return (
    <>
      <PageHero
        eyebrow="Index"
        title="Sitemap"
        text="One index and three sitemap files. This page lists those files, plus the main sections of the site."
        crumbs={[{ href: "/", label: "Home" }, { label: "Sitemap" }]}
      />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
        <section>
          <h2 className="font-display text-2xl font-bold">XML sitemaps</h2>
          <ul className="mt-4 divide-y divide-brand-900/10 border-y border-brand-900/10">
            {files.map((file) => (
              <li key={file.href} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                <a className="font-semibold text-brand-900 underline" href={file.href}>
                  {file.title}
                </a>
                <span className="text-sm text-brand-800/80">{file.text}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold">Main pages</h2>
          <ul className="mt-3 columns-1 gap-x-8 text-sm sm:columns-2 lg:columns-3">
            {mainLinks.map((item) => (
              <li key={item.href} className="mb-1.5 break-inside-avoid">
                <Link href={item.href} className="hover:text-cta-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold">Services</h2>
          <ul className="mt-3 columns-1 gap-x-8 text-sm sm:columns-2 lg:columns-3">
            {services.map((service) => (
              <li key={service.slug} className="mb-1.5 break-inside-avoid">
                <Link href={servicePath(service.slug)} className="hover:text-cta-600">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold">Hyderabad</h2>
          <p className="mt-3 text-sm">
            <Link href={statePath()} className="font-semibold text-brand-900 underline">
              Entire Hyderabad
            </Link>
          </p>
          <ul className="mt-3 columns-1 gap-x-8 text-sm sm:columns-2 lg:columns-3">
            {zones.map((zone) => (
              <li key={zone.id} className="mb-1.5 break-inside-avoid">
                <Link href={zonePath(zone.id)} className="hover:text-cta-600">
                  {zone.name} Zone
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
