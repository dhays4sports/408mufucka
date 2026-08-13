# 408-CRO-1.6.1 — Occupational Eligibility Intent Correction

## Outcome

The four occupational campaigns clearly function as professional discount eligibility-review flows again, without representing 408FARMERS.com or CoverageFit as an automated eligibility decision engine.

## Corrected promise

1. A healthcare, education, technology, or engineering role may qualify for Farmers professional discounts.
2. The visitor starts a professional discount eligibility review and shares the relevant role first.
3. The established intake continues once for contact and property information.
4. CoverageFit builds an educational Protection Snapshot; it does not make a quote or eligibility decision.
5. Dylan verifies which Farmers professional discounts are available while preparing options, subject to Farmers eligibility, quoting, and underwriting requirements.

## User-visible changes

- Homepage professional section: “Your profession may qualify you for additional discounts.”
- Route card heading: “See which professional discounts may apply.”
- Primary CTA: “Review My Professional Discount Eligibility.”
- Supporting copy assigns verification to Dylan during quoting and underwriting.
- Prefilled SMS messages request a professional discount eligibility review.

## Preserved contracts

- Role-first progressive forms and `healthcare_eligibility_form`, `teachers_eligibility_form`, `tech_eligibility_form`, and `engineers_eligibility_form` entry identifiers.
- `occupation_segment` and professional `review_context` handoff semantics.
- CRO-1.4 low-friction intake and CRO-1.5 accessibility/reflow behavior.
- Explicit consent, Formspree fail-open delivery, attribution, `/assessment/`, and zero-repeat handoff.
- CoverageFit v3.20.51 and its educational Protection Snapshot boundary.

CoverageFit was regression-tested but not modified.

## Verification

- `node qa/test-cro-1.6.1.js`
- `CHROMIUM_PATH=/path/to/chromium node qa/test-cro-1.6.1-browser.mjs`
- CRO-1.1 through CRO-1.6 source and rendered regressions
- Static inventory, internal-link audit, and paired CoverageFit contract tests
