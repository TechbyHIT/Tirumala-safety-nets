# SEO validation report

Date: 11 October 2026. Environment: local Windows, Next.js dev server at `http://localhost:3000`. This is not a production crawl and not Search Console.

## Commands and results

| Command | Result |
| --- | --- |
| `npx tsc --noEmit` | Exit 0 |
| `npm run seo:audit` | Exit 0. `{"records":22527,"published":22487,"sitemapUrls":22527}` |

Audit checks that passed: registry present, template version 3, unique paths, unique published titles, no empty published titles, review records excluded from the published set, each sitemap group non-empty and at or under 50,000 URLs, groups do not overlap, XML declaration on a sample of each group, XML escape of `&`, absolute `/services` location, every blog post in the core set, a review URL renders noindex, a published URL stays indexable, an unknown service path is not a page.

## Fixed and verified locally

- `/sitemap.xml` returned 200. Body is a sitemap index whose four `<loc>` values are `http://localhost:3000/sitemaps/{core,services,locations,coverage}.xml`.
- `/sitemaps/services.xml` returned 200 with 19 `<loc>` elements (about 2 KB).
- `/sitemaps/core.xml` returned 200 and contains `http://localhost:3000/contact`.
- `/robots.txt` returned 200, allows `/`, and references `http://localhost:3000/sitemap.xml`.
- `/contact?need=photo` returned 200. Canonical is `http://localhost:3000/contact`. Browser title: “Request a free site visit | Sri Ganesha Home Safety”.
- `/services/invisible-grills/narsipatnam/narsipatnam-town` returned 200 in about 12 seconds on first compile, then about 2 seconds. Canonical is that URL. Robots meta is `noindex, follow`. The page shows “Held for review.”
- `/not-a-real-page` was logged by the dev server as 404. In the browser the title is “Page not found | Sri Ganesha Home Safety”, the H1 is “That page is not on the Andhra Pradesh map”, and the robots meta is `noindex`. No canonical element.

## Implemented but not externally verified

- Canonical tags on home, about, services, gallery, blog, FAQ, locations, library items, and blog posts are in source. Only `/contact?need=photo` and the Narsipatnam review URL were read back from a response in this session.
- `/sitemaps/locations.xml` and `/sitemaps/coverage.xml` were validated in `seo:audit` (counts, overlap, XML sample). Their full HTTP bodies were not downloaded.
- Legacy 308 redirects were not requested over HTTP in this session.
- No production host, HTTPS certificate, or CDN cache was checked.
- Structured data was not submitted to a rich-results test. The layout entity has no phone, rating, or price.

## Identified and not changed

- 16,560 published service-area URLs remain. No mass removal.
- Locality copy such as “a independent houses…” is still on the reviewed Narsipatnam page.
- The registry has not been regenerated since `2026-10-11T05:33:42.256Z`.
- Header menus, gallery size, and image pipeline were left as they were.
- No field Core Web Vitals. Dev response times above are server timings, not LCP, INP, or CLS.

## Blocked

- Search Console property, sitemap submission, and coverage: no access.
- GA4 and consent mode: no measurement ID, and no tracker was added.
- Phone and WhatsApp click tracking: those destinations are unset.
- Public canonical host: `NEXT_PUBLIC_SITE_URL` is unset, so local output uses `http://localhost:3000`.

## Environment variables

Set these outside source control. No secret values belong in the client bundle beyond the public site URL and public contact details.

- `NEXT_PUBLIC_SITE_URL` — HTTPS origin, no trailing slash
- `NEXT_PUBLIC_PHONE_DISPLAY`
- `NEXT_PUBLIC_PHONE_TEL`
- `NEXT_PUBLIC_WHATSAPP`
- `NEXT_PUBLIC_EMAIL` — overrides the default mailbox

## Local commands

```
npx tsc --noEmit
npm run seo:audit
npm run seo:generate
```

Run `seo:generate` only when you intend to refresh `data/seo/registry.json`. Then run `seo:audit` again.
