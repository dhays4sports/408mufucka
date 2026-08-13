# 408-HO-1A — Personalized Handoff Coverage Alignment

## Goal
Ensure every 408FARMERS form already configured to continue into CoverageFit creates and transfers the same canonical prospect profile used by the production `/home/` funnel.

## Implemented
- Connected `/tech/`, `/engineers/`, and `/healthcare/` to the existing `ProspectProfileBuilder`.
- Preserved the existing Formspree-success-first submission sequence and local thank-you fallback.
- Passed each form's explicit campaign value into the CoverageFit launcher.
- Preserved each form's distinct entry point, launch surface, assessment type, session ID, and prospect fields.
- Kept `/auto-bundle/` outside the CoverageFit handoff until a corresponding CoverageFit Auto experience exists.

## User-visible behavior
After a successful submission on Home, Tech, Engineers, or Healthcare, CoverageFit receives the prospect's entered details and can route the visit through its personalized transition experience instead of opening as a generic visit.

## Verification
- Added `qa/test-408-ho-1a.js` to inspect every production handoff page and generate its real outbound handoff URL.
- Expanded static QA to require the canonical script order on every handoff-enabled form.
- Verified name, phone, email, property address, form context, campaign, entry, launch surface, prefill markers, and shared session ID.

## Deferred
- `/teachers/` remains a separate restoration sprint because its current HTML files are empty.
- `/auto-bundle/` remains local until CoverageFit Auto has a defined receiving journey.
- Cross-domain PII continues to use the existing short-lived query-string bridge and CoverageFit URL cleanup contract.
