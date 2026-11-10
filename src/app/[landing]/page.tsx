import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammaticSeoPage } from "@/components/ProgrammaticSeoPage";
import { pageForSlug, publishedProgrammaticRecords, recordForSlug } from "@/pseo/generator";

type Params = { landing: string };

export const revalidate = 86_400;
export const dynamicParams = true;

export function generateStaticParams() {
  return publishedProgrammaticRecords()
    .slice(0, 300)
    .map((record) => ({ landing: record.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { landing } = await params;
  const record = recordForSlug(landing);
  if (!record) return {};
  return {
    title: record.title,
    description: record.description,
    alternates: { canonical: record.canonical },
    robots: record.robots === "noindex,follow" ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "website",
      title: record.title,
      description: record.description,
      url: record.canonical,
      siteName: "Tirumala Safety Nets",
    },
  };
}

export default async function LandingPage({ params }: { params: Promise<Params> }) {
  const { landing } = await params;
  const page = pageForSlug(landing);
  if (!page) notFound();
  return <ProgrammaticSeoPage page={page} />;
}
