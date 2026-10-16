import { notFound, permanentRedirect } from "next/navigation";
import { getCity } from "@/data/cities";
import { getService } from "@/data/services";
import { cityPath } from "@/seo/urls";

type Params = { service: string; city: string };

export function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

export default async function ServiceCityPage({ params }: { params: Promise<Params> }) {
  const { service, city } = await params;
  const found = getCity(city);
  if (!getService(service) || !found) notFound();
  permanentRedirect(cityPath(found.slug));
}
