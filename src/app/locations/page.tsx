import type { Metadata } from "next";
import { absoluteUrl } from "@/seo/urls";
import { InstallationGallery } from "@/components/InstallationGallery";
import { DistrictList } from "@/components/Articles";
import { cities, citiesIn, regions } from "@/data/cities";
import { galleryCards, heroImage } from "@/data/gallery";
import { CardLink, GoldLink, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Safety nets and invisible grills across Hyderabad",
  description:
    "Locality-by-locality measurement for safety nets, invisible grills, pigeon nets and cloth hangers across Hyderabad and Secunderabad.",
  alternates: { canonical: absoluteUrl("/locations") },
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Entire Hyderabad"
        title="Areas we measure"
        highlight="every zone of the city"
        text="West, north, central, Secunderabad, east, south and the ORR. Open a locality for the housing note and the neighbourhoods listed around it."
        image={heroImage("locations-index", "balcony-safety-nets")}
        crumbs={[{ href: "/", label: "Home" }, { label: "Locations" }]}
        actions={<GoldLink href="/locations/hyderabad">Open the Hyderabad page</GoldLink>}
      />
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-6">
        {regions.map((region) => (
          <section key={region}>
            <h2 className="font-display text-2xl font-bold">{region}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-brand-800/75">
              Neighbourhoods in {region}. Each page lists the services, the local note, and the streets we publish.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {citiesIn(region).map((city) => (
                <CardLink key={city.slug} href={`/locations/hyderabad/${city.slug}`} title={city.name} text={city.intro} />
              ))}
            </div>
          </section>
        ))}
        <section>
          <h2 className="font-display text-2xl font-bold">Hyderabad zones</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-brand-800/75">
            {cities.length} localities have their own page. The zone list is the coverage map: name the area and we confirm the visit.
          </p>
          <div className="mt-4">
            <DistrictList />
          </div>
        </section>
      </div>
      <InstallationGallery photos={galleryCards("locations-index", 12)} compact title="The openings we see in these neighbourhoods" text="Tower balconies, older colonies and villa terraces. The photographs show the work." />
    </>
  );
}
