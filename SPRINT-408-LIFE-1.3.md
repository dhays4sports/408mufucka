# 408-LIFE-1.3 — Application Initialization

Status: complete.

## Goal

Continue directly from the three-question engagement intake into the smallest application-preparation dataset Dylan said he needs to initiate a Farmers life application, while deliberately stopping before any real network submission.

This sprint is an **application-initialization UI and validation release**, not a secure-submission release.

## Visitor flow

1. Protection priority
2. Household income runway
3. Existing life coverage
4. Quick-questions completion / trust transition
5. Legal identity
6. Contact + residential address
7. Last 4 SSN + application acknowledgement
8. Local validation completion / direct Dylan fallback

No full coverage-needs calculation is inserted before application details.

## Application fields

Required:

- First legal name
- Last legal name
- Gender (`Female`, `Male`, or `Prefer to discuss`)
- Date of birth
- Street address
- City
- State
- ZIP
- Email
- Last four digits of Social Security number
- Application-preparation acknowledgement

Optional:

- Middle name
- Apartment/unit
- Mobile phone

The mobile number remains optional so this sprint does not add a new required marketing/contact-consent dependency.

## Sensitive-data boundary

`ssn_last4` is the dedicated sensitive field in LIFE-1.3.

It:

- is masked with `type=password`;
- accepts exactly four numeric digits;
- uses `autocomplete=off`;
- is never serialized with `FormData`;
- is never sent to Formspree;
- is never sent to CoverageFit;
- is never placed in a prospect profile;
- is never written to URL/query/hash parameters;
- is never written to analytics or progress events;
- is never written to localStorage/sessionStorage/IndexedDB/cookies;
- is cleared after local completion;
- is cleared on `pagehide`;
- is cleared on bfcache restoration.

For defense in depth, LIFE-1.3 clears **all application-detail fields** (not only last 4 SSN) on local completion, pagehide, and bfcache restoration. The three non-sensitive engagement answers remain available only while the page stays open.

Other application fields also remain native form-control values only. The LIFE script does not construct or persist an applicant payload.

## Local validation

The browser validates:

- required legal-name fields;
- a selected gender path;
- DOB is a valid past date and no more than 120 years in the past;
- required residential fields;
- 5-digit or ZIP+4 format;
- valid email format;
- optional phone has at least 10 digits when supplied;
- last four SSN is exactly four digits;
- application acknowledgement is selected.

Passing validation does **not** submit anything.

## Accessibility

- Phase-aware progress communicates `Quick questions` separately from `Application details`.
- Native form controls are retained for keyboard and assistive-technology support.
- With JavaScript unavailable, the full flow remains readable, application fields stay disabled, and the no-JS message directs the visitor to Dylan instead of accepting identity data.
- Invalid application fields receive `aria-invalid=true`.
- Errors are announced through the existing polite live region.
- Focus moves to each newly active step/transition.
- Mobile, reduced-motion and forced-colors states are covered.

## Preserved contracts

Unchanged:

- Existing seven CoverageFit routes and zero-repeat handoff.
- Formspree delivery for existing non-life forms.
- Buyer/referral attribution.
- RC-SMS through 1.9.1.
- `/contact/?intent=life` direct fallback.
- LIFE paid-traffic gate.

## Paid-traffic gate

`paidTrafficReady` remains `false`.

Do not send paid life-campaign traffic to the conversion path until LIFE-1.4 implements and certifies the secure application-initiation endpoint.

## Next sprint

`408-LIFE-1.4 — Secure Submission Boundary`

Implement the server-side trust boundary, payload minimization/validation, secure producer delivery, generic client response, and explicit leakage tests before paid-traffic activation.
