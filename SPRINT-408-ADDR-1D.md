# Sprint 408-ADDR-1D — Manual Address Fallback

## Implemented

- Keeps manual address entry valid when Google Places is unavailable, slow, or not configured.
- Synchronizes a typed or pasted address into `property_formatted_address` immediately before submission.
- Records `address_selection_method=manual` unless the currently displayed value still matches the selected Google address.
- Clears stale structured components whenever a selected address is edited.
- Adds paste-state handling and an eight-second Google script-load fallback.
- Emits an `address:ready` form event for the existing submission flow and future CoverageFit handoff work.

## Preserved

- Existing Formspree submission.
- Existing campaign attribution and CoverageFit launch behavior.
- Google-selected structured address fields from Sprint 1C.
- Submission of unusual, rural, unit, new-construction, and recently assigned addresses.
