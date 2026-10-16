import type { Metadata } from "next";
import { absoluteUrl } from "@/seo/urls";
import Image from "next/image";
import Link from "next/link";
import { InstallationGallery } from "@/components/InstallationGallery";
import { cardImage, galleryCards, heroImage } from "@/data/gallery";
import { libraryGroups } from "@/data/library";
import { serviceGroups, services } from "@/data/services";
import { GoldLink, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Safety net and invisible grill service library",
  description:
    "Compare pigeon nets, invisible grill types, and sports nets, then open the Hyderabad service page that matches the opening.",
  alternates: { canonical: absoluteUrl("/services") },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Service library"
        title="Safety nets and invisible grills, compared by opening"
        text="Start with the job: bird control, a cable grill, or a practice net. Each group lists the variants we measure, without selling one mesh under every name."
        image={heroImage("services-index", "invisible-grills")}
        crumbs={[{ href: "/", label: "Home" }, { label: "Services" }]}
        actions={<GoldLink href="/contact?need=photo">Get a photo estimate</GoldLink>}
      />
      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 sm:px-6">
        <section className="rounded-3xl bg-white p-6 ring-1 ring-brand-100">
          <h2 className="font-display text-2xl font-bold">Compare related fittings before choosing</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-brand-800/80 sm:grid-cols-2">
            <li>Three libraries: pigeon nets, invisible grills, and sports nets.</li>
            <li>Each card is a different opening or material, not a copied city page.</li>
            <li>The parent service still has a page for every Hyderabad locality we publish.</li>
            <li>A photo estimate asks for the city, the full opening, and the fixing edges.</li>
          </ul>
        </section>
        {libraryGroups.map((group) => (
          <section key={group.id} id={group.id}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-cta-600">{group.items.length} pages</p>
                <h2 className="mt-1 font-display text-3xl font-bold">{group.title}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-brand-800/75">{group.intro}</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map((item) => {
                return (
                  <article key={item.slug} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-brand-100">
                    <div className="relative h-40">
                      <Image src={cardImage(`library-card:${item.slug}`, item.photo)} alt={item.title} fill className="object-cover" sizes="33vw" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg font-bold">
                        <Link href={`/services/library/${item.slug}`}>{item.title}</Link>
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-brand-800/75">{item.summary}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
        {serviceGroups.map((group) => (
          <section key={group}>
            <h2 className="font-display text-2xl font-bold">{group}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {services
                .filter((service) => service.group === group)
                .map((service) => (
                  <article key={service.slug} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-brand-100">
                    <div className="relative h-40">
                      <Image src={cardImage(`service-index:${service.slug}`, service.slug)} alt="" fill className="object-cover" sizes="33vw" />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-cta-600">{service.group}</p>
                      <h3 className="mt-1 font-display text-lg font-bold">
                        <Link href={`/services/${service.slug}`}>{service.name}</Link>
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-brand-800/75">{service.summary}</p>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
      <InstallationGallery photos={galleryCards("services-index", 8)} title="The same systems, as installed" />
    </>
  );
}
