# Sprint 408-ADDR-1F — Google Places Activation

## Objective
Activate the existing smart property-address experience in the production-ready 408FARMERS package without changing the Formspree or CoverageFit handoff contracts.

## Implemented
- Installed the provided browser Google Maps Platform key in `shared/config.js`.
- Upgraded the Google Maps loader to use an explicit ready callback.
- Added a `gm_authFailure` fallback so rejected or misconfigured keys preserve manual entry.
- Added strict-origin referrer behavior for the browser request.
- Retained US-only suggestions, California location bias, structured address capture, stale-component clearing, and manual submission.
- Expanded runtime and static certification for callback initialization and authentication failures.

## External activation requirements
The Google Cloud project that owns the browser key must have billing enabled, Maps JavaScript API and Places API access enabled, and website restrictions covering the deployed 408FARMERS domain and any approved preview domain.

## Certification commands
```bash
python3 qa/test-static.py
node qa/test-address-autocomplete.js
node qa/test-408-ho-1e.js
python3 qa/check-links.py
```
