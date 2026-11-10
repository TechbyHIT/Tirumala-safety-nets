import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { circleById, wards } from "@/pseo/database";
import { WardHub } from "@/pseo/hubs";
import { wardPath } from "@/pseo/paths";

type Params = { state: string; ward: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return wards.map((ward) => ({ state: "hyderabad", ward: ward.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { ward } = await params;
  const row = wards.find((item) => item.id === ward);
  if (!row) return {};
  return {
    title: `${row.name}, GHMC Ward ${row.number} — invisible grills and safety nets`,
    description: `Invisible grills, safety nets, pigeon nets and bird spikes in ${row.name} (GHMC Ward ${row.number}, ${circleById.get(row.circleId)?.name} Circle).`,
    alternates: { canonical: `${site.url}${wardPath(row.id)}` },
    robots: { index: true, follow: true },
  };
}

export default async function WardPage({ params }: { params: Promise<Params> }) {
  const { state, ward } = await params;
  if (state !== "hyderabad" || !wards.some((item) => item.id === ward)) notFound();
  return <WardHub wardId={ward} />;
}
