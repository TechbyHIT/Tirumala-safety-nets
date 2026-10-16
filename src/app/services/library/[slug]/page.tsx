import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InstallationGallery } from "@/components/InstallationGallery";
import { CheckList, GoldLink, PageHero } from "@/components/ui";
import { cardImage, galleryCards, heroImage } from "@/data/gallery";
import { getLibraryItem, libraryGroupFor, libraryItems } from "@/data/library";
import { getService } from "@/data/services";
import { absoluteUrl } from "@/seo/urls";

type Params = { slug: string };

export function generateStaticParams() {
  return libraryItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getLibraryItem(slug);
  if (!item) return { title: "Service library" };
  return {
    title: `${item.title} in Hyderabad`,
    description: item.summary,
    alternates: { canonical: absoluteUrl(`/services/library/${item.slug}`) },
  };
}

export default async function LibraryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = getLibraryItem(slug);
  if (!item) notFound();
  const group = libraryGroupFor(slug);
  const parent = getService(item.parent);
  return (
    <>
      <PageHero
        eyebrow={group?.title ?? "Service library"}
        title={item.title}
        highlight="across Hyderabad"
        text={item.summary}
        image={heroImage(`library:${item.slug}`, item.photo)}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { label: item.title },
        ]}
        actions={
          <>
            <GoldLink href="/contact">Get a quote</GoldLink>
            {parent ? (
              <Link href={`/services/${parent.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white">
                {parent.name}
              </Link>
            ) : null}
          </>
        }
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          {item.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-sm leading-7 text-brand-800/85">
              {paragraph}
            </p>
          ))}
          <div className="mt-6">
            <CheckList items={item.points} />
          </div>
        </div>
        <div className="relative min-h-72 overflow-hidden rounded-[2rem]">
          <Image src={cardImage(`library:${item.slug}`, item.photo)} alt={item.title} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
      </div>
      <InstallationGallery photos={galleryCards(`library:${item.slug}`, 6, item.photo)} title={`${item.title} as fitted`} />
    </>
  );
}
