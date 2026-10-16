export type LibraryItem = {
  slug: string;
  title: string;
  summary: string;
  paragraphs: string[];
  points: string[];
  parent: string;
  photo: string;
};

export type LibraryGroup = {
  id: string;
  title: string;
  intro: string;
  items: LibraryItem[];
};

function item(
  slug: string,
  title: string,
  summary: string,
  paragraphs: string[],
  points: string[],
  parent: string,
  photo: string,
): LibraryItem {
  return { slug, title, summary, paragraphs, points, parent, photo };
}

export const libraryGroups: LibraryGroup[] = [
  {
    id: "pigeon",
    title: "Pigeon safety nets",
    intro: "Bird exclusion split by the opening, not by a single mesh sold under every name.",
    items: [
      item("balcony-pigeon-nets", "Balcony pigeon nets", "A full balcony volume closed so pigeons cannot walk in under the slab.", ["The net follows the balcony box: railing, returns, and the slab edge. Birds already inside are given a way out before the last corner is tied.", "This is not a child-safety mesh. If the family also needs a fall barrier, that is a second line on the quote."], ["Volume closed, not just a ledge", "Labelled edge for later cleaning", "Humane: no gel, glue, or poison"], "pigeon-nets", "pigeon-nets"),
      item("window-pigeon-nets", "Window pigeon nets", "Mesh on ventilators and window reveals where birds nest on the sill.", ["Window work sits inside the reveal where shutters still need to move. A net stretched across the shutter track is refused.", "AC trays beside the window are a perch. Spikes are quoted only if birds sit there and do not enter."], ["Shutter travel kept clear", "Sill and ventilator measured apart", "Separate from insect screens"], "pigeon-nets", "pigeon-nets"),
      item("duct-pigeon-nets", "Duct pigeon nets", "Shaft faces closed at the agreed floors, with a flap for the plumber.", ["A duct is usually common property. The association sees which floors are covered and where the access flap sits.", "Sealing every gap with no label creates a future cut. We leave the maintenance opening written down."], ["Floors named", "Access flap labelled", "Old nests cleared before the last edge"], "duct-area-nets", "duct-area-nets"),
      item("open-area-pigeon-nets", "Open-area pigeon nets", "Terrace, courtyard, and light-well mesh where birds occupy a volume, not a thin ledge.", ["Overhead nets and edge nets are different jobs. A terrace that only has birds on the parapet may need spikes, not a sky cage.", "UV grade is named because Hyderabad sun, not a catalogue photo, decides the yarn."], ["Fall edge and bird volume quoted apart", "UV grade written", "Poles only if the slab can take them"], "pigeon-nets", "terrace-safety-nets"),
      item("staircase-pigeon-nets", "Staircase pigeon nets", "Common stairs and open corridors where pigeons roost on landings.", ["The panel follows the flight and must not pull a loose handrail. Triangular gaps under the first flight are included when birds use them.", "A stair used by people every day needs a release that does not become a trip."], ["Rake of the flight followed", "Handrail not used as the only anchor", "Hygiene clean before fitting"], "pigeon-nets", "staircase-safety-nets"),
      item("industrial-pigeon-nets", "Industrial pigeon nets", "Sheds, warehouses, and workshop roofs where span and sheeting change the fixing.", ["A house balcony price does not scale to a sheet roof. Support, span, and a way in for maintenance are the quote.", "Species and aperture follow what is actually nesting, not a photo of an apartment."], ["Span and roof type named", "Access for maintenance", "Separate from a home balcony package"], "bird-nets", "bird-nets"),
      item("low-visibility-pigeon-nets", "Low-visibility pigeon nets", "Finer, darker mesh where the elevation has to stay quiet.", ["Lower visibility is a colour and aperture choice. It does not make the net disappear, and it is not an invisible grill.", "Society colour rules are checked before the yarn is cut."], ["Colour agreed first", "Still a bird mesh, not a fall grill", "Elevation read from the street"], "pigeon-nets", "transparent-balcony-nets"),
      item("hdpe-pigeon-nets", "HDPE pigeon nets", "UV-stabilised polyethylene when sun and a firm hand are the brief.", ["HDPE is the usual Hyderabad mesh against ultraviolet light. Coastal wind still needs a denser hook line than a sheltered court.", "The quote names aperture and hook metal, not only the letters HDPE."], ["UV stabiliser named", "Hook metal named", "Aperture matched to pigeons"], "pigeon-nets", "pigeon-nets"),
      item("nylon-pigeon-nets", "Nylon pigeon nets", "A softer knotted yarn where the panel is touched often.", ["Nylon is chosen for hand-feel and knot, not as a different bird. It still has to be UV-aware on an open balcony.", "If the same opening must stop a child falling, nylon bird mesh is the wrong product."], ["Softer contact", "Still not a fall barrier", "UV talk stays on the quote"], "pigeon-nets", "pigeon-nets"),
    ],
  },
  {
    id: "grills",
    title: "Invisible grills",
    intro: "Cable systems split by opening, grade, and whether a panel must open later.",
    items: [
      item("invisible-balcony-grill", "Invisible balcony grill", "Cable from the balcony line, including the gap above a low railing.", ["Runs are measured parapet to slab, including turns at columns. Spacing tightens when toddlers or cats are the brief.", "Grade is SS304 after the visit. A west-facing Hyderabad balcony is not specified like a shaded inner-city window."], ["View kept open", "Spacing set for the household", "Grade written, not implied"], "invisible-grills", "invisible-grills"),
      item("invisible-window-grill", "Invisible window grill", "Cables inside the reveal so shutters and curtains still travel.", ["Window cable is not a balcony run turned sideways. The leaf, the mosquito track, and the sill depth are measured together.", "We will not terminate only on a warped timber frame."], ["Shutter clearance", "Reveal depth checked", "Separate from balcony cable"], "invisible-grills", "invisible-grills"),
      item("stainless-invisible-grill", "Stainless invisible grill", "The metal is named: SS304 inland, SS316 where salt air is real.", ["'Stainless' alone is not a specification. The quote states the grade, the line count, and the turnbuckle.", "SS316 is not added for show on a sheltered inland wall."], ["SS304 or SS316 named", "Fittings matched to the cable", "Substrate cleaned before anchors"], "invisible-grills", "invisible-grills"),
      item("fixed-invisible-grill", "Fixed invisible grill", "A permanent cable line where the opening does not need to unhook.", ["Fixed runs suit French windows and balcony spans that stay closed as a barrier. Painting access is discussed before the line is locked.", "A loose builder railing is not used as the load path."], ["Permanent tension", "Painting access agreed first", "Railing tested before anchoring"], "invisible-grills", "invisible-grills"),
      item("openable-invisible-grill", "Openable invisible grill", "A frame that releases for cleaning, a delivery, or a festival.", ["Openable hardware is a different quote from a fixed run. The hinge side, the latch, and who will operate it are part of the measure.", "A release that a child can work loose is refused."], ["Release planned, not improvised", "Latch height discussed", "Not the same price as a fixed run"], "invisible-grills", "invisible-grills"),
      item("invisible-safety-grill", "Invisible safety grill", "Closer spacing when the brief is a fall, not only a view.", ["General cable spacing and child spacing are different. We say which one the household needs after seeing who uses the balcony.", "Cable is still not a substitute for watching a toddler."], ["Spacing matched to the risk", "Compared with a soft net on broken balconies", "Supervision still required"], "invisible-grills", "children-safety-nets"),
      item("invisible-cable-grill", "Invisible cable grill", "High-tensile cable, terminated at anchors that match the wall.", ["Each run is a measured cable, not a welded lattice. Intermediate supports appear on long spans.", "The number of lines is on the quote so the outlook and the barrier are both visible before work starts."], ["Line count written", "Anchors matched to brick, block, or slab", "Long spans get intermediate supports"], "invisible-grills", "invisible-grills"),
      item("invisible-grill-installation", "Invisible grill installation", "The visit, the mark-out, and the fit — as its own brief.", ["Installation starts after the opening is seen: society letter if the facade is common, service-lift timing, and a mark-out you can look at before drilling.", "A single straight balcony is often one visit after materials are ready. High floors and bends take longer, and the quote says so."], ["Mark-out before drilling", "Society and access planned", "Handover includes tension marks"], "invisible-grills", "invisible-grills"),
    ],
  },
  {
    id: "sports",
    title: "Sports nets",
    intro: "Practice and court nets sized to the game. They are not balcony mesh sold by the square foot of a flat.",
    items: [
      item("cricket-practice-nets-library", "Cricket practice nets", "Side and overhead netting for a batting bay, with poles only where the ground can hold them.", ["Lane width, height, and whether bowling and batting share the bay are measured. A terrace waterproofing layer is a structural question before any pole is proposed.", "Impact yarn is not the same specification as a child-safety balcony net."], ["Bay size first", "Overhead net quoted separately", "Not a balcony package"], "cricket-nets", "cricket-nets"),
      item("football-safety-nets", "Football safety nets", "Stop-nets behind goals and along boundaries so the ball stays in the ground.", ["Height and wind on an open school field decide the support. A light decorative mesh will not stop a driven ball.", "We scope the ground that exists, not a stadium we are not building."], ["Boundary height measured", "Impact face named", "Supports checked for wind"], "sports-nets", "cricket-nets"),
      item("badminton-practice-nets", "Badminton practice nets", "Court dividers and backstops for schools and indoor halls.", ["Indoor fixing uses the hall structure that is already there. We do not drill a roof truss without knowing who owns it.", "Mesh is chosen so shuttle visibility stays usable."], ["Hall structure checked", "Divider versus backstop", "Separate from outdoor cricket yarn"], "sports-nets", "sports-nets"),
      item("tennis-court-nets", "Tennis court nets", "Stop-netting around a court where balls leave the playing lines.", ["Run length and pole spacing follow the court, not a balcony module. UV grade matters on open Hyderabad courts.", "A centre net and a surround net are different lines."], ["Surround versus centre net", "UV grade on open courts", "Pole spacing written"], "sports-nets", "sports-nets"),
      item("volleyball-nets", "Volleyball nets", "Court netting and side stops for school and club play.", ["The playing net and the safety surround are not one product. We ask which one the ground needs.", "Anchors on a concrete court differ from anchors on a school field."], ["Playing net and surround separated", "Surface named", "Height checked for the age group"], "sports-nets", "sports-nets"),
      item("multipurpose-safety-nets", "Multipurpose safety nets", "One ground used for more than one game, specified for the hardest impact.", ["A net that must take cricket and football is specified for the heavier strike. We will not quietly use balcony yarn.", "Shared school grounds need a note on who maintains the face that wears first."], ["Specified for the hardest use", "Wear face called out", "Not a domestic balcony mesh"], "sports-nets", "sports-nets"),
      item("indoor-sports-nets", "Indoor sports nets", "Gym, school-hall, and indoor-cage mesh with fixings the building can accept.", ["Indoor jobs are about structure and headroom. A cage that needs new steel is said before a mesh price is given.", "Ventilation and lighting lines are kept out of the net path."], ["Headroom measured", "Existing structure first", "Lights and fans kept clear"], "sports-nets", "sports-nets"),
      item("ball-stop-safety-nets", "Ball-stop safety nets", "Perimeter mesh so balls do not reach a road, a window, or the next court.", ["The height follows the sport and the distance to the thing being protected. A short parapet net is not a ball stop.", "Wind load on a tall stop is part of the quote."], ["Height from the risk, not a default", "Wind considered", "Edge toward roads measured"], "sports-nets", "cricket-nets"),
    ],
  },
];

export const libraryItems = libraryGroups.flatMap((group) => group.items);

export function getLibraryItem(slug: string) {
  return libraryItems.find((item) => item.slug === slug);
}

export function libraryGroupFor(slug: string) {
  return libraryGroups.find((group) => group.items.some((item) => item.slug === slug));
}
