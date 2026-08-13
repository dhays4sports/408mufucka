# Sprint 408-ADDR-1E — Validation and Deployment Readiness

## Objective
Certify the smart property-address field for deployment without changing the production form submission or CoverageFit launch flow.

## Implemented
- Added runtime tests for manual entry, timeout fallback, structured Google selection, stale-data clearing, and the `address:ready` handoff event.
- Expanded static checks to cover the complete address-autocomplete milestone.
- Added a deployment checklist for API restrictions and live-device verification.
- Preserved Formspree, campaign attribution, and manual-address submission.

## Deployment requirement
Set `googlePlacesApiKey` in `shared/config.js` to a Google Maps browser key restricted to the production 408Farmers domains and enabled for the Maps JavaScript API and Places API.

## Certification commands
```bash
python3 qa/test-static.py
node qa/test-b1.2d.js
node qa/test-address-autocomplete.js
python3 qa/check-links.py
```
