# 408-CRO-1.2 — Reliable Contact Choices

## Status

Complete in public runtime `408-CRO-1.2`.

## Objective

Make every direct-contact entry truthful and usable across mobile and desktop without adding another assessment, form, attribution pipeline, or SMS engine.

## Implemented

- Every telephone link is labeled as a call rather than implying that one `tel:` link can also start a text.
- Prefilled text links use one consistent `sms:+14083276377?body={encoded-message}` URI format, with visible call or email alternatives where a device does not open messaging.
- Home, Auto Bundle, Healthcare, Teachers, Tech, and Engineers forms each expose separate **Text Dylan** and **Call Dylan** alternatives.
- The existing Buyer route retains text-first and online entry, with a clearly labeled call action in its header.
- Homepage business, landlord, and life cards route to one focused `/contact/` surface that offers text, call, and email.
- The contact surface derives copy and prefilled messages from an allowlisted `general`, `business`, `landlord`, or `life` intent. Invalid values fall back safely to `general`.
- The contact URL carries no name, phone, email, address, or insurance details.

## Preserved

- Central prospect profile and CoverageFit launcher
- Formspree fail-open delivery
- Zero-repeat handoff and URL cleanup
- Buyer and realtor attribution
- Flyer and neighbor attribution
- Existing assessment destinations
- FLOW-1.1 through FLOW-1.4
- 408-CRO-1.1 entry-integrity behavior
- RC-SMS-1.1 through RC-SMS-1.9 architecture

CoverageFit was inspected and regression-tested but not modified.

## QA

Run:

```text
node qa/test-cro-1.2.js
node qa/test-cro-1.1.js
node qa/test-buyer-flow.js
node qa/test-conv-1.1.js
node qa/test-flow-1.3.js
node qa/test-flow-1.4.js
python3 qa/test-static.py
python3 qa/check-links.py
```

Run the existing cross-project suites with `COVERAGEFIT_ROOT` set to CoverageFit v3.20.51.

## Deferred

- 408-CRO-1.3 mobile performance
- 408-CRO-1.4 form-friction reduction
- 408-CRO-1.5 accessibility and responsive polish
- Native-device SMS composition matrix and live conversion-pilot certification in 408-CRO-1.8
- RC-SMS-1.10 production carrier certification until the 408-FARMERS number is ported
