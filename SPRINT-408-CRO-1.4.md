# 408-CRO-1.4 — Low-Friction Intake

## Outcome

Auto Bundle and the four professional campaign forms now present one shared, bounded two-step intake:

1. Campaign-specific context: current housing or professional role.
2. Contact details, property address, explicit consent, and submission.

The interaction shows Step 1/2 progress, concise time and obligation expectations, a Back control, a clear post-submit explanation, and deterministic recovery to the first invalid field. The unmodified HTML form remains complete when JavaScript is unavailable.

## Property address decision

Property address stays in 408FARMERS Step 2. CoverageFit v3.20.51 already accepts `property_address`, stores it in the canonical prospect profile, cleans it from the visible URL, and reuses it in the assessment and consultation. Asking downstream instead would create a repeat-risk. The Step 2 expectation explicitly tells the prospect that CoverageFit opens with the address already added.

## Preserved contracts

- Existing form field names, campaign context, UTM attribution, and sender fingerprints.
- `ProspectProfileBuilder` profile persistence and the `coveragefit-handoff-v1` contract.
- Explicit contact consent and provenance.
- Fail-open Formspree submission with the bounded 900 ms continuation grace period.
- CoverageFit Home assessment destination at `/assessment/` and zero-repeat behavior.
- The established Buyer progressive intake in `shared/buyer-flow.js`.

CoverageFit was inspected and regression-tested but not modified. Home and Buyer were not enrolled in the CRO-1.4 controller.

## Verification

- `node qa/test-cro-1.4.js`
- `CHROMIUM_PATH=/path/to/chromium node qa/test-cro-1.4-browser.mjs`
- Full historical JavaScript QA, static contract checks, link audit, logo integration, syntax validation, and paired CoverageFit contract tests.
