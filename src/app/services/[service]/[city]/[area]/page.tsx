import { notFound, permanentRedirect } from "next/navigation";
import { getCity } from "@/data/cities";
import { getService } from "@/data/services";
import { areaPath, cityPath } from "@/seo/urls";

type Params = { service: string; city: string; area: string };

export function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

export default async function ServiceAreaPage({ params }: { params: Promise<Params> }) {
  const { service, city, area } = await params;
  const found = getCity(city);
  if (!getService(service) || !found) notFound();
  const match = found.areas.find((item) => item.slug === area);
  permanentRedirect(match ? areaPath(found.slug, match.slug) : cityPath(found.slug));
}
