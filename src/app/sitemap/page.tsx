import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { absoluteUrl, cityPath, servicePath, statePath } from "@/seo/urls";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Hyderabad safety-net pages for Tirumala Safety Nets: services, localities, neighbourhoods and installation guides.",
  alternates: { canonical: absoluteUrl("/sitemap") },
  robots: { index: true, follow: true },
};

export default function SitemapPage() {
  return (
    <>
      <PageHero
        eyebrow="Index"
        title="HTML sitemap"
        text={`${cities.length} Hyderabad localities and ${cities.reduce((sum, city) => sum + city.areas.length, 0)} neighbourhood pages. Service pages and service-by-locality pages are listed here. Phrase variants and unreviewed neighbourhood combinations stay out of the XML sitemap.`}
        crumbs={[{ href: "/", label: "Home" }, { label: "Sitemap" }]}
      />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
        <p className="text-sm leading-7 text-brand-800/80">
          Locality, neighbourhood, service, and service-by-locality URLs are in the XML index.{" "}
          <a className="font-semibold text-brand-900 underline" href="/sitemap.xml">
            Open sitemap.xml
          </a>
          .
        </p>
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
            {cities.map((city) => (
              <li key={city.slug} className="mb-1.5 break-inside-avoid">
                <Link href={cityPath(city.slug)} className="hover:text-cta-600">
                  {city.name} ({city.areas.length} neighbourhoods)
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
