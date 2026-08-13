# 408-LIFE-1.6 — Campaign Message Matching + Attribution

Status: complete.

## Goal

Make the four approved LIFE ads land on one `/life/` experience that immediately continues the clicked creative's message while preserving privacy-safe paid-social attribution through the secure Cloudflare producer queue.

## Implemented

- Added `shared/life-campaign.js` as a LIFE-only, memory-only campaign layer.
- Added four canonical hero variants: A `before_anything_changes`, B `20_minutes`, C `this_is_the_time`, and D `financial_picture`.
- Added safe alias resolution with unknown/malformed values falling back to Creative A.
- Added canonical Meta routing parameters documented in `LIFE-CAMPAIGN-ROUTING.md`.
- Preserved one landing-page route instead of creating four separate funnels.
- Added campaign attribution to the secure LIFE application-init payload without using hidden applicant fields or generic site attribution storage.
- Extended the Cloudflare Worker with an exact-key campaign-attribution allowlist and server-side normalization.
- Encrypted attribution together with the LIFE application-start payload before D1 persistence.
- Added Creative, source, campaign, campaign ID, and content visibility to the protected producer queue.
- Added Creative/source context directly to queue cards for fast campaign recognition.
- Preserved direct-contact fallback attribution by appending only non-sensitive normalized campaign parameters to same-origin `/contact/` links.
- Added no Meta Pixel, CAPI, GA, dataLayer events, localStorage, sessionStorage, IndexedDB, cookies, or cross-site campaign transport.
- Preserved the LIFE-1.5 Cloudflare Access, AES-GCM queue, D1, no-Formspree, no-CoverageFit, and sensitive-data isolation contracts.

## Paid traffic gate

`paidTrafficReady` remains `false`. Campaign matching and attribution are complete; LIFE-1.7 must still certify end-to-end conversion behavior, production environment bindings, analytics/privacy boundaries, mobile/browser behavior, and final paid-traffic readiness.

## Next sprint

`408-LIFE-1.7 — Conversion + Production Certification`

## Certification

- LIFE-1.6 dedicated QA: 38/38.
- LIFE-1.1 through LIFE-1.5 regression contracts: all pass locally.
- Static repository certification: 265/265.
- Local link verification: 285 checked / 0 broken.
- Logo integration: 14/14.
- Historical local Node suites: 38 passed; 9 blocked only by the absent paired CoverageFit source tree; 0 unexpected failures.
- HTML duplicate IDs: 0 across 25 HTML files.
- LIFE CSS brace/syntax sanity: balanced.
