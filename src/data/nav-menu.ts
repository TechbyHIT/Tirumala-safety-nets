export type MenuLink = { href: string; label: string };

export const menuServices: { title: string; links: MenuLink[] }[] = [
  {
    title: "Invisible Grills",
    links: [
      { label: "Invisible Grills", href: "/services/invisible-grills" },
      { label: "Balcony Invisible Grills", href: "/guides/invisible-grills-for-balcony" },
      { label: "Window Invisible Grills", href: "/guides/invisible-grills-for-windows" },
      { label: "Invisible Grills for Apartments", href: "/guides/invisible-grills-for-apartments" },
      { label: "Invisible Grills for Villas", href: "/guides/invisible-grills-for-villas" },
      { label: "Invisible Grills for Child Safety", href: "/guides/invisible-grills-for-child-safety" },
      { label: "Invisible Grills for Pets", href: "/guides/invisible-grills-for-pet-safety" },
    ],
  },
  {
    title: "Safety Nets",
    links: [
      { label: "Safety Nets", href: "/services/safety-nets" },
      { label: "Balcony Safety Nets", href: "/services/balcony-safety-nets" },
      { label: "Children Safety Nets", href: "/services/children-safety-nets" },
      { label: "Pet Safety Nets", href: "/services/pet-safety-nets" },
      { label: "Cat Safety Nets", href: "/services/cat-safety-nets" },
      { label: "Terrace Safety Nets", href: "/services/terrace-safety-nets" },
      { label: "Staircase Safety Nets", href: "/services/staircase-safety-nets" },
    ],
  },
  {
    title: "Balcony Nets",
    links: [
      { label: "Transparent Balcony Nets", href: "/services/transparent-balcony-nets" },
      { label: "Balcony Children Safety Nets", href: "/guides/children-safety-nets-for-balcony" },
      { label: "Balcony Pet Safety Nets", href: "/guides/pet-safety-nets-for-balcony" },
      { label: "Balcony Cat Nets", href: "/guides/cat-safety-nets-for-balcony" },
      { label: "Apartment Balcony Nets", href: "/guides/balcony-safety-nets-for-apartments" },
      { label: "High Rise Balcony Nets", href: "/guides/balcony-safety-nets-for-high-rise-buildings" },
      { label: "Building Covering Nets", href: "/services/building-covering-nets" },
    ],
  },
  {
    title: "Bird Nets",
    links: [
      { label: "Bird Nets", href: "/services/bird-nets" },
      { label: "Duct Area Nets", href: "/services/duct-area-nets" },
      { label: "Duct Area Bird Nets", href: "/guides/bird-nets-for-duct-area" },
      { label: "Monkey Safety Nets", href: "/services/monkey-safety-nets" },
    ],
  },
  {
    title: "Pigeon Nets",
    links: [
      { label: "Pigeon Nets", href: "/services/pigeon-nets" },
      { label: "Balcony Pigeon Nets", href: "/guides/pigeon-nets-for-balcony" },
      { label: "Duct Area Pigeon Nets", href: "/guides/pigeon-nets-for-duct-area" },
    ],
  },
  {
    title: "Sports Nets",
    links: [
      { label: "Sports Nets", href: "/services/sports-nets" },
      { label: "Cricket Nets", href: "/services/cricket-nets" },
      { label: "Cricket Practice Nets", href: "/guides/cricket-nets-for-practice-grounds" },
    ],
  },
  {
    title: "Cloth Hangers",
    links: [
      { label: "Cloth Hangers", href: "/services/cloth-hangers" },
      { label: "Balcony Cloth Hangers", href: "/guides/cloth-hangers-for-balcony" },
      { label: "Mosquito Nets", href: "/services/mosquito-nets" },
      { label: "Window Mosquito Nets", href: "/guides/mosquito-nets-for-windows" },
      { label: "Balcony Mosquito Nets", href: "/guides/mosquito-nets-for-balcony" },
    ],
  },
  {
    title: "Bird Spikes",
    links: [
      { label: "Anti Bird Spikes", href: "/services/anti-bird-spikes" },
      { label: "Pigeon Control Spikes", href: "/guides/anti-bird-spikes-for-pigeon-control" },
    ],
  },
];

export const menuPages: MenuLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];
