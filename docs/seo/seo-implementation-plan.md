# SEO implementation plan

Priority follows crawl and index risk, then metadata, then content, then measurement. No traffic or ranking outcome is attached to these items.

## Done in this pass

1. Sitemap index and shard routes read the registry instead of rebuilding the catalog.
2. XML locations are escaped. Each URL is in one shard. `lastmod` comes from the registry date.
3. Self canonicals on the static indexable pages, blog posts, and library items. Contact query strings collapse to `/contact`.
4. `pageAt()` takes index status from the registry. URLs the registry does not list are noindex. Unpublished targets are removed from that page’s link modules.
5. 404 metadata is `noindex`.
6. `npm run seo:audit` checks the registry, unique titles, sitemap limits, XML escaping, blog inclusion, a review URL, and a published URL.

## Next, in order

1. **Set the public origin before any launch.** `NEXT_PUBLIC_SITE_URL` must be the HTTPS hostname. Until then, canonicals and `robots.txt` point at localhost. Confirm the response headers on the host you actually deploy. Effort: small. Depends on the real domain.
2. **Regenerate the registry after content or topic-overlap edits.** `npm run seo:generate` is the only way new programmatic URLs become publish records. Until then they stay noindex on purpose. The file on disk is from 11 October 2026, 05:33 UTC, which is before later topic-overlap widening. Effort: one local run of several minutes. Do not commit secrets. Review the publish/review/exclude counts before replacing `data/seo/registry.json`.
3. **Decide whether 16,560 service-area URLs should stay.** They are the largest indexable set. Leave them until someone chooses a prune. A prune needs redirects or 410s for URLs that already exist, not a silent deletion.
4. **Fix locality sentences that fail basic grammar**, starting with pages already in review. Example seen in the browser: “a independent houses…” on the Narsipatnam town invisible-grill URL. That URL is noindex. The same template may affect published area pages. Effort: medium. Do not invent local facts to fill the sentence.
5. **Search Console and GA4 only with real credentials.** Store them outside the repo. Do not add a measurement ID until one is provided. Track photo-estimate submits, phone clicks, and WhatsApp clicks once those destinations exist.
6. **Measure Core Web Vitals on the deployed host.** Dev-server times are not field data. Image derivatives and fewer images per page are already in place.
7. **Add the audit to CI** when a workflow exists. Fail on `seo:audit` and `tsc --noEmit`. Do not fail the build because a title is a few characters shorter than a style guide.

## Explicitly not scheduled

- Hreflang, extra languages, or city pages outside Andhra Pradesh.
- FAQ, review, or offer schema without eligible on-page data.
- A private SEO dashboard. The CLI audit is enough until private data needs a login.
- Mass generation of every service × city × area combination. `topicOverlap` and the quality gate stay in front of publishing.
- Buying links, disavow files, or outreach automation. No backlink export exists in this repo.

## Rollback

The registry file is the index switch. Restoring the previous `data/seo/registry.json` restores the previous publish set after a generate. Code rollback is a normal git revert of `src/seo/sitemaps.ts`, `src/seo/indexable.ts`, `src/seo/catalog.ts` `pageAt()`, the route metadata canonicals, and `scripts/seo-audit.ts`. No database migration is involved.
