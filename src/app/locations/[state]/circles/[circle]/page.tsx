import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { circles, zoneById } from "@/pseo/database";
import { CircleHub } from "@/pseo/hubs";
import { circlePath } from "@/pseo/paths";

type Params = { state: string; circle: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return circles.map((circle) => ({ state: "hyderabad", circle: circle.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { circle } = await params;
  const row = circles.find((item) => item.id === circle);
  if (!row) return {};
  return {
    title: `${row.name} Circle (${zoneById.get(row.zoneId)?.name} Zone) — safety nets and invisible grills`,
    description: `GHMC Circle ${row.number}, ${row.name}: wards and service pages for invisible grills, safety nets, pigeon nets and more.`,
    alternates: { canonical: `${site.url}${circlePath(row.id)}` },
    robots: { index: true, follow: true },
  };
}

export default async function CirclePage({ params }: { params: Promise<Params> }) {
  const { state, circle } = await params;
  if (state !== "hyderabad" || !circles.some((item) => item.id === circle)) notFound();
  return <CircleHub circleId={circle} />;
}
