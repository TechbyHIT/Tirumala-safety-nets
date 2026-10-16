import { cities } from "../src/data/cities";
import { services } from "../src/data/services";
import { indexPolicy } from "../src/seo/eligibility";
import { matrixLength } from "../src/seo/matrix";
import { urlsFor } from "../src/seo/sitemaps";
import { serviceAreaJobPath, serviceAreaPath, serviceCityPath } from "../src/seo/urls";

const failures: string[] = [];

function check(name: string, ok: boolean, detail: string) {
  if (!ok) failures.push(`${name}: ${detail}`);
  else console.log(`ok ${name}`);
}

const areaRefs = cities.flatMap((city) => city.areas.map((area) => ({ city: city.slug, area: area.slug, name: area.name })));
const slugKeys = areaRefs.map((item) => `${item.city}/${item.area}`);
const duplicateSlugs = slugKeys.length - new Set(slugKeys).size;

const groups = ["core", "services", "locations"] as const;
const seen = new Set<string>();
let overlap = 0;
const counts: Record<string, number> = {};
for (const group of groups) {
  const paths = urlsFor(group);
  counts[group] = paths.length;
  check(`${group} under 50000`, paths.length <= 50_000, String(paths.length));
  check(`${group} non-empty`, paths.length > 0, "empty");
  for (const path of paths) {
    if (seen.has(path)) overlap += 1;
    seen.add(path);
    if (indexPolicy(path) !== "index") failures.push(`${group} lists a noindex path: ${path}`);
    if (path.split("/").length > 5) failures.push(`${group} lists a deep variant: ${path}`);
  }
}

const sampleCity = cities[0];
const sampleArea = sampleCity?.areas[0];
const sampleService = services[0];
if (sampleCity && sampleArea && sampleService) {
  const jobPath = serviceAreaJobPath(sampleService.slug, sampleCity.slug, sampleArea.slug, "installation");
  const areaServicePath = serviceAreaPath(sampleService.slug, sampleCity.slug, sampleArea.slug);
  const cityServicePath = serviceCityPath(sampleService.slug, sampleCity.slug);
  check("combo urls stay out of the sitemap", !seen.has(cityServicePath) && !seen.has(areaServicePath) && !seen.has(jobPath), cityServicePath);
}

console.log(
  JSON.stringify(
    {
      brand: "Tirumala Safety Nets",
      localities: cities.length,
      neighbourhoods: areaRefs.length,
      services: services.length,
      duplicateNeighbourhoodSlugsWithinCity: duplicateSlugs,
      excludedIntentVariants: matrixLength(),
      sitemapUrls: seen.size,
      bySitemap: counts,
      verification: "Neighbourhood names are candidate records. Coordinates, postal codes, and source URLs are not stored, so they are not reported as officially verified.",
    },
    null,
    2,
  ),
);

check("sitemap groups do not repeat URLs", overlap === 0, String(overlap));
check("at least 350 neighbourhood records", areaRefs.length >= 350, String(areaRefs.length));
check("unique neighbourhood slugs inside each locality", duplicateSlugs === 0, String(duplicateSlugs));

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
