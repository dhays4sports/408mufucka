# 408-CRO-1.6 — Promise and Journey Consistency

## Outcome

Every public acquisition path now describes the same truthful sequence from first click through CoverageFit and the producer conversation.

## Canonical journey

1. Start with a Coverage Review rather than an instant quote or eligibility result.
2. Share the minimum contact, property, and review context needed to continue without repetition.
3. Complete CoverageFit’s educational Protection Snapshot in about five minutes.
4. Use the completed Snapshot to focus a conversation with Dylan.
5. If Farmers appears to fit, Dylan can verify available discounts and prepare and explain options.

## User-visible changes

- Professional pages now invite visitors to start a professional Coverage Review instead of promising an eligibility check.
- Discount copy consistently says availability is verified during quoting and underwriting.
- Campaign pages distinguish the short 408FARMERS intake from the approximately five-minute CoverageFit assessment.
- Home, Auto Bundle, Buyer, Score, Neighbor, and professional journeys now describe CoverageFit before the producer review.
- Local thank-you fallback pages no longer promise a response “shortly” or say options are automatically prepared.
- The Home page title now describes a Coverage Review rather than a quote.

## Preserved contracts

- CRO-1.4 progressive intake and CRO-1.5 accessibility/responsive behavior.
- Buyer architecture, contact choices, campaign routes, and all public form fields.
- Prospect profile, attribution, consent, fail-open lead delivery, and `coveragefit-handoff-v1`.
- CoverageFit v3.20.51, `/assessment/` continuation, Protection Snapshot, and zero-repeat property handoff.

CoverageFit was inspected and regression-tested but not modified.

## Verification

- `node qa/test-cro-1.6.js`
- `CHROMIUM_PATH=/path/to/chromium node qa/test-cro-1.6-browser.mjs`
- CRO-1.1 through CRO-1.5 source and rendered regressions
- Static inventory, internal-link audit, and paired CoverageFit contract tests
