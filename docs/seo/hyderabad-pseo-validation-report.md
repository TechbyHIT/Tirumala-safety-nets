# Hyderabad programmatic SEO — audit and validation report

Generated 10 November 2026. Machine-readable outputs are in `reports/pseo/`:

- `generation-report.json`: counts, duplicates, quality, links and sitemaps (`npm run pseo:generate`).
- `page-index-audit.csv`: all 50,000 records with robots status, noindex reason and primary URL.
- `legacy-audit.json`: every legacy URL and neighbourhood record with its decision (`npm run pseo:legacy`).
- `http-verification.json`: live HTTP check of every sitemap URL (`npm run pseo:verify` against `next start`).

## Result

| Measure | Before | After |
| --- | ---: | ---: |
| Generated programmatic records | 50,000 | 50,000 |
| Index-eligible programmatic pages | 5,100 | 7,225 |
| Near-duplicate variants, canonicalised to the primary page | 0 | 42,775 |
| Noindex programmatic records | 44,900 | 0 |
| Legacy neighbourhood pages marked noindex | — | 532 |
| Verified localities | 300 | 425 |
| Zone, circle, ward and PIN hub pages | 0 | 475 |
| URLs in XML sitemaps | 5,188 | 9,136 |
| Genuine installation photographs in the image sitemap | — | 421 |

## How the 98% similarity is handled

A variant page shares 98.1% of its text with the primary page for the same service and locality (range 91.1–99.6% on 101 pairs, 3-word shingles). Rewording that text would be artificial variation, which this project does not do.

Each variant stays generated and returns HTTP 200. Its canonical is the primary page, for example `/invisible-grills-installation-in-keesara` canonicalises to `/invisible-grills-in-keesara`. The variant is not marked noindex: a cross-canonical and noindex on the same URL conflict, and Google can ignore the canonical. Variants are excluded from the XML sitemaps. All 50,000 records remain.

Pages that are unverified or have fewer than three sourced local facts would be noindex with a self canonical. None of the 50,000 are in that state.

The 7,225 indexable pages gained a care section and a safety section written per product category, from how the products are actually used. That raised body length to 559–839 words (653 on average). It does not make a variant a different document from its primary, so the variant stays consolidated.

Keyword ownership is in `src/pseo/keywords.ts`. One service hub owns each city-level keyword. One `/{service}-in-{locality}` URL owns that pair. Installation, replacement, property and use-case intents belong to that same URL.

## Location hierarchy

- **12 zones, 60 circles, 300 wards** — Telangana G.O. Ms. No. 292 (24 December 2025) and the GHMC 300-ward notice (25 December 2025).
- **103 PIN codes, 125 new post-office localities, 88 wards enriched with PINs** — India Post All India Pincode Directory (data.gov.in), 1,142 raw records for the Hyderabad, K.V. Rangareddy and Medak postal districts.
- **Excluded post offices (66):**
  - 44 serve a single institution, such as High Court, BITS, the airport, Vidhan Sabha or State Bank.
  - 2 are city head offices.
  - 20 are same-name villages outside Hyderabad, for example the Kondapur, Moosapet and Nizampet branch offices in Medak and Sangareddy. Their names would otherwise have attached the wrong PIN to a GHMC ward.
  - The list is in `data/pseo/postal-localities.json` under `excluded`.
- **Colonies and apartments: 0.** No public source publishes colony-to-ward or apartment-to-locality relationships for the 2025 wards. Generating them would mean inventing them.
- **212 wards have no PIN.** No post office carries the ward's name, and India Post does not publish PIN boundaries, so no PIN is attached by guesswork.

## Quality of the 50,000 published programmatic pages

- No duplicate paths, canonicals, titles, descriptions or H1s.
- No two pages have identical bodies, but each variant is a near-duplicate of its primary page (see Index policy).
- Every page has at least three sourced local facts and at least three FAQs.
- Each page has 479–801 words of body content (579 on average).
- Every variant page leads with the section for its own intent. A defect that printed that section twice on variant pages is fixed.
- Every page links to the other pages for the same service and locality, so no variant is reachable only through a sitemap.
- No two service bodies exceed 80% similarity. The highest is 49%, between window invisible grills and invisible grills.
- No internal links are broken, and none point to a noindex page.
- 1,056 post-office pages have fewer than three nearby links. Nearby links follow the PIN prefix and postal division, so isolated villages have few neighbours.

## Legacy URLs (2,347 checked, including 2,250 neighbourhood records)

| Group | Total | In sitemap | Not in sitemap, and why |
| --- | ---: | ---: | --- |
| Legacy service pages | 19 | 5 | 6 now redirect with 308 to the matching new service (for example `/services/pigeon-nets` → `/services/pigeon-safety-nets`). 8 are served by the new service hubs. |
| Guides | 27 | 27 | — |
| Price guides | 4 | 2 | 2 fail the existing quality check (thin body), so they are noindex. |
| Legacy locality hubs | 46 | 46 | — |
| Neighbourhood pages | 2,250 | 1,299 | 389 are road, border or approach labels (noindex). 42 fail the keyword check. 532 are near-duplicates: once place names are removed, the body matches another neighbourhood. Several are apartment names from the old unverified list. |

- **Nothing was deleted.** Every legacy URL that worked still returns 200 or redirects with 308.
- **The 532 near-duplicates were indexable before.** They are now noindex through `data/pseo/legacy-index.json`; the reason is visible in `legacy-audit.json`.
- **153 legacy pages describe the same place as a new ward or PIN locality.** They stay live and indexable because they may already be indexed. Search Console data was not available for this audit. Check impressions for these URLs, then consolidate them into the ward hubs with 308 redirects where the legacy page has no traffic.

## Fixes applied

- New programmatic URLs that share a slug with a legacy city were being sent with a 308 to the legacy city page by the old combo redirect, for example `/invisible-grills-in-kukatpally`. These URLs now render as intended.
- Internal links to the six superseded service slugs now resolve through `servicePath()` to the new slugs. This covers the navigation, service cards, footer, search, FAQ and composed pages.
- The service hubs link every locality page (by zone, then by PIN locality), so no indexable page is reachable only through the sitemap.
- The Hyderabad directory, the zone list and the HTML sitemap link the new hubs.

## Sitemaps

`/sitemap.xml` lists these sitemap files, each limited to 2,000 URLs:

| File | URLs |
| --- | ---: |
| `core.xml` | 68 |
| `services.xml` | 22 |
| `locations.xml` (Hyderabad and circles) | 61 |
| `zones.xml` | 12 |
| `wards.xml` | 300 |
| `localities.xml` (PIN hubs) | 103 |
| `legacy-locations.xml` | 1,345 |
| `images.xml` | 421 images on `/gallery` |
| `programmatic-001…004.xml` | 7,225 |

Only canonical indexable URLs are listed. Consolidated variants are not. Legacy URLs were removed from the sitemap only when they redirect, fail the quality check, or repeat another neighbourhood. Pages that may already be indexed were left in place. Search Console and backlink data were not available.

## Quality control

| Check | Result |
| --- | --- |
| Generated records | 50,000, all kept |
| Unique URLs, titles, descriptions, H1s | 50,000 unique. No duplicates. |
| Index-eligible | 7,225 primary service × locality pages |
| Noindex | 0 programmatic. 532 legacy neighbourhood pages. |
| Near-duplicates | 42,775 variants, 98.1% similar to their primary page |
| Canonical consolidations | 42,775, each pointing at its primary page, none also noindex |
| Sitemap URLs | 9,136 page URLs across 12 files, plus 421 images. Live check: 9,137 fetches, all HTTP 200, self canonical, no noindex. 40 consolidated variants returned 200 with the primary canonical and were absent from the sitemaps. |
| Broken internal links on indexable pages | 0 |
| Missing title, description or H1 | 0 |
| Schema | Organization, WebSite, WebPage, Service, BreadcrumbList, FAQPage on indexable pages. No ratings, reviews or street address. |
| Internal links | Service hubs link every locality. Indexable pages link the zone, ward or PIN, nearby localities and related services. |
| Location coverage | 12 zones, 60 circles, 300 wards, 425 localities, 103 PINs. Colonies and apartments: no verified source, so none were invented. |
| Core Web Vitals | Not measured on a production URL. Fonts use `display: swap`. Gallery images are WebP. No lab score is claimed. |
| Search Console | Ready for a verification token in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. Nothing is reported as indexed, because Search Console was not connected. |
| Still open | 212 wards have no honest PIN. 153 legacy pages overlap a new ward and need a traffic check before a redirect. Variant pages remain 98% similar by design and must stay canonicalised. |

## Regenerating

```
npm run pseo:postal     # rebuild localities from data/pseo/sources/india-post-pincode-raw.json
npm run pseo:legacy     # re-audit legacy pages and refresh data/pseo/legacy-index.json
npm run pseo:generate   # validation + reports (pseo:check fails CI on any problem)
npm run build && npx next start -p 3100
VERIFY_BASE=http://localhost:3100 npm run pseo:verify
```
