# Sprint 408-ADDR-1B — Smart Suggestion Interface

## Scope

Builds on the Google Places foundation from 408-ADDR-1A and improves the customer-facing address suggestion experience on `/home`.

## Implemented

- Added a three-character suggestion threshold.
- Added accessible, live helper text beneath the property-address field.
- Added clear loading, ready, selected, manual, and unavailable states.
- Styled Google Places prediction rows to match the 408FARMERS visual system.
- Increased row height and spacing for touch devices.
- Preserved Google keyboard navigation and prediction matching emphasis.
- Added Escape and click-away closing behavior.
- Preserved unrestricted manual address entry and no-key fallback.

## Configuration

Autocomplete still requires `googlePlacesApiKey` in `shared/config.js`.

## Out of scope

Structured address component capture is reserved for 408-ADDR-1C.
