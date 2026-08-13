# 408-HO-1E — CoverageFit Handoff Contract Alignment

## Goal
Align the five existing 408FARMERS personalized handoffs with CoverageFit TX-1.9 without changing submission, session, or fallback behavior.

## Implemented
- `referral` is canonicalized to `ref`.
- Home offers Non-renewal or cancellation and Premium increased review reasons.
- Sender build is `408-HO-1E`.
- Stable handoff schema is `coveragefit-handoff-v1`.
- Smoke QA uses exact receiver assets from CoverageFit v3.19.17 TX-1.9.

## Preserved
- Home, Tech, Engineers, Healthcare, and Teachers journeys.
- Formspree-success-first continuation.
- Shared integration session ID.
- Local thank-you fallback.
- Auto Bundle local-only journey.
