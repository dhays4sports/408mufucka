# 408-CRO-1.5 — Accessibility and Responsive Polish

## Outcome

The full public 408FARMERS surface now shares one accessibility and small-screen contract without changing acquisition architecture or the CoverageFit journey.

## User-visible improvements

- Every public page has a keyboard-first skip link that moves focus to the main landmark.
- Interactive controls share one high-contrast focus treatment, including forced-color support.
- Primary touch targets are at least 44 pixels and mobile form controls render at 16 pixels to avoid forced iOS zoom.
- Campaign, Buyer, contact, legal, thank-you, referral, homepage, Home, and Score layouts reflow at 320 CSS pixels without horizontal scrolling.
- Reduced-motion preferences suppress nonessential animation and smooth scrolling across every surface.
- Previously failing gold/muted text colors now meet WCAG AA contrast requirements.

## Intake accessibility

- CRO-1.4 campaign intake announces each active step, marks invalid controls with `aria-invalid`, connects controls to live error text, and clears the state after correction.
- The established Buyer engine receives the same validation semantics and reduced-motion-aware step scrolling; no second Buyer controller was introduced.
- The hidden mobile Score call-to-action is disabled until it is visible, so it cannot receive keyboard or assistive-technology focus while hidden.

## Preserved contracts

- CRO-1.4 two-step campaign scope and single property-address collection point.
- Existing Home and Buyer acquisition architecture.
- Prospect profile, campaign attribution, explicit consent, fail-open Formspree delivery, and `coveragefit-handoff-v1`.
- CoverageFit Home assessment continuation at `/assessment/` and zero-repeat property behavior.

CoverageFit was inspected and regression-tested but not modified.

## Verification

- `node qa/test-cro-1.5.js`
- `CHROMIUM_PATH=/path/to/chromium AXE_PATH=/path/to/axe.min.js node qa/test-cro-1.5-browser.mjs`
- Historical JavaScript suites, CRO-1.3 and CRO-1.4 rendered regression suites, static inventory, link audit, logo integration, syntax checks, and paired CoverageFit contracts.
