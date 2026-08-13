# 408-LIFE-1.5 — Producer Application Queue

Status: complete.

## Goal

Turn the LIFE-1.4.1 Cloudflare secure submission boundary into an actionable, authenticated producer workflow without exposing life application-start data to Formspree, CoverageFit, email, analytics, URLs, or browser persistence.

## Implemented

- Replaced the external producer-relay placeholder with a Cloudflare-native producer queue.
- Added D1 queue persistence through the `LIFE_QUEUE_DB` binding.
- Added application-layer AES-256-GCM encryption before applicant data is written to D1.
- Kept the public intake endpoint stable at `POST /api/life/application-init`.
- Added a protected producer workspace at `/life-ops/`.
- Added authenticated producer APIs:
  - `GET /api/life/producer/queue`
  - `GET /api/life/producer/item?id=<request_id>`
  - `POST /api/life/producer/status`
  - `DELETE /api/life/producer/item?id=<request_id>`
- Added Cloudflare Access JWT verification using the Access signing-key endpoint, RS256 signature verification, issuer validation, audience validation, expiration/not-before validation, and a producer email allowlist.
- Added queue states: `new`, `initiated`, `emailed`, `follow_up`, `completed`, and `archived`.
- Added a non-PII audit trail for queue creation, status changes, and deletion.
- Added idempotent public intake storage using the client submission UUID as the D1 primary key.
- Kept full applicant detail out of queue-list cards until an authorized producer opens a specific record.
- Added memory-only producer UI behavior that clears detail fields when the record is closed, the page is hidden, or the page unloads.
- Added a permanent-delete action for intentional removal from the producer queue.
- Added no-store, noindex, anti-framing, restrictive permissions, and same-origin CSP rules for `/life-ops/*`.
- Updated LIFE public success language to state that the accepted application start is placed into Dylan's protected producer application queue.

## Queue storage model

D1 stores only queue metadata plus encrypted payload material:

- request ID
- queue status
- created/updated timestamps
- AES-GCM ciphertext
- AES-GCM IV

The applicant payload — including date of birth, residential information and last four of Social — is encrypted before D1 write. The AES key is supplied only through the Cloudflare secret `LIFE_QUEUE_ENCRYPTION_KEY_B64` and is never stored in the repository or browser.

Cloudflare D1 also provides platform encryption at rest and encrypted transport; application-layer AES-GCM is retained as defense in depth for LIFE application-start records.

## Producer authentication

The producer API fails closed unless all of the following pass:

1. Cloudflare Access has supplied `Cf-Access-Jwt-Assertion`.
2. The JWT is signed by the configured Cloudflare Access signing key.
3. `iss` matches `LIFE_ACCESS_TEAM_DOMAIN`.
4. `aud` includes `LIFE_ACCESS_AUD`.
5. `exp` / `nbf` are valid.
6. The JWT email appears in `LIFE_PRODUCER_EMAILS`.

The `/life-ops/` static shell contains no applicant data. Sensitive queue APIs enforce authentication independently so an accidental Access path-rule omission does not expose queue records.

## Sensitive-data rules

Applicant fields remain excluded from Formspree, CoverageFit, dataLayer, advertising analytics, query strings, localStorage, sessionStorage, IndexedDB, cookies, ordinary email, and public site pages. Producer pages also use no browser persistence.

The Worker contains no request-body or decrypted-payload logging.

## Paid traffic gate

The LIFE-1.5 producer-queue prerequisite is complete. `paidTrafficReady` remains `false` until the campaign message-matching/attribution sprint and final conversion/production certification are complete in LIFE-1.6 and LIFE-1.7.

## Next sprint

`408-LIFE-1.6 — Campaign Message Matching + Attribution`
