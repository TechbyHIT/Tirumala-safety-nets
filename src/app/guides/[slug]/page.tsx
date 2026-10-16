import type { Metadata } from "next";
import { SeoScreen } from "@/components/SeoPage";
import { priceGuides } from "@/data/materials";
import { services } from "@/data/services";
import { metadataFor } from "@/seo/metadata";
import { guidePath } from "@/seo/urls";

type Params = { slug: string };

export function generateStaticParams() {
  return [
    ...services.flatMap((service) => service.intents.map((intent) => ({ slug: intent.slug }))),
    ...priceGuides.map((guide) => ({ slug: guide.slug })),
  ];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  return metadataFor(guidePath(slug));
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return <SeoScreen path={guidePath(slug)} />;
}
