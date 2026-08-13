# 408-FLOW-2.1 — Occupational Visual Simplification

Status: Complete  
Runtime: 408-FLOW-2.1

## Scope

The Healthcare, Teachers, Tech, and Engineers landing pages now use a simplified copy-and-form hero. The large campaign photographs are no longer rendered on those pages.

## Preserved behavior

- The complete `<form>` fragment on every occupational page is byte-for-byte unchanged from 408-HOME-2.9.
- The ordered external script list is byte-for-byte unchanged.
- Progressive role-first intake, contact and property capture, consent, address autocomplete, Formspree delivery, attribution, direct contact alternatives, and automatic CoverageFit continuation are unchanged.
- The occupational role and professional review context continue into CoverageFit.
- The original occupational images remain available as social-sharing metadata; they are not fetched as rendered page heroes.
- All non-occupational routes are outside this sprint.

## Layout contract

- Desktop: campaign copy and intake card share a balanced two-column hero.
- Tablet and mobile: the intake card follows the copy in one column.
- No background image, pseudo-element image, or rendered occupational campaign picture is used.
- Mobile spacing, readable form widths, and the existing progressive-intake scroll behavior remain intact.

## Certification

Run `node qa/test-flow-2.1.js`, the historical JavaScript suites, `python3 qa/test-static.py`, and `python3 qa/check-links.py` before release. Live route and physical-device checks remain post-deployment evidence.
