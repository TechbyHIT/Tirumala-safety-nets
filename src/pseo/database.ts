import hierarchy from "../../data/pseo/hyderabad-hierarchy.json";
import postal from "../../data/pseo/postal-localities.json";
import serviceRows from "../../data/pseo/services.json";
import type { Circle, Locality, LocationSource, PostOffice, ProgrammaticService, Ward, Zone } from "./types";

type PostalRow = {
  name: string;
  slug: string;
  pinCodes: string[];
  postOffices: PostOffice[];
  postalDistrict: string;
  matchesWard: boolean;
  jurisdiction?: string;
  aliases?: string[];
};

export const states = hierarchy.states;
export const districts = hierarchy.districts;
export const zones = hierarchy.zones as Zone[];
export const circles = hierarchy.circles as Circle[];
export const wards = hierarchy.wards as Ward[];
export const colonies = hierarchy.colonies;
export const apartments = hierarchy.apartments;
export const services = serviceRows as ProgrammaticService[];

const postalRows = postal.localities as PostalRow[];
const postalSource = postal.source as LocationSource;

export const locationSources: LocationSource[] = [
  ...(hierarchy.locationSources as LocationSource[]),
  ...(postalRows.length ? [postalSource] : []),
];

const postalBySlug = new Map(postalRows.map((row) => [row.slug, row]));

const wardLocalities: Locality[] = (hierarchy.localities as Omit<Locality, "kind" | "postOffices">[]).map((row) => {
  const match = postalBySlug.get(row.slug);
  return {
    ...row,
    kind: "ghmc-ward",
    pinCodes: match ? match.pinCodes : [],
    postOffices: match ? match.postOffices : [],
    aliases: match?.aliases ?? [],
  };
});

const wardSlugs = new Set(wardLocalities.map((row) => row.slug));

const postOfficeLocalities: Locality[] = postalRows
  .filter((row) => !wardSlugs.has(row.slug))
  .map((row) => ({
    id: `postal-${row.slug}`,
    name: row.name,
    slug: row.slug,
    kind: "post-office",
    postalDistrict: row.postalDistrict,
    pinCodes: row.pinCodes,
    postOffices: row.postOffices,
    sourceId: postalSource.id,
    verified: true,
    jurisdiction: row.jurisdiction,
    aliases: row.aliases ?? [],
  }));

export const localities: Locality[] = [...wardLocalities, ...postOfficeLocalities];

export const zoneById = new Map(zones.map((row) => [row.id, row]));
export const circleById = new Map(circles.map((row) => [row.id, row]));
export const wardById = new Map(wards.map((row) => [row.id, row]));
export const localityById = new Map(localities.map((row) => [row.id, row]));
export const localityBySlug = new Map(localities.map((row) => [row.slug, row]));
export const serviceById = new Map(services.map((row) => [row.id, row]));

export const pinCodes = [...new Set(localities.flatMap((row) => row.pinCodes))].sort();

export function localitiesForPin(pin: string) {
  return localities.filter((row) => row.pinCodes.includes(pin));
}

export function nearbyLocalities(locality: Locality, limit = 6) {
  if (locality.circleId) {
    return localities.filter((row) => row.circleId === locality.circleId && row.id !== locality.id).slice(0, limit);
  }
  const prefixes = new Set(locality.pinCodes.map((pin) => pin.slice(0, 5)));
  const division = locality.postOffices[0]?.division;
  return localities
    .filter((row) => row.id !== locality.id && (row.pinCodes.some((pin) => prefixes.has(pin.slice(0, 5))) || row.postOffices[0]?.division === division))
    .slice(0, limit);
}

export const databaseCounts = {
  states: states.length,
  districts: districts.length,
  zones: zones.length,
  circles: circles.length,
  wards: wards.length,
  wardLocalities: wardLocalities.length,
  postOfficeLocalities: postOfficeLocalities.length,
  localities: localities.length,
  pinCodes: pinCodes.length,
  colonies: colonies.length,
  apartments: apartments.length,
  services: services.length,
  locationSources: locationSources.length,
};

if (zones.length !== 12 || circles.length !== 60 || wards.length !== 300) {
  throw new Error(`Invalid GHMC hierarchy: expected 12 zones, 60 circles and 300 wards; received ${zones.length}, ${circles.length}, ${wards.length}`);
}

if (services.length !== 17) {
  throw new Error(`Invalid service database: expected 17 services; received ${services.length}`);
}

if (new Set(localities.map((row) => row.slug)).size !== localities.length) {
  throw new Error("Locality slugs must be unique");
}
