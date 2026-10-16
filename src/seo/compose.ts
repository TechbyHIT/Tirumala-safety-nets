import { createHash } from "crypto";
import { site } from "@/config/site";
import { featuredPhoto, viewSrc } from "@/data/gallery";
import type { Area, City } from "@/data/cities";
import { districts } from "@/data/cities";
import {
  popularSearchPhrases,
  wikiAreaModules,
  wikiCityModules,
  wikiCompareList,
  wikiServiceModules,
} from "@/data/encyclopedia";
import { steps } from "@/data/materials";
import type { Intent, Service } from "@/data/services";
import { serviceFamily, topicOverlap } from "./topics";
import { STATE, TEMPLATE_VERSION, type LinkItem, type PageDocument, type PageModule } from "./types";
import { jobs, type LocalJob } from "./jobs";
import {
  absoluteUrl,
  areaPath,
  cityPath,
  guideCityPath,
  guidePath,
  serviceAreaJobPath,
  serviceAreaPath,
  serviceCityPath,
  servicePath,
  statePath,
} from "./urls";

const west = {
  cable: "West Hyderabad towers want the view kept open. The cable is stainless steel, and the building rules are checked before anyone drills.",
  mesh: "Balconies along the IT corridor take hard afternoon sun and a long monsoon. The net has to stand up to that sun, and it needs a fixing all the way around, not only at the corners.",
  bird: "Pigeons sit on AC trays, sunshades and the gap beside a utility balcony. A net closes the space they enter. Spikes suit a narrow ledge. The visit says which one this opening needs.",
  utility: "Many balconies are also the laundry. A ceiling hanger is planned with the net or grill so they do not clash in the same corner.",
};
const north = {
  cable: "North Hyderabad flats are often compact. The cable has to clear shutters, an outdoor AC unit and a low builder railing. Spacing is set after measurement.",
  mesh: "Kukatpally, Miyapur and Nizampet blocks need a net that follows columns and pipes. A fall net and an insect net are different jobs.",
  bird: "Service ducts and the pocket beside an AC unit are the usual roost. Birds already inside leave before the last edge is closed.",
  utility: "Drying and fall protection are often asked for together. The rod and the net are planned on the same visit.",
};
const central = {
  cable: "Banjara Hills and Jubilee Hills homes often want the outlook kept open. Cable spacing follows the household, not one package for every balcony.",
  mesh: "Villas and older flats mix stairs, wide sit-outs and awkward corners. The net is planned around those turns, and west-facing openings need a net that can take the summer sun.",
  bird: "A ledge over a lane and a terrace parapet are different roosts. Spikes for a perch, a net for a space birds walk into. We do not use poison or gel.",
  utility: "A cloth hanger in a flat still has to clear the fan and the door. Stainless or aluminium rods are preferred once the rains sit on the metal.",
};
const secunderabad = {
  cable: "Secunderabad and the cantonment colonies have older plaster and mixed windows. The wall is checked before a fixing is chosen. The cable is stainless steel.",
  mesh: "Malkajgiri, ECIL and Sainikpuri apartments repeat a balcony shape, then break it with a pipe or a column. Each opening is still measured.",
  bird: "Older ledges and AC trays hold pigeons through the year. A net is for the balcony they enter. Spikes are for the sunshade they only sit on.",
  utility: "Ceiling hangers are aluminium or stainless steel. Ordinary iron marks clothes after the first wet spell.",
};
const east = {
  cable: "From Uppal to LB Nagar and Dilsukhnagar, the cable still has to let the shutter and any insect screen move. Society permission is part of the plan.",
  mesh: "Dense blocks mean side returns and utility corners. The net is pulled tight around the whole opening. Hooks are stainless because of the monsoon.",
  bird: "Pigeon dust on service balconies is a common east-side request. The space is closed after we see where the birds sit.",
  utility: "Balcony laundry is daily. The hanger and the safety line are measured together.",
};
const south = {
  cable: "South Hyderabad and the Old City often mean tighter lanes and older walls. How we reach the opening matters as much as the length of cable.",
  mesh: "Mehdipatnam, Attapur and Tolichowki balconies are rarely one clean rectangle. Corners, columns and a low railing are part of the measurement.",
  bird: "Close-built streets give pigeons a shelf with a roof. A net closes that space. Spikes stay off any ledge a child can reach.",
  utility: "Small balconies are the laundry and the sit-out. A ceiling hanger gives the floor back only if the ceiling height allows it.",
};
const orr = {
  cable: "Townships and villa plots in Kokapet, Kompally, Ghatkesar and Patancheru mix long balconies with open terraces. Each run is measured on its own.",
  mesh: "New terraces fail in the sun if the net is not made for it. Wind on an open edge is checked. We do not call a balcony net cyclone-proof.",
  bird: "A villa parapet and an apartment sunshade are different jobs. Spikes when birds only perch, a net when they walk in.",
  utility: "Terrace drying and a practice net are separate jobs. Overhead netting has to be made for the sun.",
};

const frames: Record<City["region"], Record<ReturnType<typeof serviceFamily>, string>> = {
  "West Hyderabad": west,
  "North Hyderabad": north,
  "Central Hyderabad": central,
  Secunderabad: secunderabad,
  "East Hyderabad": east,
  "South Hyderabad": south,
  "ORR and Outskirts": orr,
};

function hash(value: unknown) {
  return createHash("sha1").update(`${TEMPLATE_VERSION}:${JSON.stringify(value)}`).digest("hex").slice(0, 16);
}

function shot(seed: string, service?: string) {
  const photo = featuredPhoto(seed, service);
  return { image: viewSrc(photo.src), imageAlt: photo.alt };
}

function crumb(...items: LinkItem[]): LinkItem[] {
  return [{ href: "/", label: "Home" }, ...items];
}

function base(partial: Omit<PageDocument, "status" | "index" | "score" | "reasons" | "skeleton" | "keywordHits" | "canonical" | "ogTitle" | "ogDescription" | "jsonLd"> & { jsonLd?: PageDocument["jsonLd"] }): PageDocument {
  const canonical = absoluteUrl(partial.path);
  const document: PageDocument = {
    ...partial,
    canonical,
    ogTitle: partial.title,
    ogDescription: partial.description,
    jsonLd: partial.jsonLd ?? [],
    reasons: [],
    status: "publish",
    index: true,
    score: 0,
    skeleton: "",
    keywordHits: [],
  };
  document.jsonLd = structuredData(document);
  return document;
}

function structuredData(page: Pick<PageDocument, "path" | "title" | "description" | "breadcrumb" | "kind" | "h1">) {
  const canonical = absoluteUrl(page.path);
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: page.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href ?? page.path),
    })),
  };
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    description: page.description,
    url: canonical,
    provider: { "@type": "Organization", name: site.name },
    areaServed: page.kind === "service" || page.kind === "state" || page.kind === "guide"
      ? { "@type": "City", name: "Hyderabad" }
      : { "@type": "AdministrativeArea", name: "Hyderabad" },
  };
  return [crumbs, service];
}

function neighbors(city: City, regionCities: City[]) {
  const index = Math.max(0, regionCities.findIndex((item) => item.slug === city.slug));
  const links: LinkItem[] = [];
  for (let step = 1; links.length < 5 && step < regionCities.length; step += 1) {
    const next = regionCities[(index + step) % regionCities.length];
    links.push({ href: cityPath(next.slug), label: next.name });
  }
  return links;
}

export function composeService(service: Service, allCities: City[]): PageDocument {
  return base({
    id: `service:${service.slug}`,
    kind: "service",
    path: servicePath(service.slug),
    title: `${service.name} in Hyderabad`,
    description: `${service.summary} Measured across Hyderabad and Secunderabad, with cable or mesh grade named in a written quote.`,
    h1: `${service.name} in Hyderabad`,
    eyebrow: service.group,
    hero: service.lede,
    ...shot(`service:${service.slug}`, service.slug),
    breadcrumb: crumb({ href: "/services", label: "Services" }, { label: service.name }),
    params: { service: service.slug },
    quote: { service: service.name },
    inputHash: hash({ kind: "service", service: service.slug, lede: service.lede, v: 2 }),
    modules: [
      { type: "prose", paragraphs: [service.lede, "West Hyderabad towers, Secunderabad colonies, east-city apartments and ORR villas do not share one opening. Heat, monsoon damp and pigeon pressure change the mesh or the cable. The page for your locality carries that note. This page explains the system itself."] },
      ...wikiServiceModules(service),
      { type: "list", title: "What a proper fit changes", items: service.benefits },
      { type: "list", title: "Where it is used", items: service.where },
      { type: "list", title: "Materials we will name", items: service.materials },
      wikiCompareList(service),
      { type: "list", title: "What changes the quote", items: service.priceFactors },
      { type: "steps", title: "How the work runs", steps },
      { type: "list", title: "People also look for", items: popularSearchPhrases(service) },
      { type: "faqs", title: "Questions", items: service.faqs },
      {
        type: "links",
        title: `${service.name} across Hyderabad`,
        links: allCities.map((city) => ({ href: cityPath(city.slug), label: city.name })),
      },
      {
        type: "links",
        title: "Related briefs",
        links: service.intents.map((intent) => ({ href: guidePath(intent.slug), label: intent.title })),
      },
    ],
  });
}

export function composeState(cities: City[]): PageDocument {
  return base({
    id: "state:hyderabad",
    kind: "state",
    path: statePath(),
    title: "Safety Nets and Invisible Grills in Hyderabad",
    description: "Balcony safety nets, pigeon nets, invisible grills, children and pet nets, cloth hangers and sports nets across Hyderabad and Secunderabad. The written quote follows a site measurement.",
    h1: "Safety nets and invisible grills across Hyderabad",
    eyebrow: "Entire Hyderabad",
    hero: "Tirumala Safety Nets measures and fits balcony, window, duct and terrace systems across Hyderabad, Secunderabad and the ORR neighbourhoods. Open a locality to see the housing note and the areas we list.",
    ...shot("state:hyderabad", "invisible-grills"),
    breadcrumb: crumb({ href: "/locations", label: "Locations" }, { label: STATE.name }),
    params: { state: STATE.slug },
    quote: {},
    inputHash: hash({ kind: "state", cities: cities.map((city) => city.slug) }),
    modules: [
      {
        type: "prose",
        title: "Hyderabad as a service map",
        paragraphs: [
          "Hyderabad is one coverage area and several kinds of opening. West-side IT towers in Gachibowli, Kondapur and Madhapur are wide balconies with society facade rules. Kukatpally, Miyapur and the north are denser apartments with ducts. Secunderabad and Malkajgiri keep older plaster and cantonment-side colonies. The east — Uppal, LB Nagar, Dilsukhnagar — and the south — Mehdipatnam, Attapur, the Old City — change access and wall condition. ORR villas in Kokapet, Kompally, Ghatkesar and Shamshabad add terrace edges.",
          "Summer heat, monsoon damp and pigeon pressure on AC ledges show up in every zone. They do not produce one mesh for every balcony. A city page carries the local housing note. The visit confirms the opening.",
          "Categories follow use. Protection covers cable grills, balcony and children nets, pet and cat panels, stairs, terraces and building mesh. Bird control covers pigeon nets, spikes and ducts. Utility covers hangers, sports, cricket and insect screens.",
        ],
      },
      {
        type: "list",
        title: "Zones and the hub we schedule from",
        items: districts.map((district) => `${district.name} — via ${district.hub}`),
      },
      {
        type: "links",
        title: "City pages",
        links: cities.map((city) => ({ href: cityPath(city.slug), label: `${city.name}, ${city.region}` })),
      },
    ],
  });
}

export function composeCity(city: City, regionCities: City[], services: Service[]): PageDocument {
  return base({
    id: `city:${city.slug}`,
    kind: "city",
    path: cityPath(city.slug),
    title: `Invisible Grills and Safety Nets in ${city.name}`,
    description: `${city.climate} Free measurement in ${city.name}, ${city.district} district, with the material grade written in the quote.`,
    h1: `Invisible grills and safety nets in ${city.name}`,
    eyebrow: `${city.region} · ${city.district}`,
    hero: city.intro,
    ...shot(`city:${city.slug}`, "balcony-safety-nets"),
    breadcrumb: crumb(
      { href: "/locations", label: "Locations" },
      { href: statePath(), label: STATE.name },
      { label: city.name },
    ),
    params: { state: STATE.slug, city: city.slug },
    quote: { city: city.name },
    inputHash: hash({ kind: "city", city: city.slug, intro: city.intro, climate: city.climate }),
    modules: [
      { type: "prose", paragraphs: [city.intro, city.climate, `Most of the work is on ${city.housing}. ${city.visitNote}`] },
      ...wikiCityModules(city),
      { type: "note", title: "What the quote should name here", text: city.materialHint },
      {
        type: "links",
        title: `Services in ${city.name}`,
        links: services.map((service) => ({ href: servicePath(service.slug), label: service.name })),
      },
      city.areas.length
        ? { type: "links", title: `Neighbourhoods in ${city.name}`, links: city.areas.map((area) => ({ href: areaPath(city.slug, area.slug), label: area.name })) }
        : { type: "list", title: "Localities people ask about", items: city.localities },
      { type: "links", title: `Other towns in ${city.region}`, links: neighbors(city, regionCities) },
      {
        type: "faqs",
        title: "Local questions",
        items: [
          { q: `Do you visit ${city.name}?`, a: city.visitNote },
          { q: `What do you look at in ${city.name}?`, a: city.materialHint },
          { q: `Do you cover the rest of ${city.district} district?`, a: `${city.district} district is in scope. Towns beyond ${city.name} are confirmed against travel time before a day is locked.` },
        ],
      },
    ],
  });
}

export function composeArea(city: City, area: Area, linked: Service[]): PageDocument {
  return base({
    id: `area:${area.slug}`,
    kind: "area",
    path: areaPath(city.slug, area.slug),
    title: `Balcony Safety in ${area.name}, ${city.name}`,
    description: `${area.detail} Measurement for homes in ${area.name} is scheduled with ${city.name}.`,
    h1: `Balcony and window safety in ${area.name}`,
    eyebrow: city.name,
    hero: area.detail,
    ...shot(`area:${city.slug}:${area.slug}`, "invisible-grills"),
    breadcrumb: crumb(
      { href: statePath(), label: STATE.name },
      { href: cityPath(city.slug), label: city.name },
      { label: area.name },
    ),
    params: { state: STATE.slug, city: city.slug, area: area.slug },
    quote: { city: `${area.name}, ${city.name}` },
    inputHash: hash({ kind: "area", area: area.slug, detail: area.detail }),
    modules: [
      { type: "prose", paragraphs: [area.detail, city.climate, city.materialHint] },
      ...wikiAreaModules(city, area),
      { type: "note", title: "How this sits in the city visit", text: city.visitNote },
      {
        type: "links",
        title: `Services that fit ${area.name}`,
        links: linked
          .filter((service) => topicOverlap(service, `${area.detail} ${area.name}`))
          .slice(0, 6)
          .map((service) => ({ href: servicePath(service.slug), label: service.name })),
      },
      {
        type: "links",
        title: `Other neighbourhoods in ${city.name}`,
        links: city.areas.filter((item) => item.slug !== area.slug).map((item) => ({ href: areaPath(city.slug, item.slug), label: item.name })),
      },
    ],
  });
}

export function composeServiceCity(service: Service, city: City, regionCities: City[], related: Service[]): PageDocument {
  const family = serviceFamily(service);
  const localLead = frames[city.region][family];
  return base({
    id: `service-city:${service.slug}:${city.slug}`,
    kind: "service-city",
    path: serviceCityPath(service.slug, city.slug),
    title: `${service.name} in ${city.name}`,
    description: `${service.summary} In ${city.name}, ${city.climate.charAt(0).toLowerCase()}${city.climate.slice(1)} Book a free measurement.`,
    h1: `${service.name} in ${city.name}`,
    eyebrow: `${city.region} · ${city.district}`,
    hero: `${city.intro} ${service.summary}`,
    ...shot(`service-city:${service.slug}:${city.slug}`, service.slug),
    breadcrumb: crumb(
      { href: servicePath(service.slug), label: service.name },
      { href: cityPath(city.slug), label: city.name },
      { label: `${service.name} in ${city.name}` },
    ),
    params: { service: service.slug, state: STATE.slug, city: city.slug },
    quote: { service: service.name, city: city.name },
    inputHash: hash({ kind: "service-city", service: service.slug, city: city.slug, intro: city.intro, family }),
    modules: [
      { type: "prose", title: "The opening, in this city", paragraphs: [service.lede, localLead, `Housing we are asked to fit here: ${city.housing}. ${city.materialHint}`] },
      ...wikiServiceModules(service),
      { type: "prose", title: `Local housing in ${city.name}`, paragraphs: [city.intro, city.climate] },
      { type: "list", title: "Why people book this", items: service.problems },
      { type: "list", title: "What the installation is for", items: service.benefits },
      { type: "list", title: "Options named in the quote", items: [...service.materials, city.materialHint] },
      { type: "list", title: "Applications", items: service.where },
      {
        type: "steps",
        title: "Installation in practice",
        steps: steps.map((step, index) => index === 1 ? { ...step, text: city.visitNote } : step),
      },
      { type: "list", title: `Cost factors in ${city.name}`, items: service.priceFactors },
      { type: "note", title: "No statewide rate", text: `A single price for ${service.name} would ignore this opening. ${service.priceFactors[0]} is the usual first line. The figure is written after measurement.` },
      { type: "list", title: `Localities in and around ${city.name}`, items: city.localities },
      { type: "list", title: "Related searches", items: popularSearchPhrases(service, city) },
      {
        type: "faqs",
        title: "Questions",
        items: [
          { q: `Do you measure ${service.name.toLowerCase()} in ${city.name}?`, a: `${city.visitNote} ${service.name} is quoted only after that opening is seen.` },
          { q: `What should the specification say in ${city.name}?`, a: city.materialHint },
          ...service.faqs,
        ],
      },
      {
        type: "links",
        title: "Related services here",
        links: related.filter((item) => item.slug !== service.slug).slice(0, 12).map((item) => ({
          href: serviceCityPath(item.slug, city.slug),
          label: `${item.name} in ${city.name}`,
        })),
      },
      { type: "links", title: "Nearby city pages", links: neighbors(city, regionCities) },
      city.areas.length
        ? {
            type: "links",
            title: `${city.name} neighbourhoods`,
            links: city.areas.map((area) => ({ href: areaPath(city.slug, area.slug), label: area.name })),
          }
        : { type: "links", title: "City overview", links: [{ href: cityPath(city.slug), label: city.name }] },
    ],
  });
}

export function composeServiceArea(service: Service, city: City, area: Area): PageDocument {
  const family = serviceFamily(service);
  return base({
    id: `service-area:${service.slug}:${area.slug}`,
    kind: "service-area",
    path: serviceAreaPath(service.slug, city.slug, area.slug),
    title: `${service.name} in ${area.name}, ${city.name}`,
    description: `${area.detail} ${service.name} in ${area.name} is measured with the ${city.name} visit, not priced from a statewide chart.`,
    h1: `${service.name} in ${area.name}`,
    eyebrow: `${area.name} · ${city.name}`,
    hero: area.detail,
    ...shot(`service-area:${service.slug}:${city.slug}:${area.slug}`, service.slug),
    breadcrumb: crumb(
      { href: serviceCityPath(service.slug, city.slug), label: `${service.name} in ${city.name}` },
      { href: areaPath(city.slug, area.slug), label: area.name },
      { label: service.name },
    ),
    params: { service: service.slug, state: STATE.slug, city: city.slug, area: area.slug },
    quote: { service: service.name, city: `${area.name}, ${city.name}` },
    inputHash: hash({ kind: "service-area", service: service.slug, area: area.slug, detail: area.detail }),
    modules: [
      { type: "prose", paragraphs: [area.detail, frames[city.region][family], `${service.lede} In ${area.name} the city-level note still applies: ${city.materialHint}`] },
      ...wikiAreaModules(city, area, service),
      { type: "list", title: "Specification", items: service.materials },
      { type: "list", title: "Quote factors", items: service.priceFactors.slice(0, 4) },
      {
        type: "faqs",
        title: "Questions",
        items: [
          { q: `Can ${service.name.toLowerCase()} be fitted in ${area.name}?`, a: `${area.detail} ${city.visitNote}` },
          ...service.faqs.slice(0, 2),
        ],
      },
      {
        type: "links",
        title: "Parent pages",
        links: [
          { href: serviceCityPath(service.slug, city.slug), label: `${service.name} in ${city.name}` },
          { href: areaPath(city.slug, area.slug), label: area.name },
          { href: servicePath(service.slug), label: service.name },
        ],
      },
    ],
  });
}

export function composeServiceAreaJob(service: Service, city: City, area: Area, job: LocalJob): PageDocument {
  const family = serviceFamily(service);
  const nearby = city.areas.filter((item) => item.slug !== area.slug).slice(0, 6);
  return base({
    id: `service-area-job:${service.slug}:${area.slug}:${job.slug}`,
    kind: "service-area",
    path: serviceAreaJobPath(service.slug, city.slug, area.slug, job.slug),
    title: `${service.name} ${job.title} in ${area.name}, ${city.name}`,
    description: `${job.note} ${service.name} in ${area.name}, ${city.name}, is measured on site. ${city.materialHint}`,
    h1: `${service.name} ${job.title.toLowerCase()} in ${area.name}`,
    eyebrow: `${area.name} · ${city.name}`,
    hero: `${job.note} ${area.detail}`,
    ...shot(`job:${service.slug}:${city.slug}:${area.slug}:${job.slug}`, service.slug),
    breadcrumb: crumb(
      { href: serviceAreaPath(service.slug, city.slug, area.slug), label: `${service.name} in ${area.name}` },
      { label: job.title },
    ),
    params: { service: service.slug, state: STATE.slug, city: city.slug, area: area.slug },
    quote: { service: service.name, city: `${area.name}, ${city.name}` },
    inputHash: hash({ kind: "service-area-job", service: service.slug, area: area.slug, job: job.slug, detail: area.detail }),
    modules: [
      {
        type: "prose",
        title: `${job.title} for this opening`,
        paragraphs: [
          job.note,
          service.lede,
          area.detail,
          frames[city.region][family],
          `${city.name} housing is ${city.housing}. ${city.materialHint} ${city.visitNote}`,
          `The written quote for ${service.name} names the grade, the fixing surface and the access time. ${service.priceFactors[0] ?? "Measured size"} is the usual first line, and it is confirmed on this opening rather than copied from another street.`,
        ],
      },
      { type: "list", title: "What the specification should name", items: service.materials },
      { type: "list", title: "What changes the figure", items: service.priceFactors },
      { type: "list", title: "Where this system is used", items: service.where },
      {
        type: "faqs",
        title: "Questions",
        items: [
          { q: `Do you take ${service.name.toLowerCase()} ${job.title.toLowerCase()} in ${area.name}?`, a: `${city.visitNote} ${job.note}` },
          { q: `What should I send before the visit?`, a: `Send ${area.name}, the floor, one wide photo of the opening and closer photos of the top and side fixing edges. ${service.faqs[0]?.a ?? "The quote follows the measurement."}` },
          ...service.faqs.slice(0, 2),
        ],
      },
      {
        type: "links",
        title: "Same opening, other notes",
        links: jobs
          .filter((item) => item.slug !== job.slug)
          .slice(0, 6)
          .map((item) => ({
            href: serviceAreaJobPath(service.slug, city.slug, area.slug, item.slug),
            label: `${service.name} ${item.title} in ${area.name}`,
          })),
      },
      {
        type: "links",
        title: `Nearby streets in ${city.name}`,
        links: nearby.map((item) => ({
          href: serviceAreaJobPath(service.slug, city.slug, item.slug, job.slug),
          label: `${service.name} in ${item.name}`,
        })),
      },
      {
        type: "links",
        title: "Parent pages",
        links: [
          { href: serviceAreaPath(service.slug, city.slug, area.slug), label: `${service.name} in ${area.name}` },
          { href: cityPath(city.slug), label: city.name },
          { href: servicePath(service.slug), label: `${service.name} in Hyderabad` },
        ],
      },
    ],
  });
}

export function composeIntent(service: Service, intent: Intent): PageDocument {
  return base({
    id: `guide:${intent.slug}`,
    kind: "guide",
    path: guidePath(intent.slug),
    title: intent.title,
    description: `${intent.angle} Part of ${service.name.toLowerCase()} work across Hyderabad. The locality page carries the local material note.`,
    h1: intent.title,
    eyebrow: service.name,
    hero: intent.angle,
    ...shot(`guide:${intent.slug}`, service.slug),
    breadcrumb: crumb({ href: servicePath(service.slug), label: service.name }, { label: intent.title }),
    params: { service: service.slug, guide: intent.slug },
    quote: { service: service.name },
    inputHash: hash({ kind: "guide", slug: intent.slug, angle: intent.angle }),
    modules: [
      { type: "prose", paragraphs: [intent.angle, service.lede] },
      ...wikiServiceModules(service),
      { type: "list", title: "What changes for this brief", items: service.benefits },
      { type: "list", title: "Typical openings", items: service.where },
      { type: "faqs", title: "Questions", items: service.faqs },
      { type: "links", title: "The full service", links: [{ href: servicePath(service.slug), label: `${service.name} in Hyderabad` }] },
    ],
  });
}

export function composeIntentCity(service: Service, intent: Intent, city: City): PageDocument {
  const family = serviceFamily(service);
  return base({
    id: `guide-city:${intent.slug}:${city.slug}`,
    kind: "guide-city",
    path: guideCityPath(intent.slug, city.slug),
    title: `${intent.title} in ${city.name}`,
    description: `${intent.angle} In ${city.name}, ${city.climate.charAt(0).toLowerCase()}${city.climate.slice(1)} Book a free measurement.`,
    h1: `${intent.title} in ${city.name}`,
    eyebrow: `${service.name} · ${city.name}`,
    hero: `${intent.angle} ${city.intro}`,
    ...shot(`guide-city:${intent.slug}:${city.slug}`, service.slug),
    breadcrumb: crumb(
      { href: servicePath(service.slug), label: service.name },
      { href: guidePath(intent.slug), label: intent.title },
      { href: cityPath(city.slug), label: city.name },
      { label: `${intent.title} in ${city.name}` },
    ),
    params: { service: service.slug, city: city.slug, guide: intent.slug },
    quote: { service: service.name, city: city.name },
    inputHash: hash({ kind: "guide-city", slug: intent.slug, city: city.slug, angle: intent.angle, climate: city.climate }),
    modules: [
      { type: "prose", title: `This brief in ${city.name}`, paragraphs: [intent.angle, frames[city.region][family], `Housing we are asked to fit: ${city.housing}. ${city.materialHint}`] },
      { type: "prose", paragraphs: [city.intro, city.climate] },
      ...wikiServiceModules(service),
      { type: "list", title: "What this use-case changes", items: service.benefits },
      { type: "list", title: "Typical openings", items: service.where },
      { type: "note", title: "How the visit is scheduled", text: city.visitNote },
      {
        type: "faqs",
        title: "Questions",
        items: [
          { q: `Do you fit ${intent.title.toLowerCase()} in ${city.name}?`, a: `${city.visitNote} The brief is confirmed on site against the opening, not against a statewide package.` },
          { q: `What should the specification say here?`, a: city.materialHint },
          ...service.faqs.slice(0, 2),
        ],
      },
      {
        type: "links",
        title: "Related pages",
        links: [
          { href: serviceCityPath(service.slug, city.slug), label: `${service.name} in ${city.name}` },
          { href: guidePath(intent.slug), label: intent.title },
          { href: cityPath(city.slug), label: city.name },
        ],
      },
    ],
  });
}

export function composePrice(guide: { slug: string; title: string; intro: string }, service: Service): PageDocument {
  return base({
    id: `guide:${guide.slug}`,
    kind: "guide",
    path: guidePath(guide.slug),
    title: guide.title,
    description: guide.intro.slice(0, 155),
    h1: guide.title,
    eyebrow: "Pricing",
    hero: guide.intro,
    ...shot(`price:${guide.slug}`, service.slug),
    breadcrumb: crumb({ href: servicePath(service.slug), label: service.name }, { label: "Price" }),
    params: { service: service.slug, guide: guide.slug },
    quote: { service: service.name },
    inputHash: hash({ kind: "price", slug: guide.slug, intro: guide.intro }),
    modules: [
      { type: "prose", paragraphs: [guide.intro, "We do not print a rupee rate for the state. Height, substrate, grade and access move the number. After the visit you get a written figure for material, fittings and labour."] },
      { type: "list", title: "Factors that move the price", items: service.priceFactors },
      { type: "links", title: "Service details", links: [{ href: servicePath(service.slug), label: service.name }] },
    ],
  });
}
