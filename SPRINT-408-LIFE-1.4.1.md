# 408-LIFE-1.4.1 — Cloudflare Secure Submission Alignment

Status: complete.

## Goal

Correct LIFE-1.4's platform mismatch by moving the secure LIFE application-start boundary onto the existing 408FARMERS Cloudflare Pages deployment without changing the approved intake, sensitive-data rules, producer relay contract, or paid-traffic gate.

## Implemented

- Removed `netlify.toml` and the `netlify/functions/` runtime.
- Added a Cloudflare Pages Advanced Mode `_worker.js`.
- Preserved the public same-origin endpoint at `POST /api/life/application-init`.
- Routed every non-API request through `env.ASSETS.fetch(request)` so the existing static 408FARMERS site remains intact.
- Added root `_headers` security rules for `/life/*` static responses.
- Kept API security headers directly in the Worker response boundary.
- Reimplemented HMAC-SHA256 with Workers-native Web Crypto instead of Node `crypto`.
- Moved runtime configuration to Cloudflare `env` bindings / Variables and Secrets.
- Preserved strict origin, content-type, request-version, body-size, anti-bot, schema, exact-key, enum, DOB, ZIP, email, phone, and last-four validation.
- Preserved HTTPS producer relay, Bearer authentication, HMAC signature, timestamp, idempotency key, timeout, generic response, and fail-closed delivery semantics.
- Preserved the no-Formspree, no-CoverageFit, no-browser-persistence, no-URL, no-analytics, and no-request-body-log trust boundary.
- Preserved the LIFE-1.5 producer queue as the remaining paid-traffic prerequisite.

## Cloudflare deployment choice

This build uses `_worker.js` Advanced Mode rather than a `/functions` directory because the repository is distributed as a deployable ZIP and Cloudflare Direct Upload supports `_worker.js` in dashboard drag-and-drop deployments. The Worker forwards all non-API requests to the Pages asset server.

See `LIFE-SECURE-SUBMISSION-DEPLOYMENT.md` for Cloudflare Variables/Secrets and receiver configuration.

## Sensitive-data rules

`ssn_last4`, DOB and applicant identity/contact fields remain excluded from Formspree, CoverageFit, dataLayer, analytics, URLs, localStorage, sessionStorage, IndexedDB and cookies. The Worker does not persist or log applicant request bodies.

## Paid traffic gate

`paidTrafficReady` remains `false`. LIFE-1.4.1 certifies the Cloudflare implementation; LIFE-1.5 must provide and certify the authenticated producer application queue / receiver before paid traffic is enabled.

## Next sprint

`408-LIFE-1.5 — Producer Application Queue`

## Certification

- LIFE-1.4.1 dedicated Cloudflare boundary: 45/45 checks passed.
- LIFE-1.4 preservation: 13/13 checks passed.
- Static repository certification: 265/265 checks passed.
- Local link verification: 276 checked / 0 broken.
- Logo integration: 14/14 checks passed.
- Historical local Node regression: 36 test files passed; 9 additional tests are blocked only by the separate CoverageFit source tree not being present in this isolated deployable; 0 unexpected failures.
- `_worker.js` passes Node ES-module syntax validation.
