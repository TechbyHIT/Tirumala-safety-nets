import Image from "next/image";
import Link from "next/link";
import { telHref } from "@/config/site";
import { featuredPhoto, viewSrc } from "@/data/gallery";
import { showcaseCards } from "@/data/service-cards";

export function ServiceCards() {
  const callHref = telHref();
  return (
    <section className="bg-[#f6f1e7]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex rounded-full bg-cta-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-950">Our services</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-brand-950 sm:text-4xl">Complete home & building safety solutions</h2>
          <p className="mt-3 text-sm leading-7 text-brand-800/75 sm:text-base">
            From invisible grills to safety nets, bird protection and cloth hangers — everything you need from one team across Hyderabad and Secunderabad.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {showcaseCards.map((card) => {
            const photo = featuredPhoto(`showcase:${card.title}`, card.photo);
            return (
              <article key={card.title} className="flex flex-col rounded-[1.35rem] bg-white p-3 shadow-sm ring-1 ring-black/5">
                <div className="relative h-52 overflow-hidden rounded-2xl">
                  <Image src={viewSrc(photo.src)} alt={photo.alt} fill className="object-cover" sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw" />
                </div>
                <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                  <h3 className="font-display text-lg font-bold text-brand-950">
                    <Link href={card.href}>{card.title}</Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-brand-800/70">{card.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={card.href} className="inline-flex min-h-10 items-center rounded-full bg-brand-950 px-4 py-2 text-sm font-semibold text-white">
                      View Details →
                    </Link>
                    <a href={callHref} className="inline-flex min-h-10 items-center rounded-full border border-brand-900/20 px-4 py-2 text-sm font-semibold text-brand-950">
                      Call
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mx-auto mt-10 max-w-3xl space-y-3 text-center text-sm leading-7 text-brand-800/80">
          <p>
            Tell us the Hyderabad locality and what the opening is for: a fall, pigeons, children, pets, drying, or a practice net. We look at the balcony, window, duct, terrace or stair, then send a written quote after the measurement.
          </p>
          <p>
            Apartments in Gachibowli and Kukatpally, houses in Kompally and Kokapet, and older blocks in Secunderabad and the Old City are not the same job. The photos show the kind of work. The price follows the opening you have.
          </p>
        </div>
        <div className="mt-8 text-center">
          <Link href="/services" className="inline-flex min-h-11 items-center rounded-full border border-brand-900/20 bg-white px-5 py-2.5 text-sm font-semibold text-brand-950">
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
