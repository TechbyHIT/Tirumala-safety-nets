export type IndexPolicy = "index" | "noindex";

const partsOf = (path: string) => path.split("/").filter(Boolean);

export function isSyntheticLocalitySlug(slug: string) {
  return /(^|-)(approach|border|backside)(-|$)/.test(slug);
}

export function indexPolicy(path: string): IndexPolicy {
  const parts = partsOf(path);
  if (parts[0] === "services" && (parts.length === 4 || parts.length === 5)) return "noindex";
  if (parts[0] === "guides" && parts.length === 3) return "noindex";
  if (parts[0] === "locations" && parts.length === 4 && isSyntheticLocalitySlug(parts[3] ?? "")) return "noindex";
  return "index";
}

export function policyReason(path: string) {
  const parts = partsOf(path);
  if (parts[0] === "services" && parts.length === 5) {
    return "Search-intent variant. Canonical coverage is the service page for this Hyderabad locality, not a separate URL per phrase.";
  }
  if (parts[0] === "services" && parts.length === 4) {
    return "Neighbourhood combination is held for editorial review. It is not in the sitemap until the page has verified local detail beyond a shared template.";
  }
  if (parts[0] === "guides" && parts.length === 3) {
    return "City copy of a guide consolidates to the guide itself. The locality page carries the local note.";
  }
  if (parts[0] === "locations" && isSyntheticLocalitySlug(parts[3] ?? "")) {
    return "This label is a road, border, or approach variant, not a separate verified locality. It stays out of the index.";
  }
  return "Eligible for indexing when the page quality check also passes.";
}
