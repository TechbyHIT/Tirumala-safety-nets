import fs from "fs";
import path from "path";
import hierarchy from "../data/pseo/hyderabad-hierarchy.json";

type RawOffice = {
  officename: string;
  pincode: string | number;
  officetype: string;
  deliverystatus: string;
  divisionname: string;
  regionname: string;
  taluk: string;
  districtname: string;
};

const rawPath = path.join(process.cwd(), "data", "pseo", "sources", "india-post-pincode-raw.json");
const outPath = path.join(process.cwd(), "data", "pseo", "postal-localities.json");

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/-+/g, "-");
}

function cleanName(value: string) {
  return value
    .replace(/\s*\((delivery|nd|[^)]*)\)\s*$/i, "")
    .replace(/\s+(S\.?O|B\.?O|H\.?O|G\.?P\.?O)\.?(\s*\(.*\))?\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b([a-z])/g, (letter) => letter.toUpperCase());
}

// Offices serving one institution, campus or government building rather than a residential locality.
const institutional =
  /\b(college|office|academy|bits|c\.?b\.?i\.?t|secretariat|crpf?|camp|cuc|o\.?u|university|records|bhawan|gsi|hal|court|courts|cables|school|iict|campus|jama i osmania|jntu|lic|manuu|mla|ngri|nisa|imarat|airport|rail nilayam|mutt|samskruthi|seminary|bank|svpnpa|vidhan sabha|sabha|division|stn|aperl|cyberabad|kingsway)\b/i;
const cityOffices = new Set(["hyderabad", "hyderabad-jubilee"]);

// India Post spellings of the same names used in the GHMC ward notice.
const spellings: Record<string, string> = {
  komplly: "kompally",
  kutbullapur: "quthbullapur",
  vanastalipuram: "vanasthalipuram",
  medipalli: "medipally",
  sitaphalmandi: "seethaphalmandi",
  bahadurpalli: "bahadurpally",
  jillellaguda: "jillelaguda",
  "vijay-nagar-colony": "vijayanagar-colony",
};

const raw = JSON.parse(fs.readFileSync(rawPath, "utf8").replace(/^\uFEFF/, "")) as RawOffice[];
const wardSlugs = new Set(hierarchy.localities.map((row) => row.slug));
const wardByCompact = new Map(hierarchy.localities.map((row) => [row.slug.replace(/-/g, ""), row.slug]));

function wardSlugFor(slug: string) {
  if (wardSlugs.has(slug)) return slug;
  if (spellings[slug] && wardSlugs.has(spellings[slug]!)) return spellings[slug]!;
  return wardByCompact.get(slug.replace(/-/g, ""));
}

// Named in the service area and present in this India Post extract, but not GHMC wards.
// Matched by cleaned name plus PIN so a same-name office in another taluk is not pulled in.
const surroundingByKey = new Map<string, { jurisdiction: string; aliases: string[]; slug?: string; name?: string }>([
  ["chevella:501503", { jurisdiction: "Ranga Reddy district, outside GHMC", aliases: [] }],
  ["ibrahimpatnam:501506", { jurisdiction: "Ibrahimpatnam, Ranga Reddy district, outside GHMC", aliases: [] }],
  ["isnapur:502307", { jurisdiction: "Sangareddy district, outside GHMC", aliases: [] }],
  ["kollur:502300", { jurisdiction: "Patancheru, Sangareddy district, outside GHMC", aliases: [] }],
  ["mangalpalli:501510", { jurisdiction: "Ranga Reddy district, outside GHMC", aliases: ["mangalpally"] }],
  ["moinabad:501504", { jurisdiction: "Ranga Reddy district, outside GHMC", aliases: [] }],
  ["mokila:501203", { jurisdiction: "Ranga Reddy district, outside GHMC", aliases: [] }],
  ["pocharam:501506", { jurisdiction: "Ibrahimpatnam, Ranga Reddy district, outside GHMC. Not GHMC Ward 8 Pocharam in Ghatkesar Circle", aliases: [], slug: "pocharam-ibrahimpatnam", name: "Pocharam (Ibrahimpatnam)" }],
  ["sangareddy:502001", { jurisdiction: "Sangareddy district, outside GHMC", aliases: [] }],
  ["shankarpalli:501203", { jurisdiction: "Ranga Reddy district, outside GHMC", aliases: ["shankarpally"] }],
  ["vikarabad:501101", { jurisdiction: "Vikarabad district, outside GHMC", aliases: [] }],
]);

function surroundingFor(row: RawOffice) {
  return surroundingByKey.get(`${slugify(cleanName(row.officename))}:${String(row.pincode)}`);
}

const excluded: { office: string; pincode: string; reason: string }[] = [];
const kept = raw.filter((row) => {
  const pin = String(row.pincode);
  const name = cleanName(row.officename);
  const ward = wardSlugFor(slugify(name));
  if (surroundingFor(row)) return true;
  if (!/^500\d{3}$/.test(pin) && !(ward && /^50[0-2]\d{3}$/.test(pin))) return false;
  if (!ward && cityOffices.has(slugify(name))) {
    excluded.push({ office: row.officename, pincode: pin, reason: "Head office named after the whole city, not a locality" });
    return false;
  }
  if (!ward && institutional.test(name)) {
    excluded.push({ office: row.officename, pincode: pin, reason: "Serves an institution, campus or government building, not a residential locality" });
    return false;
  }
  return true;
});

const metroDivisions = new Set(["Hyderabad City", "Hyderabad South East", "Secunderabad", "Sangareddy"]);
const metroTaluks = /^(Rangareddy|Ghatkesar|Hyd|Ramachandrapuram|Patancheru)$/i;
// Same-name villages whose PIN lies outside the ward's GHMC circle.
const homonyms = new Set(["allapur:501141", "himayathnagar:500075"]);

const bySlug = new Map<string, { name: string; slug: string; offices: RawOffice[] }>();
for (const row of kept) {
  const cleaned = cleanName(row.officename);
  const own = slugify(cleaned);
  if (!own) continue;
  const surrounding = surroundingFor(row);
  const slug = surrounding?.slug ?? wardSlugFor(own) ?? own;
  const name = surrounding?.name ?? cleaned;
  const entry = bySlug.get(slug) ?? { name, slug, offices: [] };
  entry.offices.push(row);
  bySlug.set(slug, entry);
}

for (const entry of bySlug.values()) {
  const forced = entry.offices.filter((row) => surroundingFor(row));
  const rest = entry.offices.filter((row) => !surroundingFor(row));
  const city = rest.filter((row) => String(row.pincode).startsWith("500") && !homonyms.has(`${entry.slug}:${row.pincode}`));
  const metro = city.length
    ? city
    : rest.filter((row) => metroDivisions.has(row.divisionname) && metroTaluks.test(row.taluk) && !homonyms.has(`${entry.slug}:${row.pincode}`));
  const keep = [...forced, ...metro];
  for (const row of entry.offices) {
    if (!keep.includes(row)) excluded.push({ office: row.officename, pincode: String(row.pincode), reason: `Same name as ${entry.slug} but a different village outside Hyderabad (${row.taluk}, ${row.divisionname})` });
  }
  entry.offices = keep;
  if (!keep.length) bySlug.delete(entry.slug);
}

const localities = [...bySlug.values()]
  .sort((a, b) => a.slug.localeCompare(b.slug))
  .map((entry) => ({
    name: entry.name,
    slug: entry.slug,
    pinCodes: [...new Set(entry.offices.map((row) => String(row.pincode)))].sort(),
    postOffices: entry.offices.map((row) => ({
      name: row.officename.replace(/\s+/g, " ").trim(),
      pincode: String(row.pincode),
      officeType: row.officetype,
      delivery: row.deliverystatus,
      division: row.divisionname,
      taluk: row.taluk,
      district: row.districtname,
    })),
    postalDistrict: entry.offices[0]!.districtname,
    matchesWard: wardSlugs.has(entry.slug),
    jurisdiction: entry.offices.map((row) => surroundingFor(row)?.jurisdiction).find(Boolean),
    aliases: [...new Set(entry.offices.flatMap((row) => surroundingFor(row)?.aliases ?? []))],
  }));

const output = {
  source: {
    id: "india-post-pincode-directory",
    publisher: "Department of Posts, Government of India (Open Government Data Platform India)",
    title: "All India Pincode Directory",
    url: "https://data.gov.in/resource/all-india-pincode-directory",
    issuedAt: "",
    accessedAt: new Date().toISOString().slice(0, 10),
    scope: "post-office localities,pin codes",
  },
  rawRecords: raw.length,
  keptRecords: kept.length,
  excluded,
  localities,
};

fs.writeFileSync(outPath, JSON.stringify(output));
console.log(
  JSON.stringify({
    rawRecords: raw.length,
    keptRecords: kept.length,
    excluded: excluded.length,
    localities: localities.length,
    matchingWards: localities.filter((row) => row.matchesWard).length,
    newLocalities: localities.filter((row) => !row.matchesWard).length,
    pinCodes: new Set(localities.flatMap((row) => row.pinCodes)).size,
  }),
);
