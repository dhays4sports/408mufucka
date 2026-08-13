# 408-HO-1C — Production-Domain Handoff Smoke Certification

## Goal
Create a repeatable production smoke certification for the five personalized 408FARMERS journeys and verify their contract with Formspree and CoverageFit TX-1.1.

## Implemented
- Added a public `handoff-manifest.json` deployment fingerprint describing the current sender build, receiver contract, Formspree host, CoverageFit routes, and all five personalized entry points.
- Added build and contract fingerprints to Home, Tech, Engineers, Healthcare, and Teachers without changing their visual layout or form fields.
- Added non-personal `sender_build` and `handoff_contract` parameters to successful CoverageFit launches for production traceability.
- Added `qa/production-handoff-smoke.js`, a dependency-free live smoke runner that downloads the deployed sender and receiver assets, reconstructs each journey, verifies profile creation, verifies CoverageFit URL cleanup, executes TX-1.1 transition behavior, and optionally performs five clearly labeled Formspree test submissions.
- Added an isolated full-stack smoke simulation using local 408FARMERS, Formspree, and CoverageFit TX-1.1 servers.

## Production certification result
The certification process completed with a **NO-GO** result for the currently deployed domains. The public Teachers route remains blank and the current production deployment does not expose the 408-HO-1C manifest/build fingerprint. CoverageFit TX-1.1 could not be confirmed as the deployed transition receiver. The corrected source package itself passes the complete simulated handoff.

## Commands
Read-only live verification:

```bash
node qa/production-handoff-smoke.js
```

Full verification, including five labeled test leads:

```bash
node qa/production-handoff-smoke.js --submit --acknowledge-leads --output qa/production-smoke-latest.json
```

## Verification
- Full simulated smoke certification: 113/113 checks passed.
- Five of five mock Formspree submissions accepted.
- All five personalized routes completed sender profile creation, TX-1.1 intake, PII cleanup, transition-state creation, transition routing, and return to CoverageFit Home.
- Existing project regression suites remain part of the release gate.

## Deferred
- Deploy this package to 408farmers.com.
- Deploy CoverageFit v3.19.9 TX-1.1 to coveragefit.com.
- Run the included full live smoke command and retain the generated JSON report.
- Production certification remains NO-GO until the deployed assets match the fingerprints in this package and all five labeled Formspree submissions succeed.
