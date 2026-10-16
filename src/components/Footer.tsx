import Link from "next/link";
import { site, telHref, whatsappHref } from "@/config/site";
import { cities } from "@/data/cities";

export function Footer() {
  const wa = whatsappHref("Hello Tirumala Safety Nets, please share a visit slot in Hyderabad.");
  return (
    <footer className="bg-brand-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-lg font-bold">Tirumala Safety Nets</p>
          <p className="mt-1 text-sm text-cta-500">Hyderabad & Secunderabad</p>
          <p className="mt-4 text-sm leading-6 text-white/70">
            Balcony safety nets, pigeon nets, invisible grills, cloth hangers and sports nets measured for homes and buildings across Hyderabad.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-cta-500">Popular services</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            {[
              ["balcony-safety-nets", "Balcony safety nets"],
              ["pigeon-nets", "Pigeon safety nets"],
              ["invisible-grills", "Invisible grills"],
              ["children-safety-nets", "Children safety nets"],
              ["pet-safety-nets", "Pet safety nets"],
              ["cricket-nets", "Cricket practice nets"],
            ].map(([slug, label]) => (
              <li key={slug}>
                <Link href={`/services/${slug}`} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="font-semibold text-white hover:text-cta-500">
                Service library
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-cta-500">Service cities</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            {["gachibowli", "kondapur", "kukatpally", "banjara-hills", "secunderabad", "lb-nagar"].map((slug) => {
              const city = cities.find((item) => item.slug === slug);
              if (!city) return null;
              return (
                <li key={slug}>
                  <Link href={`/locations/hyderabad/${city.slug}`} className="hover:text-white">
                    {city.name}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link href="/locations" className="font-semibold text-white hover:text-cta-500">
                All Hyderabad areas
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-cta-500">Company and help</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li><Link href="/about" className="hover:text-white">About Tirumala Safety Nets</Link></li>
            <li><Link href="/gallery" className="hover:text-white">Installation gallery</Link></li>
            <li><Link href="/contact?need=photo" className="hover:text-white">Photo estimate</Link></li>
            <li><Link href="/services" className="hover:text-white">All safety net services</Link></li>
            <li><Link href="/blog" className="hover:text-white">Detailed guides</Link></li>
            <li><Link href="/faq" className="hover:text-white">Pricing questions</Link></li>
          </ul>
          <p className="mt-6 text-sm font-semibold text-cta-500">Visit</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li>{site.address}</li>
            <li>{site.hours}</li>
            {site.phoneDisplay ? (
              <li>
                <a href={telHref()} className="hover:text-white">
                  {site.phoneDisplay}
                </a>
              </li>
            ) : null}
            {wa ? (
              <li>
                <a href={wa} className="hover:text-white">
                  WhatsApp
                </a>
              </li>
            ) : null}
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Site inspection
              </Link>
            </li>
            <li>
              <Link href="/sitemap" className="hover:text-white">
                HTML sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
          <div>
            <p className="font-display text-xl font-bold">Start with a photo of the opening</p>
            <p className="mt-1 text-sm text-white/70">City, one full photo, and the fixing edges are enough to begin. The quote is written after measurement.</p>
          </div>
          <Link href="/contact?need=photo" className="rounded-full bg-cta-500 px-5 py-3 text-sm font-semibold text-brand-950">
            Get a photo estimate
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-white/50 sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Tirumala Safety Nets. Serving entire Hyderabad.</p>
          <p>Grades and prices are confirmed in a written quote after measurement.</p>
        </div>
      </div>
    </footer>
  );
}
