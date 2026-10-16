import { priceGuides } from "@/data/materials";
import { cities, getCity } from "@/data/cities";
import { getIntent, getService, services } from "@/data/services";

export function comboSlug(serviceSlug: string, citySlug: string) {
  return `${serviceSlug}-in-${citySlug}`;
}

export function parseCombo(slug: string) {
  const ordered = [...cities].sort((a, b) => b.slug.length - a.slug.length);
  const city = ordered.find((item) => slug.endsWith(`-in-${item.slug}`));
  if (!city) return undefined;
  const serviceSlug = slug.slice(0, -(city.slug.length + 4));
  const service = getService(serviceSlug);
  if (!service) return undefined;
  return { service, city };
}

export function allFlatSlugs() {
  const slugs = [
    ...services.map((service) => service.slug),
    ...services.flatMap((service) => service.intents.map((intent) => intent.slug)),
    ...priceGuides.map((guide) => guide.slug),
    ...services.flatMap((service) => cities.map((city) => comboSlug(service.slug, city.slug))),
  ];
  return slugs;
}

export function resolveFlat(slug: string) {
  const service = getService(slug);
  if (service) return { kind: "service" as const, service };
  const intent = getIntent(slug);
  if (intent) return { kind: "intent" as const, ...intent };
  const guide = priceGuides.find((item) => item.slug === slug);
  if (guide) return { kind: "price" as const, guide, service: getService(guide.service)! };
  const combo = parseCombo(slug);
  if (combo) return { kind: "combo" as const, ...combo };
  return undefined;
}

export function cityHref(slug: string) {
  return `/locations/hyderabad/${slug}`;
}

export function serviceHref(slug: string) {
  return `/services/${slug}`;
}

export const popularLinks = [
  { href: "/locations/hyderabad/gachibowli", label: "Gachibowli" },
  { href: "/locations/hyderabad/kondapur", label: "Kondapur" },
  { href: "/locations/hyderabad/kukatpally", label: "Kukatpally" },
  { href: "/locations/hyderabad/banjara-hills", label: "Banjara Hills" },
  { href: "/locations/hyderabad/secunderabad", label: "Secunderabad" },
  { href: "/locations/hyderabad/miyapur", label: "Miyapur" },
  { href: "/locations/hyderabad/uppal", label: "Uppal" },
  { href: "/locations/hyderabad/lb-nagar", label: "LB Nagar" },
  { href: "/locations/hyderabad/jubilee-hills", label: "Jubilee Hills" },
  { href: "/locations/hyderabad/kokapet", label: "Kokapet" },
  { href: "/locations/hyderabad/madhapur", label: "Madhapur" },
  { href: "/locations/hyderabad/dilsukhnagar", label: "Dilsukhnagar" },
  { href: "/locations/hyderabad/manikonda", label: "Manikonda" },
  { href: "/locations/hyderabad/nizampet", label: "Nizampet" },
  { href: "/locations/hyderabad/hitech-city", label: "Hitech City" },
  { href: "/locations/hyderabad/mehdipatnam", label: "Mehdipatnam" },
  { href: "/locations/hyderabad/kompally", label: "Kompally" },
  { href: "/locations/hyderabad/sainikpuri", label: "Sainikpuri" },
  { href: "/locations/hyderabad/attapur", label: "Attapur" },
];

export function relatedCombos(_serviceSlug: string, take = 8) {
  return cities.slice(0, take).map((city) => ({
    href: `/locations/hyderabad/${city.slug}`,
    label: city.name,
  }));
}

export function hubCities() {
  return ["gachibowli", "kondapur", "kukatpally", "banjara-hills", "secunderabad", "uppal", "lb-nagar", "mehdipatnam"]
    .map((slug) => getCity(slug)!)
    .filter(Boolean);
}
