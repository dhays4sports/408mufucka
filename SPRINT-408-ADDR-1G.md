# Sprint 408-ADDR-1G — Places API (New) Input Stability

## Objective
Fix the production Property Address field so it remains freely editable beyond two characters and delivers current Google address suggestions without relying on the legacy Autocomplete widget.

## Root cause addressed
The prior implementation used `google.maps.places.Autocomplete`. Google no longer makes that legacy class available to new customers after March 1, 2025. A newly configured Google Cloud project can therefore load Maps JavaScript but fail when the legacy widget begins requesting suggestions.

## Implemented
- Migrated the Home address field to the current Places API (New) Autocomplete Data API.
- Replaced the legacy widget with `AutocompleteSuggestion.fetchAutocompleteSuggestions()` and `Place.fetchFields()`.
- Preserved the existing native input instead of allowing a third-party widget to control keystrokes.
- Added a 220 ms request delay and a three-character threshold.
- Added session-token management for each address-selection session.
- Added US filtering and California location restriction.
- Added an accessible, keyboard-navigable custom suggestion list.
- Added required Google attribution to the suggestions panel.
- Disabled competing browser address autofill on this one field.
- Preserved structured address capture, Place ID storage, stale-data clearing, manual entry, Formspree submission, and CoverageFit handoff.
- Preserved manual entry on API, authentication, quota, network, or place-detail errors.

## Google Cloud requirement
Enable both:
- Maps JavaScript API
- Places API (New)

The browser key must remain restricted to the deployed 408FARMERS Cloudflare domain.

## Certification
- Static release QA
- New Places API runtime tests
- Two-character non-blocking regression
- Three-character request threshold
- Structured selection and manual fallback
- Full 408FARMERS handoff regression
- Local-link integrity
