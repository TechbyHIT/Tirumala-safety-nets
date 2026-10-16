import type { Service } from "@/data/services";

const topics: Record<string, string[]> = {
  "invisible-grills": ["balcony", "apartment", "window", "railing", "flat", "tower", "villa", "facade", "society", "sit-out", "cable", "french", "housing", "house", "home", "street"],
  "safety-nets": ["balcony", "apartment", "terrace", "stair", "opening", "flat", "void", "school", "fall", "housing", "house"],
  "balcony-safety-nets": ["balcony", "apartment", "railing", "flat", "tower", "society", "sit-out", "housing", "house"],
  "children-safety-nets": ["child", "children", "balcony", "school", "stair", "family", "apartment", "toddler"],
  "pet-safety-nets": ["pet", "balcony", "apartment", "flat", "cat"],
  "pigeon-nets": ["pigeon", "bird", "ledge", "duct", "balcony", "droppings", "nest"],
  "bird-nets": ["bird", "pigeon", "ledge", "duct", "shed", "shaft"],
  "anti-bird-spikes": ["ledge", "parapet", "pigeon", "bird", "signboard", "sunshade"],
  "duct-area-nets": ["duct", "shaft", "service", "pigeon", "utility"],
  "terrace-safety-nets": ["terrace", "roof", "sun", "parapet", "play"],
  "staircase-safety-nets": ["stair", "void", "duplex", "landing"],
  "cloth-hangers": ["drying", "balcony", "utility", "cloth", "wash", "ceiling"],
  "sports-nets": ["school", "ground", "coaching", "sport", "academy", "campus"],
  "cricket-nets": ["cricket", "coaching", "ground", "academy", "school", "practice"],
  "mosquito-nets": ["mosquito", "window", "insect", "evening", "screen"],
  "cat-safety-nets": ["cat", "balcony", "apartment", "window", "flat", "railing"],
  "monkey-safety-nets": ["monkey", "terrace", "hill", "foothill", "tree", "agency"],
  "building-covering-nets": ["building", "elevation", "facade", "tower", "apartment", "work"],
  "transparent-balcony-nets": ["balcony", "apartment", "view", "society", "flat", "elevation"],
};

function mentions(haystack: string, word: string) {
  if (haystack.includes(word)) return true;
  if (word.endsWith("y") && haystack.includes(`${word.slice(0, -1)}ies`)) return true;
  return haystack.includes(`${word}s`) || haystack.includes(`${word}es`);
}

export function topicOverlap(service: Service, text: string) {
  const words = topics[service.slug] ?? [];
  const haystack = text.toLowerCase();
  return words.some((word) => mentions(haystack, word));
}

export function serviceFamily(service: Service): "cable" | "mesh" | "bird" | "utility" {
  if (service.slug.includes("grill")) return "cable";
  if (service.group === "Bird control") return "bird";
  if (service.group === "Utility") return "utility";
  return "mesh";
}
