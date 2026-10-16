import Image from "next/image";
import Link from "next/link";
import { site, telHref, whatsappHref } from "@/config/site";
import { galleryCards } from "@/data/gallery";
import { generalFaqs } from "@/data/faq";
import { steps } from "@/data/materials";
import { citiesIn, regions } from "@/data/cities";
import { InstallationGallery } from "./InstallationGallery";
import { OrganicGuide } from "./OrganicGuide";
import { ServiceCards } from "./ServiceCards";
import { FaqStatic, GoldLink, SectionTitle } from "./ui";

const pills = ["Site inspection", "Written quote", "Balcony nets", "Invisible grills", "Apartments and villas", "All of Hyderabad"];

const heroPhotos = [
  {
    src: "/gallery/view/0136daf3cc18.webp",
    alt: "Invisible grill cables across a high balcony in Hyderabad, with the city still visible",
    label: "Invisible grills",
  },
  {
    src: "/gallery/view/095b7f06fb79.webp",
    alt: "Safety net fitted across a balcony railing, with the view and daylight still open",
    label: "Safety nets",
  },
];

export function HomePage() {
  const wa = whatsappHref("Hello Tirumala Safety Nets, I would like a site inspection in Hyderabad.");
  return (
    <>
      <section className="grid bg-brand-950 text-white lg:min-h-[88vh] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="order-2 flex flex-col justify-center px-4 py-14 sm:px-8 lg:order-1 lg:px-10 lg:py-20">
          <p className="inline-flex w-fit rounded-full bg-cta-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-950">
            Safety nets for every neighbourhood in Hyderabad
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">
            Tirumala Safety Nets — premium safety nets & invisible grills
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            Balcony safety nets, pigeon nets, invisible grills, children and pet nets, cloth hangers and sports nets for apartments, villas and commercial buildings across Hyderabad and Secunderabad.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <GoldLink href="/contact">Get a Quote →</GoldLink>
            {wa ? (
              <a href={wa} className="inline-flex min-h-11 items-center justify-center rounded-full bg-success-500 px-6 py-3 text-sm font-semibold text-white hover:bg-success-600">
                WhatsApp Now
              </a>
            ) : null}
            <a href={telHref()} className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Call Now
            </a>
          </div>
          <ul className="mt-8 flex max-w-3xl flex-wrap gap-2">
            {pills.map((pill) => (
              <li key={pill} className="rounded-full bg-black/35 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20">
                ✓ {pill}
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 grid min-h-[70vh] grid-cols-1 sm:grid-cols-2 lg:order-2 lg:min-h-full lg:grid-cols-1">
          {heroPhotos.map((photo) => (
            <figure key={photo.label} className="relative min-h-72">
              <Image src={photo.src} alt={photo.alt} fill priority className="object-cover" sizes="(min-width: 1024px) 46vw, 100vw" />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-brand-950/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white ring-1 ring-white/25">
                {photo.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <ServiceCards />
      <OrganicGuide path="/" />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cta-600">About Tirumala Safety Nets</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-900 sm:text-4xl">Premium safety, planned around the opening you have</h2>
          </div>
          <div className="text-sm leading-7 text-brand-800/80">
            <p>
              A tower balcony in Gachibowli and a villa terrace in Kompally are not the same job. We measure the edges, the fixing surface and how the space is used — children, pets, pigeons, drying or play — then name the mesh or cable in a written quote.
            </p>
            <p className="mt-3">
              Coverage is the whole of Hyderabad: the IT corridor, Kukatpally, Banjara Hills, Secunderabad, Uppal, LB Nagar, the Old City and the ORR neighbourhoods.
            </p>
            <Link href="/about" className="mt-4 inline-flex text-sm font-semibold text-brand-900">
              About the company →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionTitle eyebrow="Process" title="Our installation process" text="An inspection, a written scope, then the fit. We do not quote a finished balcony from a phone description alone." />
        <ol className="mt-8 grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-3xl border border-brand-100 bg-white p-4">
              <p className="font-display text-2xl font-extrabold text-cta-500">0{index + 1}</p>
              <h3 className="mt-2 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-brand-800/75">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[#f6f1e7] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle eyebrow="Areas" title="Serving all of Hyderabad" text="Open a locality for the housing note and the neighbourhoods around it. If your street is not listed, send the area with the enquiry." />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {regions.map((region) => (
              <article key={region} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-brand-100">
                <h3 className="font-display text-xl font-bold">{region}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {citiesIn(region).map((city) => (
                    <Link key={city.slug} href={`/locations/hyderabad/${city.slug}`} className="rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-900 hover:bg-cta-500/30">
                      {city.name}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <Link href="/locations" className="mt-6 inline-flex text-sm font-semibold text-brand-900">
            All Hyderabad areas →
          </Link>
        </div>
      </section>

      <InstallationGallery
        photos={galleryCards("home", 12)}
        eyebrow="Gallery"
        title="A glimpse of recent installation types"
        text="Balcony nets, pigeon protection, invisible grills, ducts and sports nets — the systems we measure across Hyderabad."
      />

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionTitle eyebrow="Questions" title="Frequently asked questions" />
            <div className="mt-6">
              <FaqStatic items={generalFaqs.slice(0, 6)} />
            </div>
            <Link href="/faq" className="mt-4 inline-flex text-sm font-semibold">
              All questions →
            </Link>
          </div>
          <div className="rounded-[2rem] bg-brand-900 p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cta-500">Quote</p>
            <h2 className="mt-3 font-display text-3xl font-bold">Request a site inspection</h2>
            <p className="mt-3 text-sm leading-7 text-white/75">
              Share the Hyderabad locality, the opening and whether the concern is children, pets, pigeons or a clear view. The written figure follows a measurement.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>{site.hours}</li>
              <li>{site.email}</li>
              <li>{site.address}</li>
              {site.phoneDisplay ? <li>{site.phoneDisplay}</li> : null}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <GoldLink href="/contact">Get Free Quote</GoldLink>
              {wa ? (
                <a href={wa} className="inline-flex min-h-11 items-center rounded-full bg-success-500 px-5 py-3 text-sm font-semibold text-white">
                  WhatsApp
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
