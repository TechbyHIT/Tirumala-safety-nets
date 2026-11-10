import { site } from "@/config/site";
import { STATE } from "./types";

export const serviceAliases: Record<string, string> = {
  "children-safety-nets": "child-safety-nets",
  "pigeon-nets": "pigeon-safety-nets",
  "bird-nets": "bird-protection-nets",
  "anti-bird-spikes": "bird-spikes",
  "duct-area-nets": "duct-area-safety-nets",
  "cricket-nets": "cricket-practice-nets",
};

export function servicePath(service: string) {
  return `/services/${serviceAliases[service] ?? service}`;
}

export function statePath() {
  return `/locations/${STATE.slug}`;
}

export function cityPath(city: string) {
  return `/locations/${STATE.slug}/${city}`;
}

export function areaPath(city: string, area: string) {
  return `/locations/${STATE.slug}/${city}/${area}`;
}

export function serviceCityPath(service: string, city: string) {
  return `/services/${service}/${city}`;
}

export function serviceAreaPath(service: string, city: string, area: string) {
  return `/services/${service}/${city}/${area}`;
}

export function serviceAreaJobPath(service: string, city: string, area: string, job: string) {
  return `/services/${service}/${city}/${area}/${job}`;
}

export function guidePath(slug: string) {
  return `/guides/${slug}`;
}

export function guideCityPath(slug: string, city: string) {
  return `/guides/${slug}/${city}`;
}

export function absoluteUrl(path: string) {
  return `${site.url.replace(/\/$/, "")}${path}`;
}
