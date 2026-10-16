import { cities, citiesIn, regions } from "@/data/cities";
import { searchOptions } from "@/data/search-options";
import { serviceGroups, services } from "@/data/services";
import { coverage } from "@/data/stats";
import { popularLinks } from "@/lib/pages";
import { Header } from "./Header";

const hubSlugs = ["gachibowli", "kukatpally", "banjara-hills", "secunderabad", "lb-nagar", "mehdipatnam"];

export function SiteChrome() {
  const groups = serviceGroups.map((name) => ({
    name,
    items: services.filter((service) => service.group === name).map((service) => ({ href: `/services/${service.slug}`, label: service.name })),
  }));
  const regionNav = regions.map((region) => ({
    name: region,
    cities: citiesIn(region).map((city) => ({ href: `/locations/hyderabad/${city.slug}`, label: city.name })),
  }));
  const hubs = hubSlugs.flatMap((slug) => {
    const city = cities.find((item) => item.slug === slug);
    if (!city) return [];
    return [
      {
        href: `/locations/hyderabad/${city.slug}`,
        label: city.name,
        areas: city.areas.slice(0, 4).map((area) => ({
          href: `/locations/hyderabad/${city.slug}/${area.slug}`,
          label: area.name,
        })),
      },
    ];
  });

  return (
    <>
      <Header
        topLine={`Safety nets across Hyderabad | ${coverage.cities} localities | ${coverage.areas} neighbourhoods`}
        groups={groups}
        regions={regionNav}
        hubs={hubs}
        popular={popularLinks.slice(0, 8)}
        search={searchOptions()}
      />
    </>
  );
}
