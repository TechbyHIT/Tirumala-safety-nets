import Link from "next/link";
import type { City } from "@/data/cities";
import { getCity } from "@/data/cities";
import { getService, type Service } from "@/data/services";
import { serviceCityPath, servicePath } from "@/seo/urls";

const household = ["balcony-safety-nets", "pigeon-nets", "invisible-grills", "children-safety-nets", "terrace-safety-nets", "anti-bird-spikes", "pet-safety-nets", "cloth-hangers", "cricket-nets"];
const hubs = ["gachibowli", "kondapur", "kukatpally", "banjara-hills", "secunderabad", "uppal", "lb-nagar", "mehdipatnam"];

function hrefFor(slug: string, city?: City) {
  return city ? serviceCityPath(slug, city.slug) : servicePath(slug);
}

export function SiteModules({ city, service, place }: { city?: City; service?: Service; place?: string }) {
  const where = place || city?.name || "Hyderabad";
  const cards = (service ? household.filter((slug) => slug !== service.slug) : household)
    .map((slug) => getService(slug))
    .filter((item): item is Service => Boolean(item))
    .slice(0, 6);
  const cityHubs = hubs.map((slug) => getCity(slug)).filter((item): item is City => Boolean(item));

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cta-600">Compare</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-brand-900">Choose the system for this opening in {where}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-brand-800/75">
          A fall barrier, a bird enclosure, and a cable grill are different jobs. Pick the card that matches the opening, then send the city and a photograph before anyone names a grade.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((item) => (
            <article key={item.slug} className="flex flex-col rounded-[1.75rem] border border-brand-100 bg-brand-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-cta-600">{item.group}</p>
              <h3 className="mt-2 font-display text-xl font-bold">
                <Link href={hrefFor(item.slug, city)}>{item.name}</Link>
              </h3>
              <p className="mt-2 text-sm leading-6 text-brand-800/80">{item.summary}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-800/50">Usually considered for</p>
              <p className="mt-1 text-sm leading-6 text-brand-800/75">{item.where[0]}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-brand-800/80">
                {item.benefits.slice(0, 2).map((benefit) => (
                  <li key={benefit}>âœ“ {benefit}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-900 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold">Start from the problem, not the product name</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Balcony and family use", "Open edges, children, pets, and terraces. The barrier has to match who uses the space.", "/services/balcony-safety-nets"],
              ["Birds entering or perching", "A full opening needs a net. A narrow ledge may only need spikes. They are not the same job.", "/services/pigeon-nets"],
              ["View, grade, and the written figure", "Cable or mesh, coastal salt or inland sun, and access all belong in the estimate.", "/contact"],
            ].map(([title, text, href]) => (
              <Link key={title} href={city && href.startsWith("/services/") ? `${href}/${city.slug}` : href} className="rounded-[1.75rem] bg-white/5 p-5 ring-1 ring-white/10">
                <h3 className="font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">{text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-brand-900">What goes into a {where} estimate</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-brand-800/75">
          There is no single rate for every opening in the state. The written figure names the measured area, the material, the fixing, and the access.
        </p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(service ? service.priceFactors.slice(0, 4) : [
            "Width, height, corners, and the returns around columns or pipes.",
            "Mesh, cable grade, or spikes chosen for the actual job.",
            "Floor, society hours, and how long the opening takes to reach.",
            "A cleaning edge, old-net removal, or a drying line planned with the fit.",
          ]).map((text, index) => (
            <li key={text} className="rounded-[1.75rem] border border-brand-100 p-5">
              <p className="font-display text-2xl font-extrabold text-cta-500">0{index + 1}</p>
              <p className="mt-2 text-sm leading-6 text-brand-800/80">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-brand-50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-brand-900">Plan the finish around the purpose</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["transparent-balcony-nets", "Lighter balcony mesh", "For an open edge when airflow and a lighter line matter more than a solid screen."],
              ["pigeon-nets", "Bird-control netting", "Closes the volume birds enter. Spikes stay on the ledge, not across the whole balcony."],
              ["invisible-grills", "Cable for the view", "Stainless lines when the outlook is part of the plan and the opening can take anchors."],
            ].map(([slug, title, text]) => (
              <article key={slug} className="rounded-[1.75rem] bg-white p-5 shadow-sm">
                <h3 className="font-display text-xl font-bold">
                  <Link href={hrefFor(slug, city)}>{title}</Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-brand-800/75">{text}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-brand-800/70">
            A bird net is not assumed to be a child or pet barrier. Say who uses the opening so the specification can be checked on site.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-brand-900">What to check at the {where} property</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Exposure", city?.climate ?? "Hyderabad heat, monsoon damp and pigeon pressure on AC ledges. The locality page carries the housing note."],
            ["Layout", city?.housing ?? "Balcony, window, duct, terrace, stair, or a ground that is actually used for sport."],
            ["Access", city?.visitNote ?? "Floor, society permission, and whether a remote town changes the day."],
            ["Measured fit", city?.materialHint ?? "Width, height, side returns, and the wall or slab that takes the fixing."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-[1.75rem] border border-brand-100 p-5">
              <h3 className="font-display text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-brand-800/75">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-950 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold">Match the purpose before the product</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              ["An open edge", "Balcony, child, or pet protection when someone can reach past the rail.", "Works for open edges that need a purpose-specific barrier.", "/services/children-safety-nets"],
              ["Birds walking in", "Net the balcony, duct, or shaft they enter. Leave a labelled way to clean it.", "Works for volumes used as a nest, not a thin perch.", "/services/pigeon-nets"],
              ["Birds only sitting", "Spikes on a ledge, beam, or AC tray. They do not close a balcony.", "Works for narrow landing lines.", "/services/anti-bird-spikes"],
              ["A clear outlook", "Cable when sightlines matter and the slab can take anchors.", "Works for balconies and windows planned around the view.", "/services/invisible-grills"],
            ].map(([title, text, note, href]) => (
              <Link key={title} href={city ? `${href}/${city.slug}` : href} className="rounded-[1.75rem] bg-white/5 p-5 ring-1 ring-white/10">
                <h3 className="font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/80">{text}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-cta-500">{note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-brand-900">Prepare a useful {where} enquiry</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["Name the concern", "Birds, an open edge, pets, drying, or a practice bay. Keep separate needs separate."],
            ["Show the whole opening", "One wide photo and close-ups of the wall, frame, and any metal already there."],
            ["Add the locality", city ? `The closest listed area in ${city.name}, plus floor and society hours if you know them.` : "The Hyderabad locality, even if it is not one of the hub areas."],
            ["Agree the scope", "Material, fixing, access, and what the written estimate includes, before work is booked."],
          ].map(([title, text], index) => (
            <li key={title} className="rounded-[1.75rem] bg-brand-50 p-5">
              <p className="font-display text-2xl font-extrabold text-cta-500">0{index + 1}</p>
              <h3 className="mt-2 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-brand-800/75">{text}</p>
            </li>
          ))}
        </ol>
        {!city ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {cityHubs.map((hub) => (
              <Link key={hub.slug} href={`/locations/hyderabad/${hub.slug}`} className="rounded-full bg-white px-3 py-2 text-sm font-medium text-brand-900 ring-1 ring-brand-100 hover:ring-cta-500">
                {hub.name}
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
