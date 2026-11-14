export type LocationSource = {
  id: string;
  publisher: string;
  title: string;
  url: string;
  issuedAt: string;
  accessedAt: string;
  scope: string;
};

export type Zone = { id: string; name: string; sourceId: string; verified: boolean };
export type Circle = { id: string; number: number; name: string; zoneId: string; sourceId: string; verified: boolean };
export type Ward = { id: string; number: number; name: string; circleId: string; zoneId: string; sourceId: string; verified: boolean };

export type PostOffice = {
  name: string;
  pincode: string;
  officeType: string;
  delivery: string;
  division: string;
  taluk: string;
  district: string;
};

export type Locality = {
  id: string;
  name: string;
  slug: string;
  kind: "ghmc-ward" | "post-office";
  wardId?: string;
  circleId?: string;
  zoneId?: string;
  postalDistrict?: string;
  pinCodes: string[];
  postOffices: PostOffice[];
  sourceId: string;
  verified: boolean;
  /** Present when India Post places the locality outside GHMC. Ward records stay unclassified here and carry ward, circle and zone instead. */
  jurisdiction?: string;
  aliases?: string[];
};

export type ProgrammaticService = {
  id: string;
  name: string;
  category: "grills" | "nets" | "bird-control" | "sports" | "utility";
  summary: string;
  materials: string[];
  useCases: string[];
  legacy?: string;
};

export type SearchProfile = {
  id: string;
  label: string;
  searchIntent: "service" | "installation" | "replacement" | "property" | "use-case";
  propertyType?: string;
  useCase?: string;
};

export type NoindexReason = "INSUFFICIENT_LOCAL_FACTS" | "UNVERIFIED_LOCATION";

export type Consolidation = "CANONICAL_TO_PRIMARY";

export type SeoPageRecord = {
  id: number;
  slug: string;
  path: string;
  serviceId: string;
  localityId: string;
  profile: SearchProfile;
  title: string;
  description: string;
  h1: string;
  generated: true;
  indexEligible: boolean;
  published: boolean;
  robots: "index,follow" | "noindex,follow";
  canonical: string;
  primaryPath: string;
  /** Set when this URL repeats a primary page. Canonical points at the primary. robots stays index,follow. */
  consolidation?: Consolidation;
  noindexReason?: NoindexReason;
  qualityReasons: string[];
};

export type ProgrammaticPage = SeoPageRecord & {
  service: ProgrammaticService;
  locality: Locality;
  ward?: Ward;
  circle?: Circle;
  zone?: Zone;
  nearby: Locality[];
  relatedServices: ProgrammaticService[];
  introduction: string;
  localFacts: { label: string; value: string }[];
  serviceBody: string[];
  intentSections: { title: string; text: string }[];
  variants: { href: string; label: string }[];
  installation: string[];
  benefits: string[];
  maintenance: string;
  safety: string;
  faqs: { q: string; a: string }[];
};
