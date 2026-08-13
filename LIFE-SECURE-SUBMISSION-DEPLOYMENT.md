# 408-LIFE-1.7 — Cloudflare Secure Submission + Producer Queue + Conversion Deployment

The LIFE flow now stays entirely inside the existing 408FARMERS Cloudflare Pages deployment:

`/life/` → `POST /api/life/application-init` → encrypted D1 queue → Cloudflare Access-protected `/life-ops/` producer workspace.

No Netlify runtime or external producer relay is required.

## Cloudflare runtime

The deployable uses the root `_worker.js` Cloudflare Pages Advanced Mode Worker. It owns the LIFE public API and protected producer APIs and forwards every other request to `env.ASSETS.fetch(request)`.

The root `_headers` file applies no-store and browser-hardening rules to `/life/*` and `/life-ops/*`. Worker-generated API responses set their security headers directly.

## Required Cloudflare bindings / secrets

Configure these on the existing 408FARMERS Cloudflare Pages project before production testing:

### D1 binding

- Binding name: `LIFE_QUEUE_DB`
- Value: a dedicated Cloudflare D1 database for LIFE application-start queue records.

The Worker creates the required queue tables/indexes with `CREATE TABLE IF NOT EXISTS` on first use. Use a dedicated D1 database rather than sharing a general-purpose application database.

### Secrets / variables

- `LIFE_ALLOWED_ORIGIN=https://408farmers.com`
- `LIFE_QUEUE_ENCRYPTION_KEY_B64=<base64 encoded 32-byte random key>`
- `LIFE_ACCESS_TEAM_DOMAIN=<your-team>.cloudflareaccess.com`
- `LIFE_ACCESS_AUD=<Cloudflare Access Application Audience tag>`
- `LIFE_PRODUCER_EMAILS=dylan.vtam@farmersagency.com`

`LIFE_QUEUE_ENCRYPTION_KEY_B64` is a secret. Do not place it in the repository, browser JavaScript, URL, analytics, documentation screenshots, or ordinary email.

A 32-byte encryption key can be generated locally with a cryptographically secure random generator and then base64 encoded before adding it as a Cloudflare secret.

## Cloudflare Access configuration

Create Cloudflare Access self-hosted application rules that protect both producer surfaces:

- `408farmers.com/life-ops/*`
- `408farmers.com/api/life/producer/*`

Authorize only the agency identity/identities that should access LIFE application-start records. Configure `LIFE_ACCESS_AUD` with the Access application's Audience tag and `LIFE_ACCESS_TEAM_DOMAIN` with the Access team domain.

The Worker validates the `Cf-Access-Jwt-Assertion` itself and also requires the authenticated email to be listed in `LIFE_PRODUCER_EMAILS`. Access policy plus Worker validation provides defense in depth.

## Queue behavior

A valid public application start is normalized, encrypted with AES-256-GCM, and written idempotently to D1 under the browser-generated UUID. D1 never receives plaintext applicant JSON from the Worker storage call.

The producer list endpoint decrypts only enough information to render the protected queue. The item-detail endpoint decrypts a single selected application start. The last four of Social is never included in the queue-list response; it is returned only with the selected protected detail response.

Producer statuses:

- `new`
- `initiated`
- `emailed`
- `follow_up`
- `completed`
- `archived`

Status changes and deletion write a small audit event containing request ID, action, authenticated producer email, status transition, and timestamp. The audit table contains no applicant PII.

## Trust boundary

The LIFE public page and producer workspace do not place applicant data in Formspree, CoverageFit, localStorage, sessionStorage, IndexedDB, cookies, query-string payloads, dataLayer, Meta/Google analytics events, Slack, or normal email.

The Worker does not log request bodies or decrypted applicant payloads.

D1 encrypts data at rest and transport within Cloudflare. LIFE-1.5 additionally encrypts the application payload with a separate AES-GCM application secret before D1 persistence.

## Fail-closed behavior

Public submission fails with a generic response if schema validation, D1 binding, queue encryption, or queue write fails. The browser does not show a success state unless D1 has accepted the queue record.

Producer API requests fail generically if Cloudflare Access JWT validation, audience/issuer validation, producer allowlisting, decryption, D1 access, or action validation fails.

## Production test sequence

1. Create and bind the dedicated `LIFE_QUEUE_DB` D1 database.
2. Configure the AES encryption secret and Access variables.
3. Configure Cloudflare Access protection for both producer paths.
4. Deploy the complete repository.
5. Confirm `/life/` and unrelated public routes still render normally.
6. Confirm unauthenticated `/api/life/producer/queue` returns a generic 403.
7. Authenticate through Cloudflare Access and open `/life-ops/`.
8. Submit one controlled test record from `/life/`.
9. Confirm one `New` queue item appears and that no duplicate appears if the identical submission UUID is retried.
10. Open the record, verify identity/contact/last-four display, and move it through at least two statuses.
11. Delete the controlled test record and confirm it disappears from the queue.
12. Inspect browser storage and analytics/network payloads to confirm no LIFE application fields escaped the approved API boundary.

## Paid traffic

The producer queue is implemented in LIFE-1.5, but paid campaign traffic remains gated until LIFE-1.6 message matching/attribution and LIFE-1.7 end-to-end production certification are complete.

## LIFE-1.6 campaign attribution

No new Cloudflare binding or secret is required for campaign attribution. The public page normalizes approved UTM/campaign parameters in memory; the existing `/api/life/application-init` Worker revalidates the allowlisted attribution group and encrypts it into the existing `LIFE_QUEUE_DB` payload. See `LIFE-CAMPAIGN-ROUTING.md`.

## LIFE-1.7 activation check

After deploying the release and configuring bindings/secrets, sign into `/life-ops/` through Cloudflare Access. The Production readiness panel must show **Ready for paid LIFE traffic** before campaigns are activated. Then complete one canary application start and confirm both the encrypted queue record and the `application_start_submitted` first-party conversion increment.
