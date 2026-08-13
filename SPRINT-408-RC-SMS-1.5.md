# 408-RC-SMS-1.5 — Secure CoverageFit Continuation Synchronization

## Status
Synchronized with CoverageFit v3.20.23. The public 408FARMERS runtime remains `408-BUY-1.1`.

## Boundary
The public 408FARMERS project continues to provide the memorable number, buyer route, text-first QR destination, and campaign entry surfaces. Secure SMS conversation state and continuation tokens remain in the protected CoverageFit backend.

## Synchronized behavior
After a buyer completes the SMS intake, CoverageFit sends a short-lived opaque continuation link. The link resolves the property address, closing context, occupancy, auto-review interest, and RUSH status server-side and carries those details into the existing CoverageFit Home journey without placing them in the visible URL.

No RingCentral credentials, buyer phone number, property address, closing date, or internal conversation identifier is added to the 408FARMERS public runtime.

## Deferred
Realtor SMS partner-code attribution remains RC-SMS-1.6.
