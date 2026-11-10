import { site } from "@/config/site";
import { getService as getLegacyService } from "@/data/services";
import { circleById, localities, nearbyLocalities, serviceById, services, wardById, zoneById } from "./database";
import type { Locality, NoindexReason, ProgrammaticPage, ProgrammaticService, SearchProfile, SeoPageRecord } from "./types";

export const TARGET_PAGE_COUNT = 50_000;
export const PROGRAMMATIC_SITEMAP_SIZE = 2_000;
export const MIN_LOCAL_FACTS = 3;
export const SERVICE_SIMILARITY_LIMIT = 0.8;
export const CONTENT_UPDATED = "2026-11-10";

const propertyProfiles: SearchProfile[] = [
  { id: "apartments", label: "for apartments", searchIntent: "property", propertyType: "apartments" },
  { id: "independent-houses", label: "for independent houses", searchIntent: "property", propertyType: "independent houses" },
  { id: "high-rise-buildings", label: "for high-rise buildings", searchIntent: "property", propertyType: "high-rise buildings" },
];

export function profilesFor(service: ProgrammaticService): SearchProfile[] {
  return [
    { id: "service", label: "", searchIntent: "service" },
    { id: "installation", label: "installation", searchIntent: "installation" },
    { id: "replacement", label: "replacement", searchIntent: "replacement" },
    ...propertyProfiles,
    ...service.useCases.slice(0, 4).map((useCase) => ({
      id: slugify(useCase),
      label: `for ${useCase}`,
      searchIntent: "use-case" as const,
      useCase,
    })),
  ];
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/-+/g, "-");
}

export function primarySlug(serviceId: string, localitySlug: string) {
  return `${serviceId}-in-${localitySlug}`;
}

function landingSlug(service: ProgrammaticService, localitySlug: string, profile: SearchProfile) {
  if (profile.searchIntent === "service") return primarySlug(service.id, localitySlug);
  if (profile.searchIntent === "installation") return `${service.id}-installation-in-${localitySlug}`;
  if (profile.searchIntent === "replacement") return `${service.id}-replacement-in-${localitySlug}`;
  return `${service.id}-for-${slugify(profile.propertyType ?? profile.useCase ?? profile.id)}-in-${localitySlug}`;
}

export function localFactsFor(locality: Locality) {
  const facts: { label: string; value: string }[] = [];
  const ward = locality.wardId ? wardById.get(locality.wardId) : undefined;
  const circle = locality.circleId ? circleById.get(locality.circleId) : undefined;
  const zone = locality.zoneId ? zoneById.get(locality.zoneId) : undefined;
  if (ward) facts.push({ label: "GHMC ward", value: `${ward.number} – ${ward.name}` });
  if (circle) facts.push({ label: "GHMC circle", value: `${circle.number} – ${circle.name}` });
  if (zone) facts.push({ label: "GHMC zone", value: zone.name });
  if (circle) {
    const siblings = localities.filter((row) => row.circleId === circle.id && row.id !== locality.id).map((row) => row.name);
    if (siblings.length) facts.push({ label: "Other wards in this circle", value: siblings.join(", ") });
  }
  if (locality.pinCodes.length) facts.push({ label: locality.pinCodes.length > 1 ? "PIN codes" : "PIN code", value: locality.pinCodes.join(", ") });
  if (locality.postOffices.length) {
    facts.push({ label: "Post offices", value: locality.postOffices.map((office) => `${office.name} (${office.pincode})`).join(", ") });
    const division = locality.postOffices[0]!.division;
    if (division) facts.push({ label: "Postal division", value: division });
    const taluk = locality.postOffices[0]!.taluk;
    if (taluk && taluk !== "NA") facts.push({ label: "Taluk (postal record)", value: taluk });
  }
  return facts;
}

const replacementSigns: Record<ProgrammaticService["category"], string[]> = {
  grills: ["cable lines that have lost tension and can be pushed apart", "rust staining at ferrules, turnbuckles or anchors", "anchors loosening in cracked plaster or hollow block", "spacing that no longer suits a growing child or a new pet"],
  nets: ["mesh that has turned brittle or chalky after summers of UV", "sagging panels or a lower edge that can be lifted", "broken knots, torn corners or frayed border rope", "hooks that have rusted or pulled out of the wall"],
  "bird-control": ["gaps at pipes, beams or corners that birds have learned to use", "torn mesh or spikes missing along a ledge", "nesting material or fresh droppings behind the existing barrier", "fixings that have loosened after cleaning or painting"],
  sports: ["a worn hitting face or broken twine where the ball lands most", "poles leaning after rain or anchors working loose", "netting that sags so balls clear the side or top", "UV-weakened twine that tears under ordinary impact"],
  utility: ["rods that have rusted and mark clothes", "pulleys or cords that jam or fray", "a rack that sags in the middle under a wet load", "ceiling anchors that have loosened"],
};

const propertyNotes: Record<string, string> = {
  apartments: "Apartment work usually needs the association's permission, a lift or stair slot for materials, and a finish that does not alter the common facade. The fixing line stays inside the flat's own opening where the building rules require it.",
  "independent houses": "Independent houses often combine balconies with open terraces, stair heads and parapets of different ages. Each opening is measured on its own, and older plaster is checked before an anchor is chosen.",
  "high-rise buildings": "High floors add wind load, restricted external access and stricter society rules. Work is planned from inside the opening where possible, and the fixing is chosen for the exposure of that floor.",
};

const legacyIntentFor: Record<string, string> = {
  "balcony-invisible-grills": "invisible-grills-for-balcony",
  "window-invisible-grills": "invisible-grills-for-windows",
  "child-safety-nets": "children-safety-nets-for-balcony",
  "pet-safety-nets": "pet-safety-nets-for-balcony",
  "duct-area-safety-nets": "duct-area-nets-for-duct-area",
  "cricket-practice-nets": "cricket-nets-for-practice-grounds",
  "bird-spikes": "anti-bird-spikes-for-pigeon-control",
};

const maintenanceByCategory: Record<ProgrammaticService["category"], string> = {
  grills: "Wipe the cables and anchors with a dry cloth after monsoon dust, and do not hang planters or clothes from the lines. Ask for a tension check if a cable bows, an anchor stains the wall, or a child can push two lines apart. Do not oil stainless cable; oil collects grit.",
  nets: "Brush leaves and dust off the mesh and keep sharp furniture off the panel. A net that sags, chalks, or lets the border rope fray should be re-tensioned or replaced rather than patched with household twine. Rinse only with water.",
  "bird-control": "Clear nesting material from the protected side during cleaning, and check that spikes are still complete after painters or AC technicians work on the ledge. A gap at a pipe or beam is enough for birds to return.",
  sports: "Check pole fixings and the twine that takes the most impact at the start of the season. Take a portable net down in high wind if its frame is not anchored for that load. Replace a panel when balls start passing through worn twine.",
  utility: "Do not overload a ceiling rack with wet bedsheets beyond what was agreed, and keep the pulley cord from rubbing a sharp edge. Stop using a rack whose ceiling anchors have loosened.",
};

const safetyByCategory: Record<ProgrammaticService["category"], string> = {
  grills: "Invisible grills are a barrier for an opening, not a climbing frame and not a substitute for supervising a child. Spacing and height are chosen for the opening that was measured. They do not make an unsafe parapet structurally sound.",
  nets: "A safety net reduces the chance of a person, pet, or object passing an opening. It is not a floor, a seat, or a licence to leave a child unattended. The border and anchors have to stay intact for the net to do its job.",
  "bird-control": "Nets and spikes keep birds off a ledge or out of a shaft. They are fitted so the bird is excluded, not trapped. Tell the installer if birds are already nesting; active nests with chicks need care before a gap is closed.",
  sports: "Practice nets stop balls leaving the bay. They are not a spectator barrier unless that load was part of the specification, and a damaged panel should be taken out of use.",
  utility: "A ceiling hanger is for drying, not for a person to hold. Fixings go into structure that can take the wet load, which is confirmed on site rather than assumed from a photograph.",
};

const serviceNotes: Record<string, string> = {
  "balcony-invisible-grills": "A balcony run is measured from the top of the parapet or railing to the slab, and around every column return. Line count follows the height of that open band, and a removable section can be planned where an outdoor AC unit or a plant shelf needs reaching.",
  "window-invisible-grills": "Window cables are fixed inside the reveal so sliding shutters, openable sashes, mosquito mesh and curtains keep working. Low sills beside beds or sofas are treated as a climbing step and get closer spacing.",
  "openable-invisible-grills": "An openable grill puts the cable lines on a locking stainless frame with hinges, so the panel can swing open for cleaning, AC servicing or an emergency exit and then lock closed. The lock position is agreed so a child cannot reach it, and the frame is anchored to take the extra load at the hinge side.",
  "safety-nets": "A general safety net is chosen when the opening is wide, irregular or broken by pipes and columns. Mesh size, yarn and border are matched to the risk — a person, a pet or falling objects — rather than to a catalogue name.",
  "balcony-safety-nets": "Balcony nets run railing to slab, including the side returns and the gap beside the drying area. Tension is set so the panel reads evenly from inside and from the street.",
  "terrace-safety-nets": "Terraces are quoted as edge protection, overhead cover, or both, because the two solve different problems. Water tanks, solar frames and parapet height are measured before the net line is drawn.",
  "staircase-safety-nets": "Stair voids are netted along the rake of the flight so no triangular gaps remain at landings and turns, and the handrail's own fixings are left intact.",
  "sports-nets": "Sports nets are specified by impact: ball type, speed and how often the net is hit. Bay size, height and pole footing are taken from the site, whether it is a school ground, a society court or a terrace after a slab check.",
  "cloth-hangers": "Ceiling hangers need clear height, a fan-free sweep and a door head that the rack clears when lowered. Wall-mounted rods suit utility corners without ceiling height.",
  "invisible-grills": "Invisible grills are the parent system for balconies, windows and openable panels. The cable grade, spacing and anchor type are named in the quote after the opening is seen.",
};

function serviceBody(service: ProgrammaticService) {
  const legacy = service.legacy ? getLegacyService(service.legacy) : undefined;
  const intent = legacy?.intents.find((item) => item.slug === legacyIntentFor[service.id]);
  const body = [service.summary];
  if (intent) body.push(intent.angle);
  if (serviceNotes[service.id]) body.push(serviceNotes[service.id]!);
  if (legacy) body.push(legacy.lede);
  if (legacy?.problems.length) body.push(`Typical problems this addresses: ${legacy.problems.join(" ")}`);
  return body;
}

function intentSections(service: ProgrammaticService) {
  const legacy = service.legacy ? getLegacyService(service.legacy) : undefined;
  const name = service.name.toLowerCase();
  const sections = [
    {
      title: `${service.name} installation`,
      text: `Installation starts with a measurement of the opening, the fixing surface and safe access. ${legacy?.priceFactors.length ? `The scope and quote depend on ${legacy.priceFactors.join("; ").toLowerCase()}.` : ""} The written scope names ${service.materials.join(", ")} before work begins.`,
    },
    {
      title: `${service.name} replacement`,
      text: `Consider replacing ${name} when you see ${replacementSigns[service.category].join("; ")}. The old system is inspected first, because sometimes re-tensioning or replacing fixings is enough.`,
    },
    ...propertyProfiles.map((profile) => ({
      title: `${service.name} ${profile.label}`,
      text: propertyNotes[profile.propertyType!]!,
    })),
  ];
  if (legacy?.where.length) sections.push({ title: "Where it is typically fitted", text: legacy.where.join(", ") + "." });
  sections.push({
    title: "Use cases",
    text: `${service.name} is planned for ${service.useCases.join(", ")}. The visit confirms whether this system, or a different one, suits the opening.`,
  });
  return sections;
}

function faqsFor(service: ProgrammaticService, locality: Locality) {
  const legacy = service.legacy ? getLegacyService(service.legacy) : undefined;
  const where = locality.wardId ? `GHMC Ward ${wardById.get(locality.wardId)?.number} (${locality.name})` : `${locality.name}${locality.pinCodes.length ? ` (PIN ${locality.pinCodes.join(", ")})` : ""}`;
  return [
    {
      q: `Do you take ${service.name.toLowerCase()} enquiries in ${locality.name}?`,
      a: `Yes. Tirumala Safety Nets takes Hyderabad enquiries, including ${where}. Share the address and a photograph so access and scheduling can be confirmed before a visit.`,
    },
    ...(legacy?.faqs ?? []).slice(0, 3),
    {
      q: "Can I get a price without a site measurement?",
      a: "A photograph helps with an initial discussion, but the final written quote follows dimensions, material choice, fixing condition and access.",
    },
  ];
}

function intentFocus(service: ProgrammaticService, profile: SearchProfile) {
  if (profile.useCase) {
    return {
      title: `${service.name} ${profile.label}`,
      text: `This page looks at ${service.name.toLowerCase()} where the need is ${profile.useCase}. The visit checks the opening against that use, and the written scope confirms or changes ${service.materials.join(", ")} to suit it. Fixing points and access are planned around how the space is used.`,
    };
  }
  return intentSections(service).find((section) => section.title.toLowerCase() === `${service.name} ${profile.label}`.toLowerCase());
}

function tokens(text: string) {
  const words = text.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(" ").filter(Boolean);
  const shingles = new Set<string>();
  for (let index = 0; index + 3 <= words.length; index += 1) shingles.add(words.slice(index, index + 3).join(" "));
  return shingles;
}

export function similarity(a: string, b: string) {
  const left = tokens(a);
  const right = tokens(b);
  let shared = 0;
  for (const item of left) if (right.has(item)) shared += 1;
  return shared / Math.max(1, left.size + right.size - shared);
}

function serviceText(service: ProgrammaticService) {
  return [...serviceBody(service), ...intentSections(service).map((section) => section.text)].join(" ").replaceAll(service.name, "").replaceAll(service.name.toLowerCase(), "");
}

let duplicateServices: Map<string, { of: string; score: number }> | undefined;

export function serviceDuplicates() {
  if (duplicateServices) return duplicateServices;
  duplicateServices = new Map();
  const texts = services.map((service) => ({ service, text: serviceText(service) }));
  for (let i = 0; i < texts.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      const score = similarity(texts[i]!.text, texts[j]!.text);
      if (score >= SERVICE_SIMILARITY_LIMIT && !duplicateServices.has(texts[i]!.service.id)) {
        duplicateServices.set(texts[i]!.service.id, { of: texts[j]!.service.id, score: Number(score.toFixed(3)) });
      }
    }
  }
  return duplicateServices;
}

function recordFor(id: number, service: ProgrammaticService, locality: Locality, profile: SearchProfile): SeoPageRecord {
  const qualifier = profile.label ? ` ${profile.label}` : "";
  const slug = landingSlug(service, locality.slug, profile);
  const place = locality.pinCodes.length && locality.kind === "post-office" ? `${locality.name} (${locality.pinCodes[0]})` : locality.name;
  const title = `${service.name}${qualifier} in ${place}, Hyderabad`;
  const description =
    locality.kind === "ghmc-ward"
      ? `${service.name}${qualifier} in ${locality.name}, GHMC Ward ${wardById.get(locality.wardId!)?.number}. Materials, fitting steps, replacement signs, nearby wards and a measured written quote.`
      : `${service.name}${qualifier} in ${locality.name}, Hyderabad ${locality.pinCodes.join(", ")}. Materials, fitting steps, replacement signs, nearby areas and a measured written quote.`;
  const facts = localFactsFor(locality);
  const qualityReasons: string[] = [];
  let noindexReason: NoindexReason | undefined;
  const primaryPath = `/${primarySlug(service.id, locality.slug)}`;
  const duplicate = serviceDuplicates().get(service.id);
  if (!locality.verified) {
    noindexReason = "UNVERIFIED_LOCATION";
    qualityReasons.push("Location is not backed by a cited source.");
  } else if (facts.length < MIN_LOCAL_FACTS) {
    noindexReason = "INSUFFICIENT_LOCAL_FACTS";
    qualityReasons.push(`Only ${facts.length} sourced local facts; ${MIN_LOCAL_FACTS} are required.`);
  } else if (profile.searchIntent !== "service") {
    qualityReasons.push("Same service, locality and facts as the primary page, with one extra intent section. Consolidated with a canonical to that primary page. Not marked noindex, because a cross-canonical and noindex together conflict.");
  } else if (duplicate) {
    qualityReasons.push(`Service body is ${Math.round(duplicate.score * 100)}% similar to ${duplicate.of}; monitored, and kept because the service is a distinct product.`);
  }
  const consolidation = !noindexReason && profile.searchIntent !== "service" ? ("CANONICAL_TO_PRIMARY" as const) : undefined;
  const indexEligible = !noindexReason && !consolidation;
  return {
    id,
    slug,
    path: `/${slug}`,
    serviceId: service.id,
    localityId: locality.id,
    profile,
    title,
    description,
    h1: `${service.name}${qualifier} in ${locality.name}`,
    generated: true,
    indexEligible,
    published: indexEligible,
    robots: noindexReason ? "noindex,follow" : "index,follow",
    canonical: consolidation ? `${site.url}${primaryPath}` : `${site.url}/${slug}`,
    primaryPath,
    consolidation,
    noindexReason,
    qualityReasons,
  };
}

let recordCache: SeoPageRecord[] | undefined;
let slugCache: Map<string, SeoPageRecord> | undefined;

export function seoPageRecords() {
  if (recordCache) return recordCache;
  const records: SeoPageRecord[] = [];
  let id = 1;
  for (let profileIndex = 0; profileIndex < 10 && records.length < TARGET_PAGE_COUNT; profileIndex += 1) {
    for (const service of services) {
      const profile = profilesFor(service)[profileIndex];
      if (!profile) continue;
      for (const locality of localities) {
        if (records.length >= TARGET_PAGE_COUNT) break;
        records.push(recordFor(id, service, locality, profile));
        id += 1;
      }
    }
  }
  if (records.length !== TARGET_PAGE_COUNT) {
    throw new Error(`Combination engine produced ${records.length} records; expected ${TARGET_PAGE_COUNT}`);
  }
  const slugs = new Set(records.map((record) => record.slug));
  if (slugs.size !== records.length) {
    throw new Error(`Combination engine produced ${records.length - slugs.size} duplicate URLs`);
  }
  recordCache = records;
  slugCache = new Map(records.map((record) => [record.slug, record]));
  return records;
}

export function recordForSlug(slug: string) {
  if (!slugCache) seoPageRecords();
  return slugCache!.get(slug);
}

export function pageForSlug(slug: string): ProgrammaticPage | undefined {
  const record = recordForSlug(slug);
  if (!record) return undefined;
  const service = serviceById.get(record.serviceId);
  const locality = localities.find((row) => row.id === record.localityId);
  if (!service || !locality) return undefined;
  const ward = locality.wardId ? wardById.get(locality.wardId) : undefined;
  const circle = locality.circleId ? circleById.get(locality.circleId) : undefined;
  const zone = locality.zoneId ? zoneById.get(locality.zoneId) : undefined;
  const qualifier = record.profile.label ? ` ${record.profile.label}` : "";
  const where = ward && circle && zone
    ? `${locality.name} is GHMC Ward ${ward.number}, in ${circle.name} Circle of the ${zone.name} Zone`
    : `${locality.name} is a Hyderabad post-office locality${locality.pinCodes.length ? ` served by PIN ${locality.pinCodes.join(", ")}` : ""}${locality.postOffices[0]?.division ? ` in the ${locality.postOffices[0].division} postal division` : ""}`;
  const sections = intentSections(service);
  const focus = intentFocus(service, record.profile);
  return {
    ...record,
    service,
    locality,
    ward,
    circle,
    zone,
    nearby: nearbyLocalities(locality),
    relatedServices: services.filter((row) => row.id !== service.id && row.category === service.category).slice(0, 4),
    introduction: `${where}. This page covers ${service.name.toLowerCase()}${qualifier} for homes and buildings there: what is fitted, how it is installed, when it should be replaced, and how the quote is worked out. It does not claim a completed local project, a branch office or a fixed price.`,
    localFacts: localFactsFor(locality),
    serviceBody: serviceBody(service),
    intentSections: focus && record.profile.searchIntent !== "service" ? [focus, ...sections.filter((section) => section.title !== focus.title)] : sections,
    variants: profilesFor(service)
      .filter((profile) => profile.id !== record.profile.id)
      .map((profile) => ({ profile, slug: landingSlug(service, locality.slug, profile) }))
      .filter((row) => recordForSlug(row.slug))
      .map((row) => ({ href: `/${row.slug}`, label: row.profile.label ? `${service.name} ${row.profile.label}` : `${service.name} in ${locality.name}` })),
    installation: [
      "Share a full photograph of the opening and the locality before a visit is scheduled.",
      "Measure the opening, corners, fixing surface and safe access on site.",
      `Confirm ${service.materials.join(", ")} in the written scope.`,
      "Install, tension or align the system, then explain care and access points at handover.",
    ],
    benefits: [
      service.summary,
      `Planned for ${record.profile.propertyType ?? record.profile.useCase ?? service.useCases.join(", ")}.`,
      "No price, address, review or local project is invented on this page.",
    ],
    maintenance: maintenanceByCategory[service.category],
    safety: safetyByCategory[service.category],
    faqs: faqsFor(service, locality),
  };
}

export function publishedProgrammaticRecords() {
  return seoPageRecords().filter((record) => record.published);
}

export function programmaticSitemapCount() {
  return Math.ceil(publishedProgrammaticRecords().length / PROGRAMMATIC_SITEMAP_SIZE);
}

export function recordsForSitemap(shard: number) {
  const start = shard * PROGRAMMATIC_SITEMAP_SIZE;
  return publishedProgrammaticRecords().slice(start, start + PROGRAMMATIC_SITEMAP_SIZE);
}

export function generationStats() {
  const records = seoPageRecords();
  const duplicateUrls = records.length - new Set(records.map((record) => record.path)).size;
  const indexable = records.filter((record) => record.indexEligible);
  const duplicateCanonicals = indexable.length - new Set(indexable.map((record) => record.canonical)).size;
  const missingLocationData = localities.filter((row) => !row.name || !row.slug || !row.sourceId || !row.verified || (row.kind === "ghmc-ward" && (!row.wardId || !row.circleId || !row.zoneId))).length;
  const reasons: Record<string, number> = {};
  for (const record of records) if (record.noindexReason) reasons[record.noindexReason] = (reasons[record.noindexReason] ?? 0) + 1;
  return {
    generated: records.length,
    indexEligible: records.filter((record) => record.indexEligible).length,
    noindex: records.filter((record) => record.robots === "noindex,follow").length,
    noindexReasons: reasons,
    published: records.filter((record) => record.published).length,
    duplicateUrls,
    duplicateCanonicals,
    canonicalConsolidations: records.filter((record) => record.consolidation === "CANONICAL_TO_PRIMARY").length,
    missingLocationData,
    sitemapUrls: publishedProgrammaticRecords().length,
    sitemapFiles: programmaticSitemapCount(),
  };
}
