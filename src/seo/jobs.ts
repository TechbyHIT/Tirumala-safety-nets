export type LocalJob = {
  slug: string;
  title: string;
  note: string;
};

export const jobs: LocalJob[] = [
  {
    slug: "installation",
    title: "Installation",
    note: "Installation is booked only after the opening is measured. The visit marks hook or anchor points, the edge that must stay open for cleaning, and the society timing before any drill bit is chosen.",
  },
  {
    slug: "price",
    title: "Price",
    note: "The price follows measured area, mesh or cable grade, corners, height and access. A phone figure is only a starting conversation. The written quote names what is included and what is a separate line.",
  },
  {
    slug: "for-apartments",
    title: "For apartments",
    note: "Apartment work includes the association letter when the facade or a duct is common property, service-lift timing, and a finish that does not scar the elevation. Rented flats also need the owner's consent.",
  },
  {
    slug: "for-independent-houses",
    title: "For independent houses",
    note: "Independent houses usually mix a balcony, a stair void and a terrace. Each opening is measured on its own. A terrace parapet is not priced as if it were a flat balcony.",
  },
  {
    slug: "for-children",
    title: "For children",
    note: "Child safety follows who actually uses the opening. A toddler and a school-age child load a balcony differently. Mesh or cable spacing is tightened for that brief, and the net is not treated as a substitute for supervision.",
  },
  {
    slug: "for-pets",
    title: "For pets",
    note: "Cats and small dogs need a tighter aperture than a general fall barrier. The corner beside a sliding door is checked, because that is the gap a pet finds first. If cable leaves too much space, mesh is the honest recommendation.",
  },
  {
    slug: "for-balconies",
    title: "For balconies",
    note: "Balcony work runs from the railing to the slab, including the return beside a column and the gap above a low builder rail. Drying, an AC tray and a planter are planned with the same line, not added after the net is up.",
  },
  {
    slug: "for-windows",
    title: "For windows",
    note: "Window work sits in the reveal where the shutter, curtain and any insect screen still need to travel. A line stretched across the shutter track is refused. The sill depth is measured with the leaf open.",
  },
  {
    slug: "for-terrace",
    title: "For terraces",
    note: "Terrace edges fail from ultraviolet light and from a low parapet, not from a catalogue photo. UV grade is named. Overhead mesh and an edge net are different lines. The net is not described as cyclone-proof.",
  },
  {
    slug: "repair-and-refit",
    title: "Repair and refit",
    note: "A sagging corner, a cut flap or a rusted hook is inspected before anyone talks about a full replacement. If the old line cannot carry load, it is isolated. The refit uses the same measurement as a new job.",
  },
  {
    slug: "for-high-rise",
    title: "For high-rise",
    note: "High floors add access time even when the metal quantity stays the same. Society hours, a strict lift window and wind on an open face are written into the slot. The specification does not change just because the view is better.",
  },
  {
    slug: "free-measurement",
    title: "Free measurement",
    note: "A site inspection is arranged inside the Hyderabad coverage area. Share the locality, floor, a full photo of the opening and closer photos of the fixing edges. The written figure follows that visit.",
  },
];

export function getJob(slug: string) {
  return jobs.find((job) => job.slug === slug);
}
