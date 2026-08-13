# 408-HOME-2.5 — Confirmation & Automatic CoverageFit Continuation

## Outcome

The enhanced `/home/` journey now gives the visitor a truthful receipt after the initial lead attempt and then continues automatically to the established destination. Homeowners enter CoverageFit's existing property-confirmation transition and Home assessment; renters continue to Dylan's renters contact options.

## Behavior

- Shows a focused confirmation state after Formspree returns `confirmed`, reaches the existing grace-window `pending` state, returns `unconfirmed`, or uses the local fallback.
- Uses status-specific language and never claims delivery when it has not been confirmed.
- Continues automatically after 1.25 seconds and provides a visible **Continue now** control.
- Keeps the existing CoverageFit transition, one-time property confirmation, structured property handoff, zero-repeat assessment start, and browser-safe URL cleanup.
- Keeps renters out of the homeowner assessment and describes their direct destination before opening it.
- Falls back to the previous immediate handoff if the opt-in confirmation controller is unavailable.

## Boundaries

- Only `/home/` opts into the new 408-side confirmation; Buyer and the other funnels are unchanged.
- CoverageFit v3.20.56 is synchronized without source changes.
- Assessment questions, scoring, recommendations, consent, attribution, the 900 ms Formspree grace contract, and the two-lead-point model are unchanged.
- Confirmation telemetry contains only bounded status, destination, and continuation-trigger values. It excludes identity, contact details, property address, and free-form answers.
