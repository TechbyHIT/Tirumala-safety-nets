"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { site, telHref, whatsappHref } from "@/config/site";
import { menuPages, menuServices } from "@/data/nav-menu";
import { HeroSearch, type SearchOption } from "./HeroSearch";

type LinkItem = { href: string; label: string };

function Logo() {
  return (
    <Link href="/" className="block shrink-0" aria-label="Tirumala Safety Nets home">
      <img src="/brand/logo.webp" alt="" className="h-11 w-auto sm:h-14" />
    </Link>
  );
}

export function Header({
  topLine,
  regions,
  search,
}: {
  topLine: string;
  groups: { name: string; items: LinkItem[] }[];
  regions: { name: string; cities: LinkItem[] }[];
  hubs: (LinkItem & { areas: LinkItem[] })[];
  popular: LinkItem[];
  search: SearchOption[];
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileSection, setMobileSection] = useState<"services" | "areas" | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | null>(null);
  const quoteText = "Hello Tirumala Safety Nets, I would like a site inspection in Hyderabad.";
  const wa = whatsappHref(quoteText) || "/contact";

  function holdMenu(name: string) {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(name);
  }

  function releaseMenu() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  }

  function closeMobile() {
    window.setTimeout(() => setMobile(false), 0);
  }

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  useEffect(() => {
    if (!mobile && !open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobile(false);
      setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobile, open]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50">
      <div className="bg-brand-950 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-xs sm:px-6">
          <p className="truncate text-white/80">
            {topLine}
          </p>
          <div className="flex shrink-0 items-center gap-4">
            <a href={`mailto:${site.email}`} className="hidden font-semibold hover:text-cta-500 sm:inline">
              {site.email}
            </a>
            {site.phoneDisplay ? (
              <a href={telHref()} className="font-semibold hover:text-cta-500">
                {site.phoneDisplay}
              </a>
            ) : (
              <Link href="/contact" className="font-semibold hover:text-cta-500">
                Book a visit
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="relative border-b border-brand-100/80 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            <Link href="/" className="rounded-full px-3 py-2 text-sm font-semibold text-brand-900/85 hover:text-cta-600">
              Home
            </Link>
            <div onMouseEnter={() => holdMenu("services")} onMouseLeave={releaseMenu}>
              <button type="button" className="rounded-full px-3 py-2 text-sm font-semibold text-brand-900/85 hover:text-cta-600" aria-expanded={open === "services"} onClick={() => setOpen((value) => (value === "services" ? null : "services"))}>
                Services
              </button>
            </div>
            <div onMouseEnter={() => holdMenu("areas")} onMouseLeave={releaseMenu}>
              <button type="button" className="rounded-full px-3 py-2 text-sm font-semibold text-brand-900/85 hover:text-cta-600" aria-expanded={open === "areas"} onClick={() => setOpen((value) => (value === "areas" ? null : "areas"))}>
                Areas
              </button>
            </div>
            {[
              ["/about", "About"],
              ["/gallery", "Gallery"],
              ["/contact", "Contact Us"],
              ["/blog", "Guides"],
              ["/faq", "FAQ"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-full px-3 py-2 text-sm font-semibold text-brand-900/85 hover:text-cta-600">
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-brand-100 text-sm font-semibold text-brand-900"
              aria-label="Search services and cities"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((value) => !value)}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="M16 16l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <a href={wa} className="hidden h-11 w-11 place-items-center rounded-full bg-success-500 text-white sm:grid" aria-label="WhatsApp">
              <WaIcon />
            </a>
            <Link href={telHref()} className="hidden rounded-full bg-cta-500 px-4 py-2.5 text-sm font-semibold text-brand-950 sm:inline-flex">
              Call Now
            </Link>
            <button
              className="grid h-11 w-11 place-items-center rounded-full border border-brand-100 lg:hidden"
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              onClick={() => setMobile((value) => !value)}
            >
              {mobile ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                  <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {open === "services" ? (
          <div className="nav-panel absolute left-1/2 top-full z-[70] hidden w-[min(68rem,calc(100vw-1.5rem))] -translate-x-1/2 px-1 pt-3 lg:block" onMouseEnter={() => holdMenu("services")} onMouseLeave={releaseMenu}>
            <div className="overflow-hidden rounded-[28px] border border-brand-100 bg-white shadow-card">
              <div className="max-h-[min(64vh,640px)] overflow-auto p-6">
                <ServiceColumns className="grid grid-cols-4 gap-x-8 gap-y-7" onPick={() => window.setTimeout(() => setOpen(null), 0)} />
              </div>
              <MenuHelp prompt="Need help choosing the right solution?" href="/services" action="View all services →" onPick={() => window.setTimeout(() => setOpen(null), 0)} />
            </div>
          </div>
        ) : null}
        {open === "areas" ? (
          <div className="nav-panel absolute left-1/2 top-full z-[70] hidden w-[min(68rem,calc(100vw-1.5rem))] -translate-x-1/2 px-1 pt-3 lg:block" onMouseEnter={() => holdMenu("areas")} onMouseLeave={releaseMenu}>
            <div className="overflow-hidden rounded-[28px] border border-brand-100 bg-white shadow-card">
              <div className="max-h-[min(64vh,640px)] overflow-auto p-6">
                <AreaColumns regions={regions} className="grid gap-8 sm:grid-cols-2" onPick={() => window.setTimeout(() => setOpen(null), 0)} />
              </div>
              <MenuHelp prompt="Looking for a neighbourhood?" href="/locations" action="View all areas →" onPick={() => window.setTimeout(() => setOpen(null), 0)} />
            </div>
          </div>
        ) : null}
        {searchOpen ? (
          <div className="border-t border-brand-100 bg-white px-4 py-3 sm:px-6">
            <div className="mx-auto max-w-6xl">
              <HeroSearch id="header-search" light options={search} />
            </div>
          </div>
        ) : null}
        {mobile ? (
          <div className="fixed inset-0 z-[80] lg:hidden">
            <button type="button" className="absolute inset-0 bg-brand-950/50" aria-label="Close menu" onClick={closeMobile} />
            <div role="dialog" aria-modal="true" aria-label="Menu" className="absolute inset-y-0 right-0 flex w-[90%] max-w-[360px] flex-col bg-[#f6f1e7] shadow-2xl">
              <div className="flex items-center justify-between border-b border-brand-900/10 bg-white px-4 py-3">
                <Logo />
                <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-brand-100" aria-label="Close menu" onClick={closeMobile}>
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-2">
                <nav aria-label="Mobile">
                  {menuPages.map((item) => (
                    <Link key={item.href} href={item.href} onClick={closeMobile} className="block border-b border-brand-900/10 py-3.5 text-base font-medium text-brand-950">
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <DrawerSection
                  title="Services"
                  open={mobileSection === "services"}
                  onToggle={() => setMobileSection((value) => (value === "services" ? null : "services"))}
                >
                  <ServiceColumns className="grid gap-5" onPick={closeMobile} />
                  <Link href="/services" onClick={closeMobile} className="mt-4 inline-flex text-sm font-semibold text-brand-950">
                    View all services →
                  </Link>
                </DrawerSection>
                <DrawerSection
                  title="Areas we serve"
                  open={mobileSection === "areas"}
                  onToggle={() => setMobileSection((value) => (value === "areas" ? null : "areas"))}
                >
                  <AreaColumns regions={regions} className="grid gap-5" onPick={closeMobile} />
                  <Link href="/locations" onClick={closeMobile} className="mt-4 inline-flex text-sm font-semibold text-brand-950">
                    View all areas →
                  </Link>
                </DrawerSection>
              </div>
              <div className="grid grid-cols-2 gap-2 border-t border-brand-900/10 bg-white p-4">
                <Link href={telHref()} onClick={closeMobile} className="inline-flex items-center justify-center gap-2 rounded-full bg-cta-500 px-3 py-3 text-sm font-semibold text-brand-950">
                  <PhoneIcon />
                  Call Now
                </Link>
                <a href={wa} onClick={closeMobile} className="inline-flex items-center justify-center gap-2 rounded-full bg-success-500 px-3 py-3 text-sm font-semibold text-white">
                  <WaIcon />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        ) : null}
        {!mobile ? <FloatActions /> : null}
      </div>
    </header>
  );
}

function ServiceColumns({ className, onPick }: { className: string; onPick: () => void }) {
  return (
    <div className={className}>
      {menuServices.map((group) => (
        <div key={group.title}>
          <p className="border-b border-brand-100 pb-2 font-display text-sm font-bold text-brand-950">{group.title}</p>
          <ul className="mt-2">
            {group.links.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={onPick} className="block py-2 text-sm leading-5 text-brand-800/80 hover:text-brand-950">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function AreaColumns({
  regions,
  className,
  onPick,
}: {
  regions: { name: string; cities: LinkItem[] }[];
  className: string;
  onPick: () => void;
}) {
  return (
    <div className={className}>
      {regions.map((region) => (
        <div key={region.name}>
          <p className="border-b border-brand-100 pb-2 font-display text-sm font-bold text-brand-950">{region.name}</p>
          <ul className="mt-3 columns-2 gap-x-6">
            {region.cities.map((city) => (
              <li key={city.href} className="break-inside-avoid">
                <Link href={city.href} onClick={onPick} className="block py-1.5 text-sm leading-5 text-brand-800/75 hover:text-brand-950">
                  {city.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function MenuHelp({ prompt, href, action, onPick }: { prompt: string; href: string; action: string; onPick: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-[#f6f1e7] px-4 py-3">
      <p className="min-w-0 text-sm font-medium leading-5 text-brand-900">{prompt}</p>
      <Link href={href} onClick={onPick} className="shrink-0 text-sm font-semibold text-brand-950">
        {action}
      </Link>
    </div>
  );
}

function DrawerSection({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <div className="border-b border-brand-900/10">
      <button type="button" className="flex w-full items-center justify-between py-3.5 text-left text-base font-medium text-brand-950" aria-expanded={open} onClick={onToggle}>
        {title}
        <Chevron open={open} />
      </button>
      {open ? <div className="pb-4">{children}</div> : null}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} aria-hidden>
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M7 3.8h2.8l1.1 2.8-1.8 1.1a11 11 0 0 0 5.2 5.2l1.1-1.8 2.8 1.1V17a1.7 1.7 0 0 1-1.8 1.7A14.8 14.8 0 0 1 5.3 7.6 1.7 1.7 0 0 1 7 3.8z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 14.15c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.3-1.64-.59-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.28.64-.41 1.02-.41.13 0 .24 0 .35.01.31.01.47.03.68.52.24.58.82 2 .89 2.15.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.37-.42.49-.14.14-.28.29-.12.56.16.28.72 1.18 1.54 1.91 1.06.94 1.95 1.23 2.23 1.37.28.14.44.12.6-.07.16-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.25.09 1.59.75 1.86.89.27.14.45.21.52.32.07.12.07.68-.17 1.36z" />
    </svg>
  );
}

export function FloatActions() {
  const wa = whatsappHref("Hello Tirumala Safety Nets, I need a safety installation quote in Hyderabad.") || "/contact";
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3">
      <a href={wa} className="grid h-14 w-14 place-items-center rounded-full bg-success-500 text-white shadow-card" aria-label="WhatsApp">
        <WaIcon />
      </a>
      <Link href={telHref()} className="grid h-14 w-14 place-items-center rounded-full bg-cta-500 text-brand-950 shadow-card" aria-label="Call">
        <PhoneIcon className="h-6 w-6" />
      </Link>
    </div>
  );
}
