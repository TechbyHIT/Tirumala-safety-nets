type Area = { slug: string; name: string; detail: string };

type CityLike = {
  slug: string;
  name: string;
  region: string;
  district: string;
  climate: string;
  housing: string;
  materialHint: string;
  visitNote: string;
  localities: string[];
  areas: Area[];
};

const openings = [
  "Balcony railings sit at mixed heights, so the climb gap is measured rather than guessed from the street.",
  "Window reveals above the lane need a cable line that still lets the shutter and any insect screen travel.",
  "L-shaped sit-outs break a straight net run; corners and the return beside a column are part of the tape.",
  "Terrace parapets are low enough that a fall edge exists even when the family only talks about drying clothes.",
  "Duplex stair voids leave a triangular gap under the first flight that a general balcony net does not close.",
  "French windows open onto a narrow slab where cable spacing has to leave the door leaf a free swing.",
  "Utility ducts on the apartment side collect pigeons; a labelled flap is planned before the last edge is closed.",
  "Older iron grills have already rusted into the plaster, so a new system is not hung on a rail that moves.",
  "AC trays and sunshades make a perch line; spikes are quoted only where birds sit, not as a balcony package.",
  "Cloth is dried on the same balcony that needs a fall barrier, so hanger sweep and hook line are planned together.",
  "Low windows at bed height are a step for a toddler; the brief is child safety, not a decorative mesh.",
  "Society rules on the common facade decide hook colour and whether a plate can sit on the outer face.",
  "Independent-house terraces carry water tanks and solar frames that change where an edge net can land.",
  "Compact flats leave little ladder room; access time is written into the slot before anyone drills.",
  "Pigeon droppings on the slab are a hygiene job before a new net. We say so when the soil is heavy.",
  "West-facing openings take a harder afternoon sun; mesh without a named UV grade is refused.",
  "Hill or slope plots turn the balcony corner with the land, so a catalogue rectangle does not fit.",
  "Market-over rooms have windows that look at a narrow street; cable work is facade-sensitive.",
  "School-compound edges and practice corners are a sports-net brief only when a ground actually exists.",
  "Hostel and rental staircases are used by many people; the panel must not pull a loose handrail out of line.",
  "New RCC railings still stop at waist height. The climb band above them is the opening we close.",
  "Old lime-washed brick takes a different plug to a hollow block wall. The substrate is named before the bit.",
  "Planters and bike parking sit inside the balcony line and force extra returns in the mesh.",
  "A sliding door track can leave a cat-sized slot at the corner if the net stops at the pretty mid-rail.",
  "Overhead drying rods share the slab with a cable run; mild-steel rods that stain clothes are replaced or isolated.",
  "Open landings on walk-ups need a soft barrier that still lets furniture turn the stair.",
  "Parapet ledges on the terrace are a spike job when birds only perch, and a net job when they walk in.",
  "Builder-supplied glass railings still leave a climbable edge; cable or mesh is planned above that edge.",
  "Rain-wet walls in a long monsoon ask for stainless hooks even when the town is not on the open beach.",
  "Dusty tracks from a highway or a workshop are cleaned; a dirty substrate fails before the steel does.",
];

const fabric = [
  "Older plaster over brick is sounded before an anchor is named.",
  "New RCC slabs take a different fixing to a lime-washed old wall.",
  "Hollow-block parapets are checked so a plug does not sit in an empty cell.",
  "Painted mild-steel already marking the wall is treated as a stain risk, not as an anchor.",
  "Granite or tile cladding on a parapet changes how a spike strip or a hook plate can sit.",
  "A false ceiling inside the balcony hides the slab edge until the tape goes up.",
  "Service-lift timing and a society letter matter as much as the opening on apartment streets.",
  "Tight lanes mean materials arrive in smaller lifts; that is written into the visit, not discovered on the day.",
  "Shared ducts are common property. The association sees the flap note before the shaft is closed.",
  "Wooden window frames that have moved with humidity are not used as the only termination.",
  "A rusted builder grill is photographed and either isolated or refused as a load path.",
  "Waterproofed terrace edges are treated carefully so a hook plate does not cut the coating.",
  "Neighbour balconies sit close; the finish is planned so the elevation does not read as a patchwork.",
  "Overhead wires and a low eave can block a simple ladder set-up on old-town streets.",
  "Newly painted facades need a smaller visible plate if the committee has already said so.",
];

const uses = [
  "Families here usually start with children or pets on the balcony, then notice pigeons on the same ledge.",
  "Drying space and fall protection are asked for together; they stay two lines on the quote.",
  "Bird control is physical: a net for a volume, spikes for a perch, never gel or poison.",
  "Rental flats still need owner and, where rules require it, association permission before a drill bit is chosen.",
  "School-side streets sometimes add a practice-net or stair-net brief that a house balcony does not cover.",
  "Temple-approach homes mix lodge rooms and family houses; each opening is still measured on its own.",
  "Industrial-edge dust does not change the product, but it does change how the wall is prepared.",
  "Foothill or tree-edge plots can start a monkey-prone talk. We assess the opening; we do not assume the animal.",
  "Evening mosquito pressure is common in delta and coastal-plain towns and is never sold as a safety net.",
  "Older residents want a soft contact surface and a panel they can still open for a delivery.",
];

const extraNames = [
  "Housing Board colony",
  "Railway colony",
  "RTC Complex side",
  "Collectorate side",
  "Old bus stand",
  "Bypass road",
  "Temple street",
  "Market ward",
  "College road",
  "Hospital road",
  "Teachers colony",
  "Revenue colony",
  "NGO colony",
  "Industrial estate side",
  "New layout",
  "Farm-road houses",
  "Tank-bund side",
  "Church compound side",
  "Municipal office streets",
  "Stadium road",
  "Court road",
  "Post-office ward",
  "Water-works colony",
  "Police-lines side",
  "Cinema-road houses",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function hash(value: string) {
  let total = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    total ^= value.charCodeAt(index);
    total = Math.imul(total, 16777619);
  }
  return total >>> 0;
}

function pick<T>(list: T[], seed: string, salt: number) {
  return list[(hash(`${seed}:${salt}`) + salt * 13) % list.length];
}

function detailFor(city: CityLike, name: string) {
  const seed = `${city.slug}:${name}`;
  const opening = pick(openings, seed, 1);
  const wall = pick(fabric, seed, 2);
  const use = pick(uses, seed, 3);
  return `${name} sits in ${city.name}, ${city.district} district, among ${city.housing}. ${opening} ${wall} ${use} The street follows the town climate: ${city.climate} ${city.materialHint}`;
}

function targetCount(_city: CityLike) {
  return 0;
}

export function fillSparseAreas<T extends CityLike>(list: T[]): T[] {
  return list.map((city) => {
    const map = new Map(city.areas.map((area) => [area.slug, area]));
    const names = new Set(city.areas.map((area) => area.name.toLowerCase()));
    for (const locality of city.localities) {
      const slug = slugify(locality);
      if (!slug || map.has(slug) || names.has(locality.toLowerCase())) continue;
      map.set(slug, { slug, name: locality, detail: detailFor(city, locality) });
      names.add(locality.toLowerCase());
    }
    let extraIndex = 0;
    while (map.size < targetCount(city) && extraIndex < extraNames.length * 2) {
      const raw = extraNames[extraIndex % extraNames.length];
      const name = extraIndex < extraNames.length ? raw : `${raw} extension`;
      const slug = slugify(`${city.slug}-${name}`);
      extraIndex += 1;
      if (map.has(slug) || names.has(name.toLowerCase())) continue;
      map.set(slug, { slug, name, detail: detailFor(city, name) });
      names.add(name.toLowerCase());
    }
    return { ...city, areas: [...map.values()], localities: [...names] };
  });
}
