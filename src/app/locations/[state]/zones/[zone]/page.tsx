import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { zones } from "@/pseo/database";
import { ZoneHub } from "@/pseo/hubs";
import { zonePath } from "@/pseo/paths";

type Params = { state: string; zone: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return zones.map((zone) => ({ state: "hyderabad", zone: zone.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { zone } = await params;
  const row = zones.find((item) => item.id === zone);
  if (!row) return {};
  return {
    title: `${row.name} Zone — invisible grills and safety nets by ward`,
    description: `Circles and wards of GHMC ${row.name} Zone, Hyderabad, with invisible grill, safety net and bird-control pages for each ward.`,
    alternates: { canonical: `${site.url}${zonePath(row.id)}` },
    robots: { index: true, follow: true },
  };
}

export default async function ZonePage({ params }: { params: Promise<Params> }) {
  const { state, zone } = await params;
  if (state !== "hyderabad" || !zones.some((item) => item.id === zone)) notFound();
  return <ZoneHub zoneId={zone} />;
}
