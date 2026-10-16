import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { InstallationGallery } from "@/components/InstallationGallery";
import { getPost, posts } from "@/data/blog";
import { galleryCards, heroImage } from "@/data/gallery";
import { PageHero, Panel } from "@/components/ui";
import { absoluteUrl } from "@/seo/urls";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getPost(slug);
    if (!post) return {};
    return { title: post.title, description: post.description, alternates: { canonical: absoluteUrl(`/blog/${slug}`) } };
  });
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return (
    <>
      <PageHero
        eyebrow={post.kicker}
        title={post.title}
        text={post.description}
        image={heroImage(`blog:${post.slug}`, "invisible-grills")}
        crumbs={[{ href: "/", label: "Home" }, { href: "/blog", label: "Blog" }, { label: post.title }]}
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article>
          <Panel eyebrow={`${post.date} · ${post.reading}`}>
            <div className="space-y-5">
              {post.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-base leading-8 text-brand-800/90">
                  {paragraph}
                </p>
              ))}
            </div>
          </Panel>
        </article>
        <aside className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cta-600">More notes</p>
          {posts
            .filter((item) => item.slug !== post.slug)
            .map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`} className="block rounded-2xl bg-white p-4 ring-1 ring-brand-100 hover:ring-cta-500">
                <p className="text-xs font-semibold uppercase tracking-wide text-cta-600">{item.kicker}</p>
                <p className="mt-1 text-sm font-semibold text-brand-900">{item.title}</p>
              </Link>
            ))}
        </aside>
      </div>
      <InstallationGallery photos={galleryCards(`blog:${post.slug}`, 6)} compact title="Related installation photographs" />
    </>
  );
}
