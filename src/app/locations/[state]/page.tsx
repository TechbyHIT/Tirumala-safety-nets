import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationDirectory } from "@/components/LocationDirectory";
import { FactBar, PageHero } from "@/components/ui";
import { heroImage } from "@/data/gallery";
import Link from "next/link";
import { circleById, databaseCounts, localities, pinCodes, wardById, wards, zoneById, zones } from "@/pseo/database";
import { pinPath, wardPath, zonePath } from "@/pseo/paths";
import { site } from "@/config/site";

export function generateStaticParams() {
  return [{ state: "hyderabad" }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  if (state !== "hyderabad") return {};
  return {
    title: "Hyderabad service areas — 12 GHMC zones and 300 wards",
    description: "Browse sourced GHMC zones, circles and ward-head localities for invisible grills and safety nets in Hyderabad.",
    alternates: { canonical: `${site.url}/locations/hyderabad` },
  };
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  if (state !== "hyderabad") notFound();
  const rows = localities.map((locality) => {
    const ward = locality.wardId ? wardById.get(locality.wardId) : undefined;
    return {
      key: locality.id,
      name: locality.name,
      slug: locality.slug,
      badge: ward ? `GHMC Ward ${ward.number}` : `PIN ${locality.pinCodes.join(", ")}`,
      detail: ward
        ? `${circleById.get(locality.circleId!)?.name} Circle · ${zoneById.get(locality.zoneId!)?.name} Zone${locality.pinCodes.length ? ` · ${locality.pinCodes.join(", ")}` : ""}`
        : `India Post locality · ${locality.postOffices[0]?.division ?? ""} division`,
      hub: ward ? wardPath(ward.id) : pinPath(locality.pinCodes[0]!),
    };
  });
  return (
    <>
      <PageHero
        eyebrow="Government-sourced location directory"
        title="Invisible grills and safety nets across Hyderabad"
        highlight={`12 GHMC zones · 300 wards · ${pinCodes.length} PIN codes`}
        text="Browse the current GHMC ward, circle and zone hierarchy and India Post localities. Colony and apartment relationships are published only after a source verifies them."
        image={heroImage("official-hyderabad-directory", "invisible-grills")}
        crumbs={[{ href: "/", label: "Home" }, { label: "Hyderabad" }]}
      />
      <FactBar
        items={[
          { label: "State", value: "Telangana" },
          { label: "GHMC zones", value: "12" },
          { label: "GHMC circles", value: "60" },
          { label: "Localities", value: String(databaseCounts.localities) },
        ]}
      />
      <main className="bg-brand-50">
        <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
          <section>
            <h2 className="font-display text-2xl font-bold text-brand-900">Current GHMC zones</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {zones.map((zone) => (
                <Link key={zone.id} href={zonePath(zone.id)} className="rounded-2xl bg-white p-4 ring-1 ring-brand-100 hover:ring-cta-500">
                  <p className="font-semibold text-brand-900">{zone.name} Zone</p>
                  <p className="mt-1 text-sm text-brand-800/60">{wards.filter((row) => row.zoneId === zone.id).length} wards</p>
                </Link>
              ))}
            </div>
          </section>
          <LocationDirectory rows={rows} />
          <section>
            <h2 className="font-display text-2xl font-bold text-brand-900">Hyderabad PIN codes</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {pinCodes.map((pin) => (
                <Link key={pin} href={pinPath(pin)} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-brand-900 ring-1 ring-brand-100 hover:ring-cta-500">
                  {pin}
                </Link>
              ))}
            </div>
          </section>
          <section className="rounded-3xl bg-white p-6 text-sm leading-7 text-brand-800/70 ring-1 ring-brand-100">
            <h2 className="font-display text-xl font-bold text-brand-900">Location data policy</h2>
            <p className="mt-2">
              Zone, circle and ward relationships follow Telangana G.O. Ms. No. 292 dated 24 December 2025 and the GHMC 300-ward delimitation notice dated 25 December 2025. PIN codes and post-office localities come from the India Post All India Pincode Directory; a PIN is attached to a ward only when the post office carries the ward&apos;s exact name. Colony and apartment tables are empty because no source verifies those parent relationships.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
