import Image from "next/image";
import Link from "next/link";
import { galleryCards } from "@/data/gallery";
import { guideFor } from "@/seo/organic";

export function OrganicGuide({ path }: { path: string }) {
  const guide = guideFor(path);
  const photos = galleryCards(`${path}:organic`, guide.full ? 4 : 2);
  const faqLd = guide.full
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.questions.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;
  return (
    <article id={guide.full ? "safety-guide" : undefined} className="bg-white">
      {faqLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} /> : null}
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cta-600">{guide.full ? "Main guide" : "Guide"}</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-brand-950 sm:text-4xl">{guide.title}</h2>
        <p className="mt-4 text-base leading-8 text-brand-800/85">{guide.intro}</p>
        {guide.full ? (
          <nav className="mt-8 rounded-3xl bg-[#f6f1e7] p-5" aria-label="Guide contents">
            <p className="text-sm font-semibold text-brand-950">On this guide</p>
            <ol className="mt-3 grid gap-2 sm:grid-cols-2">
              {guide.chapters.map((chapter, index) => (
                <li key={chapter.id}>
                  <a className="text-sm font-medium text-brand-900 underline-offset-2 hover:underline" href={`#${chapter.id}`}>
                    {index + 1}. {chapter.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : (
          <p className="mt-4 text-sm leading-7 text-brand-800/75">
            <Link className="font-semibold text-brand-950 underline" href="/#safety-guide">
              Read the full Hyderabad guide
            </Link>
            . It is kept in one place so these pages stay specific.
          </p>
        )}
        {photos[0] ? (
          <figure className="mt-8 overflow-hidden rounded-3xl">
            <div className="relative h-64 sm:h-80">
              <Image src={photos[0].src} alt={photos[0].alt} fill className="object-cover" sizes="(min-width: 768px) 720px, 100vw" />
            </div>
            <figcaption className="bg-brand-50 px-4 py-3 text-sm text-brand-800/70">{photos[0].alt}</figcaption>
          </figure>
        ) : null}
        <div className="mt-10 space-y-12">
          {guide.chapters.map((chapter, index) => (
            <section key={chapter.id} id={guide.full ? chapter.id : undefined} className="scroll-mt-28">
              <h3 className="font-display text-2xl font-bold text-brand-950">{chapter.heading}</h3>
              <div className="mt-4 space-y-4 text-base leading-8 text-brand-800/85">
                {chapter.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
              {chapter.points ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-brand-800/85">
                  {chapter.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
              {photos[index + 1] ? (
                <figure className="mt-5 overflow-hidden rounded-3xl">
                  <div className="relative h-56">
                    <Image src={photos[index + 1].src} alt={photos[index + 1].alt} fill className="object-cover" sizes="(min-width: 768px) 720px, 100vw" />
                  </div>
                </figure>
              ) : null}
            </section>
          ))}
        </div>
        <section className="mt-12">
          <h3 className="font-display text-2xl font-bold text-brand-950">Questions people ask before a visit</h3>
          <div className="mt-4 space-y-6">
            {guide.questions.map((item) => (
              <div key={item.q}>
                <h4 className="font-semibold text-brand-950">{item.q}</h4>
                <p className="mt-2 text-base leading-8 text-brand-800/85">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
        <p className="mt-10 text-sm leading-7 text-brand-800/75">
          <Link className="font-semibold text-brand-950 underline" href="/services">
            All services
          </Link>
          {" · "}
          <Link className="font-semibold text-brand-950 underline" href="/locations">
            Hyderabad areas
          </Link>
          {" · "}
          <Link className="font-semibold text-brand-950 underline" href="/contact">
            Book a measurement
          </Link>
        </p>
      </div>
    </article>
  );
}
