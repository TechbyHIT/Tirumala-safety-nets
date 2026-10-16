# SEO architecture

English only. The served market is Andhra Pradesh. There is no hreflang, no country split, and no second language. Do not add hreflang until a real localized equivalent exists.

## URL policy

Preferred URLs are lowercase, hyphenated, and have no trailing slash. Next.js is left on that default (`trailingSlash` is not enabled).

| Entity | Path |
| --- | --- |
| Home | `/` |
| Service | `/services/{service}` |
| Service library item | `/services/library/{slug}` |
| Service in a city | `/services/{service}/{city}` |
| Service in a neighbourhood | `/services/{service}/{city}/{area}` |
| State | `/locations/andhra-pradesh` |
| City | `/locations/andhra-pradesh/{city}` |
| Neighbourhood | `/locations/andhra-pradesh/{city}/{area}` |
| Guide | `/guides/{slug}` |
| Guide in a city | `/guides/{slug}/{city}` |
| Article | `/blog/{slug}` |
| Contact, including photo estimate | `/contact` |

`/contact?need=photo` is a view of `/contact`, not a second indexable URL. Its canonical is `/contact`.

Legacy flat paths (`/areas/{slug}`, `/{city}`, `/{service}`, old service-city combos) 308 to the paths above when `legacyRedirect()` recognizes them. The middleware does not redirect the current `/services`, `/guides`, `/blog`, or `/locations/andhra-pradesh` trees.

Unknown paths call `notFound()`. The 404 document is `noindex` and links to locations and contact.

## Indexing

`data/seo/registry.json` is the index source for programmatic pages when its `templateVersion` matches `TEMPLATE_VERSION` in `src/seo/types.ts` (currently 3).

- `publish` and `index: true` — eligible for the XML sitemap and `index, follow`.
- `review` — HTTP 200, `noindex, follow`, omitted from sitemaps, banner shown on the page.
- Missing from the registry — treated as review / noindex until `npm run seo:generate` records it. This stops on-demand renders from indexing drafts the full catalog never approved.
- Manual file `data/seo/overrides.json`, when present, overrides that decision for one path. A forced publish still needs a fresh generate before the sitemap includes it.
- `status: "exclude"` inside a composed page returns 404 via `SeoScreen`.

Static pages (home, services index, library items, locations index, gallery, about, blog index, posts, FAQ, contact, HTML sitemap) are indexable and are not registry records. They are listed in the core sitemap.

Quality scoring in `src/seo/quality.ts` rejects unsupported claims (`5000+`, `10+ years`, cheapest, number one, guaranteed to stop, `#1`), thin bodies, weak metadata, keyword piles, and service-area pages whose text collapses to an existing page once place names are removed. The score is an internal gate, not a ranking factor.

## Sitemaps and robots

`/sitemap.xml` is a sitemap index with four children:

- `core` — static pages, blog posts, library items, published guides
- `services` — published service pages
- `locations` — published state, city, and area pages
- `coverage` — published service-city, service-area, and guide-city pages

Each URL is in one group. A group must stay at or under 50,000 URLs. `lastmod` is the registry `updatedAt` date. Static URLs with no registry row omit `lastmod` rather than using the clock. Locations are absolute and XML-escaped.

`/robots.txt` allows `/` and points at `{site.url}/sitemap.xml`. It is not an access-control mechanism. CSS and JavaScript are not blocked.

The HTML sitemap at `/sitemap` lists published services, the state page, cities, and guides, plus counts for the rest. It does not print every neighbourhood URL.

## Metadata and schema

Programmatic pages use `metadataFor()` → `pageAt()`. Titles, descriptions, canonicals, robots, and Open Graph images come from the composed page. The root layout title template is `%s | Sri Ganesha Home Safety`. The home page does not set its own title, so it keeps the layout default and does not double the brand.

JSON-LD on programmatic pages is built in `compose.ts` from the page’s own breadcrumb and content. The layout adds one `HomeAndConstructionBusiness` entity with the business name, email, Andhra Pradesh as the served state, and the site URL. It does not include a phone, rating, review, price, or opening-hours specification beyond the visible hours in the footer. FAQ rich-result markup is not emitted.

Valid structured data does not mean a search result will show a rich feature.

## What this site does not do

- No e-commerce, offers, or product prices.
- No fake offices, reviews, or city-swapped doorway pages. A neighbourhood URL exists only when the city data has that area and, for a service combination, `topicOverlap` finds a real local note.
- No analytics pixels and no consent banner, because no tracker is installed.
- No image sitemap. Images sit on the pages that use them, as WebP.
