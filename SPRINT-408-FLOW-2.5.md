# 408-FLOW-2.5 — End-to-End Conversion Certification

## Outcome

The paired 408FARMERS `408-FLOW-2.5` and CoverageFit `v3.20.62` source releases are certified as one conversion journey:

`form-first lead → three post-lead questions → personalized payoff → explicit CoverageFit invitation → private handoff → Home assessment → Protection Score → completed consultation record → private Home Protection Snapshot → Save as PDF / Print`

This is a certification sprint. It does not redesign the customer journey, add a lead point, change assessment questions, or modify Protection Score calculations.

## Route coverage

- `/home/`
- `/buyer/`
- `/auto-bundle/`
- `/healthcare/`
- `/teachers/`
- `/tech/`
- `/engineers/`

LIFE remains a separate secure application flow and is excluded.

## Certified branches

- Confirmed, pending, unconfirmed, and local-fallback first-lead receipts all reach truthful post-lead continuation states.
- The three bounded questions occur only after the first lead attempt.
- The personalized payoff precedes the optional CoverageFit invitation.
- **Continue to CoverageFit** opens the handoff once and carries contact, consent, property, intent, and attribution without re-entry.
- **Finish for Now** creates no CoverageFit request and preserves the submitted first lead for Dylan.
- Renters receive renter-specific contact options and never enter the homeowner assessment.
- If engagement or invitation assets are unavailable, continuation still requires a new explicit click; no timer or automatic launch returns.
- CoverageFit removes transferred personal, intent, and consent markers from the visible URL; the completed report uses an opaque fragment.
- Question two remains observer-free and responsive.
- CoverageFit completion creates the existing second consultation intake and private report.
- The finished report delivers the promised **Save as PDF / Print** action without submitting another lead.

## Conversion evidence

The existing privacy-safe events cover lead attempt/status, post-lead answers, payoff, invitation outcomes, assessment launch/start/completion, report view, and report save/print selection. Identity, contact information, address, consent content, and assessment answers remain excluded from public acquisition telemetry.

## Frozen behavior

The five sending-side runtime files are hash-frozen in the FLOW-2.5 contract. CoverageFit remains v3.20.62. The Home assessment configuration and Protection Score implementation retain their established SHA-256 certifications.

## Certification boundary

Automated source, branch, regression, static, link, privacy, accessibility, performance, and archive-integrity checks can be completed in this build. Live production claims remain open until the paired repositories are published and the controlled runbook verifies a real Formspree receipt, Cloudflare-backed consultation/report record, and physical-device PDF/print path.

See `FLOW2_5_END_TO_END_CONVERSION_CONTRACT.json`, `FLOW2_5_SOURCE_CERTIFICATION.json`, and `FLOW2_5_PRODUCTION_CONVERSION_RUNBOOK.md`.
