import fs from "node:fs";
import path from "node:path";
import hierarchy from "../data/pseo/hyderabad-hierarchy.json";
import { circles, localities, locationSources, pinCodes, services, wards, zones } from "../src/pseo/database";
import { seoPageRecords } from "../src/pseo/generator";
import { circlePath, pinPath, wardPath, zonePath } from "../src/pseo/paths";
import { statePath } from "../src/seo/urls";

const outDir = path.join(process.cwd(), "data", "pseo", "export");
fs.mkdirSync(outDir, { recursive: true });

const sourceById = new Map(locationSources.map((source) => [source.id, source]));

function sourceOf(id: string) {
  const source = sourceById.get(id);
  return source ? { id: source.id, publisher: source.publisher, title: source.title, url: source.url, issuedAt: source.issuedAt, accessedAt: source.accessedAt } : { id };
}

function csvCell(value: string | number | boolean | undefined) {
  const text = value === undefined ? "" : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

const zoneRows = zones.map((zone) => ({
  id: zone.id,
  name: zone.name,
  parentId: "hyderabad",
  path: zonePath(zone.id),
  jurisdiction: "GHMC",
  verification_status: "verified",
  source: sourceOf(zone.sourceId),
}));

const circleRows = circles.map((circle) => ({
  id: circle.id,
  number: circle.number,
  name: circle.name,
  zoneId: circle.zoneId,
  path: circlePath(circle.id),
  jurisdiction: "GHMC",
  verification_status: "verified",
  source: sourceOf(circle.sourceId),
}));

const wardRows = wards.map((ward) => ({
  id: ward.id,
  number: ward.number,
  name: ward.name,
  circleId: ward.circleId,
  zoneId: ward.zoneId,
  path: wardPath(ward.id),
  jurisdiction: "GHMC",
  verification_status: "verified",
  source: sourceOf(ward.sourceId),
}));

const locationRows = localities.map((locality) => {
  const ward = locality.wardId ? wards.find((row) => row.id === locality.wardId) : undefined;
  const circle = locality.circleId ? circles.find((row) => row.id === locality.circleId) : undefined;
  const zone = locality.zoneId ? zones.find((row) => row.id === locality.zoneId) : undefined;
  const outside = locality.jurisdiction?.includes("outside GHMC") ?? false;
  return {
    id: locality.id,
    state: "Telangana",
    city: "Hyderabad",
    name: locality.name,
    slug: locality.slug,
    kind: locality.kind,
    zone: zone?.name ?? "",
    zoneId: zone?.id ?? "",
    circle: circle?.name ?? "",
    circleId: circle?.id ?? "",
    ward: ward?.name ?? "",
    wardNumber: ward?.number ?? "",
    wardId: ward?.id ?? "",
    pinCodes: locality.pinCodes,
    jurisdiction: outside ? locality.jurisdiction : locality.kind === "ghmc-ward" ? "GHMC" : "Hyderabad postal locality; GHMC ward not stated by the source",
    aliases: locality.aliases ?? [],
    directoryPath: locality.kind === "ghmc-ward" && ward ? wardPath(ward.id) : locality.pinCodes[0] ? pinPath(locality.pinCodes[0]) : statePath(),
    primaryServicePath: `/invisible-grills-in-${locality.slug}`,
    verification_status: "verified",
    source: sourceOf(locality.sourceId),
  };
});

const colonyRows = localities
  .filter((locality) => /\bcolony\b/i.test(locality.name))
  .map((locality) => ({
    id: `colony-${locality.slug}`,
    name: locality.name,
    localityId: locality.id,
    wardId: locality.wardId ?? null,
    pinCodes: locality.pinCodes,
    verification_status: "verified-as-post-office-name",
    note: "The name comes from an India Post office. No GHMC colony-to-ward map was published for the 2025 wards, so this is not an extra page and is not attached to a ward unless the office name already matches that ward.",
    source: sourceOf(locality.sourceId),
  }));

const surrounding = locationRows.filter((row) => String(row.jurisdiction).includes("outside GHMC"));

const mandalNames = new Map<string, string[]>();
for (const locality of localities) {
  if (!locality.jurisdiction?.includes("outside GHMC")) continue;
  const taluk = locality.postOffices[0]?.taluk;
  if (!taluk || /^(rangareddy|hyd|na)$/i.test(taluk)) continue;
  const list = mandalNames.get(taluk) ?? [];
  list.push(locality.id);
  mandalNames.set(taluk, list);
}

const records = seoPageRecords();
const combinations = records.map((record) => ({
  id: record.id,
  path: record.path,
  serviceId: record.serviceId,
  localityId: record.localityId,
  intent: record.profile.searchIntent,
  profileId: record.profile.id,
  indexEligible: record.indexEligible,
  canonicalPath: record.primaryPath,
  consolidation: record.consolidation ?? null,
}));

const notInIndiaPostExtract = [
  "Bhongir",
  "Bibinagar",
  "Shadnagar",
  "Kothur",
  "Maheshwaram",
  "Tukkuguda",
  "Annojiguda",
  "Tondapally",
  "Financial District",
  "Raidurg",
  "Khajaguda",
  "Madinaguda",
  "Marredpally",
  "Paradise",
  "Patny",
  "Punjagutta",
  "Abids",
  "Charminar",
  "Ramanthapur",
  "Ferozguda",
  "Sun City",
  "Osman Sagar",
];

const summary = {
  generatedAt: new Date().toISOString(),
  locations: locationRows.length,
  ghmcWardLocalities: locationRows.filter((row) => row.kind === "ghmc-ward").length,
  postOfficeLocalities: locationRows.filter((row) => row.kind === "post-office").length,
  surroundingOutsideGhmc: surrounding.length,
  zones: zoneRows.length,
  circles: circleRows.length,
  wards: wardRows.length,
  coloniesNamedByIndiaPost: colonyRows.length,
  apartments: 0,
  municipalitiesAsserted: 0,
  mandalsFromPostalTaluk: mandalNames.size,
  pinCodes: pinCodes.length,
  services: services.length,
  serviceLocationRecords: combinations.length,
  indexEligibleCombinations: combinations.filter((row) => row.indexEligible).length,
  canonicalConsolidations: combinations.filter((row) => row.consolidation).length,
  notInIndiaPostExtract,
  apartmentGap: "No official source in this project publishes apartment or gated-community names tied to the 2025 GHMC wards. None were invented.",
  municipalityGap: "India Post verifies the town and PIN. It does not certify municipal status, so municipalities.json does not label these towns as municipalities.",
  mandalGap: "Only postal taluk values that name a specific mandal on an outside-GHMC office are listed. District labels such as Rangareddy and Hyd are not treated as mandals. This is not a Local Government Directory extract.",
};

fs.writeFileSync(path.join(outDir, "ghmc-zones.json"), JSON.stringify({ source: sourceOf("go-ms-292-2025"), zones: zoneRows }, null, 2));
fs.writeFileSync(path.join(outDir, "ghmc-circles.json"), JSON.stringify({ source: sourceOf("go-ms-292-2025"), circles: circleRows }, null, 2));
fs.writeFileSync(path.join(outDir, "ghmc-wards.json"), JSON.stringify({ source: sourceOf("ghmc-delimitation-2025"), wards: wardRows }, null, 2));
fs.writeFileSync(path.join(outDir, "hyderabad-localities.json"), JSON.stringify({ localities: locationRows }, null, 2));
fs.writeFileSync(path.join(outDir, "hyderabad-locations.json"), JSON.stringify({ state: hierarchy.states[0], districts: hierarchy.districts, localities: locationRows }, null, 2));
fs.writeFileSync(path.join(outDir, "hyderabad-colonies.json"), JSON.stringify({ colonies: colonyRows, apartments: [], note: summary.apartmentGap }, null, 2));
fs.writeFileSync(path.join(outDir, "surrounding-cities.json"), JSON.stringify({ localities: surrounding, notFoundInIndiaPostExtract: notInIndiaPostExtract }, null, 2));
fs.writeFileSync(path.join(outDir, "municipalities.json"), JSON.stringify({ municipalities: [], note: summary.municipalityGap, townsVerifiedByIndiaPostOnly: surrounding.map((row) => ({ id: row.id, name: row.name, pinCodes: row.pinCodes })) }, null, 2));
fs.writeFileSync(
  path.join(outDir, "mandals.json"),
  JSON.stringify({
    note: summary.mandalGap,
    mandals: [...mandalNames.entries()].map(([name, localityIds]) => ({ name, localityIds, source: "India Post taluk field" })),
  }, null, 2),
);
fs.writeFileSync(
  path.join(outDir, "pincodes.json"),
  JSON.stringify({
    pinCodes: pinCodes.map((pin) => ({
      pin,
      path: pinPath(pin),
      localityIds: localities.filter((row) => row.pinCodes.includes(pin)).map((row) => row.id),
    })),
  }, null, 2),
);
fs.writeFileSync(path.join(outDir, "service-location-combinations.json"), JSON.stringify({ services: services.map((service) => service.id), combinations }));

const header = ["id", "name", "slug", "kind", "jurisdiction", "zone", "circle", "ward", "wardNumber", "pinCodes", "aliases", "directoryPath", "primaryServicePath", "sourceUrl"];
const csv = [
  header.join(","),
  ...locationRows.map((row) =>
    [row.id, row.name, row.slug, row.kind, row.jurisdiction, row.zone, row.circle, row.ward, row.wardNumber, row.pinCodes.join("|"), row.aliases.join("|"), row.directoryPath, row.primaryServicePath, row.source.url ?? ""].map(csvCell).join(","),
  ),
];
fs.writeFileSync(path.join(outDir, "hyderabad-locations.csv"), csv.join("\n"));
fs.writeFileSync(path.join(process.cwd(), "reports", "pseo", "location-database-report.json"), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
