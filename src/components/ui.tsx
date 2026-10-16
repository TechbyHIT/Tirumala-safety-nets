import Link from "next/link";
import type { Faq } from "@/data/services";

export function GoldLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-full bg-cta-500 px-6 py-3 text-sm font-semibold text-brand-950 transition hover:bg-cta-600 ${className}`}
    >
      {children}
    </Link>
  );
}

export function DarkLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 ${className}`}
    >
      {children}
    </Link>
  );
}

export function GhostLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/15"
    >
      {children}
    </Link>
  );
}

export function WhatsLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center justify-center rounded-full bg-success-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-success-600"
    >
      {children}
    </Link>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cta-600">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">{title}</h2>
      {text ? <p className="mt-3 text-base leading-7 text-brand-800/80">{text}</p> : null}
    </div>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-brand-800/90">
          <span className="mt-0.5 text-cta-600" aria-hidden>
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Breadcrumb({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-white/80">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden>/</span> : null}
            {item.href ? (
              <Link href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span className="text-white">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  highlight,
  text,
  crumbs,
  image,
  actions,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  text: string;
  crumbs: { href?: string; label: string }[];
  image?: string;
  actions?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      {image ? (
        <img src={image} alt="" decoding="async" fetchPriority="low" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.18),transparent_36%),linear-gradient(120deg,#061224_0%,#0A1D37_55%,#123056_100%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <Breadcrumb items={crumbs} />
        <p className="mt-6 inline-flex rounded-full bg-cta-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-950">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl">
          {title}
          {highlight ? <span className="mt-1 block text-cta-500">{highlight}</span> : null}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/80 sm:text-lg">{text}</p>
        {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}

export function FactBar({ items }: { items: { label: string; value: string }[] }) {
  return (
    <section className="border-b border-brand-100 bg-white">
      <dl className="mx-auto grid max-w-6xl gap-px bg-brand-100 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="bg-white px-4 py-4 sm:px-6">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cta-600">{item.label}</dt>
            <dd className="mt-1 font-display text-lg font-bold text-brand-900">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Panel({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-[1.75rem] border border-brand-100 bg-white p-5 shadow-sm sm:p-6 ${className}`}>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cta-600">{eyebrow}</p> : null}
      {title ? <h2 className="mt-2 font-display text-2xl font-bold text-brand-900">{title}</h2> : null}
      <div className={title || eyebrow ? "mt-4" : ""}>{children}</div>
    </section>
  );
}

export function CardLink({ href, title, text }: { href: string; title: string; text: string }) {
  return (
    <Link href={href} className="group rounded-3xl border border-brand-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card">
      <h3 className="font-display text-lg font-bold text-brand-900 group-hover:text-brand-700">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-brand-800/75">{text}</p>
      <span className="mt-4 inline-flex text-sm font-semibold text-cta-600">View details</span>
    </Link>
  );
}

export function LinkCloud({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-brand-900">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-brand-100 bg-white px-3 py-2 text-sm font-medium text-brand-800 transition hover:border-cta-500 hover:text-brand-950"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function FaqStatic({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-brand-100 rounded-3xl border border-brand-100 bg-white">
      {items.map((item) => (
        <details key={item.q} className="group px-5 py-4">
          <summary className="cursor-pointer list-none font-semibold text-brand-900 [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-4">
              {item.q}
              <span className="text-cta-600 group-open:rotate-45" aria-hidden>
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-7 text-brand-800/80">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({ title, text }: { title: string; text: string }) {
  return (
    <section className="bg-brand-900 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-white/75">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <GoldLink href="/contact">Request a free visit</GoldLink>
          <GhostLink href="/locations">Cities we measure</GhostLink>
        </div>
      </div>
    </section>
  );
}
