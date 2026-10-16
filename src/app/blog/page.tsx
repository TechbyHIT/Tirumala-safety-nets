import type { Metadata } from "next";
import { absoluteUrl } from "@/seo/urls";
import Image from "next/image";
import Link from "next/link";
import { InstallationGallery } from "@/components/InstallationGallery";
import { posts } from "@/data/blog";
import { cardImage, galleryCards, heroImage } from "@/data/gallery";
import { GoldLink, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Guides for Hyderabad balconies",
  description:
    "Notes on child safety, pigeon control, invisible grills versus nets, and what changes a Hyderabad quote.",
  alternates: { canonical: absoluteUrl("/blog") },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="Notes for homeowners"
        text="Written for Hyderabad apartments, villas and older colonies: heat, monsoon damp, and pigeon pressure on AC ledges."
        image={heroImage("blog", "invisible-grills")}
        crumbs={[{ href: "/", label: "Home" }, { label: "Blog" }]}
        actions={<GoldLink href="/contact">Ask about your opening</GoldLink>}
      />
      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-brand-100">
            <Link href={`/blog/${post.slug}`} className="relative block h-48">
              <Image src={cardImage(`blog-card:${post.slug}`, "invisible-grills")} alt="" fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
            </Link>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-cta-600">{post.kicker}</p>
              <h2 className="mt-2 font-display text-2xl font-bold">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-3 text-sm leading-7 text-brand-800/80">{post.description}</p>
              <p className="mt-3 text-xs text-brand-800/50">
                {post.date} · {post.reading}
              </p>
            </div>
          </article>
        ))}
      </div>
      <InstallationGallery photos={galleryCards("blog", 6)} compact title="Openings these notes describe" text="Balcony cable, mesh and bird work photographed from the same categories the guides discuss." />
    </>
  );
}
