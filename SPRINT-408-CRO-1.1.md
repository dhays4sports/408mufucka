# 408-CRO-1.1 — Entry Integrity and Trust

## Status

Complete in public runtime `408-CRO-1.1`.

## Objective

Resolve the bounded entry-integrity defects confirmed by the 408FARMERS conversion audit without changing the centralized prospect profile, CoverageFit launch architecture, attribution contract, assessment destination, or deterministic SMS implementation.

## Implemented

- Direct `/buyer/` traffic no longer renders an empty **Referred by** acknowledgement. The existing partner-referral controller still reveals the same component when a bounded partner name is present.
- The stale `/home/Wowindex.html` implementation was removed. Its prior URL now permanently redirects to the canonical `/home/` route.
- All production forms use the FLOW-1.3 semantic fields. Legacy `segment` remains a receiver-side compatibility fallback only.
- The handoff manifest now identifies the paired CoverageFit v3.20.51 release while retaining CoverageFit v3.20.13 as the audited minimum compatible receiver.
- SMS metadata now distinguishes implemented RingCentral architecture from live production certification. The number is recorded as not ported, live SMS is false, and RC-SMS-1.10 remains deferred.

## Preserved

- `shared/prospect-profile.js`
- `shared/coveragefit-launch.js`
- Formspree fail-open lead delivery
- Zero-repeat handoff and URL cleanup contract
- Buyer/realtor attribution
- Any-ZIP flyer attribution
- Neighbor referral bridge
- FLOW-1.1 through FLOW-1.4
- RC-SMS-1.1 through RC-SMS-1.9 implementation
- One CoverageFit Home assessment

CoverageFit was not modified in this sprint.

## QA

Run:

```text
node qa/test-cro-1.1.js
node qa/test-buyer-flow.js
node qa/test-flow-1.3.js
node qa/test-flow-1.4.js
node qa/test-pc-1.1.js
python3 qa/test-static.py
python3 qa/check-links.py
```

For paired compatibility, set `COVERAGEFIT_ROOT` to CoverageFit v3.20.51 and run the three existing cross-project suites.

## Deferred

- 408-CRO-1.2 reliable contact choices
- Mobile performance, form-friction, accessibility, message-consistency, measurement, and conversion-pilot sprints
- RC-SMS-1.10 production carrier certification until the 408-FARMERS number is actually ported
