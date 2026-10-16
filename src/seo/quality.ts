import type { PageDocument, PageStatus } from "./types";

const banned = [/5000\+/, /10\+ years/i, /cheapest/i, /number one/i, /guaranteed to stop/i, /#1/];

export function pageText(page: PageDocument) {
  return [
    page.h1,
    page.hero,
    page.description,
    ...page.modules.flatMap((module) => {
      if (module.type === "prose") return module.paragraphs;
      if (module.type === "list") return module.items;
      if (module.type === "steps") return module.steps.flatMap((step) => [step.title, step.text]);
      if (module.type === "note") return [module.text];
      if (module.type === "faqs") return module.items.flatMap((item) => [item.q, item.a]);
      return [];
    }),
  ].join(" ");
}

export function skeletonOf(text: string, names: string[]) {
  let value = text.toLowerCase();
  const ordered = [...names].sort((a, b) => b.length - a.length);
  for (const name of ordered) {
    if (name.length < 3) continue;
    value = value.split(name.toLowerCase()).join(" ");
  }
  return value.replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

export function keywordHits(text: string, terms: string[]) {
  const haystack = text.toLowerCase();
  return terms.filter(Boolean).map((term) => {
    const needle = term.toLowerCase();
    let count = 0;
    let from = 0;
    while (from < haystack.length) {
      const found = haystack.indexOf(needle, from);
      if (found === -1) break;
      count += 1;
      from = found + needle.length;
    }
    return { term, count };
  });
}

export function assess(page: PageDocument, names: string[], seen: Map<string, string>) {
  const text = pageText(page);
  const skeleton = skeletonOf(text, names);
  const hits = keywordHits(text, [page.h1, page.params.service ?? "", page.params.city ?? ""]);
  const reasons: string[] = [];
  let score = 70;

  const words = text.split(/\s+/).length;
  if (words < 140) {
    score -= 25;
    reasons.push("Thin body");
  } else if (words > 220) {
    score += 8;
  }

  if (!page.h1 || !page.description || page.description.length < 50) {
    score -= 20;
    reasons.push("Weak metadata");
  }
  if (page.modules.length < 3) {
    score -= 15;
    reasons.push("Too few modules");
  }
  if (banned.some((pattern) => pattern.test(text))) {
    score -= 40;
    reasons.push("Unsupported claim");
  }
  const stuffed = hits.some((hit) => hit.term.length > 3 && hit.count > 22);
  if (stuffed) {
    score -= 20;
    reasons.push("Keyword overuse");
  }

  const collisionKey = `${page.kind}:${page.params.service ?? ""}:${skeleton}`;
  const prior = seen.get(collisionKey);
  if (prior && prior !== page.id) {
    score -= 30;
    reasons.push(`Repeats ${prior} after local names are removed`);
  } else {
    seen.set(collisionKey, page.id);
    score += 10;
  }

  if (page.kind === "service-area" && words < 180) {
    score -= 15;
    reasons.push("Area page adds little beyond the city page");
  }

  const repeats = reasons.some((reason) => reason.startsWith("Repeats"));
  let status: PageStatus = "publish";
  if ((repeats && page.kind === "service-area") || score < 55) status = "exclude";
  else if (
    repeats ||
    reasons.includes("Unsupported claim") ||
    reasons.includes("Keyword overuse") ||
    reasons.includes("Thin body") ||
    reasons.includes("Area page adds little beyond the city page")
  ) status = "review";

  page.skeleton = skeleton;
  page.keywordHits = hits;
  page.reasons = reasons;
  page.score = Math.max(0, Math.min(100, score));
  page.status = status;
  page.index = status === "publish";
  return page;
}

export function dropUnpublishedLinks(page: PageDocument, indexable: Set<string>) {
  const always = new Set(["/", "/services", "/locations", "/contact", "/faq", "/blog", "/about", "/gallery"]);
  page.modules = page.modules
    .map((module) => {
      if (module.type !== "links") return module;
      return { ...module, links: module.links.filter((link) => link.href && (always.has(link.href) || indexable.has(link.href))) };
    })
    .filter((module) => module.type !== "links" || module.links.length > 0);
  return page;
}
