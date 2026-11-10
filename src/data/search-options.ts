import { cities } from "./cities";
import { services } from "./services";
import { servicePath } from "@/seo/urls";
import type { SearchOption } from "@/components/HeroSearch";

export function searchOptions(): SearchOption[] {
  return [
    ...services.map((service) => ({ label: service.name, href: servicePath(service.slug), kind: "Service" })),
    ...cities.map((city) => ({
      label: city.district === city.name ? city.name : `${city.name}, ${city.district}`,
      href: `/locations/hyderabad/${city.slug}`,
      kind: "City",
    })),
  ];
}
