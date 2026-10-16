import { notFound, permanentRedirect } from "next/navigation";
import { getCity } from "@/data/cities";
import { getService } from "@/data/services";
import { getJob } from "@/seo/jobs";
import { areaPath, cityPath } from "@/seo/urls";

type Params = { service: string; city: string; area: string; job: string };

export function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

export default async function ServiceAreaJobPage({ params }: { params: Promise<Params> }) {
  const { service, city, area, job } = await params;
  const found = getCity(city);
  if (!getService(service) || !getJob(job) || !found) notFound();
  const match = found.areas.find((item) => item.slug === area);
  permanentRedirect(match ? areaPath(found.slug, match.slug) : cityPath(found.slug));
}
