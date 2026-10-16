import type { Metadata } from "next";
import { SeoScreen } from "@/components/SeoPage";
import { cities } from "@/data/cities";
import { hubCitySlugs } from "@/seo/catalog";
import { metadataFor } from "@/seo/metadata";
import { areaPath } from "@/seo/urls";

type Params = { state: string; city: string; area: string };

const hubs = new Set(hubCitySlugs);

export function generateStaticParams() {
  return cities
    .filter((city) => hubs.has(city.slug))
    .flatMap((city) => city.areas.map((area) => ({ state: "hyderabad", city: city.slug, area: area.slug })));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city, area } = await params;
  return metadataFor(areaPath(city, area));
}

export default async function AreaSeoPage({ params }: { params: Promise<Params> }) {
  const { city, area } = await params;
  return <SeoScreen path={areaPath(city, area)} />;
}
