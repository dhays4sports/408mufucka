# 408-LIFE-1.7 — LIFE Production Certification

**Artifact status:** CODE-CERTIFIED  
**Live Cloudflare status:** REQUIRES POST-DEPLOY READINESS + CANARY  
**Paid traffic:** ACTIVATE ONLY AFTER THE CHECKLIST BELOW PASSES

## What is certified in this artifact

- One canonical `/life/` route with Creative A–D message matching.
- Three-question engagement intake and bounded application-initialization form.
- Same-origin secure application submission to the Cloudflare Worker.
- AES-256-GCM application-layer encryption before D1 persistence.
- Protected producer queue under Cloudflare Access + producer allowlist.
- First-party conversion events containing only event name, random memory-only IDs, and normalized campaign attribution.
- No applicant identity, SSN, DOB, address, email, phone, quick-question answer, or health data in conversion measurement.
- No Meta Pixel, CAPI, Google Analytics, dataLayer, cookies, localStorage, sessionStorage, or IndexedDB on the LIFE campaign measurement path.
- Fail-open conversion measurement: analytics failure cannot block application submission.
- Production-readiness endpoint is protected by the same producer authorization boundary.


## Artifact QA results

- LIFE-1.7 dedicated logic / Worker QA: **35/35 passed**.
- Rendered Chromium journey + producer workspace QA: **19/19 passed**.
- Static repository certification: **265/265 passed**.
- Link verification: **286 checked / 0 broken**.
- Logo integration: **14/14 passed**.
- Historical Node regression suites: **38 passed / 0 unexpected failures** (plus the dedicated LIFE-1.7 suite above).
- **9** historical suites require the separate paired CoverageFit source tree and are blocked in this isolated repo.
- **1** live-network production handoff smoke is deferred to post-deploy because the build environment cannot exercise the user's Cloudflare production account.
- **6** historical `.mjs` browser regression scripts are environment-blocked because the Node `playwright` package is not installed; the current LIFE-1.7 rendered Chromium suite uses Python Playwright and passed 19/19.

## Required Cloudflare production bindings / variables

- `ASSETS` Pages asset binding
- `LIFE_QUEUE_DB` D1 binding
- `LIFE_QUEUE_ENCRYPTION_KEY_B64` secret containing exactly 32 decoded bytes
- `LIFE_ALLOWED_ORIGIN` containing `https://408farmers.com`
- `LIFE_ACCESS_TEAM_DOMAIN`
- `LIFE_ACCESS_AUD`
- `LIFE_PRODUCER_EMAILS`

## Post-deploy activation checklist

- [ ] Deploy the complete LIFE-1.7 artifact to the existing 408FARMERS Cloudflare Pages project.
- [ ] Confirm Cloudflare Access protects `/life-ops/*` and `/api/life/producer/*`.
- [ ] Open `/life-ops/` as an allowlisted producer.
- [ ] Confirm **Production readiness → Ready for paid LIFE traffic**.
- [ ] Open each canonical Creative A–D URL and verify the matching hero.
- [ ] Complete one canary application start using non-production test data that is appropriate for agency testing.
- [ ] Confirm the canary appears in the encrypted producer queue.
- [ ] Confirm `application_start_submitted` increments in the first-party funnel.
- [ ] Confirm applicant identity fields do not appear in browser storage, URLs, third-party requests, or conversion payloads.
- [ ] Confirm the queue can move through status actions and the canary can be removed/archived per agency procedure.
- [ ] Activate paid traffic only after every item above passes.

## Important boundary

The build environment cannot inspect the user's deployed Cloudflare project, secrets, D1 binding, Access policy, DNS, or production network behavior. Therefore this package does not falsely claim a live-production smoke test. The protected readiness endpoint and canary are the authoritative activation checks after deployment.
