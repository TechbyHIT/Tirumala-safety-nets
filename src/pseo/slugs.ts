import { localityBySlug, services } from "./database";

const serviceIds = [...services.map((service) => service.id)].sort((a, b) => b.length - a.length);

export function isProgrammaticSlug(slug: string) {
  const at = slug.lastIndexOf("-in-");
  if (at < 0) return false;
  const service = slug.slice(0, at);
  const locality = slug.slice(at + 4);
  if (!localityBySlug.has(locality)) {
    const inner = slug.indexOf("-in-");
    if (inner < 0 || !localityBySlug.has(slug.slice(inner + 4))) return false;
    return serviceIds.some((id) => slug.startsWith(`${id}-`));
  }
  return serviceIds.some((id) => service === id || service.startsWith(`${id}-`));
}
