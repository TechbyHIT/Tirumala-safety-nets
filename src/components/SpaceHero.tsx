"use client";

import { useState } from "react";
import Link from "next/link";

export type HeroSlide = {
  href: string;
  src: string;
  alt: string;
  kicker: string;
  line: string;
};

export function SpaceHero({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index] ?? slides[0];
  if (!slide) return null;

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cta-500">Tirumala Safety Nets · Planned around the opening</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">
          Safety nets and invisible grills.
          <span className="mt-2 block text-cta-500">Made for your space.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
          Balcony nets, pigeon protection, and slim cable grills for homes across Hyderabad. The plan follows the opening, the view, and how the space is used every day.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact?need=photo" className="inline-flex min-h-11 items-center rounded-full bg-cta-500 px-5 py-3 text-sm font-semibold text-brand-950 hover:bg-cta-600">
            Get a photo estimate
          </Link>
          <Link href="/services" className="inline-flex min-h-11 items-center rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/25 hover:bg-white/15">
            Explore services
          </Link>
        </div>
      </div>
      <div>
        <Link href={slide.href} className="block overflow-hidden rounded-[2rem] bg-brand-900 ring-1 ring-white/10">
          <img
            src={slide.src}
            alt={slide.alt}
            width={1400}
            height={900}
            fetchPriority={index === 0 ? "high" : "low"}
            decoding="async"
            className="h-72 w-full object-cover sm:h-96"
          />
          <div className="flex items-end justify-between gap-4 p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-cta-500">{slide.kicker}</p>
              <p className="mt-1 font-display text-2xl font-bold">{slide.line}</p>
            </div>
          </div>
        </Link>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex gap-2">
            {slides.map((item, slideIndex) => (
              <button
                key={item.href}
                type="button"
                aria-label={`Show ${item.kicker}`}
                onClick={() => setIndex(slideIndex)}
                className={`grid h-9 w-9 place-items-center rounded-full text-xs font-bold ${slideIndex === index ? "bg-cta-500 text-brand-950" : "bg-white/10 text-white"}`}
              >
                0{slideIndex + 1}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" className="rounded-full bg-white/10 px-3 py-2 text-sm" onClick={() => setIndex((value) => (value + slides.length - 1) % slides.length)} aria-label="Previous service image">
              Prev
            </button>
            <button type="button" className="rounded-full bg-white/10 px-3 py-2 text-sm" onClick={() => setIndex((value) => (value + 1) % slides.length)} aria-label="Next service image">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
