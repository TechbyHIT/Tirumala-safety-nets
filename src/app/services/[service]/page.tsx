import type { Metadata } from "next";
import { SeoScreen } from "@/components/SeoPage";
import { services } from "@/data/services";
import { metadataFor } from "@/seo/metadata";
import { servicePath } from "@/seo/urls";

type Params = { service: string };

export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { service } = await params;
  return metadataFor(servicePath(service));
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { service } = await params;
  return <SeoScreen path={servicePath(service)} />;
}
