# 408FARMERS RC-SMS-1.3 Synchronization

## Status

Synchronized with CoverageFit v3.20.21. The public 408FARMERS runtime remains `408-BUY-1.1`.

## Integration boundary

The public 408FARMERS site continues to provide the `/buyer/` text-first and website-first entry routes. The actual RingCentral webhook, deterministic intent router, command handling, retry state, phone-number hashing, and live conversation persistence remain in the protected CoverageFit backend.

No RingCentral client ID, client secret, JWT token, validation token, sender number, contact phone number, or conversation transcript is present in this public package.

## Synchronized behavior

CoverageFit RC-SMS-1.3 now supports:

- Buyer
- Current home review
- Home and auto together
- Something else
- STOP
- START
- RESTART
- HELP
- DYLAN
- AGENT
- One helpful invalid-response retry before queuing Dylan

The full homebuyer SMS questionnaire remains RC-SMS-1.4. The existing 408FARMERS `/buyer/` web intake and prefilled text action are preserved without creating a parallel assessment.

## Public-runtime impact

None. The 408FARMERS deployable website does not need to change for the CoverageFit intent router to operate. This synchronized package updates only the integration manifest, documentation, and regression contracts.
