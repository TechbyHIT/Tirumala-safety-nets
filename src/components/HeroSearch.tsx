"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export type SearchOption = { label: string; href: string; kind: string };

export function HeroSearch({ id = "site-search", light = false, options }: { id?: string; light?: boolean; options: SearchOption[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const matches = query.trim().length < 2
    ? []
    : options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())).slice(0, 7);

  return (
    <form
      className={`relative max-w-xl ${light ? "" : "mt-6"}`}
      onSubmit={(event) => {
        event.preventDefault();
        if (matches[0]) router.push(matches[0].href);
        else router.push(`/contact?need=${encodeURIComponent(query)}`);
      }}
    >
      <label className="sr-only" htmlFor={id}>
        Search services or Hyderabad areas
      </label>
      <input
        id={id}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search services or Hyderabad areas…"
        className={`h-12 w-full rounded-full px-5 text-sm text-brand-900 outline-none ring-2 ring-transparent placeholder:text-brand-800/40 focus:ring-cta-500 ${light ? "border border-brand-100 bg-brand-50" : "border-0 bg-white shadow-card"}`}
      />
      {matches.length > 0 ? (
        <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl bg-white text-brand-900 shadow-card">
          {matches.map((match) => (
            <li key={match.href}>
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-brand-50"
                onClick={() => router.push(match.href)}
              >
                <span>{match.label}</span>
                <span className="text-xs font-semibold uppercase text-cta-600">{match.kind}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </form>
  );
}
