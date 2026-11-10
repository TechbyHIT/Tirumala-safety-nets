// Keyword-to-URL map. One indexable URL owns each intent. No search volumes are stored, because none were measured in Search Console.

export const keywordMap = [
  { keyword: "Invisible grills Hyderabad", intent: "commercial", url: "/services/invisible-grills" },
  { keyword: "Invisible grill installation Hyderabad", intent: "commercial", url: "/services/invisible-grills", note: "Installation is a section of the service page, not a separate indexable URL." },
  { keyword: "Balcony invisible grills Hyderabad", intent: "commercial", url: "/services/balcony-invisible-grills" },
  { keyword: "Window invisible grills Hyderabad", intent: "commercial", url: "/services/window-invisible-grills" },
  { keyword: "Openable invisible grills Hyderabad", intent: "commercial", url: "/services/openable-invisible-grills" },
  { keyword: "Safety nets Hyderabad", intent: "commercial", url: "/services/safety-nets" },
  { keyword: "Balcony safety nets Hyderabad", intent: "commercial", url: "/services/balcony-safety-nets" },
  { keyword: "Pigeon nets Hyderabad", intent: "commercial", url: "/services/pigeon-safety-nets" },
  { keyword: "Bird nets Hyderabad", intent: "commercial", url: "/services/bird-protection-nets" },
  { keyword: "Child safety nets Hyderabad", intent: "commercial", url: "/services/child-safety-nets" },
  { keyword: "Pet safety nets Hyderabad", intent: "commercial", url: "/services/pet-safety-nets" },
  { keyword: "Duct area safety nets Hyderabad", intent: "commercial", url: "/services/duct-area-safety-nets" },
  { keyword: "Terrace safety nets Hyderabad", intent: "commercial", url: "/services/terrace-safety-nets" },
  { keyword: "Staircase safety nets Hyderabad", intent: "commercial", url: "/services/staircase-safety-nets" },
  { keyword: "Sports nets Hyderabad", intent: "commercial", url: "/services/sports-nets" },
  { keyword: "Cricket practice nets Hyderabad", intent: "commercial", url: "/services/cricket-practice-nets" },
  { keyword: "Bird spikes Hyderabad", intent: "commercial", url: "/services/bird-spikes" },
  { keyword: "Cloth hangers Hyderabad", intent: "commercial", url: "/services/cloth-hangers" },
] as const;

export const localityKeywordPattern = "/{service}-in-{locality}";
export const consolidatedPatterns = [
  "/{service}-installation-in-{locality}",
  "/{service}-replacement-in-{locality}",
  "/{service}-for-{property-or-use}-in-{locality}",
];
