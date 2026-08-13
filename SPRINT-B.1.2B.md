# Sprint B.1.2B — `/score` CoverageFit Handoff

## Objective
Connect only the 408-FARMERS `/score` experience to the tested shared CoverageFit launcher while preserving the existing transition, motion, mobile sticky CTA, and local fallback.

## Completed
- Replaced the local `/home#form` redirect inside `shared/score.js` with `CoverageFitLauncher.launch()`.
- Configured the launch contract:
  - `source=408farmers`
  - `entry=score`
  - `assessment=home`
  - `launch_surface=home_protection_score`
- Preserved campaign, UTM, creative, referral, and session values through the shared launcher.
- Preserved the existing 1.45-second CoverageFit transition.
- Connected all three `/score` start controls:
  - Hero CTA
  - Final CTA
  - Mobile sticky CTA
- Kept `/home#form` as a safe local fallback.
- Added a `launcher_unavailable` analytics fallback event.
- Marked the clicked CTA `aria-busy=true` during transition.
- Reordered scripts so the shared launcher is available before `score.js` initializes.

## Files changed
- `score/index.html`
- `shared/score.js`
- `ROADMAP.md`
- `CHANGELOG.md`
- `SPRINT-B.1.2B.md`

## QA acceptance criteria
- `/score` contains exactly three `.js-start-review` controls.
- Every control uses the same shared handler.
- Launch URL points to `https://coveragefit.com/home/`.
- Launch URL includes `source`, `entry`, `assessment`, `session_id`, and campaign attribution.
- Door-hanger and UTM parameters persist.
- Transition overlay activates before navigation.
- Missing launcher falls back to `/home#form`.
- Homepage and other landing-page CTA behavior remains unchanged.
