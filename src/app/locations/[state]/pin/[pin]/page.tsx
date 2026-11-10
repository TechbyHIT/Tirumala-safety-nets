import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { localitiesForPin, pinCodes } from "@/pseo/database";
import { PinHub } from "@/pseo/hubs";
import { pinPath } from "@/pseo/paths";

type Params = { state: string; pin: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return pinCodes.map((pin) => ({ state: "hyderabad", pin }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { pin } = await params;
  const rows = localitiesForPin(pin);
  if (!rows.length) return {};
  return {
    title: `Safety nets and invisible grills in Hyderabad ${pin}`,
    description: `Localities under PIN ${pin} (${rows.map((row) => row.name).slice(0, 4).join(", ")}) with invisible grill, safety net and bird-control service pages.`,
    alternates: { canonical: `${site.url}${pinPath(pin)}` },
    robots: { index: true, follow: true },
  };
}

export default async function PinPage({ params }: { params: Promise<Params> }) {
  const { state, pin } = await params;
  const rows = localitiesForPin(pin);
  if (state !== "hyderabad" || !rows.length) notFound();
  return <PinHub pin={pin} rows={rows} />;
}
