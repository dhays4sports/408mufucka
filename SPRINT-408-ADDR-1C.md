# Sprint 408-ADDR-1C — Structured Address Capture

## Implemented

- Converts a selected Google Places result into structured property data.
- Preserves the customer-facing formatted address in `property_address`.
- Adds hidden Formspree-ready fields for street, city, county, state, ZIP, country and Google Place ID.
- Records `address_selection_method` as `autocomplete` or `manual`.
- Clears stale structured fields when a customer edits a selected address.
- Keeps manual entry fully valid when Google is unavailable or no suggestion is selected.

## Hidden fields

- `property_formatted_address`
- `property_street`
- `property_city`
- `property_county`
- `property_state`
- `property_zip`
- `property_country`
- `property_place_id`
- `address_selection_method`

## Configuration

Live suggestions still require `googlePlacesApiKey` in `shared/config.js`.
