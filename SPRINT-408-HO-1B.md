# 408-HO-1B — Teachers Campaign Landing-Page Restoration

## Goal
Replace the empty `/teachers/` route with a complete educator campaign journey that captures a real lead, builds the canonical prospect profile, and continues into the personalized CoverageFit handoff.

## Implemented
- Restored `/teachers/index.html` as a complete responsive educator campaign page using the existing 408FARMERS occupational-page architecture.
- Added educator-specific campaign messaging, role selection, contact fields, property address, consent, direct-text alternative, agency trust content, and the existing Teachers campaign image.
- Connected successful submissions to Formspree first, then to `ProspectProfileBuilder` and `CoverageFitLauncher` with the distinct `teachers_eligibility_form` entry and `occupation_education` launch surface.
- Restored `/teachers/thank-you.html` as a complete local fallback with call, text, next-step, privacy, and terms links.
- Extended cross-page and static QA so Teachers is now treated as a required production handoff route.

## User-visible behavior
Visitors selecting Teachers from the 408FARMERS homepage now see a complete educator-focused landing page instead of a blank route. After a successful submission, their entered information and education role continue into CoverageFit's personalized transition. If the CoverageFit launch is unavailable, they receive a complete local confirmation page.

## Verification
- Added `qa/test-408-ho-1b.js` for landing-page completeness, form contract, script order, serialized profile, CoverageFit destination, fallback actions, and homepage reachability.
- Extended `qa/test-408-ho-1a.js` to include Teachers in the shared production handoff regression matrix.
- Extended static QA to require the Teachers route, fallback page, campaign image, and canonical script sequence.
- Re-ran complete Node, Python, and local-link regression checks against a fresh package extraction.

## Deferred
- Production-domain smoke certification across live 408FARMERS, Formspree, and CoverageFit remains 408-HO-1C.
- Educator forms continue to capture occupation role as the review context; a separate homeowner review-reason field is not part of this bounded restoration sprint.
- The existing cross-domain query-string bridge and CoverageFit URL-cleanup contract remain unchanged.
