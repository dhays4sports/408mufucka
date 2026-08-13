# 408-LIFE-1.7 — Conversion + Production Certification

Status: complete.

## Goal

Finish the LIFE acquisition system with privacy-bounded conversion measurement, a protected production-readiness check, rendered browser QA, and an explicit activation contract for paid traffic.

## Implemented

- Added `shared/life-conversion.js` as a LIFE-only, first-party measurement layer.
- Measures five milestones: `landing_view`, `start_clicked`, `quick_questions_complete`, `application_details_started`, and `application_start_submitted`.
- Uses random page-memory-only `journey_id` and per-event UUIDs; no localStorage, sessionStorage, IndexedDB, cookies, fingerprint, applicant answers, identity fields, or health data enter measurement.
- Sends conversion events only to same-origin `/api/life/conversion` with `keepalive` and fail-open behavior.
- Added strict server allowlisting for event names, schema, UUIDs, and normalized campaign attribution.
- Added D1 `life_conversion_events` with unique `journey_id + event_name` deduplication and campaign/creative indexing.
- Added protected `/api/life/producer/conversions` aggregate funnel endpoint.
- Added protected `/api/life/producer/readiness` runtime checks for Cloudflare assets, D1, schema, AES key, allowed origin, Access team domain/audience, and producer allowlist.
- Added producer-workspace funnel counts, Creative A–D submission rates, and a visible production-readiness state.
- Preserved the encrypted applicant queue, Cloudflare Access authorization, sensitive-data boundary, no-Formspree/no-CoverageFit contract, and message-matched A–D campaign routing.
- Added `LIFE-PRODUCTION-CERTIFICATION.md` with explicit production activation steps.

## Privacy / measurement boundary

LIFE conversion measurement stores only event names, random non-persistent IDs, server timestamps, and normalized campaign attribution. It deliberately does not use Meta Pixel, Meta CAPI, Google Analytics, `dataLayer`, browser cookies/storage, applicant fields, quick-question answers, or producer-record content.

## Paid-traffic activation

The release is code-certified for paid traffic, but activation is conditional on the deployed environment. After deployment:

1. Sign into `/life-ops/` through Cloudflare Access.
2. Confirm Production readiness reports **Ready for paid LIFE traffic**.
3. Submit one production canary through `/life/`.
4. Confirm the canary appears in the encrypted queue.
5. Confirm `application_start_submitted` increments in the first-party funnel.
6. Delete/archive the canary according to agency procedure, then activate ads.

This artifact does not claim that those live Cloudflare checks were performed from the build environment.

## Certification

- Dedicated LIFE-1.7 logic / Worker QA: **35/35 passed**.
- Rendered Chromium journey + producer workspace QA: **19/19 passed**.
- Repository static certification: **265/265 passed**.
- Link verification: **286 checked / 0 broken**.
- Logo integration: **14/14 passed**.
- Historical Node regression suites: **38 passed / 0 unexpected failures** (plus the dedicated LIFE-1.7 suite above).
- Historical external prerequisites: **9 CoverageFit-dependent suites blocked** because the paired CoverageFit source tree is not part of this isolated 408FARMERS deployable.
- Live-network production handoff smoke: **1 deferred** because this build environment cannot exercise the deployed Cloudflare production account/network.
- Historical browser regression scripts: **6 environment-blocked** because this container does not include the Node `playwright` package; the current LIFE-1.7 rendered Chromium suite runs through Python Playwright and passed 19/19.

See `LIFE1_7_QA.json`, `LIFE1_7_BROWSER_QA.json`, and `LIFE-PRODUCTION-CERTIFICATION.md`.
