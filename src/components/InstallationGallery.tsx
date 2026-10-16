"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { GalleryCard } from "@/data/gallery";
import { SectionTitle } from "./ui";

const labels: Record<string, string> = {
  "invisible-grills": "Invisible grills",
  "balcony-safety-nets": "Balcony safety nets",
  "children-safety-nets": "Children safety nets",
  "pet-safety-nets": "Pet and cat nets",
  "duct-area-nets": "Duct area nets",
  "anti-bird-spikes": "Bird spikes",
  "cloth-hangers": "Cloth hangers",
  "cricket-nets": "Sports nets",
  "mosquito-nets": "Mosquito nets",
};

const filters = [{ id: "all", label: "All installations" }, ...Object.entries(labels).map(([id, label]) => ({ id, label }))];

type Props = {
  photos: GalleryCard[];
  eyebrow?: string;
  title?: string;
  text?: string;
  filters?: boolean;
  compact?: boolean;
  href?: string;
};

export function InstallationGallery({
  photos,
  eyebrow = "Gallery",
  title = "Installations across Hyderabad",
  text = "Real balcony, window, duct and ground work — the same openings we measure from Srikakulam to Chittoor.",
  filters: showFilters = false,
  compact = false,
  href = "/gallery",
}: Props) {
  const [active, setActive] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const visible = useMemo(
    () => (active === "all" ? photos : photos.filter((photo) => photo.category === active)),
    [active, photos],
  );

  return (
    <section className={compact ? "py-10" : "py-16"}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle eyebrow={eyebrow} title={title} text={text} />
          {href ? (
            <Link href={href} className="text-sm font-semibold text-brand-900 hover:text-cta-600">
              Open full gallery →
            </Link>
          ) : null}
        </div>
        {showFilters ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActive(filter.id)}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold ring-1 transition ${
                  active === filter.id
                    ? "bg-brand-900 text-white ring-brand-900"
                    : "bg-white text-brand-800 ring-brand-100 hover:ring-cta-500"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        ) : null}
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {visible.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setOpen(index)}
              className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.4rem] bg-white text-left shadow-sm ring-1 ring-brand-100/80 [content-visibility:auto] [contain-intrinsic-size:auto_280px]"
            >
              <img src={photo.src} alt={photo.alt} width={1200} height={800} loading="lazy" decoding="async" className="h-auto w-full object-cover" />
              <span className="block px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-brand-800/70">
                {labels[photo.category] ?? "Installation"}
              </span>
            </button>
          ))}
        </div>
      </div>
      {open !== null && visible[open] ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-950/88 p-4" role="dialog" aria-modal="true">
          <button type="button" className="absolute inset-0 cursor-default" aria-label="Close photo" onClick={() => setOpen(null)} />
          <figure className="relative z-10 max-h-[90vh] w-full max-w-5xl">
            <img src={visible[open].src} alt={visible[open].alt} width={1400} height={900} decoding="async" className="max-h-[78vh] w-full rounded-3xl object-contain" />
            <figcaption className="mt-3 text-center text-sm text-white/80">{visible[open].alt}</figcaption>
            <div className="mt-4 flex justify-center gap-3">
              <button type="button" className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white" onClick={() => setOpen((value) => (value === null ? 0 : (value + visible.length - 1) % visible.length))}>
                Previous
              </button>
              <button type="button" className="rounded-full bg-cta-500 px-4 py-2 text-sm font-semibold text-brand-950" onClick={() => setOpen(null)}>
                Close
              </button>
              <button type="button" className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white" onClick={() => setOpen((value) => (value === null ? 0 : (value + 1) % visible.length))}>
                Next
              </button>
            </div>
          </figure>
        </div>
      ) : null}
    </section>
  );
}
