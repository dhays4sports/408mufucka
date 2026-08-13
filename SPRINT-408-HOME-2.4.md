# 408-HOME-2.4 — Progressive Lead Capture

## Outcome

After the HOME-2.3 personalized payoff, `/home/` now presents the existing lead capture in two focused steps rather than one dense form.

1. **Contact** — first name, last name, mobile phone, and email.
2. **Property and consent** — property address and explicit contact permission.

The review reason is no longer asked again in the enhanced journey. It is derived from the three bounded engagement answers using `home-review-journey-v1` and remains available to Formspree and CoverageFit under the existing `review_context` field.

## Progressive enhancement

The HTML still contains the complete form and review-context select. JavaScript activates the two-step presentation only after the personalized payoff. Without JavaScript, all lead fields, the review-context select, consent, and submit action remain visible and usable.

## Interaction and accessibility

- Visible two-step progress and assistive-technology announcements.
- Explicit Continue and Back controls.
- Step-one validation before property details appear.
- Enter on step one advances rather than prematurely submitting.
- Focus moves to the first useful control on every transition.
- Mobile stacks actions; reduced-motion and forced-color support are retained.

## Renter simplification

For a renter response, step two requests only explicit contact permission. The property address is not required because the journey continues to the existing direct renters conversation rather than the homeowner assessment.

## Preserved boundaries

- Existing field names, contact requirements, and consent language.
- Formspree grace behavior, attribution, and pending-lead recovery.
- Renter lead capture before direct routing.
- Zero-repeat CoverageFit handoff and both lead points for CoverageFit journeys.
- CoverageFit v3.20.56 assessment, Protection Score, recommendations, and completion capture.
