export const TEMPLATE_VERSION = 4;

export const STATE = {
  slug: "hyderabad",
  name: "Hyderabad",
} as const;

export type PageKind =
  | "service"
  | "state"
  | "city"
  | "area"
  | "service-city"
  | "service-area"
  | "guide"
  | "guide-city";

export type PageStatus = "publish" | "review" | "exclude";

export type LinkItem = { href?: string; label: string };

export type FaqItem = { q: string; a: string };

export type PageModule =
  | { type: "prose"; title?: string; paragraphs: string[] }
  | { type: "list"; title: string; items: string[] }
  | { type: "steps"; title: string; steps: { title: string; text: string }[] }
  | { type: "note"; title: string; text: string }
  | { type: "links"; title: string; links: LinkItem[] }
  | { type: "faqs"; title: string; items: FaqItem[] };

export type PageParams = {
  service?: string;
  state?: string;
  city?: string;
  area?: string;
  guide?: string;
};

export type PageDocument = {
  id: string;
  kind: PageKind;
  path: string;
  canonical: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  hero: string;
  breadcrumb: LinkItem[];
  modules: PageModule[];
  image: string;
  imageAlt: string;
  ogTitle: string;
  ogDescription: string;
  jsonLd: Record<string, unknown>[];
  params: PageParams;
  quote: { service?: string; city?: string };
  inputHash: string;
  skeleton: string;
  keywordHits: { term: string; count: number }[];
  reasons: string[];
  status: PageStatus;
  index: boolean;
  score: number;
};

export type PageRecord = {
  id: string;
  path: string;
  kind: PageKind;
  status: PageStatus;
  index: boolean;
  version: number;
  inputHash: string;
  score: number;
  title: string;
  reasons: string[];
  updatedAt: string;
};
