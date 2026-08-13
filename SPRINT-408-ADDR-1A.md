# Sprint 408-ADDR-1A — Address Autocomplete Foundation

## Implemented

- Added a dedicated `shared/address-autocomplete.js` integration module.
- Connected the `/home` property-address field through a scoped data attribute.
- Added optional Google Maps Platform key configuration in `shared/config.js`.
- Loads the Google Places library only on pages containing the eligible field.
- Restricts suggestions to United States street addresses.
- Soft-biases suggestions toward California while preserving manual entry.
- Preserves a fully functional text field when the key is blank, the API fails,
  JavaScript is unavailable, or Google Places cannot initialize.
- Prevents duplicate Google script loading.

## Setup required before live autocomplete appears

Set `googlePlacesApiKey` in `shared/config.js` to a Google Maps Platform browser key with Places API access. Restrict the key to the production 408Farmers.com domains in Google Cloud Console.

## Deferred

- Custom suggestion interface and styling (408-ADDR-1B)
- Structured address component capture (408-ADDR-1C)
- Explicit autocomplete/manual selection tracking (408-ADDR-1D)
- Full mobile and provider-failure certification (408-ADDR-1E)
