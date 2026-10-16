import { site } from "@/config/site";
import { STATE } from "./types";

export function servicePath(service: string) {
  return `/services/${service}`;
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
