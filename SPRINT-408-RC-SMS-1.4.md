# 408-RC-SMS-1.4 — Complete Homebuyer SMS Intake Synchronization

## Status

Synchronized with CoverageFit v3.20.22. The public 408FARMERS runtime remains `408-BUY-1.1`.

## Boundary

The public 408FARMERS project continues to provide the memorable number, buyer route, text-first QR destination, and campaign entry surfaces. The complete homebuyer SMS conversation runs only in the protected CoverageFit backend.

No RingCentral client ID, client secret, JWT, validation token, phone-number hash secret, conversation record, address, closing date, occupancy, or auto-review response is included in this public project.

## Synchronized behavior

CoverageFit now collects:

- Property address
- Closing date or bounded natural timing
- Occupancy
- Auto-review interest
- Standard or RUSH priority

STOP, START, RESTART, HELP, DYLAN, AGENT, and RUSH remain server-side messaging controls. RUSH is operational priority only and does not guarantee coverage, eligibility, or turnaround time.

The secure personalized CoverageFit continuation remains deferred to RC-SMS-1.5.
