# Sprint B.1.2A — Shared CoverageFit Launcher

## Objective
Create and independently test the sending-side launcher used by 408-FARMERS to open the CoverageFit Home assessment with the B.1.1 attribution contract.

## Completed
- Added `shared/coveragefit-launch.js`.
- Added configurable CoverageFit and fallback URLs to `shared/config.js`.
- Loaded the launcher on the homepage, `/score`, `/home`, `/auto-bundle`, and all non-empty occupational landing pages in the source package.
- Preserved all existing CTA destinations. No CTA invokes the launcher in this sprint.
- Added session ID creation/reuse.
- Added campaign and UTM pass-through.
- Added vendor-neutral launch and fallback analytics events.
- Added a non-navigating mode for QA: `CoverageFitLauncher.launch({navigate:false})`.

## Public API
```js
CoverageFitLauncher.buildUrl({ entry: 'score', assessment: 'home' });
CoverageFitLauncher.launch({ entry: 'score', assessment: 'home' });
CoverageFitLauncher.getSessionId();
CoverageFitLauncher.getAttribution();
```

## Destination contract
The default destination is `https://coveragefit.com/home/` and includes:
- `campaign`
- `source=408farmers`
- `entry`
- `assessment=home`
- `session_id`
- available UTM and creative/referral parameters

## Next sprint
B.1.2B connects only `/score` CTAs to this launcher and tests the complete door-hanger-to-CoverageFit handoff.
