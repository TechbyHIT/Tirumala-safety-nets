# SEO baseline

Inspected 11 October 2026 against this Next.js 15 App Router repository. Findings below were checked in source, `data/seo/registry.json`, `npm run seo:audit`, `npx tsc --noEmit`, or a local dev server. Nothing here is a ranking, indexing, or traffic claim.

## Stack

- Next.js 15.5, React 19, Tailwind 3, TypeScript. App Router only.
- Rendering: static and on-demand pages from `generateStaticParams`. `dynamicParams` is true for area, service-area, and guide-city routes. Service-city stays closed (`dynamicParams` false).
- Content is local TypeScript data (services, cities, areas, guides, gallery). No CMS and no database.
- Public photos in `public/gallery` are WebP. Display and Open Graph images use the 720px and 1400px derivatives.
- Site origin is `NEXT_PUBLIC_SITE_URL`, otherwise `http://localhost:3000`.
- No Google Analytics, Tag Manager, or Search Console verification file is in the repo.
- No test runner. Checks are `tsc` and `npm run seo:audit`.

## Registry on disk

`data/seo/registry.json` was generated at `2026-10-11T05:33:42.256Z` with template version 3.

| Status | Kind | Count |
| --- | --- | --- |
| publish | state | 1 |
| publish | service | 19 |
| publish | city | 96 |
| publish | area | 1,365 |
| publish | service-city | 1,824 |
| publish | service-area | 16,560 |
| publish | guide | 30 |
| publish | guide-city | 2,592 |
| review | service-area | 39 |
| review | guide | 1 |

22,527 records. 22,487 are publish and indexable. 40 are review. Excluded drafts are not stored in the registry. The sitemap audit counted 22,527 unique sitemap URLs after adding static, blog, and library URLs that are not registry records.

Catalog counts shown in the UI come from `src/data/stats.ts`: 19 services, 96 cities, 1,459 areas, 438 unique photos, 26 districts. Those are inventory counts, not customer or satisfaction claims.

## Verified findings

### High — Sitemap generation previously built the whole catalog

`/sitemap.xml`, `/sitemaps/[type]`, and the HTML sitemap called `getCatalog()`, which scores every draft in one process. A service page that did the same thing timed out at 120 seconds on the dev server before that path was changed to compose one page. The sitemap routes now read the registry. After the change, the dev server returned `/sitemap.xml` in about 6 seconds including compile (0.4 KB index), `/sitemaps/services.xml` with 19 `<loc>` values, and `/sitemaps/core.xml` including `http://localhost:3000/contact`.

### High — Live index status could disagree with the quality registry

`pageAt()` scored one page with an empty collision map, so a near-duplicate that the full catalog had held back could still render as indexable. Review and excluded URLs were also still linked from composed pages, because link pruning only ran inside `buildCatalog()`.

Fixed in this pass: a registry hit sets status and `index`. A programmatic URL missing from the current registry is `review` and `noindex`. Manual overrides still win. Outbound links are limited to published registry paths plus the core static paths.

Checked: `/services/invisible-grills/narsipatnam/narsipatnam-town` (registry status `review`) returned HTTP 200 with `robots` content `noindex, follow`, a self canonical, and the visible “Held for review” notice. `npm run seo:audit` also asserts that this class of URL is noindex and that a published sample stays indexable.

### Medium — Query variants on static pages had no canonical

`/contact?need=photo` is a real photo-estimate state of the contact form. Before this pass the page had no self canonical, so the query URL could be treated as a second contact URL. It now canonicals to `/contact`. Confirmed in the HTML: `rel="canonical" href="http://localhost:3000/contact"`. The same absolute canonical pattern is on home, about, services, gallery, blog, FAQ, locations, the HTML sitemap, blog posts, and library items.

### Medium — Sitemap locations were not XML-escaped

`xmlEscape` now covers `&`, `<`, `>`, and quotes. The audit checks a sample and rejects double-escaped `&amp;amp;`.

### Medium — Production origin is still localhost unless the env var is set

`robots.txt` on the dev server advertises `Sitemap: http://localhost:3000/sitemap.xml`. That is correct for local work and wrong for a public host until `NEXT_PUBLIC_SITE_URL` is the real HTTPS origin. No production deploy was run.

### Low — 404 responses

`/not-a-real-page` is a real 404 in the dev log. The browser showed the heading “That page is not on the Andhra Pradesh map” and a `robots` meta of `noindex`. There is no canonical on that response.

### Informational — Scale of service-area URLs

16,560 published service-area URLs remain. They were not removed. Pruning them would be a mass URL change and needs an explicit decision. They passed the last full quality run; they were not re-scored after later copy and topic-overlap edits.

### Informational — Content grammar on reviewed pages

The Narsipatnam town review page repeats an ungrammatical locality sentence (“a independent houses…”). That is a content defect on a URL that is already noindex. It was not rewritten in this pass.

## Unknowns

- No Search Console coverage, query, or enhancement data.
- No GA4 or field Core Web Vitals. Dev timings are not lab or field metrics.
- No crawl from Google, and no confirmation that any URL is indexed.
- Phone and WhatsApp are empty until `NEXT_PUBLIC_PHONE_DISPLAY`, `NEXT_PUBLIC_PHONE_TEL`, and `NEXT_PUBLIC_WHATSAPP` are set. The public email default is `care@sriganeshahomesafety.in`.
- Whether every legacy path in `src/seo/legacy.ts` still has an external inbound link is unknown. The middleware returns 308 when it recognizes one.
