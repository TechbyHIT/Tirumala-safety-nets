import { priceGuides } from "@/data/materials";
import { getArea, getCity } from "@/data/cities";
import { getIntent, getService } from "@/data/services";
import { parseCombo } from "@/lib/pages";
import { areaPath, cityPath, guidePath, servicePath } from "./urls";

export function legacyRedirect(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path.startsWith("/locations/andhra-pradesh")) {
    return path.replace("/locations/andhra-pradesh", "/locations/hyderabad");
  }

  const serviceCombo = path.match(/^\/services\/([^/]+)\/([^/]+)(?:\/([^/]+))?(?:\/([^/]+))?$/);
  if (serviceCombo && serviceCombo[1] !== "library") {
    const city = getCity(serviceCombo[2] ?? "");
    if (!city) return null;
    const area = serviceCombo[3] ? city.areas.find((item) => item.slug === serviceCombo[3]) : undefined;
    return area ? areaPath(city.slug, area.slug) : cityPath(city.slug);
  }

  const guideCity = path.match(/^\/guides\/([^/]+)\/([^/]+)$/);
  if (guideCity && getCity(guideCity[2] ?? "")) return guidePath(guideCity[1] ?? "");

  if (path === "/" || path.startsWith("/services") || path.startsWith("/guides") || path.startsWith("/blog") || path.startsWith("/locations/hyderabad")) {
    return null;
  }

  const areaMatch = path.match(/^\/areas\/([^/]+)$/);
  if (areaMatch) {
    const found = getArea(areaMatch[1]);
    return found ? areaPath(found.city.slug, found.area.slug) : null;
  }

  const cityMatch = path.match(/^\/locations\/([^/]+)$/);
  if (cityMatch && getCity(cityMatch[1])) return cityPath(cityMatch[1]);

  const service = getService(path.slice(1));
  if (service) return servicePath(service.slug);

  const intent = getIntent(path.slice(1));
  if (intent) return guidePath(intent.intent.slug);

  const price = priceGuides.find((guide) => `/${guide.slug}` === path);
  if (price) return guidePath(price.slug);

  const combo = parseCombo(path.slice(1));
  if (combo) return cityPath(combo.city.slug);

  return null;
}
