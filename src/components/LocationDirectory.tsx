"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type DirectoryRow = {
  key: string;
  name: string;
  slug: string;
  badge: string;
  detail: string;
  hub: string;
};

const PAGE_SIZE = 24;

export function LocationDirectory({ rows }: { rows: DirectoryRow[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((row) => `${row.name} ${row.badge} ${row.detail}`.toLowerCase().includes(term));
  }, [query, rows]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <section aria-labelledby="directory-title">
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-card sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="directory-title" className="font-display text-2xl font-bold text-brand-900">
            Search {rows.length} verified Hyderabad localities
          </h2>
          <p className="mt-1 text-sm text-brand-800/65">Search by name, ward, circle, zone or PIN. {PAGE_SIZE} records per page.</p>
        </div>
        <label className="w-full sm:max-w-sm">
          <span className="sr-only">Search locations</span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search Keesara, Miyapur, 500072…"
            className="h-12 w-full rounded-full border border-brand-100 bg-brand-50 px-5 text-sm outline-none focus:ring-2 focus:ring-cta-500"
          />
        </label>
      </div>
      <p className="mt-5 text-sm font-semibold text-brand-800/65">{filtered.length} matching records</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((row) => (
          <article key={row.key} className="rounded-3xl bg-white p-5 ring-1 ring-brand-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-cta-700">{row.badge}</p>
            <h3 className="mt-2 font-display text-xl font-bold text-brand-900">
              <Link href={row.hub}>{row.name}</Link>
            </h3>
            <p className="mt-2 text-sm leading-6 text-brand-800/65">{row.detail}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <Link className="rounded-full bg-brand-900 px-3 py-2 font-semibold text-white" href={`/invisible-grills-in-${row.slug}`}>
                Invisible grills
              </Link>
              <Link className="rounded-full bg-brand-50 px-3 py-2 font-semibold text-brand-900" href={`/safety-nets-in-${row.slug}`}>
                Safety nets
              </Link>
            </div>
          </article>
        ))}
      </div>
      {visible.length === 0 ? <p className="rounded-3xl bg-white p-8 text-center text-brand-800/70">No verified locality matches that search.</p> : null}
      <nav className="mt-8 flex items-center justify-center gap-4" aria-label="Location directory pages">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => setPage((value) => Math.max(1, value - 1))}
          className="rounded-full bg-brand-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-35"
        >
          Previous
        </button>
        <span className="text-sm font-semibold text-brand-800/70">
          Page {currentPage} of {pages}
        </span>
        <button
          type="button"
          disabled={currentPage === pages}
          onClick={() => setPage((value) => Math.min(pages, value + 1))}
          className="rounded-full bg-brand-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-35"
        >
          Next
        </button>
      </nav>
    </section>
  );
}
