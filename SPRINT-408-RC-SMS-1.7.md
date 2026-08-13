# 408-RC-SMS-1.7 — Producer Handoff + Manual Takeover Synchronization

Status: synchronized with CoverageFit v3.20.25. Public runtime remains `408-BUY-1.2` because this sprint does not change the 408FARMERS buyer-facing acquisition flow.

## Contract

- 408FARMERS continues to own public `/buyer/`, text-first partner links, campaign IDs, and realtor attribution entry.
- CoverageFit owns the producer handoff summary, protected producer queue/actions, RingCentral outbound-event classification, and `human_takeover` state.
- A completed buyer SMS intake receives the existing opaque CoverageFit link and is then queued in `awaiting_producer`.
- A manual Dylan reply from the configured RingCentral number pauses automation immediately. Outbound echoes for known automated/operator message IDs do not trigger takeover.
- Partner attribution from RC-SMS-1.6 remains attached to the same conversation and producer summary.
- No RingCentral credentials, producer access token, buyer phone number, or live transcript is added to the static 408FARMERS frontend.

RC-SMS-1.9 remains the full operations-dashboard sprint.
