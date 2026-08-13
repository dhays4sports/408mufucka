# Address Autocomplete Deployment Checklist

## Google Cloud setup
- The browser key is installed in `shared/config.js`.
- Enable Maps JavaScript API and Places API (New).
- Restrict the browser key to `https://408farmers.com/*` and `https://www.408farmers.com/*`.
- Add only the exact approved Cloudflare Pages deployment origin while testing, then remove it when no longer needed.
- Confirm billing and API quota alerts are configured.
- Never replace the browser-restricted key with an unrestricted server key.

## Live smoke test
1. Open `/home` in a private browser window.
2. Confirm two characters remain editable without an error, then type a third character to request suggestions.
3. Select a California address and submit a test lead.
4. Confirm Formspree receives formatted address, street, city, county, state, ZIP, country, Place ID, and `autocomplete` method.
5. Edit a selected address and submit again. Confirm stale Place ID/components are cleared and method becomes `manual`.
6. Disable the API key or block Google Maps and confirm manual submission still works.
7. Verify keyboard selection, Escape dismissal, iPhone Safari, and Android Chrome.

## Expected hidden fields
`property_formatted_address`, `property_street`, `property_city`, `property_county`, `property_state`, `property_zip`, `property_country`, `property_place_id`, `address_selection_method`.
