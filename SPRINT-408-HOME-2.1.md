# 408-HOME-2.1 — Journey Contract & Conversion Baseline

## Outcome

The general `/home/` journey now has a machine-readable journey contract, a stable semantic-intent foundation, and privacy-safe baseline telemetry spanning the existing 408FARMERS lead form and the synchronized CoverageFit assessment. The homeowner-facing experience is intentionally unchanged.

## Implemented

- Defined eight canonical journey stages and ten baseline conversion events.
- Reserved bounded values for `home_review_goal`, `housing_context`, and `review_timing`.
- Added a deterministic derivation contract for the existing `review_context` field.
- Added empty semantic fields to the current Home form without changing validation or copy.
- Extended the canonical prospect profile and CoverageFit launcher allowlist for the new fields.
- Instrumented Home view, CTA, form-start, lead-attempt, lead-status, and CoverageFit-launch events.
- Preserved FLOW-1.5 structured address capture, Formspree grace behavior, consent, attribution, and two lead points.
- Added a documented pre-redesign baseline and funnel calculation definitions.

## Privacy

Baseline telemetry contains only allowlisted route, stage, status, campaign, entry, and boolean context-presence properties. Names, email addresses, phone numbers, property addresses, and free-form answers are excluded.

## Deferred

- 408-HOME-2.2 will render the three engagement questions.
- 408-HOME-2.3 will add the personalized intent payoff.
- 408-HOME-2.4 will present the progressive lead form after that payoff.
- No Buyer, occupational, LIFE, RC-SMS, assessment-question, or Protection Score behavior changes are included.
