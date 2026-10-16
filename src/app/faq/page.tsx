import type { Metadata } from "next";
import { absoluteUrl } from "@/seo/urls";
import { InstallationGallery } from "@/components/InstallationGallery";
import { generalFaqs } from "@/data/faq";
import { galleryCards, heroImage } from "@/data/gallery";
import { services } from "@/data/services";
import Link from "next/link";
import { FaqStatic, GoldLink, PageHero, Panel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Coverage, pricing, invisible grills versus safety nets, pigeon control and installation timing for Hyderabad.",
  alternates: { canonical: absoluteUrl("/faq") },
};

export default function FaqPage() {
  const serviceFaqs = services.flatMap((service) =>
    service.faqs.map((faq) => ({ q: `${faq.q.replace(/\?$/, "")} — ${service.name}?`.replace("??", "?"), a: faq.a })),
  );
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions from Hyderabad homes"
        text="Coverage is the whole city. Prices follow a measurement. Ratings are published only when a customer actually gives one."
        image={heroImage("faq", "children-safety-nets")}
        crumbs={[{ href: "/", label: "Home" }, { label: "FAQ" }]}
        actions={<GoldLink href="/contact">Book a measurement</GoldLink>}
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-8">
          <Panel eyebrow="Coverage and price" title="Questions that apply to every opening">
            <p className="mb-4 text-sm leading-7 text-brand-800/75">
              The same rules hold in Gachibowli and in the Old City: the visit is free where we serve, the price follows the opening, and a rating is published only when a customer actually gives one.
            </p>
            <FaqStatic items={generalFaqs} />
          </Panel>
          <Panel eyebrow="By system" title="Questions tied to a specific fitting">
            <p className="mb-4 text-sm leading-7 text-brand-800/75">
              Cable, mesh, spikes and sports nets are not one product with different names. These answers stay with the system they belong to.
            </p>
            <FaqStatic items={serviceFaqs} />
          </Panel>
        </div>
        <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cta-600">Open a system</p>
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="block rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-brand-900 ring-1 ring-brand-100 hover:ring-cta-500">
              {service.name}
            </Link>
          ))}
        </aside>
      </div>
      <InstallationGallery photos={galleryCards("faq", 6)} compact title="What the answers look like on site" text="Cable spacing, mesh tension and duct flaps are easier to judge from photographs than from a price chart." />
    </>
  );
}
