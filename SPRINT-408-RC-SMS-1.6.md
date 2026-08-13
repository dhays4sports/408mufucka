# 408-RC-SMS-1.6 — Realtor Partner Attribution Synchronization

Status: Implemented. Public buyer runtime advances to 408-BUY-1.2 because text-first partner links now add the bounded referral code when configured.

- `/buyer/` accepts `partner_code`, `sms_code`, or `ref_code`.
- The existing Text Dylan link remains the same direct experience for non-partner traffic.
- Partner text links include the buyer-oriented message plus `Ref: CODE`; buyers do not send a separate code message.
- Website-first `partner_id` and `partner_name` behavior is preserved.
- No RingCentral credentials or backend registry logic are shipped in this static site.
- CoverageFit v3.20.24 / RC-SMS-1.6 resolves the code to the canonical partner identity.
