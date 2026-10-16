import { getCity } from "@/data/cities";
import { chapters, guideQuestions, type Chapter, type GuideQuestion } from "@/data/organic-chapters";
import { getService } from "@/data/services";

const pillarOnly = new Set(["zones", "reading-this-site", "search-words", "honest", "example", "opening"]);

function hash(value: string) {
  let total = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    total ^= value.charCodeAt(index);
    total = Math.imul(total, 16777619);
  }
  return total >>> 0;
}

function tagsFor(path: string) {
  const parts = new Set(path.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean));
  const has = (...words: string[]) => words.some((word) => parts.has(word));
  const tags = new Set<string>();
  if (has("grill", "grills")) tags.add("grill");
  if (has("pigeon", "bird", "birds", "spike", "spikes", "duct", "ducts")) tags.add("bird");
  if (has("child", "children", "kid", "kids", "stair", "stairs", "staircase")) tags.add("child");
  if (has("pet", "pets", "cat", "cats")) tags.add("pet");
  if (has("cricket", "sport", "sports")) tags.add("sport");
  if (has("hanger", "hangers", "mosquito", "cloth")) tags.add("utility");
  if (has("net", "nets", "terrace", "balcony", "balconies", "safety", "monkey")) tags.add("net");
  if (parts.has("locations")) tags.add("local");
  if (tags.size === 0) tags.add("general");
  return tags;
}

function shuffle<T>(items: T[], seed: number) {
  const copy = [...items];
  let state = seed || 1;
  for (let index = copy.length - 1; index > 0; index -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const swap = state % (index + 1);
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function pick(path: string, pool: Chapter[], count: number, tags: Set<string>) {
  const score = (chapter: Chapter) => chapter.tags.reduce((total, tag) => total + (tags.has(tag) ? 1 : 0), 0);
  const ranked = [...pool].sort((left, right) => score(right) - score(left) || left.id.localeCompare(right.id));
  const top = score(ranked[0]);
  const best = top > 0 ? ranked.filter((chapter) => score(chapter) === top) : ranked;
  const primary = shuffle(best, hash(`${path}:best`)).slice(0, Math.min(2, count));
  const used = new Set(primary.map((chapter) => chapter.id));
  const rest = shuffle(ranked.filter((chapter) => !used.has(chapter.id)), hash(`${path}:rest`));
  return [...primary, ...rest].slice(0, count);
}

export function guideFor(path: string) {
  const full = path === "/";
  const tags = tagsFor(path);
  const shared = chapters.filter((chapter) => !pillarOnly.has(chapter.id));
  const selected = full ? chapters : pick(path, shared, 4, tags);
  const questions = full ? guideQuestions : pickQuestions(path, 3);
  return {
    full,
    title: full ? "A plain guide to safety nets and invisible grills in Hyderabad" : "From the Hyderabad guide",
    intro: full ? fullIntro() : focusedIntro(path),
    chapters: selected,
    questions,
  };
}

function pickQuestions(path: string, count: number) {
  const start = guideQuestions.length ? hash(path) % guideQuestions.length : 0;
  return [...guideQuestions.slice(start), ...guideQuestions.slice(0, start)].slice(0, count);
}

function fullIntro() {
  return "This is the main guide for Tirumala Safety Nets in Hyderabad. It is long because the work is easy to confuse: a balcony net, a pigeon net, an invisible grill, a child or pet barrier, a drying line and a cricket net are different jobs. The guide explains those differences in ordinary language, says what a visit and a written quote should contain, and avoids a single price for every opening in the city. It is published in full on this page only. Other pages use the chapters that match them, and they link here instead of repeating the essay.";
}

function focusedIntro(path: string) {
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "services" && parts[1] && parts[1] !== "library") {
    const service = getService(parts[1]);
    if (service && parts.length === 2) {
      return `The ${service.name} page above describes that work. These chapters are the matching part of the Hyderabad guide. They do not copy the whole article.`;
    }
  }
  if (parts[0] === "locations" && parts[1] === "hyderabad" && parts[2]) {
    const city = getCity(parts[2]);
    const area = city?.areas.find((item) => item.slug === parts[3]);
    if (city && area) {
      return `${area.name}, in ${city.name}, already has its local note above. Below are a few guide chapters that usually matter on a street like this, not the full essay.`;
    }
    if (city) {
      return `${city.name} has its housing note above. These chapters are chosen for that kind of locality. The long version stays on the home page.`;
    }
  }
  if (parts[0] === "guides" && parts[1]) {
    return "This page is a single brief. The chapters under it are the related part of the Hyderabad guide, with a link to the full article.";
  }
  return "These are selected chapters from the Hyderabad guide. The full article is on the home page so the same essay is not pasted onto every URL.";
}

export type GuideShape = ReturnType<typeof guideFor>;
export type { Chapter, GuideQuestion };
