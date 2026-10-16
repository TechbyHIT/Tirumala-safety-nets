import type { Metadata } from "next";
import { SeoScreen } from "@/components/SeoPage";
import { cities } from "@/data/cities";
import { metadataFor } from "@/seo/metadata";
import { cityPath } from "@/seo/urls";

type Params = { state: string; city: string };

export function generateStaticParams() {
  return cities.map((city) => ({ state: "hyderabad", city: city.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { state, city } = await params;
  return metadataFor(`/locations/${state}/${city}`);
}

export default async function CitySeoPage({ params }: { params: Promise<Params> }) {
  const { city } = await params;
  return <SeoScreen path={cityPath(city)} />;
}
