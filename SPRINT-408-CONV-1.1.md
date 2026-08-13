# 408-CONV-1.1 — CONV-1.1 Zero-Repeat Handoff Sender

## Scope

1. Route validated lead handoffs through CoverageFit transition to the assessment.
2. Send explicit contact-permission provenance.
3. Preserve structured address and contact fields.
4. Preserve Formspree delivery without blocking the homeowner journey.
5. Align sender metadata with CoverageFit v3.20.13.
6. Preserve address autocomplete, branding, attribution, and fallback behavior.

## Acceptance

- Home and supported occupational forms identify `408-CONV-1.1`.
- Transition URLs contain `next=/assessment/`.
- Consent and submission markers are present only after native form validation.
- Personal fields remain limited to the existing allowlist.
- CoverageFit receiver can recognize the stable handoff contract.
