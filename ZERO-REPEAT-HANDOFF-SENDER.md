# 408FARMERS CONV-1.1 Zero-Repeat Handoff Sender

Build: `408-CONV-1.1`
Receiver: `CoverageFit v3.20.13`

## Production journey

`408farmers.com/home/` → `coveragefit.com/transition/` → `coveragefit.com/assessment/`

After the homeowner validates the required 408FARMERS form, the sender carries the allowlisted contact, review reason, structured address, campaign attribution, contact-permission provenance, and lead-delivery state into CoverageFit.

## Contract markers

- `handoff_contract=coveragefit-handoff-v1`
- `handoff_version=1.1`
- `sender_build=408-CONV-1.1`
- `next=/assessment/`
- `contact_consent=true` after the required checkbox passes validation
- `consent_at=<submission timestamp>`
- `consent_version=408farmers-contact-v1`
- `lead_capture_status=confirmed|pending|unconfirmed|local-fallback`

The existing animated transition, Formspree keepalive submission, address autocomplete, UTM attribution, and thank-you fallback remain intact.
