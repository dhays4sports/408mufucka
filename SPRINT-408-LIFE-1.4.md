# 408-LIFE-1.4 — Secure Submission Boundary

Status: complete, but platform-specific deployment was superseded by 408-LIFE-1.4.1. Do not deploy the Netlify runtime from this historical sprint.

## Goal

Convert the LIFE-1.3 local-only application initialization into a fail-closed, same-origin server submission boundary without allowing the last four SSN or other applicant fields to leak into ordinary lead delivery, CoverageFit, browser persistence, URLs, analytics, or logs.

## Implemented

- `POST /api/life/application-init` browser transport in `shared/life-secure-submit.js`.
- Netlify Function trust boundary in `netlify/functions/life-application-init.js`.
- Strict same-origin, content-type, request-version, body-size, anti-bot, schema, field-length, enumerated-value, DOB, ZIP, email, phone, and last4 validation.
- Exact allowlists reject unexpected top-level/nested fields.
- Producer delivery uses an environment-configured HTTPS relay, Bearer authentication, HMAC-SHA256 body signing, server timestamp, and idempotency key.
- No producer credentials exist in public source.
- No endpoint-side persistence is implemented.
- Generic success/error responses do not echo applicant data.
- Client clears application fields after confirmed server success and on page exit/bfcache restoration.
- Failed delivery does not show success; applicant fields remain available on-page for retry until navigation.
- Dedicated LIFE privacy disclosure.
- Production thank-you experience reflects application-start receipt rather than bound coverage.

## Payload

Only these client fields are accepted:

- schema/version + random idempotency UUID
- three engagement answers
- legal first/middle/last name
- gender
- DOB
- residential address/unit/city/state/ZIP
- email
- optional mobile
- last four SSN
- application-preparation acknowledgement
- empty honeypot + elapsed milliseconds

No UTM/campaign attribution is added in this sprint; that remains LIFE-1.6.

## Sensitive-data rules

`ssn_last4`, DOB and applicant identity/contact fields are not sent to Formspree, CoverageFit, dataLayer, analytics, URLs, localStorage, sessionStorage, IndexedDB or cookies. The function source does not log request bodies.

## Delivery configuration

See `LIFE-SECURE-SUBMISSION-DEPLOYMENT.md`. The secure producer receiver must be configured with server environment variables before live submissions can succeed.

## Paid traffic gate

`paidTrafficReady` remains `false`. LIFE-1.4 certifies the code boundary; LIFE-1.5 must provide and certify the authenticated producer application queue / receiver before paid traffic is enabled.

## Next sprint

`408-LIFE-1.5 — Producer Application Queue`
