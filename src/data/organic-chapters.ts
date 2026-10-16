export type Chapter = {
  id: string;
  heading: string;
  tags: string[];
  paragraphs: string[];
  points?: string[];
};

export type GuideQuestion = { q: string; a: string };

export const guideQuestions: GuideQuestion[] = [
  {
    q: "Do you quote from a photograph alone?",
    a: "A photo tells us the shape of the opening and whether a visit is worth booking. The written figure follows measurement of width, height, corners and the wall or slab that will hold the fitting.",
  },
  {
    q: "Is a pigeon net the same as a child safety net?",
    a: "No. A bird net closes a space pigeons enter. A child safety net is judged by who can lean, climb or slip through. If both worries are real, they are two lines on the quote, not one product with two names.",
  },
  {
    q: "Will an invisible grill suit every balcony?",
    a: "Cable suits a clear span when the household wants the view and the wall can take the fixings. A low, broken railing, a tight corner full of pipes, or a toddler who can climb may need a net instead. The visit says which.",
  },
  {
    q: "Can the same balcony have a net and a drying line?",
    a: "Often yes, if they are planned together. A hanger that sweeps through the net, or a net that blocks the only place to dry clothes, is a poor result. We measure both before anyone drills.",
  },
  {
    q: "Do you cover the whole of Hyderabad?",
    a: "The rota includes the IT corridor, the north and east apartment belts, Secunderabad, the central hills, the Old City side and the outer townships. Send the locality and we confirm the day before it is locked.",
  },
  {
    q: "What should I send before the visit?",
    a: "The locality, the floor, who uses the space, and one wide photo of the opening plus closer photos of the top and side edges. Society rules, if you already know them, save a second conversation.",
  },
];

export const chapters: Chapter[] = [
  {
    id: "opening",
    heading: "Start with the opening, not the product name",
    tags: ["general", "process"],
    paragraphs: [
      "Most enquiries arrive with a product already chosen: invisible grill, pigeon net, kids net, cloth hanger. The useful question is simpler. What is the opening, who uses it, and what has already gone wrong? A balcony that a toddler can reach is not the same job as a sunshade where pigeons only sit. A terrace used for drying is not a cricket lane. Naming the product first is how the wrong thing gets fitted.",
      "Hyderabad homes make this more obvious than a catalogue does. A twelfth-floor flat in Gachibowli, a walk-up in Secunderabad, and a villa plot off the Outer Ring Road can all ask for “a safety net” and mean three different openings. One has a glass railing and a strict association. One has old plaster and a low iron rail. One has a long terrace, a water tank and afternoon sun that cooks a cheap net. The page you are reading is here so those differences stay in view.",
      "Tirumala Safety Nets measures first. The written quote names what will be fitted, where it will be fixed, and what is not included. A single rate for every balcony in the city would be a fiction, so we do not print one. If a photograph is all you have today, send it. It is enough to start. It is not enough to finish the price.",
    ],
    points: [
      "Say who uses the space: children, pets, birds, drying, or play.",
      "Say what the edge is: railing, window, stair, duct, terrace or a real ground.",
      "Expect the quote to follow a measurement, not a package name.",
    ],
  },
  {
    id: "balconies",
    heading: "Balconies in Hyderabad apartments and houses",
    tags: ["net", "grill", "general"],
    paragraphs: [
      "A Hyderabad balcony is rarely an empty rectangle. There is usually a railing that stops too low, a column that breaks the line, an outdoor air-conditioner, a drying rod, and a door track that must still open. Any net or cable that ignores those pieces looks fine in a photo and fails at the corner, which is exactly where a child or a cat looks first.",
      "Apartments add a second layer. The outer face is often common property. Associations in Madhapur, Kukatpally, Kondapur and Secunderabad commonly want to know what will be drilled and whether the elevation will look patched. That conversation belongs before the visit is locked, not after the holes are there. Independent houses skip the association and still need the same measurement, because a stair void and a terrace are extra openings, not free extras on a balcony price.",
      "We treat the balcony as a used room, not a picture frame. If clothes are dried there, the hanger and the barrier are planned on one visit. If the railing is already loose or rusted through, it is not used as the thing that holds the new work. The quote says so. A neat line fixed to a rail that moves is not a safety job.",
    ],
    points: [
      "Corners, columns and pipes are part of the measurement.",
      "The door or shutter still has to travel after the work is up.",
      "A loose old railing is not treated as a fixing.",
    ],
  },
  {
    id: "windows",
    heading: "Windows, French doors and the shutter track",
    tags: ["grill", "net"],
    paragraphs: [
      "Window work fails when it is copied from a balcony. The shutter, the curtain and any insect screen still need to move. A line stretched across the track is refused, because the household will cut it the first week or stop using the window. The depth of the sill is taken with the leaf open, not from the street.",
      "French doors onto a narrow slab are common in newer towers and in older central homes. The cable or net has to leave the door a free swing and still close the gap at the hinge side. That gap is small in a sketch and large enough for a child to test. It is marked on site.",
      "Insect screens and safety nets are different products. A mosquito net is there to stop insects. It is not sold on this site as a fall barrier. If the worry is a fall, the safety net or the cable is a separate line. Combining the words on one invoice does not combine the jobs.",
    ],
  },
  {
    id: "children",
    heading: "Children and open edges",
    tags: ["child", "net", "grill"],
    paragraphs: [
      "Child safety follows who actually uses the opening. A toddler and a school-age child load a balcony differently. A low window beside a bed is a step. A stair with an open side is a different fall from a balcony with a builder railing. The brief is written that way. A decorative mesh with a wide gap is not described as child safety because a parent asked for peace of mind.",
      "Cable can be spaced more closely when the brief is children, and we say during the visit if a net is the more honest barrier for that opening. Neither product replaces supervision. We will not write that a grill or a net makes a balcony safe to leave a child in alone. What it can do is close the gap that is there today, in a way the household can see and check.",
      "Schools and apartment play areas sometimes ask for the same words and mean a stair, a corridor or a terrace edge. Those are measured as their own openings. A house balcony price is not stretched to cover them.",
    ],
    points: [
      "Name the child who uses the space, not a generic “kids safety” package.",
      "Low windows and stair gaps are separate from the balcony.",
      "A net or grill is not a substitute for watching a child.",
    ],
  },
  {
    id: "pets",
    heading: "Pets, cats and the corner by the door",
    tags: ["pet", "net"],
    paragraphs: [
      "Cats and small dogs do not test the middle of a balcony. They test the corner beside the sliding door, the gap above a low rail, and any place the net stops because the fitting looked finished from the room. A pet brief needs a tighter mesh than a general fall barrier, and it needs those corners closed on purpose.",
      "Cable leaves more space than a cautious pet owner usually wants. When that is true, mesh is the recommendation, not a compromise explained after the cables are up. If the household wants both the view and a cat kept in, we say which openings can take cable and which should be mesh. They can be different sides of the same flat.",
      "Rented flats still need the owner’s consent, and many associations want notice before a drill bit is used. We do not treat a tenant’s worry as permission to mark a facade. The visit can still happen so the owner sees a marked plan rather than a guess.",
    ],
  },
  {
    id: "birds",
    heading: "Pigeons, ledges and the difference between a net and spikes",
    tags: ["bird"],
    paragraphs: [
      "Pigeons in Hyderabad use the same places on very different buildings: the tray under an air-conditioner, a sunshade, the pocket beside a utility balcony, and the ledge that a deep eave keeps dry. A net is for a volume they walk into. Spikes are for a narrow perch. Using spikes across a balcony where birds already nest does not close the room. Using a net on a thin signboard ledge is the wrong tool.",
      "The last edge of a bird net is closed only after birds already inside can leave. Trapping pigeons in a duct or a balcony is not the job. Droppings on the slab are a cleaning job before a new net goes down, and we say so when the soil is heavy. Gel, poison and loose nails are not offered. Gels smear in this heat. Poison is not a fitting.",
      "Ducts are the other half of the same problem. A shaft that is common property needs a way in that stays labelled, because someone will have to reach a pipe later. The association should see that note before the shaft is closed. A pretty net with no flap becomes an argument the first time a plumber arrives.",
    ],
    points: [
      "Net for a space birds enter. Spikes for a perch.",
      "Birds already inside are given a way out.",
      "A duct keeps a labelled opening for later access.",
    ],
  },
  {
    id: "grills",
    heading: "Invisible grills and the view",
    tags: ["grill"],
    paragraphs: [
      "An invisible grill is stainless cable, tensioned between points that have been measured, so a balcony or window stays bright. It is not a welded iron frame with a new name. Households choose it when the outlook is part of why they use the room, and when the wall or slab can hold the fixings without relying on a rusted builder rail.",
      "The cable has to clear shutters, outdoor units and a low railing. Spacing is set after the visit, closer when children are the brief, ordinary when the worry is simply an open edge. We do not sell one spacing as a universal child product. Long runs need intermediate support. A single span pulled tight across a wide front looks clean and sags or loads the ends badly.",
      "Drilling is limited to the points that hold the runs, which is less cutting than a full iron grill, and those points are marked before work starts so you can see them. Hyderabad is not a sea coast, but monsoon damp still stains ordinary mild steel. The quote names stainless cable and stainless fittings. It does not hide the metal behind the word premium.",
    ],
  },
  {
    id: "nets",
    heading: "Safety nets for falls, not for every worry",
    tags: ["net"],
    paragraphs: [
      "A safety net on a balcony runs from the railing line to the slab, including the return beside a column and the gap above a low builder rail. It is there to close a fall. It is not an insect screen, not a pigeon solution by default, and not a sports net because the mesh looks similar in a thumbnail.",
      "West-facing openings along the IT corridor take a hard afternoon sun, and the rains keep walls damp for weeks. The net has to be made for that sun, and it has to be held all the way around. A sheet hooked only at the corners sags, and the sag becomes a pocket. Terraces fail the same way, faster, because there is no shade from the flat above.",
      "We do not call a balcony net cyclone-proof, unbreakable, or a guarantee that nobody can fall. Wind on an open terrace is a fixing question. If the span needs a structure we are not building, the job is refused or redrawn. That is a better outcome than a slogan.",
    ],
  },
  {
    id: "terrace-stair",
    heading: "Terraces, stairs and the gaps a balcony net does not close",
    tags: ["net", "child"],
    paragraphs: [
      "A terrace parapet can be low enough to be a fall edge even when the family only talks about drying clothes or a view. Overhead netting and an edge net are different lines. A water tank, a solar frame and a washing line change where the edge work can land. New villas on the Outer Ring Road often have all three.",
      "Duplex stairs leave a triangular gap under the first flight and an open side that a general balcony net never touches. The panel has to follow the flight and must not pull a loose handrail out of the wall. Hostel and rental stairs used by many people need a panel that can still let furniture turn.",
      "If the brief is only pigeons on a terrace ledge, spikes or a bird net may be the real job, and a fall net would be an extra. We separate those sentences on the quote so a terrace does not inherit a balcony package.",
    ],
  },
  {
    id: "drying",
    heading: "Cloth hangers and balconies that are also the laundry",
    tags: ["utility", "net"],
    paragraphs: [
      "In a great many Hyderabad flats the balcony is the drying yard. A ceiling hanger gives the floor back only if the slab height allows the rods to clear heads, fans and the door. A hanger planned after the net is up usually clashes with it. Planned together, the rod line and the safety line can share the corner.",
      "Ordinary iron rods mark clothes after the first wet spell. Aluminium or stainless is the usual recommendation once the monsoon sits on the metal. The quote says which. A mild-steel rod sold as a temporary extra is how the wall gets stained and the net gets blamed.",
      "Pulley systems and fixed rods are not the same product. The household should know whether the line stays down, whether it lifts, and whether it crosses the only place a person stands to water plants. That is a five-minute conversation on site and an expensive surprise later.",
    ],
  },
  {
    id: "sport",
    heading: "Cricket nets and other sports nets",
    tags: ["sport"],
    paragraphs: [
      "A practice net is justified when there is a ground, a lane or a school edge that is actually used for play. It is not a balcony net renamed because a child owns a bat. Bay size, the height of the play, and how the net is supported are the quote. A house balcony rate does not scale to a lane.",
      "Academies, apartment club grounds and school compounds each add access rules: when the ground can be closed, where poles may stand, and who maintains the net after monsoon. We write those limits down. A net described as suitable for every level of cricket, in every weather, is not a description we use.",
      "Boundary nets and overhead nets are different spans. Wind and sun matter more here than on a shaded balcony. The material has to be named for that exposure. If the site cannot hold the poles safely, we say so before anyone digs.",
    ],
  },
  {
    id: "zones",
    heading: "Hyderabad is more than one kind of building",
    tags: ["local", "general"],
    paragraphs: [
      "West Hyderabad, from Gachibowli and the Financial District through Kondapur, Madhapur and Kokapet, is mostly towers and gated communities. Balconies are wide, the view is part of the brief, and society rules on the facade are strict. Pigeons on air-conditioner ledges are a regular complaint beside the fall-safety question.",
      "The north and east belts, Kukatpally, Miyapur, Nizampet, Uppal, LB Nagar and Dilsukhnagar, are denser apartment blocks. Openings repeat, then break at a pipe or a column. Pigeon dust on service balconies is common. Each flat is still measured. A repeated plan is not a reason to skip the tape.",
      "Secunderabad and the cantonment side bring older plaster, mixed windows and ledges that have held birds for years. Central Banjara Hills and Jubilee Hills homes often want the outlook kept open, with stairs and wide sit-outs in the same house. The Old City and Mehdipatnam side mean tighter lanes, older walls, and more time simply to reach the opening. Outer townships and villa plots add long terraces. None of these is a slogan. They are reasons the same product name cannot carry one price.",
    ],
  },
  {
    id: "visit",
    heading: "How a visit and a written quote work",
    tags: ["process", "general"],
    paragraphs: [
      "Share the locality, the floor, and what the worry is. Add one wide photo and closer photos of the edges that can take a hook. If you already know the association will ask for a description, say that too. We confirm whether the area is on the rota before a day is promised.",
      "On site the opening is measured, including returns around columns and the places a door must still move. The wall or slab is looked at. A rusted rail is photographed rather than used. Old netting that cannot carry load is isolated instead of being asked to hold a new layer. The household sees the intended line before fitting, not only after.",
      "The quote lists the work, the material, the fixings, access, and what is excluded. Floor height and a narrow lift window change the labour even when the net or cable quantity stays the same. A price that skips the opening is not treated as final, and a discount that depends on hiding a second product inside the first line is not how the estimate is built.",
    ],
    points: [
      "Locality, floor, and a full photo are enough to ask for a visit.",
      "Measurement includes corners, doors and the condition of the railing.",
      "The written quote separates materials, labour and exclusions.",
    ],
  },
  {
    id: "after",
    heading: "After fitting: sun, rain and ordinary checks",
    tags: ["process", "general"],
    paragraphs: [
      "Hyderabad sun and the monsoon are the two stresses that show up after the team has left. A net that was never made for ultraviolet light goes brittle on a west-facing balcony or an open terrace. Ordinary mild-steel hooks mark the paint and weaken. Looking at the edges after the first heavy rains is reasonable care, not a complaint.",
      "You should be able to see how the tension, a removable edge, or a pulley is supposed to look. If a corner has been left open for cleaning or for a duct, that opening should be obvious, not a gap nobody mentioned. Children and pets still need the household’s own watch. The fitting does not retire that duty.",
      "Repair is a look at what failed: a cut flap, a sagging corner, a hook that rusted, a cable that loosened. Sometimes the old line can be refixed. Sometimes it should come down because it cannot carry load. We do not describe every callback as a full replacement, and we do not describe a repair as if it were a new warranty on the building.",
    ],
  },
  {
    id: "honest",
    heading: "What we will not claim",
    tags: ["general", "process"],
    paragraphs: [
      "This site does not invent star ratings, installation counts, years in business, or a rank in Hyderabad. Those lines persuade people who are not in the room and they are not a measurement. If a review is published later, it will be a real one. Until then, the evidence on the page is the photograph of the kind of opening and the description of the work.",
      "We also do not promise same-day fitting, a lifetime warranty, or a single price per square foot for the city. Access, associations, and the state of the wall change the day. A warranty, if one is offered on a job, will be written on that quote, not implied by a paragraph on the website.",
      "Comparisons stay practical. Iron grills block breeze and rust. Cable keeps a view and needs sound fixings. Mesh closes gaps cable leaves open. Spikes do not replace a net. Mosquito mesh does not replace a safety net. If a competitor’s product is right for an opening, the honest visit says that the brief does not match what we should fit.",
    ],
  },
  {
    id: "choose",
    heading: "How to choose between cable, mesh and spikes",
    tags: ["grill", "net", "bird", "general"],
    paragraphs: [
      "Choose cable when the span is reasonably clear, the household wants the daylight, and the fall risk is someone passing through an opening rather than a pet squeezing a corner. The wall must be able to hold the ends. A rusted decorative grill already in place is not automatically the anchor. If it moves when you lean on it, it is a liability, not a foundation.",
      "Choose mesh when the gap has to be smaller than cable can honestly make it: toddlers, cats, a stair void, a balcony with several returns, or a terrace edge the family actually walks along. Mesh is also the usual answer when pigeons enter a whole balcony rather than a single ledge. The look is quieter than iron and more present than cable. That is a fair trade when the brief is closing space.",
      "Choose spikes only for a perch: a sunshade nose, a parapet top, a sign, a narrow sill where birds sit and do not walk inside. Spikes on a place a child can grab are refused. Spikes plus a net is sometimes right, on different parts of the same building, and the quote should show them as neighbours, not as a bundle that inflates both.",
      "People often ask which is “best”. Best is the one that matches the opening in front of us. A villa terrace, a French window and a duct do not share a winner. If you tell us the worry first — fall, birds, drying, sport — the shortlist gets small quickly, and the visit is spent measuring rather than debating a catalogue.",
    ],
  },
  {
    id: "society",
    heading: "Associations, owners and rented flats",
    tags: ["process", "grill", "net", "local"],
    paragraphs: [
      "In most Hyderabad apartment towers the outside face is not yours alone. A hook that reads from the street, a net in a colour the elevation did not have, or a duct closed without a flap becomes a committee issue. Ask what the building already allows. If the rule is written, send it with the photos. If it is only a habit, the visit can still mark a modest fixing so the conversation is about a known mark.",
      "Renters should not drill on a guess. The owner’s yes, and the association’s yes where the facade is common, come before the bit. We can describe the work in writing so the owner is approving a plan. We do not treat urgency as consent. A safety worry is real and it is still someone else’s wall until that yes arrives.",
      "Independent houses are simpler on permission and harder on variety. The same family may need a balcony, a stair and a terrace, each with a different edge. Pricing them as one “full house package” hides which opening was actually measured. We would rather show three lines. You can drop one. You should not discover later that the stair was never in the figure.",
    ],
  },
  {
    id: "photos",
    heading: "Photographs that make the first conversation useful",
    tags: ["process", "general"],
    paragraphs: [
      "Stand inside the room and take one picture that shows the whole opening: both sides, the top, and the floor. Then move closer to the places a fixing might sit — the wall beside the column, the slab edge, the top of the railing, the shutter box. A single beauty shot of the view tells us almost nothing about the work.",
      "Include the obstacles. The outdoor unit, the existing rods, the planter that cannot move, the loose tile, the crack above the window. These are not flaws in your home to apologise for. They are the reason a rectangle from a website will not fit. If the opening is on a high floor, a photo of the balcony door and the lift lobby is enough for us to ask about access. You do not need to lean over the rail to photograph the street.",
      "Daylight is better than flash. If pigeons are the problem, a picture of the ledge where they sit is more useful than a picture of a bird in flight. If a child uses a low window, show the bed or the sofa that makes it a step. The photos do not replace the tape. They stop us booking a visit for the wrong product.",
    ],
    points: [
      "One wide photo of the whole opening.",
      "Closer photos of the edges that can take a hook.",
      "Include pipes, rods, plants and anything that cannot move.",
    ],
  },
  {
    id: "quote-lines",
    heading: "What a proper estimate is expected to list",
    tags: ["process", "general"],
    paragraphs: [
      "Read the quote as a description of this opening, not as a rate card. It should name the system — cable, mesh, spikes, a drying line, a sports net — and the reason that system was chosen. It should name the material in ordinary words: stainless cable, a net made for the sun, aluminium or stainless rods. “Premium” on its own is not a material.",
      "Size belongs on the page: the measured width and height, the extra returns, and anything excluded because it could not be reached or should not be drilled. Access belongs there too. A ground-floor house and a high floor with a booked lift window are different days even when the net is the same size. Society hours, a narrow stair for carrying rolls, and a need to protect a newly painted wall are labour, and they should be visible.",
      "Exclusions protect you. Removal of an old net, cleaning of heavy droppings, a second opening, a hanger, or a spike strip on a different ledge should not be silently inside the first price. If they are included, the line should say included. If they are not, you can add them with your eyes open. A round figure with no lines is how arguments start on fitting day.",
    ],
  },
  {
    id: "monsoon",
    heading: "Sun and rain after the first season",
    tags: ["process", "net", "grill", "local"],
    paragraphs: [
      "The first summer shows whether a net was made for ultraviolet light. West-facing balconies in Gachibowli, Kondapur, Manikonda and the villa edges toward Kokapet take the brunt. A net that chalks, splits at the knots, or goes brittle in one season was the wrong cloth, not bad luck. The quote should already have named a sun-safe net for those openings. If the balcony sits in deep shade under a projection, the conversation is different and we should not pretend every flat needs the same cloth.",
      "The first real monsoon shows the metal. Hooks and rods that are only painted mild steel leave marks on walls and on clothes. Stainless fittings cost more on the quote and less on the repaint. Cable that was sold as stainless should still look like stainless after the rains, not like a brown wire. If a fitting stains, tell us. A stain is information about the metal, not something to wipe away and forget.",
      "Dust, pigeon soil and city grime sit on the mesh and on ledges. A rinse and a look at the corners twice a year is ordinary housekeeping. It is not a service contract unless the quote says we will return. Cutting a hole because a festival light or a new pipe appeared later is a fresh opening. It needs a fresh edge, not a knot tied in the dark.",
    ],
  },
  {
    id: "old-and-new",
    heading: "Older buildings and new towers",
    tags: ["local", "grill", "net"],
    paragraphs: [
      "New towers often have tile or paint that the association has just finished, glass or mild-steel railings of uneven height, and a balcony deeper than the older city is used to. The fixing has to be smaller and cleaner, and the cable or net has to acknowledge a railing that was chosen for appearance. Drilling the glass is not a casual option. The plan goes beside it or above it, onto a surface that can hold.",
      "Older blocks in Secunderabad, the Old City lanes, Mehdipatnam and parts of east Hyderabad have plaster that sounds hollow, wood or steel windows that have moved, and stairs worn by decades of use. The bit and the plug follow the wall we find, not the wall a brochure assumes. Tight streets change the time to carry material up. That time is real. It is rude to discover it at the door and then invent a charge the quote never mentioned, so it belongs in the visit plan.",
      "Some homes have both: an old wing and a new extension, or a flat that was renovated on the inside and left original on the facade. Each opening is its own note. We do not average them into one description. If only one side is being done this month, the quote should not quietly assume the other three.",
    ],
  },
  {
    id: "commercial",
    heading: "Buildings, schools and grounds",
    tags: ["sport", "net", "bird"],
    paragraphs: [
      "A building cover during work is not a balcony net sold by the square foot of a flat. The elevation, the duration, the way the sheet is tied, and how people pass underneath decide the job. If that is not what we should take on, we say so. Apartment bird-netting and a full scaffold cover are easy to confuse in a search box and unwise to confuse on site.",
      "Schools ask about stair edges, corridor openings and sometimes a practice net. The child-safety brief and the sports brief stay apart. A stair used between classes cannot have a panel that becomes a trip or that pulls the handrail. A practice bay needs poles, a bay size and a time when the ground can be worked on. One purchase order can hold both lines. One product name should not.",
      "Clubhouses, small academies and apartment sports rooms sit between a home and a stadium. We measure the bay that exists. We do not borrow a specification from a professional ground and paste it onto a two-lane cage, and we do not call a residential net a match-grade system. Level of play, in plain words, is part of the note.",
    ],
  },
  {
    id: "care-visit",
    heading: "A simple check you can do without tools",
    tags: ["process", "child", "pet", "bird"],
    paragraphs: [
      "Once a month, look at the corners rather than the middle. The middle always looks fine. Corners near doors, pipes and columns are where a gap opens or a hook works loose. If you can pass a hand through somewhere a child or a cat could follow, that is a reason to write to us, not a reason to tie a cloth across it.",
      "Look at the metal where it meets the wall. Fresh rust streaks mean the fitting is not the stainless we would want left in the rain. A plastic tie that has gone white and brittle in the sun is not a permanent edge. Bird nets should still have their closing edge intact. A flap that no longer fastens is an open door for pigeons and a puzzle for the plumber.",
      "None of this requires a ladder over the rail. If the only way to see a problem is to climb outside the barrier, stop and send a photo from inside. The fitting is supposed to remove that climb, not create a maintenance ritual on the wrong side of it. When we return, we would rather hear what you saw than discover a household has been leaning out to “tighten it”.",
    ],
    points: [
      "Check corners and door sides, not only the centre.",
      "Rust streaks and chalky ties are worth a message.",
      "Do not climb outside the barrier to inspect it.",
    ],
  },
  {
    id: "reading-this-site",
    heading: "How to read the rest of this website",
    tags: ["general", "local"],
    paragraphs: [
      "Service pages describe one kind of work: grills, balcony nets, children, pets, pigeons, ducts, terraces, stairs, hangers, cricket, or a building cover. They are the place to see whether that work matches your opening. Locality pages describe a part of Hyderabad — the buildings, the lanes, the kind of housing — so a Gachibowli tower is not written up as if it were a Secunderabad walk-up.",
      "We do not publish a separate sales page for every phrase people type. “Installation”, “price”, “for apartments” and “near me” are answered on the service page and, where the place matters, on the locality page. Splitting those phrases into thousands of near-copies would waste your time and would not make the measurement more accurate. If you searched a long phrase and landed here, use the service cards and the area list. Then send the locality you actually live in.",
      "Photographs on the site are examples of the systems, not a promise that your balcony will look identical. Alt text and captions say what the opening is. Your quote will not cite a photo as the specification. The specification is the measured opening, the material named in writing, and the exclusions you can point at.",
    ],
  },
  {
    id: "animals-insects",
    heading: "Monkeys, mosquitoes and worries that are not a fall",
    tags: ["net", "utility", "bird"],
    paragraphs: [
      "Mosquito nets belong on windows and some balcony doors because evenings in Hyderabad bring insects. They are light, they slide or fix in the reveal, and they are not a substitute for a safety net. If someone sells one mesh as both, ask which job it is actually built for. A screen you can push with a hand is an insect screen. A fall barrier is specified differently and priced differently.",
      "Monkeys are talked about on some terrace edges, especially where trees and open land sit close to new houses. We do not assume an animal from the pin code. If you have seen them on that terrace, say so, and we look at the opening. A net can make entry harder. It is not a promise that a determined animal can never test it, and it is not a reason to describe every Kokapet or Kompally villa as a wildlife job.",
      "Street dogs, squirrels and the occasional crow are the same kind of conversation. Tell us what actually happens at the opening. A story from another colony is not a specification. The fitting should match the evidence on your ledge, not a fear imported from a video.",
    ],
  },
  {
    id: "fitting-day",
    heading: "What fitting day should feel like",
    tags: ["process", "general"],
    paragraphs: [
      "The team should arrive for the opening that was measured, with the material named on the quote, not with a surprise roll and a new price. Floors are protected where we work. The points marked earlier are the points that get drilled, unless the wall turns out hollow or cracked and the plan has to move. If the plan moves, you hear it before the bit does, not after a row of holes.",
      "Doors and shutters are tried before we leave. A net or cable that traps the shutter is unfinished, even if the centre of the span looks tight. Bird nets are checked for a way out and, on a duct, for the labelled flap. Hangers are run through their sweep so they do not strike the fan or the new mesh. You should be shown the corners, because that is what you will check later.",
      "Waste, offcuts and packing leave with the team. A balcony full of straps is not a handover. If something could not be finished — a wet wall, a locked service duct, a part that the association asked to see first — the note says what remains and whether it is in the price already. Leaving that as a verbal “we’ll see” is how a small job becomes a dispute.",
    ],
    points: [
      "The material on the quote is the material that arrives.",
      "Shutters, doors and hanger sweep are tried before handover.",
      "Anything unfinished is written down, not waved away.",
    ],
  },
  {
    id: "neighbours",
    heading: "Shared walls, neighbours and the view from the street",
    tags: ["grill", "net", "local"],
    paragraphs: [
      "Balconies in Hyderabad often sit a short distance from the next flat. A net colour, a cable line and a hanger that projects can be seen from the neighbour’s sit-out and from the road. The finish should look deliberate. A patchwork of white ties, mixed hooks and a slack middle reads as an afterthought and is the kind of thing an association photographs.",
      "We do not fix onto the neighbour’s side, their screen, or a shared duct without the people who own that side knowing. A clever shortcut that uses their railing is how a safety job becomes a fight. If the only sound edge is on common property, that is an association conversation, already covered above, not a quiet hole.",
      "Noise and timing matter in occupied towers. Drilling at a time the building has asked us to avoid helps no one, including the next customer in that society. The slot on the quote should already respect that. If you know a quiet-hours rule, send it with the photos so the day is planned once.",
    ],
  },
  {
    id: "example",
    heading: "One opening, talked through without a fake price",
    tags: ["general", "process", "net", "grill"],
    paragraphs: [
      "Picture a west-facing apartment balcony in Kukatpally. The railing is waist height, a child of four uses it in the evening, pigeons sit on the air-conditioner tray, and clothes dry on a rod that already stains the wall. Three worries, three possible lines. The fall is a child-safety net or closer cable, decided by whether the corner by the door can be closed and whether the household wants the view more than a mesh. The pigeons are a net across the volume they enter, or spikes if they only perch on the tray and never come in. The rod is a stainless or aluminium hanger, planned so it does not cut the new net.",
      "None of those lines has a city-wide rupee figure on this website. The width, the return beside the column, the floor, and whether the association allows the outer fixing will move the number. What the example is for is the habit of separating the worries. If one quote says “full safety package” and will not say which worry it answers, it is not yet an estimate. Ask for the lines.",
      "The same habit works in a Jubilee Hills house with a stair void, in a Secunderabad flat with a tired window, and in a Kokapet villa with a terrace. The nouns change. The structure of the conversation does not. Opening, user, material, access, exclusions. When those five are written, you can compare two companies without comparing two slogans.",
    ],
  },
  {
    id: "high-floors",
    heading: "High floors, lifts and the time around the work",
    tags: ["process", "grill", "net", "local"],
    paragraphs: [
      "The amount of cable or mesh does not grow just because the flat is on the fifteenth floor. The day does. Service lifts run on a timetable. Some towers allow drilling only in a window of a few hours. Material that cannot go in the passenger lift has to be planned, not discovered in the lobby. Those facts belong on the quote as access, even when a neighbour on the second floor would have paid less labour for the same balcony size.",
      "Wind on an open high balcony is another reason the fixing is not copied from a sheltered first floor. It is still not a reason to call the net storm-proof. If the span is too wide for the way we fix, we shorten the plan or we decline it. Pride about height is how light fittings get asked to do a structural job.",
      "Tell us the floor when you write. A photo that hides the context makes us plan a ground-floor visit and then re-price when the lift rules appear. That feels like a trick even when it is only missing information. Floor, tower name if you have it, and any rule you already know keep the first number closer to the last one.",
    ],
  },
  {
    id: "old-fittings",
    heading: "If a net or grill is already there",
    tags: ["process", "net", "grill", "bird", "local"],
    paragraphs: [
      "Old work is inspected before anyone talks about a full replacement. A sagging corner, a cut flap, a cable that has loosened, or a hook that has rusted may be a repair. If the old line cannot carry load, it is isolated or taken down. Hanging a new net on a tired one hides the failure and adds weight the wall was not asked to hold.",
      "Painted iron grills that have rusted into the plaster are a common starting point. The new cable or mesh is not hung on that rail if the rail moves. Removing the old grill, making good the plaster, and then fitting are separate steps. Some households want the iron to stay for feeling and the cable to sit beyond it. That can be honest only when the iron is still sound and the gap beyond it is the actual opening we are closing.",
      "Bring the old bill if you have it, but do not expect us to match a promise another company printed. We can say what we see today: metal, mesh, fixings, gaps. The next quote describes the next job. It does not inherit a warranty we did not write, and it does not insult you for having chosen something that was reasonable ten years ago.",
    ],
  },
  {
    id: "search-words",
    heading: "The words people search, and the page that should answer them",
    tags: ["general"],
    paragraphs: [
      "People look for invisible grills in Hyderabad, balcony safety nets, pigeon nets for a duct, a cloth hanger, a cricket net, or a price. Those are fair searches. They are not thirty different businesses. Installation, repair, “for apartments”, “for children” and “near me” are ways of asking how the work is done, who it is for, and whether we come to that locality. This guide answers the how. The service cards answer the which. The locality pages answer the where.",
      "A price search deserves a straight reply: the figure depends on the measured opening, the material, the corners and the access. Publishing a rupee number that ignores those is how a cheap-looking advertisement becomes a dearer day. If you need a budget conversation, send the photos and the locality. You will get a range only after someone has seen the shape, and a final figure only after the tape.",
      "Repair and replacement are searched when something is already up. Use the notes above on old fittings. Do not start from a brand-new balcony page and assume the old net will be ignored. Maintenance, in the honest sense, is the monthly look at corners and a message if a hook stains or a gap opens. It is not a subscription we have invented to rank for the word.",
      "If two pages on this site seem to answer the same question, trust the service page for the product and the home guide for the reasoning. We would rather you read one clear chapter than five pages that swap a neighbourhood name and repeat a paragraph. That is also why service-and-area combinations are not minted as their own websites. The opening is specific. The sentence does not need a new URL to say so.",
    ],
  },
];
