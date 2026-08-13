# 408FARMERS Handoff Certification

**Current sender build:** `408-CONV-1.1`  
**Receiver contract:** `coveragefit-handoff-v1`  
**Verified receiver package:** CoverageFit v3.20.13 CONV-1.1  
**Source-package status:** **VERIFIED**  
**Live-production status:** **NOT DEPLOYED OR RECHECKED FROM THIS ENVIRONMENT**

## Verified journey

`408farmers.com/home/` → `coveragefit.com/transition/` → `coveragefit.com/assessment/`

## Sender guarantees

- Native form validation completes before handoff.
- Required contact-permission provenance is included.
- Structured address, contact, review reason, and attribution are allowlisted.
- Formspree delivery uses keepalive and does not block the CoverageFit journey.
- General non-form launch surfaces retain CoverageFit Home as their default destination.
- The Home form explicitly requests `/assessment/` after the animated transition.

The package does not claim a live-production smoke test. Deploy both current sender and receiver releases, then test the full journey in a private browser.
