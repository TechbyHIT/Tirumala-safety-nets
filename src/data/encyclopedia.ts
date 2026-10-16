import type { Area, City } from "@/data/cities";
import type { Service } from "@/data/services";
import type { PageModule } from "@/seo/types";
import { serviceFamily } from "@/seo/topics";

export const aftercareByFamily = {
  cable: [
    "Wipe cable lines after a dusty summer or a salt-laden wind. Do not oil stainless with kitchen grease.",
    "Check turnbuckle lock nuts after the first monsoon. A loose nut is a maintenance item, not a reason to replace the system.",
    "If a line goes slack, stop using that balcony as a lean-to and ask for a tension check. Do not wind the buckle past the mark we leave at handover.",
  ],
  mesh: [
    "Hose the panel from the inside after pigeon season or a dusty week. A stiff broom on dry droppings tears yarn.",
    "Look at the border rope after cyclone-season wind. A lifted corner is a repair, not a new net.",
    "If a panel is designed to unhook for painting, put it back on the same hooks. Mixing hooks leaves a gap a child or a bird will find.",
  ],
  bird: [
    "Leave the last access flap labelled. A plumber who cuts the net to reach a pipe will reopen the roost.",
    "Spikes need a clear landing strip. A flower pot pushed onto the pins defeats them.",
    "Do not use gel or poison on the same ledge. They smear, they do not finish the job, and they are not part of this specification.",
  ],
  utility: [
    "Do not hang a wet bedsheet load on a hanger sized for daily clothes. The limit is said at handover.",
    "Sports nets wear at the hitting face first. Ask for a face patch before the side walls are blamed.",
    "Insect screens are not wash-and-forget. A warped magnetic strip is an evening of mosquitoes, not a new balcony net.",
  ],
} as const;

export const limitationsByFamily = {
  cable: [
    "A cable grill is a fall barrier through a defined opening. It is not a climbing frame, a burglar cage, or a substitute for watching a toddler.",
    "We will not specify SS316 as a luxury upgrade on a sheltered inland wall. Grade follows exposure.",
    "Loose builder railings are repaired or refused as an anchor. We do not hang a system on a rail that already moves.",
  ],
  mesh: [
    "Fall mesh is not insect mesh. Insect mesh is not fall mesh. Mixing the two in one sentence on a quote is a mistake we do not make.",
    "A net does not make a terrace cyclone-proof. Wind is a fixing question. We will refuse a span that needs a structure we are not building.",
    "Soft contact is still a barrier. Children should not treat the panel as a trampoline.",
  ],
  bird: [
    "Exclusion is physical. We do not trap, poison, or glue birds.",
    "Spikes do not close a balcony volume. Nets do not replace a spike on a thin parapet where a net would look absurd.",
    "Old droppings are a hygiene job before a new net. We will say so if the soil is heavy.",
  ],
  utility: [
    "A cloth hanger is not a safety net. A cricket net is not a balcony mesh sold by the square foot of a flat.",
    "Building-covering nets for work faces are scoped as project work, not as a house balcony package.",
    "Monkey-prone sites need a material and fixing talk that a pigeon net does not cover. We will say when the brief is the wrong product.",
  ],
} as const;

const essays: Record<string, { how: string; compare: string; climate: string; spec: string }> = {
  "invisible-grills": {
    how: "Each run is a measured stainless cable, terminated at an anchor that matches the wall or slab. Spacing is a household decision: closer for a toddler or a cat, wider for general fall protection. The outlook stays open because there is no welded lattice, only lines under tension.",
    compare: "Choose cable when the opening is a clear rectangle or a simple L and the view matters. Choose a safety net when columns, ducts or a wide irregular span would leave gaps between lines. Iron grills remain a heavier option that blocks breeze and rusts faster once monsoon damp sits on the wall.",
    climate: "Hyderabad summers cook west-facing cable, and the monsoon keeps walls damp. SS304 is the usual grade. Stainless hooks and a clean substrate matter more than a marine package.",
    spec: "Quotes name SS304 or SS316, the number of lines, turnbuckle type and how the wall will take the load. 'Premium stainless' without a grade is not a specification.",
  },
  "safety-nets": {
    how: "A safety net is a tensioned mesh panel with a border rope, hooked around an opening so people, pets and objects are far less likely to pass through. Edges, corners and pipes are part of the measure. A net hooked only at four corners is a hammock, not a barrier.",
    compare: "Mesh suits wide, broken or soft-contact openings. Cable suits a neat view-led balcony. Mosquito screens are a different product with a different yarn. Building-covering nets for a work face are heavier still and quoted as site work.",
    climate: "UV-stabilised HDPE is the default against Hyderabad sun. Monsoon wetting asks for stainless hooks. A net without a named UV grade goes brittle on an open terrace.",
    spec: "Mesh aperture, yarn type, border rope and hook metal are written down. Colour is a society conversation, not a surprise on the elevation.",
  },
  "balcony-safety-nets": {
    how: "The panel runs from the balcony railing up to the slab, including side returns beside a column. Transparent-looking mesh is still a fall barrier: it is chosen for even tension and a quiet elevation, not for disappearing entirely.",
    compare: "A balcony net and an invisible grill can share one flat. The net covers the climb gap; the grill keeps a French window open to the view. They are measured together so the hanger, the door and the hook line do not fight.",
    climate: "West-facing balconies in Gachibowli, Kondapur and Kukatpally take a harder afternoon sun. The quote names the mesh and the hook metal.",
    spec: "Railing-to-slab height, run length, columns and whether a release edge is required all appear on the quote.",
  },
  "children-safety-nets": {
    how: "Spacing and yarn are chosen for pull, climb and lean. Anchors sit where a child cannot work them loose. The panel is soft on contact compared with iron, and it is still a barrier, not a play structure.",
    compare: "If the opening is a clean span and the family wants a near-invisible line, closer-spaced cable may be the better brief. If the balcony is broken by planters and columns, mesh usually wins. Supervision is not optional in either case.",
    climate: "Humid towns keep hooks stainless. Dry towns keep the yarn UV-stable. The child is the same; the weather is not.",
    spec: "Age of the child, other openings on the same floor, and stair voids are asked before the mesh is cut.",
  },
  "pet-safety-nets": {
    how: "Cats test corners. Dogs lean with their weight. The aperture is smaller than a general balcony net, and the lower edge is tied so it cannot be nosed up.",
    compare: "A pet net is not a pigeon net with a different label. Bird mesh can still pass a slim cat. Tell us the animal before we guess the hole size.",
    climate: "Chew-risk edges get covered hooks in any district. Coastal rust on a cheap hook is how a gap starts.",
    spec: "Pet type, balcony length and any sliding-shutter gap are measured as one brief.",
  },
  "cat-safety-nets": {
    how: "A cat safety net is a tight-aperture balcony or window panel planned around how cats sit on railings and slip through corners that look closed to an adult.",
    compare: "General pet mesh may still be too open for a slim cat. Invisible-grill spacing for a cat is a different, closer cable brief. We pick one system after seeing the gap.",
    climate: "Upper-floor flats in Madhapur, Kukatpally and Secunderabad are the usual call. The aperture follows the cat.",
    spec: "Window sills, planter ledges and the gap under a sliding door are included, not only the pretty mid-rail.",
  },
  "pigeon-nets": {
    how: "The net closes the volume birds occupy — the balcony box, the duct, the pocket beside an AC tray — and the last edge is closed only after birds already inside can leave.",
    compare: "Use spikes when birds only perch on a thin ledge. Use a net when they walk in under the slab. Many buildings need both. Poison and gel are not alternatives we sell.",
    climate: "Apartment ledges, AC trays and service ducts are the usual Hyderabad roost. A parapet where birds only sit may be a spike job. An open balcony is a net.",
    spec: "Volume, pipes, and whether old nesting must be cleared are line items.",
  },
  "bird-nets": {
    how: "Bird nets are the broader exclusion job: pigeons at home, mixed birds on sheds and shafts. Aperture follows the species we actually see, not a catalogue photo of a balcony.",
    compare: "A balcony pigeon net and a warehouse bird net share a method and not a price. Span and roof type change the support.",
    climate: "Sheet roofs in Hindupur and coastal sheds in Kakinada take different fixings. The mesh talk stays UV-aware everywhere.",
    spec: "Species, span and a documented access opening for maintenance.",
  },
  "anti-bird-spikes": {
    how: "Blunt stainless pins on a base strip stop a comfortable landing. They are a deterrent, not a trap, and they sit on parapets, sunshades, signboards and AC trays.",
    compare: "Spikes fail inside a balcony children can reach. Nets fail as a replacement for a thin ledge. We recommend after seeing the roost.",
    climate: "Plastic pins chalk in Hyderabad sun. Stainless is the default conversation on hot parapets.",
    spec: "Running metres, surface and whether adhesive or a mechanical fix will hold.",
  },
  "duct-area-nets": {
    how: "The shaft face is closed at the agreed floors, with a labelled flap so a plumber can still reach the pipe. A fully sealed duct is a future cut.",
    compare: "Balcony pigeon nets do not automatically scale to a multi-floor shaft. Association permission is usual because the duct is common property.",
    climate: "Coastal and delta shafts hold nests and smell. Inland shafts still collect birds; UV still matters on the open face.",
    spec: "Floors covered, shaft size, clutter and the access note for the committee.",
  },
  "terrace-safety-nets": {
    how: "Edge nets close a fall. Overhead nets close birds or falling objects from above. They are quoted separately so a house does not buy a sky cage by default.",
    compare: "A balcony net is not a terrace edge. A sports net is not a terrace shade. Poles on a waterproofed slab are a structural question first.",
    climate: "Hyderabad UV and monsoon wind are the two honest risks. Neither is solved by a light decorative mesh.",
    spec: "Parapet height, water tanks, solar frames and whether the brief is fall, birds, or both.",
  },
  "staircase-safety-nets": {
    how: "The panel follows the rake of the flight and the landing. Triangular gaps under the first flight are included. Tension must not pull a loose handrail out of line.",
    compare: "Invisible cable can close a straight void. Mesh follows a turning stair more calmly. Iron infill closes the look as well as the gap.",
    climate: "Duplex houses in Tadepalligudem, Eluru and newer Guntur layouts are typical. Dust and humidity change the hook, not the geometry.",
    spec: "Number of flights, void width and the handrail's own screws — we avoid loading those if we can.",
  },
  "cloth-hangers": {
    how: "Ceiling pulleys and wall rods lift drying off the floor. Span, drop and rod count come from the slab, the fan and the wash load.",
    compare: "A hanger can share a balcony with a net or a grill if both are measured in one visit. A floor rack is not a specification.",
    climate: "Humid Godavari and coastal towns stain mild steel onto clothes. Aluminium or stainless rods are the named alternative.",
    spec: "Rod length, pulley type and the heaviest wash you actually hang.",
  },
  "sports-nets": {
    how: "Practice and perimeter nets are built to the bay: height, pole spacing and yarn follow the sport, not a balcony price list.",
    compare: "A house terrace may not take poles. A school ground is a different foundation. We say so before anyone drills a slab.",
    climate: "Sun on inland grounds and wind on coastal fields both belong in the pole and guy plan.",
    spec: "Sport, bay size, height and whether a top net is required.",
  },
  "cricket-nets": {
    how: "Lanes need a hitting-face yarn that is heavier than the sides, a back net, and a height that keeps the ball off the next roof.",
    compare: "Backyard practice is not a district academy. The quote should not pretend they are the same lane.",
    climate: "Open grounds in Guntur, Kurnool and Anantapur take UV and dust. Coastal academies add a corrosion note on poles.",
    spec: "Lane count, run-up, surface and neighbour line.",
  },
  "mosquito-nets": {
    how: "Fine insect mesh on a stitched or framed panel follows the shutter. It keeps mosquitoes out. It does not stop a fall.",
    compare: "Delta evenings often need both a fall net and a screen. They are two lines. One product cannot honestly do both.",
    climate: "Evening insects are common after rain across Hyderabad. The product remains a screen, not a fall net.",
    spec: "Shutter type, opening count and whether a door sees daily traffic.",
  },
  "monkey-safety-nets": {
    how: "Monkey-prone openings — hill-edge houses, fruit trees beside a terrace, foothill flats — need a tougher yarn and a fixing that survives a pull, not only a pigeon landing.",
    compare: "A pigeon net will fail here. A child safety net may still be too light. We assess the site before we reuse a balcony specification.",
    climate: "Eastern Ghats approaches around Narsipatnam, Paderu, Tirupati foothills and agency-side towns are the honest geography. We do not advertise monkeys in a delta flat that has never seen one.",
    spec: "Opening type, tree cover and whether the brief is exclusion or a combined child-and-wildlife barrier.",
  },
  "building-covering-nets": {
    how: "Building-covering nets are project mesh for an elevation, a work face or a temporary enclosure. Fixing, overlap and access for the trade on site are the brief.",
    compare: "This is not a house balcony package and not a sports lane. Schools, hospitals and towers are scoped after a walk, often with the contractor or association.",
    climate: "Wind on a tall Gachibowli or Kokapet face is a fixing conversation. We will not call a light net a cyclone screen.",
    spec: "Area, height, duration of cover and who controls access to the facade.",
  },
  "transparent-balcony-nets": {
    how: "A finer, lower-visibility balcony mesh is still a fall panel. Light and outlook are part of the plan; strength and even tension remain the first requirements.",
    compare: "If the family wants almost no visual weight, invisible cable may be cleaner. If the balcony is irregular, a quieter mesh is usually the calmer fit.",
    climate: "Dark mesh reads quieter on most Hyderabad elevations. Society colour rules are checked before the yarn is ordered.",
    spec: "Aperture, colour and whether the panel must unhook for painting.",
  },
};

const fallbackEssay = {
  how: "The system is measured to the opening, specified in writing, and fitted to the substrate that is actually there.",
  compare: "We compare this brief with the other categories on this site — cable, mesh, bird exclusion and utility — and we say when this page is the wrong product.",
  climate: "Hyderabad is one service area. Summer UV, monsoon damp and pigeon pressure on AC ledges are the local notes. The locality page carries the housing detail.",
  spec: "Materials, access and labour are named. One rate for every balcony is not.",
};

export function essayFor(service: Service) {
  return essays[service.slug] ?? fallbackEssay;
}

export function wikiServiceModules(service: Service): PageModule[] {
  const essay = essayFor(service);
  const family = serviceFamily(service);
  return [
    { type: "prose", title: "How the system works", paragraphs: [essay.how, essay.spec] },
    { type: "prose", title: "How it compares with other categories", paragraphs: [essay.compare] },
    { type: "prose", title: "Hyderabad climate and materials", paragraphs: [essay.climate] },
    { type: "list", title: "Aftercare", items: [...aftercareByFamily[family]] },
    { type: "list", title: "What this is not", items: [...limitationsByFamily[family]] },
  ];
}

export function wikiCityModules(city: City): PageModule[] {
  return [
    {
      type: "prose",
      title: `Geography and housing in ${city.name}`,
      paragraphs: [
        `${city.name} is in ${city.district} district, ${city.region}. ${city.intro}`,
        `The housing we are asked to measure is ${city.housing}. Openings are not identical across the town: a new apartment railing and an old-town window are different substrates even when they share a pin code.`,
        city.climate,
      ],
    },
    {
      type: "list",
      title: "What a measurement looks for here",
      items: [
        "Opening size, shape and the gap above any railing",
        "Wall or slab condition, including plaster over brick",
        "Who uses the space — children, pets, birds, drying or sport",
        "Society or owner permission when the facade or duct is common",
        city.materialHint,
      ],
    },
    {
      type: "prose",
      title: "Categories we fit in this district",
      paragraphs: [
        `Protection work covers invisible grills, balcony and children nets, pet and cat nets, staircase and terrace panels, and, where the site is real, monkey-prone or building-covering jobs. Bird control covers pigeon nets, bird nets, spikes and ducts. Utility covers cloth hangers, sports and cricket nets, and mosquito screens. ${city.name} does not need every category on every street. The visit names the one that fits.`,
      ],
    },
  ];
}

export function wikiAreaModules(city: City, area: Area, service?: Service): PageModule[] {
  const family = service ? serviceFamily(service) : "mesh";
  const essay = service ? essayFor(service) : fallbackEssay;
  return [
    {
      type: "prose",
      title: `${area.name} in the ${city.name} map`,
      paragraphs: [
        `${area.name} is a named locality in ${city.name}, ${city.district} district. ${area.detail}`,
        `Fittings here follow the ${city.region} climate note: ${city.climate} Access, society rules and the age of the building still change the slot even when the neighbourhood is only a few kilometres from the hub.`,
        service
          ? `${service.name} in ${area.name} is not a copied city paragraph. The opening in this street — ${area.detail} — is what the measure follows. ${essay.how}`
          : `Homeowners here typically ask about balcony fall gaps, pigeon ledges, window openings and drying space. Each of those is a different category on this site.`,
      ],
    },
    {
      type: "list",
      title: `Practical notes for ${area.name}`,
      items: [
        `Housing pattern: ${area.detail}`,
        `City climate: ${city.climate}`,
        `Material conversation: ${city.materialHint}`,
        `Visit plan: ${city.visitNote}`,
        service ? `This page's category: ${service.group} — ${service.name}` : "All categories can be quoted after a photo or a visit",
      ],
    },
    { type: "list", title: "Aftercare in this climate", items: [...aftercareByFamily[family]] },
  ];
}

export function wikiCompareList(service: Service): PageModule {
  return {
    type: "list",
    title: "Choose this category when",
    items: [
      essayFor(service).compare,
      ...service.where.map((item) => `Typical opening: ${item}`),
    ],
  };
}

export function popularSearchPhrases(service: Service, city?: City): string[] {
  const name = service.name.toLowerCase();
  const place = city?.name ?? "Hyderabad";
  return [
    `${name} in ${place}`,
    `${name} installation in ${place}`,
    `how ${name} are specified in ${place}`,
    `${name} versus other balcony options`,
  ];
}
