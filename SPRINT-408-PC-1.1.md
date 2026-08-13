# 408-PC-1.1 — End-to-End Consultation Workflow Certification

## Status

Complete. The public 408FARMERS runtime remains `408-BUY-1.5`.

## Scope

The current FLOW-1.4 sender was audited against CoverageFit PC-1.1. Existing review, occupation, housing, buyer, urgency, campaign, entry, launch-surface, referral, partner, consent, and session context remains sufficient for the downstream consultation journey.

The only sender-project change is QA hardening. The NP-1.4 and NP-1.5 cross-project tests previously enumerated receiver versions only through CoverageFit v3.20.29, causing a false failure against later compatible builds. They now enforce the original minimum compatible receiver version and continue to assert the actual referral, campaign, attribution, endpoint, and migration contracts.

## Preserved boundaries

- No public page or form changed.
- No prospect-profile or CoverageFit-launch parameter changed.
- No attribution or zero-repeat behavior changed.
- No assessment route or transition behavior changed.
- No RC-SMS implementation or live-SMS claim changed.
