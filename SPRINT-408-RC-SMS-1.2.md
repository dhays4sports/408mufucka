# 408FARMERS RC-SMS-1.2 Synchronization

## Status

Synchronized with CoverageFit v3.20.20.

## Public runtime

The 408FARMERS public runtime remains `408-BUY-1.1`. No buyer page, QR destination, form, attribution field, SMS link, or CoverageFit handoff behavior changed in this bounded synchronization.

## Integration contract

- CoverageFit owns the private RingCentral JWT exchange.
- CoverageFit receives live RingCentral events at `/api/sms/ringcentral/webhook`.
- CoverageFit stores live conversation and duplicate-event state in D1.
- CoverageFit sends the first bounded welcome response.
- 408FARMERS continues to supply the public buyer entry point and prefilled text action.

## Security boundary

The 408FARMERS package contains no RingCentral client secret, JWT credential, webhook validation token, conversation hash secret, access token, or live SMS transcript.

## Deferred public changes

Realtor-specific SMS codes and text-first partner attribution remain deferred to RC-SMS-1.6. The existing `/buyer/` experience remains the stable public entry point.
