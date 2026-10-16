import type { Metadata } from "next";
import { SeoScreen } from "@/components/SeoPage";
import { metadataFor } from "@/seo/metadata";
import { statePath } from "@/seo/urls";

export function generateStaticParams() {
  return [{ state: "hyderabad" }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  return metadataFor(`/locations/${state}`);
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  return <SeoScreen path={state === "hyderabad" ? statePath() : `/locations/${state}`} />;
}
