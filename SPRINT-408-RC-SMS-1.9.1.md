# 408-RC-SMS-1.9.1 — Immediate Producer Queue Alert Synchronization

Status: synchronized with CoverageFit v3.20.54. The public 408FARMERS runtime remains CRO-1.6.2.1 and no acquisition markup or JavaScript changed.

CoverageFit owns the alert trigger, Resend delivery, redacted conversation state, protected deep link, and protected test action. 408FARMERS continues to own public acquisition and the established zero-repeat handoff.

The actionable events are completed guided intake, `DYLAN` or personal-response request, direct-handling category capture, and second invalid-response escalation. Intermediate replies, STOP, duplicate provider events, and producer manual takeover do not send an alert.

Email is best-effort and does not block the inbound webhook or customer reply. One event-scoped idempotency key prevents duplicate delivery. `[RUSH]` labels time-sensitive work. The email excludes the prospect’s name, phone, address, closing date, transcript, partner identity, and insurance details; it contains only bounded action context and an opaque link to protected SMS Operations.

The protected test alert certifies Resend before the production number is ported and does not create a fake lead. Production port/cutover and live carrier certification remain RC-SMS-1.10.

Preserved: CRO-1.6.2.1 promise and intent language, every public form, Formspree fail-open behavior, the two lead intake points, SMS customer copy, STOP, manual takeover, CoverageFit assessment/scoring, and producer judgment.
