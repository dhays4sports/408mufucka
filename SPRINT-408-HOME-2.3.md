# 408-HOME-2.3 — Personalized Intent Payoff

## Outcome

The general `/home/` journey now pays off the visitor's three-question commitment before requesting contact information. The new screen reflects the visitor's review goal, property context, and timing, then explains the correct next step.

## Personalization model

The payoff is compositional rather than an eligibility calculator. One approved fragment is selected from each bounded dimension:

- `home_review_goal`: Farmers fit, current coverage fit, home + auto, or exploring.
- `housing_context`: owner-occupied, landlord, buyer, or renter.
- `review_timing`: shopping now, renewal within 60 days, later, or unsure.

This supports all 64 combinations while keeping the language auditable and deterministic. No generative or free-form copy is produced in the browser.

## Sequence

1. Visitor completes the three HOME-2.2 questions.
2. The personalized payoff explains the focus, property context, timing, and next step.
3. **Continue to my details** reveals the existing lead form.
4. **Change my answers** returns to question three with all answers preserved; Back remains available for earlier questions.

## Renter outcome

Renters see, before contact capture, that their details will lead to a direct renters conversation with Dylan and not the homeowner assessment. The first lead is still captured before that existing branch executes.

## Compliance and privacy

The payoff is educational and cannot produce an instant quote, savings promise, coverage determination, discount-eligibility decision, or Farmers fit decision. Rendering and telemetry use only the three bounded semantic values. Identity, contact, property address, and free-form data are excluded.

## Preserved behavior

- Complete no-JavaScript lead-form fallback.
- Explicit consent, attribution, and Formspree grace behavior.
- Zero-repeat prospect-profile handoff.
- Two lead points for CoverageFit journeys.
- CoverageFit v3.20.56 assessment, Protection Score, recommendations, and completion capture.
- Progressive lead-form presentation remains scoped to HOME-2.4.
