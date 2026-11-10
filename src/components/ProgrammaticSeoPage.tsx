import Link from "next/link";
import { QuotePanel } from "@/components/QuotePanel";
import { CheckList, CtaBand, FactBar, FaqStatic, LinkCloud, PageHero, Panel } from "@/components/ui";
import { site, telHref, whatsappHref } from "@/config/site";
import { galleryCards } from "@/data/gallery";
import { locationSources } from "@/pseo/database";
import { primarySlug } from "@/pseo/generator";
import { circlePath, pinPath, wardPath, zonePath } from "@/pseo/paths";
import type { ProgrammaticPage } from "@/pseo/types";

export function ProgrammaticSeoPage({ page }: { page: ProgrammaticPage }) {
  const image = galleryCards(page.path, 1, page.service.legacy ?? page.service.id)[0];
  const source = locationSources.find((row) => row.id === page.locality.sourceId);
  const origin = site.url.replace(/\/$/, "");
  const crumbs: { href?: string; label: string }[] = [
    { href: "/", label: "Home" },
    { href: "/locations/hyderabad", label: "Hyderabad" },
  ];
  if (page.zone) crumbs.push({ href: zonePath(page.zone.id), label: `${page.zone.name} Zone` });
  if (page.ward) crumbs.push({ href: wardPath(page.ward.id), label: `Ward ${page.ward.number}` });
  if (!page.ward && page.locality.pinCodes[0]) crumbs.push({ href: pinPath(page.locality.pinCodes[0]), label: page.locality.pinCodes[0] });
  crumbs.push({ label: page.service.name });

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.label,
        item: `${origin}${crumb.href ?? page.path}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.h1,
      serviceType: page.service.name,
      areaServed: { "@type": "Place", name: `${page.locality.name}, Hyderabad, Telangana` },
      provider: { "@type": "LocalBusiness", name: site.name, url: origin, telephone: site.phoneTel, address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" } },
      url: page.canonical,
      description: page.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.h1,
      url: page.canonical,
      description: page.description,
      isPartOf: { "@type": "WebSite", name: site.name, url: origin },
      about: { "@type": "Service", name: page.service.name },
      ...(image ? { primaryImageOfPage: { "@type": "ImageObject", contentUrl: `${origin}${image.src}`, caption: image.alt } } : {}),
    },
  ];
  if (page.indexEligible) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  const facts = [
    { label: "Service", value: page.service.name },
    ...(page.ward ? [{ label: "GHMC ward", value: String(page.ward.number) }] : []),
    ...(page.zone ? [{ label: "Zone", value: page.zone.name }] : []),
    ...(page.locality.pinCodes.length ? [{ label: "PIN", value: page.locality.pinCodes.slice(0, 2).join(", ") }] : []),
    ...(page.circle ? [{ label: "Circle", value: page.circle.name }] : []),
  ].slice(0, 4);

  return (
    <>
      {jsonLd.map((block, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
      ))}
      <PageHero
        eyebrow={page.zone ? `${page.circle?.name} Circle · ${page.zone.name} Zone` : `Hyderabad ${page.locality.pinCodes.join(", ")}`}
        title={page.h1}
        text={page.introduction}
        image={image?.src}
        crumbs={crumbs}
      />
      <FactBar items={facts} />
      <main className="bg-brand-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            {page.consolidation ? (
              <section className="rounded-3xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
                This is a focused view of the same service and locality. The preferred page is{" "}
                <Link className="font-semibold underline" href={page.primaryPath}>
                  {page.service.name} in {page.locality.name}
                </Link>
                , which covers installation, replacement, property types and the local record.
              </section>
            ) : null}
            <Panel eyebrow="The system" title={`${page.service.name} explained`}>
              <div className="space-y-4 text-base leading-8 text-brand-800/85">
                {page.serviceBody.map((paragraph) => (
                  <p key={paragraph.slice(0, 60)}>{paragraph}</p>
                ))}
              </div>
            </Panel>
            <Panel eyebrow="Location record" title={`About ${page.locality.name}`}>
              <dl className="grid gap-3 sm:grid-cols-2">
                {page.localFacts.map((fact) => (
                  <div key={fact.label} className="rounded-2xl bg-brand-50 p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-brand-800/55">{fact.label}</dt>
                    <dd className="mt-1 text-sm font-semibold leading-6 text-brand-900">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              {source ? (
                <p className="mt-4 text-sm leading-6 text-brand-800/65">
                  Source:{" "}
                  <a className="font-semibold text-cta-700 underline" href={source.url} rel="noreferrer" target="_blank">
                    {source.title}
                  </a>
                  {source.issuedAt ? ` (${source.issuedAt})` : ""}.
                </p>
              ) : null}
            </Panel>
            <Panel eyebrow="Installation" title="How the work is planned">
              <ol className="grid gap-3 sm:grid-cols-2">
                {page.installation.map((step, index) => (
                  <li key={step} className="rounded-3xl bg-white p-5 ring-1 ring-brand-100">
                    <p className="text-xs font-bold text-cta-600">0{index + 1}</p>
                    <p className="mt-2 text-sm leading-7 text-brand-800/80">{step}</p>
                  </li>
                ))}
              </ol>
            </Panel>
            <div className="grid gap-5 md:grid-cols-2">
              <Panel eyebrow="Materials" title="Specified after measurement">
                <CheckList items={page.service.materials} />
              </Panel>
              <Panel eyebrow="Why it helps" title="What to expect">
                <CheckList items={page.benefits} />
              </Panel>
            </div>
            <Panel eyebrow="After installation" title="Care and safety">
              <p className="text-sm leading-7 text-brand-800/80">{page.maintenance}</p>
              <p className="mt-3 text-sm leading-7 text-brand-800/80">{page.safety}</p>
            </Panel>
            <Panel eyebrow="By property and need" title={`${page.service.name}: installation, replacement and property types`}>
              <div className="space-y-5">
                {page.intentSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="font-display text-lg font-bold text-brand-900">{section.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-brand-800/80">{section.text}</p>
                  </div>
                ))}
              </div>
            </Panel>
            <FaqStatic items={page.faqs} />
            {page.indexEligible && page.variants.length ? <LinkCloud title={`More on ${page.service.name} in ${page.locality.name}`} links={page.variants} /> : null}
            {page.nearby.length ? (
              <LinkCloud
                title={page.circle ? `${page.service.name} in other ${page.circle.name} Circle wards` : `${page.service.name} in nearby areas`}
                links={page.nearby.map((locality) => ({ href: `/${primarySlug(page.service.id, locality.slug)}`, label: locality.name }))}
              />
            ) : null}
            <LinkCloud
              title={`Related services in ${page.locality.name}`}
              links={page.relatedServices.map((service) => ({ href: `/${primarySlug(service.id, page.locality.slug)}`, label: service.name }))}
            />
            <p className="flex flex-wrap justify-center gap-4 text-center text-sm text-brand-800/65">
              <Link className="font-semibold text-cta-700 underline" href={`/services/${page.service.id}`}>
                {page.service.name} across Hyderabad
              </Link>
              {page.circle ? (
                <Link className="font-semibold text-cta-700 underline" href={circlePath(page.circle.id)}>
                  {page.circle.name} Circle
                </Link>
              ) : null}
              <Link className="font-semibold text-cta-700 underline" href="/locations/hyderabad">
                Hyderabad location directory
              </Link>
            </p>
          </div>
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <QuotePanel service={page.service.name} city={page.locality.name} />
            <div className="flex flex-col gap-2">
              <a className="rounded-full bg-cta-500 px-4 py-3 text-center text-sm font-semibold text-brand-950" href={telHref()}>
                Call {site.phoneDisplay}
              </a>
              <a className="rounded-full bg-[#128C7E] px-4 py-3 text-center text-sm font-semibold text-white" href={whatsappHref(`Hello Tirumala Safety Nets, I need ${page.service.name} in ${page.locality.name}.`)}>
                WhatsApp this locality
              </a>
            </div>
            <div className="rounded-[1.75rem] bg-brand-900 p-5 text-sm leading-7 text-white/75">
              <p className="font-semibold text-white">Before booking</p>
              <p className="mt-2">Share the locality, floor, opening type and one full photograph. Coverage and access are confirmed before a visit.</p>
            </div>
          </aside>
        </div>
      </main>
      <CtaBand title={`Ask about ${page.service.name} in ${page.locality.name}`} text="Send a photograph for an initial discussion. The final quote follows a site measurement." />
    </>
  );
}
