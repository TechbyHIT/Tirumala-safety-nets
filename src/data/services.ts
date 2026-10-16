export type Faq = { q: string; a: string };

export type Intent = {
  slug: string;
  title: string;
  angle: string;
};

export type Service = {
  slug: string;
  name: string;
  group: "Protection" | "Bird control" | "Utility";
  summary: string;
  lede: string;
  problems: string[];
  benefits: string[];
  where: string[];
  materials: string[];
  priceFactors: string[];
  faqs: Faq[];
  intents: Intent[];
};

export const services: Service[] = [
  {
    slug: "invisible-grills",
    name: "Invisible Grills",
    group: "Protection",
    summary:
      "Tensioned stainless cables for balconies and windows that keep the outlook open while closing the fall gap.",
    lede:
      "An invisible grill is a run of stainless steel cable, tensioned between measured anchor points, so a balcony or window stays bright and ventilated. It is a fall barrier, not a welded iron frame, and it is planned around the opening you actually have.",
    problems: [
      "Open balconies in apartment towers are a real fall risk for children, older family members and pets.",
      "Painted iron grills block breeze, darken the room and rust along the coast and in humid delta towns.",
      "Builder-supplied railings often stop well below a safe height once a family starts using the balcony.",
    ],
    benefits: [
      "The view, daylight and airflow stay largely as they were.",
      "Cable grade — SS304 or marine-leaning SS316 — is named in the written quote, not hidden behind a package name.",
      "Spacing is set for the household: wider for general fall protection, closer where toddlers or small pets are the concern.",
      "Anchor points are few compared with a full iron grill, and the finish is planned before drilling starts.",
    ],
    where: [
      "Apartment balconies and French windows",
      "Villa decks and sit-outs",
      "Staircase voids that need a transparent barrier",
      "Commercial frontages where an iron grille would spoil the facade",
    ],
    materials: [
      "SS304 cable for inland and drier towns",
      "SS316 cable where salt air and long monsoon humidity are part of the site",
      "Stainless turnbuckles, ferrules and wall anchors matched to the substrate",
    ],
    priceFactors: [
      "Running length and the number of cable lines",
      "SS304 versus SS316",
      "Wall or slab condition, and whether extra plates are needed",
      "Floor height, society permission and access time",
      "Bends around pillars, AC outdoor units and existing railings",
    ],
    faqs: [
      {
        q: "How much drilling does an invisible grill need?",
        a: "Only the anchor points at each end of a cable run, plus intermediate supports on long spans. That is far less cutting than a welded iron grill. We mark the points after measurement so you can see them before work starts.",
      },
      {
        q: "Will the cables rust in Hyderabad weather?",
        a: "Hyderabad is not a sea-coast city, but monsoon damp and dust still mark ordinary mild steel. SS304 cable and stainless hooks are the usual specification. The grade is written in the quote after the opening is seen.",
      },
      {
        q: "Can a child climb an invisible grill?",
        a: "Cables reduce the chance of a fall through an open balcony. They are not a substitute for supervision. Spacing is tightened when the brief is child safety, and we say so during the visit if a net is the better barrier for that opening.",
      },
      {
        q: "How long does fitting take?",
        a: "A single straight balcony is often completed in one planned visit after materials are ready. Multiple openings, high floors or awkward access can need a longer slot. The quote states the visit plan.",
      },
    ],
    intents: [
      {
        slug: "invisible-grills-for-balcony",
        title: "Invisible Grills for Balconies",
        angle:
          "Balcony work is planned from parapet to slab, including the gap above a low railing and the turns around columns.",
      },
      {
        slug: "invisible-grills-for-windows",
        title: "Invisible Grills for Windows",
        angle:
          "Window cables sit inside the reveal where possible so shutters, mosquito mesh and curtains still have room to move.",
      },
      {
        slug: "invisible-grills-for-apartments",
        title: "Invisible Grills for Apartments",
        angle:
          "Apartment jobs include society permission, service-lift timing and a finish that does not scar the common facade.",
      },
      {
        slug: "invisible-grills-for-villas",
        title: "Invisible Grills for Villas",
        angle:
          "Villas often mix wide sit-outs, stair voids and odd corner openings. Each run is measured instead of forcing one spacing everywhere.",
      },
      {
        slug: "invisible-grills-for-child-safety",
        title: "Invisible Grills for Child Safety",
        angle:
          "Closer cable spacing and a clear handover on what the grill does — and does not — do for a toddler.",
      },
      {
        slug: "invisible-grills-for-pet-safety",
        title: "Invisible Grills for Pet Safety",
        angle:
          "Cats and small dogs need tighter spacing than a general fall barrier. We confirm the pet and the gap before recommending cable or mesh.",
      },
    ],
  },
  {
    slug: "safety-nets",
    name: "Safety Nets",
    group: "Protection",
    summary:
      "Knotted, UV-stabilised mesh for wider openings where a soft barrier fits better than cable.",
    lede:
      "A safety net is a tensioned mesh panel anchored around an opening so people, pets and objects are far less likely to pass through. It suits wide balconies, terraces, ducts and stair voids where cable lines alone would leave too much gap.",
    problems: [
      "Large or irregular openings are awkward and costly to close with cable or iron.",
      "Families want fall protection without turning the balcony into a dark cage.",
      "Loose, untensioned net looks untidy and sags after the first monsoon.",
    ],
    benefits: [
      "Mesh keeps light and air moving while closing the opening.",
      "UV-stabilised HDPE or nylon is chosen for the sun load of that town.",
      "Panels can be planned so a section is removable for painting or deep cleaning.",
      "Edges are finished with a border rope so the net does not fray at the hooks.",
    ],
    where: [
      "Balconies from railing to ceiling",
      "Terrace edges and open staircases",
      "Duct and utility shafts",
      "School and apartment common areas",
    ],
    materials: [
      "UV-stabilised HDPE mesh",
      "Braided or twisted nylon where a softer hand-feel is preferred",
      "Stainless or coated hooks sized to the wall",
    ],
    priceFactors: [
      "Square area and mesh density",
      "HDPE versus nylon, and whether a branded net is requested",
      "Number of corners, pipes and level changes",
      "Height and the time needed for safe access",
    ],
    faqs: [
      {
        q: "Do safety nets block air and light?",
        a: "A correctly chosen mesh is see-through and lets breeze through. It is not a solid shutter. Very fine insect mesh is a different product — we do not sell mosquito net as fall protection.",
      },
      {
        q: "Are mosquito nets the same as safety nets?",
        a: "No. Mosquito mesh is an insect screen. Safety nets and invisible grills are planned as fall or exclusion barriers. The yarn, knot and fixing are different, and we name which system the quote is for.",
      },
      {
        q: "Can the net be removed later?",
        a: "Many balcony panels are planned with a release edge so the net can come down for painting or a function and go back up. We show you that edge at handover.",
      },
    ],
    intents: [
      {
        slug: "balcony-safety-nets-for-high-rise-buildings",
        title: "Safety Nets for High-Rise Buildings",
        angle:
          "High floors need society permission, a wind check on the fixing line, and a slot that respects other flats.",
      },
    ],
  },
  {
    slug: "balcony-safety-nets",
    name: "Balcony Safety Nets",
    group: "Protection",
    summary:
      "Mesh from the balcony railing up to the slab, fitted to the shape of that balcony.",
    lede:
      "Balcony safety nets close the open band above the railing — the gap children, pets and falling objects actually use. The panel follows straight, L-shaped and slightly curved balconies instead of stopping at the easy rectangle.",
    problems: [
      "A railing at waist height does not stop a climbing child.",
      "L-shaped and column-broken balconies are where generic nets gap.",
      "Coastal wind loosens a net that was only hooked at the corners.",
    ],
    benefits: [
      "The balcony stays usable for sitting, plants and drying.",
      "Border finishing is planned so the mesh does not saw against the railing.",
      "Tension is set so the panel looks even from the street and from inside.",
    ],
    where: ["Apartment balconies", "Independent house sit-outs", "Duplex upper terraces"],
    materials: ["UV-stabilised HDPE or nylon", "Border rope", "Weather-resistant hooks"],
    priceFactors: [
      "Railing-to-slab height and balcony length",
      "Columns, planters and AC units inside the line",
      "Mesh grade and coastal versus inland exposure",
    ],
    faqs: [
      {
        q: "Will the net spoil the building elevation?",
        a: "A dark, even mesh read from a distance as a quiet shade, not as a patchwork. We align hooks and keep spare yarn off the facade. Society rules on colour are checked before the quote is locked.",
      },
      {
        q: "Can this be fitted in a rented flat?",
        a: "Yes, with the owner's and, where the rules require it, the association's permission. Fixings are kept as small as the substrate allows.",
      },
    ],
    intents: [
      {
        slug: "balcony-safety-nets-for-apartments",
        title: "Balcony Safety Nets for Apartments",
        angle:
          "Apartment balconies are measured with the neighbour's line, the false ceiling and the sliding door track in mind.",
      },
    ],
  },
  {
    slug: "children-safety-nets",
    name: "Children Safety Nets",
    group: "Protection",
    summary:
      "Soft, strong mesh planned around how children actually use balconies, windows and stairs.",
    lede:
      "Children safety nets are specified for pull, climb and lean — not just for covering a hole. The mesh is soft on contact and the anchors are placed where a child cannot work a hook loose.",
    problems: [
      "Toddlers treat railings as climbing frames.",
      "Window sills at bed height are an easy step.",
      "Open staircases in duplex houses have gaps adults stop noticing.",
    ],
    benefits: [
      "Mesh density is discussed for the age of the child, not copied from a catalogue photo.",
      "Contact surface stays soft compared with iron bars.",
      "Parents get a short care note: what to check after monsoon and after festival cleaning.",
    ],
    where: ["Balconies", "Low windows", "Internal stair voids", "Play corners on a terrace"],
    materials: ["Soft knotted nylon or HDPE", "Close mesh", "Tamper-resistant edge fixing"],
    priceFactors: ["Number of openings", "Mesh closeness", "Stair geometry", "Access"],
    faqs: [
      {
        q: "Is a net enough if my child climbs well?",
        a: "A net lowers risk. It does not replace watching a young child on a balcony. If the opening is better closed with closer invisible-grill cables, we say that on site.",
      },
    ],
    intents: [
      {
        slug: "children-safety-nets-for-balcony",
        title: "Children Safety Nets for Balconies",
        angle:
          "The panel runs railing to slab, including the side returns a child can reach beside a column.",
      },
    ],
  },
  {
    slug: "pet-safety-nets",
    name: "Pet Safety Nets",
    group: "Protection",
    summary:
      "Tighter mesh so cats cannot slip through and dogs cannot push a sagging panel aside.",
    lede:
      "Pet safety nets use a smaller aperture and a tougher edge because cats test corners and dogs lean with their full weight. The balcony can stay open for them without becoming a fall risk.",
    problems: [
      "Standard balcony mesh can still pass a slim cat at the corner.",
      "Dogs push the lower edge if the border is loose.",
      "Chewing at a hook line frays a cheap yarn.",
    ],
    benefits: [
      "Aperture is chosen after you tell us the pet, not before.",
      "Lower edge is tied so it cannot be nosed up.",
      "The balcony remains a place the pet can use.",
    ],
    where: ["Balconies", "Windows", "Terrace pet corners"],
    materials: ["Tighter HDPE or nylon", "Reinforced border", "Covered hooks where chewing is likely"],
    priceFactors: ["Pet size and behaviour", "Aperture", "Length of chew-risk edge"],
    faqs: [
      {
        q: "Will this hold a large dog leaning on it?",
        a: "We look at the dog's weight and how the net is anchored. If the opening needs cable as well as mesh, the quote says so instead of overselling a light net.",
      },
    ],
    intents: [
      {
        slug: "pet-safety-nets-for-balcony",
        title: "Pet Safety Nets for Balconies",
        angle: "Corner gaps, planter ledges and the gap under a sliding shutter are part of the measure.",
      },
    ],
  },
  {
    slug: "pigeon-nets",
    name: "Pigeon Nets",
    group: "Bird control",
    summary:
      "A humane mesh barrier that stops pigeons nesting on balconies, ledges and ducts.",
    lede:
      "Pigeon nets close the volume birds actually occupy — the balcony box, the duct, the space above an AC unit — so they cannot land, nest or drop waste there. The birds are excluded, not harmed.",
    problems: [
      "Droppings stain floors, clog drains and make a balcony unusable.",
      "Nesting returns within days if only one ledge was spiked and the balcony stayed open.",
      "Fine debris and feathers aggravate asthma in small flats.",
    ],
    benefits: [
      "Mesh size is chosen to stop pigeons without looking like a solid wall.",
      "The balcony can be used again once the nest site is closed.",
      "No poison, gel or loose spike in a place where children play.",
    ],
    where: ["Balconies", "Utility ducts", "AC ledges opening into a balcony", "Stair headrooms"],
    materials: ["UV-stabilised HDPE pigeon mesh", "Stainless hooks", "Border cord"],
    priceFactors: ["Volume to be closed", "Pipes and beams inside the net line", "Access and cleaning of old droppings"],
    faqs: [
      {
        q: "Will pigeons get trapped inside?",
        a: "We clear birds before the last edge is closed, and we leave the sequence so a bird can leave. The point of the net is to stop a new nest, not to trap a flock.",
      },
      {
        q: "What is a sensible pigeon-net price?",
        a: "Area, corners and height change the quote more than a single rate per square foot. We measure and write the figure down. We do not publish a statewide rate that would be wrong for your opening.",
      },
    ],
    intents: [
      {
        slug: "pigeon-nets-for-balcony",
        title: "Pigeon Nets for Balconies",
        angle: "The full balcony volume is closed, including the return beside the drying area.",
      },
      {
        slug: "pigeon-nets-for-duct-area",
        title: "Pigeon Nets for Duct Areas",
        angle: "Shaft nets are planned so maintenance crews can still open a documented access flap.",
      },
    ],
  },
  {
    slug: "bird-nets",
    name: "Bird Nets",
    group: "Bird control",
    summary:
      "Exclusion nets for pigeons and other perch birds on balconies, sheds and shafts.",
    lede:
      "Bird nets are the broader exclusion job: pigeons on homes, and mixed birds on sheds, warehouses and service shafts. The mesh and the fixing follow the species and the structure, after we see where they sit.",
    problems: [
      "Birds use the same beam every evening and foul the floor below.",
      "A net with the wrong aperture stops nothing or traps smaller birds.",
      "Industrial sheds need a different span plan than a flat balcony.",
    ],
    benefits: [
      "Aperture and colour are chosen for the site.",
      "Fixing respects sheet roofs, trusses and concrete alike.",
      "The method stays physical and humane.",
    ],
    where: ["Homes", "Apartment shafts", "Parking sheds", "Small commercial roofs"],
    materials: ["HDPE bird mesh", "Cable supports on longer spans", "Edge ties"],
    priceFactors: ["Span", "Roof type", "Working height", "Mesh specification"],
    faqs: [
      {
        q: "When should I choose spikes instead?",
        a: "Spikes suit a narrow ledge where birds only perch. Nets suit a volume they enter. Many buildings need both. We recommend after looking, not from the phone.",
      },
    ],
    intents: [
      {
        slug: "bird-nets-for-duct-area",
        title: "Bird Nets for Duct Areas",
        angle: "Duct nets include a way for the plumber or AC technician to open the shaft later.",
      },
    ],
  },
  {
    slug: "anti-bird-spikes",
    name: "Anti Bird Spikes",
    group: "Bird control",
    summary:
      "Stainless spike strips that stop birds landing on ledges, parapets and signboards.",
    lede:
      "Anti bird spikes are a row of blunt stainless pins on a base strip. Birds cannot settle comfortably, so they move on. The pins are a deterrent, not a trap, and they suit edges where a net would be the wrong tool.",
    problems: [
      "Parapet walls and sunshades become night roosts.",
      "Droppings streak the elevation and the signboard.",
      "Netting a thin ledge looks heavy and still leaves the wall top open.",
    ],
    benefits: [
      "Low visual bulk on a parapet or ledge.",
      "Stainless strips cope better with rain than plastic pins in the sun.",
      "No poison and no sticky gel to smear in summer heat.",
    ],
    where: ["Parapets", "Window ledges", "AC trays", "Signboards and beams"],
    materials: ["Stainless steel spike strips", "UV-stable adhesive or mechanical fix"],
    priceFactors: ["Running metres", "Strip density", "Surface (concrete, metal, stone)", "Access"],
    faqs: [
      {
        q: "Do spikes hurt the birds?",
        a: "They are spaced so a bird cannot get a grip. They are not designed to impale. We do not fit spikes where a child can grab them at hand height inside a home.",
      },
    ],
    intents: [
      {
        slug: "anti-bird-spikes-for-pigeon-control",
        title: "Anti Bird Spikes for Pigeon Control",
        angle: "Spikes on the landing strip, and a net only if pigeons are entering a whole balcony.",
      },
    ],
  },
  {
    slug: "duct-area-nets",
    name: "Duct Area Nets",
    group: "Bird control",
    summary:
      "Shaft and service-duct nets that stop birds without blocking the technician's access.",
    lede:
      "Service ducts in apartment blocks collect pigeons, waste and smell. A duct net closes the open face at the right floors and keeps a planned opening for the people who service pipes and AC lines.",
    problems: [
      "Open ducts become nesting towers.",
      "A fully sealed net blocks the plumber on the next leak.",
      "Smell and mites travel into adjacent kitchens.",
    ],
    benefits: [
      "Birds stay out of the shaft.",
      "An access flap is marked and explained to the association.",
      "Mesh is chosen for dust and weather, not only for looks.",
    ],
    where: ["Plumbing ducts", "AC service shafts", "Light wells"],
    materials: ["HDPE shaft mesh", "Framed or roped edges", "Labelled access opening"],
    priceFactors: ["Number of floors covered", "Shaft size", "Existing clutter", "Permission to work in common area"],
    faqs: [
      {
        q: "Who has to approve duct work?",
        a: "In most apartments the association does, because the shaft is common. We can explain the access flap in writing so the committee has something clear to approve.",
      },
    ],
    intents: [
      {
        slug: "duct-area-nets-for-duct-area",
        title: "Duct Nets for Service Shafts",
        angle: "Each shaft is measured for pipes, not estimated from the corridor width.",
      },
    ],
  },
  {
    slug: "terrace-safety-nets",
    name: "Terrace Safety Nets",
    group: "Protection",
    summary:
      "Overhead and edge nets for open terraces used by children or exposed to birds.",
    lede:
      "Terrace safety nets cover open edges and, where needed, the overhead span so a terrace can be used for play or drying without an open fall or a bird problem. The pole or cable layout follows the terrace you have.",
    problems: [
      "Open terrace edges on independent houses are rarely at a safe height.",
      "Overhead bird soiling makes the terrace unusable in the evening.",
      "A net without a proper edge rope fails at the first storm wind.",
    ],
    benefits: [
      "Edge and overhead needs are quoted separately so you do not buy both by default.",
      "UV load on west-facing Hyderabad terraces is part of the material talk.",
      "The terrace remains open to air.",
    ],
    where: ["House terraces", "Apartment roof decks", "Play corners"],
    materials: ["UV HDPE", "Support cable or light poles where the span needs them"],
    priceFactors: ["Edge length versus overhead area", "Span", "Parapet condition", "Wind exposure"],
    faqs: [
      {
        q: "Do I need a full overhead cage?",
        a: "Only if birds or falling objects from above are the problem. Many terraces only need the open edge closed. We separate those two quotes.",
      },
    ],
    intents: [
      {
        slug: "terrace-safety-nets-for-terrace",
        title: "Terrace Safety Nets for Open Terraces",
        angle: "Parapet height, water tanks and solar frames are measured before the net line is drawn.",
      },
      {
        slug: "terrace-safety-nets-for-fall-protection",
        title: "Terrace Nets for Fall Protection",
        angle: "Fall protection focuses on the open edge and stair head, not on covering the whole sky.",
      },
    ],
  },
  {
    slug: "staircase-safety-nets",
    name: "Staircase Safety Nets",
    group: "Protection",
    summary:
      "Mesh for open stair wells and duplex voids so a gap beside the flight is closed.",
    lede:
      "Open staircases look light and leave a dangerous void. Staircase safety nets follow the rake of the flight and the landing, with tension that does not pull the handrail out of line.",
    problems: [
      "Children slide toward the open side of a stair.",
      "A vertical gap beside a floating tread is wider than it looks.",
      "Iron infill would make a duplex stair feel closed in.",
    ],
    benefits: [
      "The stair stays visually open.",
      "The net follows the slope instead of leaving triangular holes.",
      "Fixings avoid the structural screws of the handrail where we can.",
    ],
    where: ["Duplex stairs", "Apartment fire-stair landings where permitted", "Lofts"],
    materials: ["Soft strong mesh", "Closely spaced anchors along the rake"],
    priceFactors: ["Number of flights", "Void width", "Handrail material", "Working room"],
    faqs: [
      {
        q: "Can you net a staircase without removing the handrail?",
        a: "Usually yes. We anchor to the adjacent wall or stringer and keep the handrail's own fixings intact. If the rail itself is loose, we tell you before we load it.",
      },
    ],
    intents: [
      {
        slug: "staircase-safety-nets-for-child-safety",
        title: "Staircase Nets for Child Safety",
        angle: "Landings and the triangular gap under the first flight are included, not only the pretty mid-span.",
      },
      {
        slug: "staircase-safety-nets-for-staircase",
        title: "Open Staircase Nets",
        angle: "Each flight is measured on the rake so the panel does not wrinkle or gap at the turn.",
      },
    ],
  },
  {
    slug: "cloth-hangers",
    name: "Cloth Hangers",
    group: "Utility",
    summary:
      "Ceiling and wall drying systems that free the balcony floor.",
    lede:
      "Cloth hangers lift drying off the floor. Ceiling units with a pulley suit a balcony with clear height. Wall-mounted rods suit a utility corner. The span, drop and rod count are taken from your slab and your wash load, not from a showroom photo.",
    problems: [
      "Drying racks eat the only outdoor space in a small flat.",
      "Mild-steel rods rust and stain clothes in humid towns.",
      "A hanger that is too long for the slab sags in the middle.",
    ],
    benefits: [
      "Floor space comes back for a chair or a child.",
      "Aluminium or stainless rods are chosen for coastal humidity.",
      "Pulley travel is checked so the rack clears the fan and the light.",
    ],
    where: ["Balconies", "Utility areas", "Service balconies behind the kitchen"],
    materials: ["Aluminium or stainless rods", "Pulley and cord rated for a wet load", "Ceiling anchors"],
    priceFactors: ["Rod length and count", "Ceiling versus wall", "Slab condition", "Pulley type"],
    faqs: [
      {
        q: "Will a ceiling hanger hold bedsheets?",
        a: "Wet cotton is heavy. We size the rod count and anchors for a normal family wash and tell you the limit in plain language at fitting.",
      },
    ],
    intents: [
      {
        slug: "cloth-hangers-for-balcony",
        title: "Cloth Hangers for Balconies",
        angle: "We check ceiling height, the fan sweep and the door head before the rods are cut.",
      },
    ],
  },
  {
    slug: "sports-nets",
    name: "Sports Nets",
    group: "Utility",
    summary:
      "Practice and perimeter nets sized to the ground, terrace or academy bay.",
    lede:
      "Sports nets are built to the bay you have: a terrace cricket strip, a school side court, or a perimeter that keeps balls inside a ground. Pole spacing, net strength and height come from the sport and the site, after a measure.",
    problems: [
      "A light balcony net fails on the first hard shot.",
      "Wrong height sends balls into the next house.",
      "Poles planted without a footing lean after rain.",
    ],
    benefits: [
      "Net specification matches impact, not just shade.",
      "Layout is drawn to the actual ground size.",
      "Schools and academies get a written scope before work.",
    ],
    where: ["School grounds", "Apartment terraces", "Coaching camps", "Backyards"],
    materials: ["Heavy knotted sports net", "Poles and footing suited to the soil or slab"],
    priceFactors: ["Sport", "Bay size", "Height", "Pole foundation", "Overhead need"],
    faqs: [
      {
        q: "Can a terrace take a practice net?",
        a: "Sometimes. We look at slab load, waterproofing and where poles can land. If the terrace is wrong for poles, we say so before anyone drills.",
      },
    ],
    intents: [],
  },
  {
    slug: "cricket-nets",
    name: "Cricket Nets",
    group: "Utility",
    summary:
      "Practice lanes with side and, where needed, top netting for coaching and house terraces.",
    lede:
      "Cricket practice nets take repeated impact. Lane width, height behind the bowler and the back net are set for the level of play — backyard practice is not a district academy, and the quote should not pretend it is.",
    problems: [
      "Short side nets let catches and throws leave the lane.",
      "A single back sheet wears through at the batsman's arc.",
      "Neighbour complaints start when height is guessed.",
    ],
    benefits: [
      "Lane size is agreed on site.",
      "Heavier net is used on the hitting face.",
      "Indoor and outdoor jobs are specified differently.",
    ],
    where: ["Academies", "School grounds", "Society grounds", "Large terraces after a slab check"],
    materials: ["Heavy cricket netting", "Supported poles", "Ground anchors or base plates"],
    priceFactors: ["Number of lanes", "Height and top net", "Surface", "Usage level"],
    faqs: [
      {
        q: "Do you build multi-lane nets?",
        a: "Yes, when the ground allows. Each lane is measured. We do not stretch one price across a guess.",
      },
    ],
    intents: [
      {
        slug: "cricket-nets-for-practice-grounds",
        title: "Cricket Nets for Practice Grounds",
        angle: "Lane width, bowler run-up and the neighbour line are marked before poles are ordered.",
      },
    ],
  },
  {
    slug: "mosquito-nets",
    name: "Mosquito Nets",
    group: "Utility",
    summary:
      "Insect screens for windows and balconies — a different system from fall-safety nets.",
    lede:
      "Mosquito nets are fine insect screens on a stitched or framed panel. They keep mosquitoes out of a room. They are not a child fall barrier. If you need both, we quote them as two systems that can share a balcony without being confused for each other.",
    problems: [
      "Delta and coastal evenings bring heavy mosquito pressure.",
      "A safety net's apertures still let insects through.",
      "Poorly fitted screens leave a gap at the track.",
    ],
    benefits: [
      "We say clearly when a job is insect control.",
      "Window and balcony screens are measured to the shutter.",
      "You can add fall protection as a separate line if the opening needs it.",
    ],
    where: ["Bedroom windows", "Balcony doors", "Utility windows"],
    materials: ["Fine HDPE or fibreglass insect mesh", "Velcro, magnetic or framed fixing"],
    priceFactors: ["Opening count", "Frame style", "Door traffic", "Colour"],
    faqs: [
      {
        q: "Can one net stop mosquitoes and stop a fall?",
        a: "Not well. Fall mesh is too open for mosquitoes, and insect mesh is not specified as a fall barrier. We quote the one you need, or both, as separate lines.",
      },
    ],
    intents: [
      {
        slug: "mosquito-nets-for-windows",
        title: "Mosquito Nets for Windows",
        angle: "Screens follow the shutter type — sliding, openable or fixed — so the gap at the frame is closed.",
      },
      {
        slug: "mosquito-nets-for-balcony",
        title: "Mosquito Nets for Balconies",
        angle: "A balcony insect screen is planned so the door still opens and the safety system, if any, stays independent.",
      },
    ],
  },
  {
    slug: "cat-safety-nets",
    name: "Cat Safety Nets",
    group: "Protection",
    summary:
      "Tight-aperture balcony and window mesh planned around how cats sit on railings and slip through corners.",
    lede:
      "A cat safety net is a closer mesh than a general pet panel. It is measured around sills, planter ledges and the gap under a sliding shutter — the places a cat actually tests — not only the pretty mid-rail.",
    problems: [
      "A slim cat can pass a corner that looks closed to an adult.",
      "Standard balcony mesh is often still too open at the return beside a column.",
      "Window sills at sofa height become a step.",
    ],
    benefits: [
      "Aperture is chosen after we know the cat, not from a generic pet photo.",
      "Corners and shutter gaps are part of the measure.",
      "The balcony can stay a place the cat uses.",
    ],
    where: ["Apartment balconies", "Window sills", "Planter ledges", "Sliding balcony doors"],
    materials: ["Tight HDPE or nylon mesh", "Reinforced border", "Covered hooks on chew-risk edges"],
    priceFactors: ["Aperture", "Number of corners", "Shutter gap", "Floor height"],
    faqs: [
      {
        q: "Is a pigeon net enough for a cat?",
        a: "Usually not. Bird mesh can still pass a slim cat at a corner. We quote a cat-specific aperture or closer cable if that is the better barrier.",
      },
    ],
    intents: [
      {
        slug: "cat-safety-nets-for-balcony",
        title: "Cat Safety Nets for Balconies",
        angle: "The panel includes the return beside a column and the gap under the sliding door, not only the open rail.",
      },
    ],
  },
  {
    slug: "monkey-safety-nets",
    name: "Monkey Safety Nets",
    group: "Protection",
    summary:
      "Tougher outdoor mesh for hill-edge and foothill openings where monkeys, not only pigeons, use the terrace.",
    lede:
      "Monkey safety nets are specified for pull and climb on openings that actually see monkeys — foothill houses, fruit trees beside a terrace, agency-edge compounds. A pigeon net is the wrong product here, and we say so when the site has never seen a troop.",
    problems: [
      "Pigeon mesh tears when pulled by a larger animal.",
      "Open terraces beside trees become a bridge.",
      "Hill towns are sold a coastal pigeon package that does not fit.",
    ],
    benefits: [
      "Yarn and fixing are assessed for the site, not copied from a balcony pigeon page.",
      "We only recommend this category where the geography makes sense.",
      "Access for people using the terrace is planned before the last edge is closed.",
    ],
    where: ["Foothill terraces", "Hill-edge houses", "School compounds in agency towns", "Fruit-tree sit-outs"],
    materials: ["Heavier knotted outdoor mesh", "Closer hook lines", "Support cable on longer spans"],
    priceFactors: ["Opening size", "Tree cover", "Yarn grade", "Access"],
    faqs: [
      {
        q: "Do you fit this in a delta apartment?",
        a: "Only if there is a real wildlife brief. We do not advertise monkeys on a Kakinada flat that has a pigeon problem.",
      },
    ],
    intents: [
      {
        slug: "monkey-safety-nets-for-terrace",
        title: "Monkey Safety Nets for Terraces",
        angle: "Tree lines, parapet height and how people use the terrace are marked before the mesh is specified.",
      },
    ],
  },
  {
    slug: "building-covering-nets",
    name: "Building Covering Nets",
    group: "Protection",
    summary:
      "Project mesh for elevations, work faces and temporary enclosures — scoped as site work, not a house balcony package.",
    lede:
      "Building-covering nets close or shelter a facade, a work area or a temporary enclosure. Overlap, fixing and who walks behind the mesh are the brief. This is not a priced-per-balcony product.",
    problems: [
      "A house balcony quote does not scale to a tower face.",
      "Wind on a tall elevation is ignored when the net is sold as shade cloth.",
      "Trades cut an unplanned hole and leave the cover useless.",
    ],
    benefits: [
      "Scope is written after a walk with the association or contractor.",
      "Access openings are labelled.",
      "We refuse a light net sold as a cyclone screen.",
    ],
    where: ["Apartment elevations under work", "School or hospital faces", "Temporary work enclosures", "Long facade runs"],
    materials: ["Project-grade mesh", "Overlap plan", "Fixings suited to the elevation"],
    priceFactors: ["Area", "Height", "Duration", "Wind exposure", "Access control"],
    faqs: [
      {
        q: "Is this the same as a balcony safety net?",
        a: "No. A balcony net is a household fall panel. Building cover is project mesh with a different yarn, overlap and permission path.",
      },
    ],
    intents: [
      {
        slug: "building-covering-nets-for-apartments",
        title: "Building Covering Nets for Apartments",
        angle: "Society permission, lift timing and the trade using the face are part of the measure.",
      },
    ],
  },
  {
    slug: "transparent-balcony-nets",
    name: "Transparent Balcony Nets",
    group: "Protection",
    summary:
      "Lower-visibility balcony mesh that still works as a fall panel, planned for light and a quieter elevation.",
    lede:
      "Transparent balcony nets use a finer or quieter mesh so the outlook and daylight stay part of the plan. Strength and even tension remain first. If the family wants almost no visual weight, invisible cable may be the cleaner brief.",
    problems: [
      "A thick dark patchwork net spoils a view-led balcony.",
      "Society rules on colour are discovered after the yarn is ordered.",
      "Fine mesh is sold as fall safety when it is only an insect screen.",
    ],
    benefits: [
      "Colour and aperture are agreed before cutting.",
      "The panel can be planned with a release edge for painting.",
      "We will say when cable is the better view-led system.",
    ],
    where: ["View-led apartment balconies", "High-rise sit-outs", "Society-sensitive facades"],
    materials: ["Lower-visibility UV mesh", "Even border rope", "Colour checked with the association"],
    priceFactors: ["Aperture", "Colour", "Run length", "Release-edge need"],
    faqs: [
      {
        q: "Will this look invisible?",
        a: "It looks quieter than a heavy sports mesh. It does not vanish. For a near-transparent line, ask about invisible grills.",
      },
    ],
    intents: [
      {
        slug: "transparent-balcony-nets-for-apartments",
        title: "Transparent Balcony Nets for Apartments",
        angle: "Elevation colour, railing-to-slab height and whether the panel must unhook are decided on site.",
      },
    ],
  },
];

export const serviceGroups = ["Protection", "Bird control", "Utility"] as const;

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getIntent(slug: string) {
  for (const service of services) {
    const intent = service.intents.find((item) => item.slug === slug);
    if (intent) return { service, intent };
  }
  return undefined;
}
