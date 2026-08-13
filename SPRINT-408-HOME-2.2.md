# 408-HOME-2.2 — Three-Question Engagement Experience

## Outcome

The general `/home/` route now earns a small commitment before asking for identity or contact details. Visitors answer three light questions, one at a time, then continue into the existing lead form and confirmed CoverageFit handoff.

## Experience

1. **Review goal** — Farmers fit, current coverage fit, home + auto, or exploring.
2. **Property context** — owner-occupied, landlord, buyer, or renter.
3. **Review timing** — shopping now, renewal within 60 days, later, or unsure.

Each screen has native radio controls, explicit Continue and Back buttons, a visible progress indicator, validation, and an assistive-technology announcement. The final Continue copies the bounded answers into the existing semantic form fields and derives `review_context` using `home-review-journey-v1`.

## Progressive enhancement

The engagement experience is hidden in HTML. JavaScript reveals it and temporarily hides the lead form. Without JavaScript, the original complete lead form remains usable, so the release does not create a script-dependent dead end.

## Routing and handoff

- Owner-occupied, landlord, and buyer responses keep the existing confirmed Home assessment sequence.
- A renter response is still captured as the first lead, then follows the existing renters-specific direct-conversation route instead of starting a homeowner assessment.
- CoverageFit receives the three semantic values through the existing HOME-2.1 allowlist; CoverageFit v3.20.56 requires no source change.

## Measurement and privacy

The journey baseline adds engagement start, step view, step complete, and engagement complete events. Event details are limited to step metadata and the three bounded semantic values. Names, phone numbers, email addresses, property addresses, and free-form data are excluded.

## Preserved boundaries

- Explicit contact consent and current Formspree grace behavior.
- Campaign attribution and zero-repeat prospect profile handoff.
- Two lead points: the 408FARMERS submission and completed CoverageFit assessment.
- Existing CoverageFit questions, scoring, recommendations, and v3.20.56 runtime.
- Personalized payoff remains scoped to HOME-2.3.
