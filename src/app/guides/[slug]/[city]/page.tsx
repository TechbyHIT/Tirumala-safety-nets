import { permanentRedirect } from "next/navigation";
import { guidePath } from "@/seo/urls";

type Params = { slug: string; city: string };

export function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

export default async function GuideCityPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  permanentRedirect(guidePath(slug));
}
