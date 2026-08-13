# 408FARMERS QR Route Worker Hotfix

## Production failure

Cloudflare Pages Advanced Mode deploys `_worker.js` as the request owner. The `_redirects` file is not applied to requests served by Pages Functions/Advanced Mode. As a result, `/home/qr/<ZIP>/<variant>/` was passed directly to `env.ASSETS.fetch(request)`. Because that deep path has no physical asset, the asset layer fell back to the root `index.html`, producing the generic `Insurance That Fits.` page. Its root-relative assumptions then caused the deep-path browser render to appear unstyled.

## Fix

`_worker.js` now mirrors the intended 200 page rewrites before calling `env.ASSETS.fetch`, including:

- `/home/qr/*` -> `/home/index.html`
- `/home/campaign/*` -> `/home/index.html`
- `/home/*` -> `/home/index.html`
- `/neighbor/r/*` -> `/neighbor/index.html`
- bounded professional/property wildcard routes from `_redirects`

The browser URL remains the clean campaign URL, so `shared/flyer-campaign.js` can continue parsing ZIP and `rate`/`fit` from `window.location.pathname`.

## Certification

- Advanced Mode worker routing QA: 10/10
- Deep-route asset QA: 12/12
- HOME-2.7 campaign routing: 15/15
- NP-1.5 any-ZIP attribution: 15/15
- FLOW-2.5 contract: 74/74
- FLOW-2.5 runtime: 8/8
- Static production checks: 296/296
- Internal link validation: 325 checked, 0 broken
