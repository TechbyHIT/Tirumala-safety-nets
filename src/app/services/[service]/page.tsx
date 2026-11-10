import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoScreen } from "@/components/SeoPage";
import { CheckList, CtaBand, FaqStatic, PageHero, Panel } from "@/components/ui";
import { heroImage } from "@/data/gallery";
import { getService, services as legacyServices } from "@/data/services";
import { localities, serviceById, services as targetServices, zones } from "@/pseo/database";
import { primarySlug } from "@/pseo/generator";
import { zonePath } from "@/pseo/paths";
import { site } from "@/config/site";
import { serviceAliases } from "@/seo/legacy";
import { metadataFor } from "@/seo/metadata";
import { servicePath } from "@/seo/urls";

type Params = { service: string };

export function generateStaticParams() {
  return [...new Set([...legacyServices.map((service) => service.slug).filter((slug) => !serviceAliases[slug]), ...targetServices.map((service) => service.id)])].map((service) => ({ service }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { service } = await params;
  const target = serviceById.get(service);
  if (target) {
    return {
      title: `${target.name} in Hyderabad — by GHMC ward and PIN`,
      description: `${target.summary} Pages for every GHMC ward and Hyderabad PIN locality, with a measured written quote.`,
      alternates: { canonical: `${site.url}${servicePath(service)}` },
      robots: { index: true, follow: true },
    };
  }
  return metadataFor(servicePath(service));
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { service } = await params;
  const target = serviceById.get(service);
  if (!target) {
    if (getService(service)) return <SeoScreen path={servicePath(service)} />;
    notFound();
  }
  const legacy = target.legacy ? getService(target.legacy) : undefined;
  const postal = localities.filter((row) => row.kind === "post-office");
  return (
    <>
      <PageHero
        eyebrow="Hyderabad service"
        title={`${target.name} in Hyderabad`}
        text={target.summary}
        image={heroImage(`target-service:${target.id}`, target.legacy ?? target.id)}
        crumbs={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { label: target.name }]}
      />
      <main className="bg-brand-50">
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6">
          {legacy ? (
            <Panel eyebrow="The system" title={`What ${target.name.toLowerCase()} are`}>
              <p className="text-base leading-8 text-brand-800/85">{legacy.lede}</p>
            </Panel>
          ) : null}
          <div className="grid gap-5 md:grid-cols-2">
            <Panel eyebrow="Specification" title="Materials considered after measurement">
              <CheckList items={target.materials} />
            </Panel>
            <Panel eyebrow="Applications" title="Relevant use cases">
              <CheckList items={target.useCases} />
            </Panel>
          </div>
          {legacy?.faqs.length ? <FaqStatic items={legacy.faqs} /> : null}
          <h2 className="pt-4 font-display text-2xl font-bold text-brand-900">{target.name} by GHMC zone and ward</h2>
          {zones.map((zone) => (
            <Panel key={zone.id} eyebrow={`${zone.name} Zone`}>
              <div className="flex flex-wrap gap-2">
                {localities
                  .filter((row) => row.zoneId === zone.id)
                  .map((row) => (
                    <Link key={row.id} href={`/${primarySlug(target.id, row.slug)}`} className="rounded-full bg-brand-50 px-3 py-1.5 text-sm text-brand-900 ring-1 ring-brand-100 hover:ring-cta-500">
                      {row.name}
                    </Link>
                  ))}
              </div>
              <Link className="mt-3 inline-flex text-sm font-semibold text-cta-700 underline" href={zonePath(zone.id)}>
                {zone.name} Zone directory
              </Link>
            </Panel>
          ))}
          {postal.length ? (
            <Panel eyebrow="India Post localities" title={`${target.name} by PIN-code locality`}>
              <div className="flex flex-wrap gap-2">
                {postal.map((row) => (
                  <Link key={row.id} href={`/${primarySlug(target.id, row.slug)}`} className="rounded-full bg-brand-50 px-3 py-1.5 text-sm text-brand-900 ring-1 ring-brand-100 hover:ring-cta-500">
                    {row.name} · {row.pinCodes[0]}
                  </Link>
                ))}
              </div>
            </Panel>
          ) : null}
          <p className="text-sm leading-7 text-brand-800/70">
            A listed ward or locality is not a claim that a project has been completed there; coverage and access are confirmed for each enquiry.
          </p>
        </div>
      </main>
      <CtaBand title={`Request a ${target.name} measurement`} text="Send the locality and a photograph. The final specification and quote follow a site check." />
    </>
  );
}
