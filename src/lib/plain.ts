export function plain(text: string) {
  return text
    .replace(/UV-stabilised HDPE/gi, "sun-safe netting")
    .replace(/UV-stabilised/gi, "sun-safe")
    .replace(/UV grade/gi, "sun protection")
    .replace(/SS316/g, "stainless steel")
    .replace(/SS304/g, "stainless steel")
    .replace(/substrates?/gi, "wall")
    .replace(/apertures?/gi, "gaps")
    .replace(/specifications?/gi, "details")
    .replace(/anchoring/gi, "fixing")
    .replace(/\banchors?\b/gi, "fixings")
    .replace(/\bgrades?\b/gi, "types");
}
