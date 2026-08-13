# CF-INT-1B — Intelligent Profile Handoff

## Objective
Transfer the normalized 408FARMERS prospect profile to the CoverageFit `/home/` entry point only after the lead has been successfully captured.

## Implemented
- Added an allowlisted prospect-to-query-parameter serializer to `shared/coveragefit-launch.js`.
- Transfers name, phone, email, review context, formatted property address, and structured address components.
- Adds `prefill=1` and `handoff_version=1` markers for the receiving application.
- Preserves existing campaign, UTM, entry, assessment, and integration-session attribution.
- Keeps analytics events free of prospect PII.
- Existing Formspree success-first sequence remains intact.
- Existing local thank-you fallback remains intact.

## Privacy boundary
This sprint is the sending-side bridge. Personal values are temporarily present in the CoverageFit destination URL. CF-INT-1C must receive, persist, and immediately remove those values with `history.replaceState()`.

## Acceptance criteria
- No CoverageFit launch before a successful Formspree response.
- No duplicate form submission.
- Only approved profile fields are serialized.
- Empty fields are excluded.
- Manual and autocomplete addresses are supported.
- Existing non-profile launcher calls remain unchanged.
