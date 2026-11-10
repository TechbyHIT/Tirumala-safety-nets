import Link from "next/link";
import { CtaBand, FactBar, LinkCloud, PageHero, Panel } from "@/components/ui";
import { heroImage } from "@/data/gallery";
import { circles, localities, locationSources, services, wards, zones } from "./database";
import { primarySlug } from "./generator";
import { circlePath, wardPath, zonePath } from "./paths";
import type { Locality } from "./types";

function SourceNote({ sourceId }: { sourceId: string }) {
  const source = locationSources.find((row) => row.id === sourceId);
  if (!source) return null;
  return (
    <p className="text-sm leading-6 text-brand-800/65">
      Source:{" "}
      <a className="font-semibold text-cta-700 underline" href={source.url} rel="noreferrer" target="_blank">
        {source.title}
      </a>
      {source.issuedAt ? ` (${source.issuedAt})` : ""}.
    </p>
  );
}

function ServiceGrid({ locality }: { locality: Locality }) {
  return (
    <LinkCloud
      title={`Services in ${locality.name}`}
      links={services.map((service) => ({ href: `/${primarySlug(service.id, locality.slug)}`, label: service.name }))}
    />
  );
}

export function ZoneHub({ zoneId }: { zoneId: string }) {
  const zone = zones.find((row) => row.id === zoneId)!;
  const zoneCircles = circles.filter((row) => row.zoneId === zone.id);
  const zoneWards = wards.filter((row) => row.zoneId === zone.id);
  return (
    <>
      <PageHero
        eyebrow="GHMC zone"
        title={`${zone.name} Zone, Hyderabad`}
        text={`${zone.name} Zone has ${zoneCircles.length} circles and ${zoneWards.length} wards under the December 2025 GHMC reorganisation. Open a circle or ward for its invisible grill and safety net pages.`}
        image={heroImage(`zone:${zone.id}`, "invisible-grills")}
        crumbs={[{ href: "/", label: "Home" }, { href: "/locations/hyderabad", label: "Hyderabad" }, { label: `${zone.name} Zone` }]}
      />
      <FactBar
        items={[
          { label: "Zone", value: zone.name },
          { label: "Circles", value: String(zoneCircles.length) },
          { label: "Wards", value: String(zoneWards.length) },
          { label: "Services", value: String(services.length) },
        ]}
      />
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
        {zoneCircles.map((circle) => (
          <Panel key={circle.id} eyebrow={`Circle ${circle.number}`} title={`${circle.name} Circle`}>
            <div className="flex flex-wrap gap-2">
              {wards
                .filter((ward) => ward.circleId === circle.id)
                .map((ward) => (
                  <Link key={ward.id} href={wardPath(ward.id)} className="rounded-full bg-brand-50 px-3 py-2 text-sm font-medium text-brand-900 ring-1 ring-brand-100 hover:ring-cta-500">
                    Ward {ward.number} · {ward.name}
                  </Link>
                ))}
            </div>
            <Link className="mt-4 inline-flex text-sm font-semibold text-cta-700 underline" href={circlePath(circle.id)}>
              Open {circle.name} Circle
            </Link>
          </Panel>
        ))}
        <SourceNote sourceId={zone.sourceId} />
      </main>
      <CtaBand title={`Book a measurement in ${zone.name} Zone`} text="Share the ward or locality and a photograph of the opening." />
    </>
  );
}

export function CircleHub({ circleId }: { circleId: string }) {
  const circle = circles.find((row) => row.id === circleId)!;
  const zone = zones.find((row) => row.id === circle.zoneId)!;
  const circleWards = wards.filter((row) => row.circleId === circle.id);
  return (
    <>
      <PageHero
        eyebrow={`GHMC Circle ${circle.number}`}
        title={`${circle.name} Circle, ${zone.name} Zone`}
        text={`${circle.name} Circle covers ${circleWards.length} GHMC wards: ${circleWards.map((ward) => ward.name).join(", ")}. Each ward has its own pages for the ${services.length} services we fit.`}
        image={heroImage(`circle:${circle.id}`, "balcony-safety-nets")}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/locations/hyderabad", label: "Hyderabad" },
          { href: zonePath(zone.id), label: `${zone.name} Zone` },
          { label: `${circle.name} Circle` },
        ]}
      />
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {circleWards.map((ward) => (
            <Panel key={ward.id} eyebrow={`Ward ${ward.number}`} title={ward.name}>
              <div className="flex flex-wrap gap-2 text-sm">
                {services.slice(0, 6).map((service) => (
                  <Link key={service.id} href={`/${primarySlug(service.id, localities.find((row) => row.wardId === ward.id)!.slug)}`} className="rounded-full bg-brand-50 px-3 py-1.5 text-brand-900 ring-1 ring-brand-100 hover:ring-cta-500">
                    {service.name}
                  </Link>
                ))}
              </div>
              <Link className="mt-3 inline-flex text-sm font-semibold text-cta-700 underline" href={wardPath(ward.id)}>
                All services in {ward.name}
              </Link>
            </Panel>
          ))}
        </div>
        <SourceNote sourceId={circle.sourceId} />
      </main>
      <CtaBand title={`Book a measurement in ${circle.name} Circle`} text="Share the ward and a photograph of the opening." />
    </>
  );
}

export function WardHub({ wardId }: { wardId: string }) {
  const ward = wards.find((row) => row.id === wardId)!;
  const circle = circles.find((row) => row.id === ward.circleId)!;
  const zone = zones.find((row) => row.id === ward.zoneId)!;
  const locality = localities.find((row) => row.wardId === ward.id)!;
  const siblings = wards.filter((row) => row.circleId === circle.id && row.id !== ward.id);
  return (
    <>
      <PageHero
        eyebrow={`GHMC Ward ${ward.number}`}
        title={`Invisible grills and safety nets in ${ward.name}`}
        text={`${ward.name} is GHMC Ward ${ward.number} in ${circle.name} Circle, ${zone.name} Zone.${locality.pinCodes.length ? ` India Post lists PIN ${locality.pinCodes.join(", ")} for ${locality.name}.` : ""} Choose a service for materials, fitting steps and a measured quote.`}
        image={heroImage(`ward:${ward.id}`, "invisible-grills")}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/locations/hyderabad", label: "Hyderabad" },
          { href: zonePath(zone.id), label: `${zone.name} Zone` },
          { href: circlePath(circle.id), label: `${circle.name} Circle` },
          { label: `Ward ${ward.number}` },
        ]}
      />
      <FactBar
        items={[
          { label: "Ward", value: `${ward.number} – ${ward.name}` },
          { label: "Circle", value: circle.name },
          { label: "Zone", value: zone.name },
          { label: "PIN", value: locality.pinCodes.join(", ") || "Not matched" },
        ]}
      />
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
        <ServiceGrid locality={locality} />
        {locality.postOffices.length ? (
          <Panel eyebrow="India Post" title="Post offices with this name">
            <ul className="space-y-1 text-sm text-brand-800/80">
              {locality.postOffices.map((office) => (
                <li key={`${office.name}-${office.pincode}`}>
                  {office.name} — {office.pincode} ({office.officeType}, {office.division} division)
                </li>
              ))}
            </ul>
          </Panel>
        ) : null}
        <LinkCloud title={`Other wards in ${circle.name} Circle`} links={siblings.map((row) => ({ href: wardPath(row.id), label: `Ward ${row.number} · ${row.name}` }))} />
        <SourceNote sourceId={ward.sourceId} />
      </main>
      <CtaBand title={`Book a measurement in ${ward.name}`} text="Share the address and a photograph of the opening." />
    </>
  );
}

export function PinHub({ pin, rows }: { pin: string; rows: Locality[] }) {
  return (
    <>
      <PageHero
        eyebrow={`PIN ${pin}`}
        title={`Invisible grills and safety nets in Hyderabad ${pin}`}
        text={`India Post lists ${rows.length} ${rows.length === 1 ? "locality" : "localities"} under PIN ${pin}: ${rows.map((row) => row.name).join(", ")}. Choose a locality and service below.`}
        image={heroImage(`pin:${pin}`, "balcony-safety-nets")}
        crumbs={[{ href: "/", label: "Home" }, { href: "/locations/hyderabad", label: "Hyderabad" }, { label: `PIN ${pin}` }]}
      />
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
        {rows.map((row) => (
          <Panel key={row.id} eyebrow={row.kind === "ghmc-ward" ? "GHMC ward locality" : "Post-office locality"} title={row.name}>
            <ul className="mb-4 space-y-1 text-sm text-brand-800/75">
              {row.postOffices
                .filter((office) => office.pincode === pin)
                .map((office) => (
                  <li key={office.name}>
                    {office.name} ({office.officeType}, {office.delivery}, {office.division} division)
                  </li>
                ))}
            </ul>
            <div className="flex flex-wrap gap-2 text-sm">
              {services.map((service) => (
                <Link key={service.id} href={`/${primarySlug(service.id, row.slug)}`} className="rounded-full bg-brand-50 px-3 py-1.5 text-brand-900 ring-1 ring-brand-100 hover:ring-cta-500">
                  {service.name}
                </Link>
              ))}
            </div>
            {row.wardId ? (
              <Link className="mt-3 inline-flex text-sm font-semibold text-cta-700 underline" href={wardPath(row.wardId)}>
                GHMC ward page
              </Link>
            ) : null}
          </Panel>
        ))}
        <SourceNote sourceId="india-post-pincode-directory" />
      </main>
      <CtaBand title={`Book a measurement in ${pin}`} text="Share the address and a photograph of the opening." />
    </>
  );
}
