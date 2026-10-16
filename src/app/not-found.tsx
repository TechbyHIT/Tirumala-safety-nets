import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cta-600">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold">That page is not on the Hyderabad map</h1>
      <p className="mt-3 text-sm leading-7 text-brand-800/75">Try a service, an area, or send the locality with a visit request.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/locations" className="rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white">
          Locations
        </Link>
        <Link href="/contact" className="rounded-full bg-cta-500 px-5 py-3 text-sm font-semibold text-brand-950">
          Contact
        </Link>
      </div>
    </div>
  );
}
