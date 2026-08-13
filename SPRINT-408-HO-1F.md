# 408-HO-1F — Non-Blocking CoverageFit Transition

## Objective

Ensure every validated personalized 408FARMERS submission continues into CoverageFit even when the external Formspree request is slow, unavailable, or rejected.

## Implemented behavior

- Preserves validation, prospect-profile creation, structured address capture, attribution, and consent requirements.
- Starts the Formspree request with `keepalive: true`.
- Allows a short 900 ms grace period for a fast provider confirmation.
- Opens CoverageFit after the grace period even when Formspree is still pending.
- Opens CoverageFit after an immediate Formspree rejection instead of trapping the prospect on 408FARMERS.
- Stores a temporary session copy of the lead while delivery is pending.
- Preserves the previous error-blocking behavior for local non-CoverageFit forms.
- Passes `lead_capture_status` as non-personal operational metadata.
- Updates the sender build fingerprint to `408-HO-1F`.
- Aligns the release manifest with CoverageFit v3.20.7.

## Acceptance criteria

- Successful Formspree response opens CoverageFit.
- Failed Formspree response opens CoverageFit.
- Slow Formspree response opens CoverageFit after a bounded delay.
- Formspree request uses browser keepalive.
- Home address autocomplete remains stable.
- Existing handoff and link regression suites pass.
