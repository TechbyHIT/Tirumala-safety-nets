import { cities } from "./cities";
import { services } from "./services";
import type { SearchOption } from "@/components/HeroSearch";

export function searchOptions(): SearchOption[] {
  return [
    ...services.map((service) => ({ label: service.name, href: `/services/${service.slug}`, kind: "Service" })),
    ...cities.map((city) => ({
      label: city.district === city.name ? city.name : `${city.name}, ${city.district}`,
      href: `/locations/hyderabad/${city.slug}`,
      kind: "City",
    })),
  ];
}
