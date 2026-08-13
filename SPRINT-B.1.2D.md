# Sprint B.1.2D — End-to-End Integration QA

## Objective
Harden and verify the 408-FARMERS → CoverageFit Home assessment integration completed in B.1.2A–C.

## Verified journeys

1. `/score` direct traffic → CoverageFit Home
2. `/score?campaign=doorhanger&utm_medium=offline` → CoverageFit Home with attribution
3. Homepage hero → CoverageFit Home
4. Homepage Home intent card → CoverageFit Home
5. Home landing form → Formspree success → CoverageFit Home
6. Tech landing form → Formspree success → CoverageFit Home
7. Engineers landing form → Formspree success → CoverageFit Home
8. Healthcare landing form → Formspree success → CoverageFit Home
9. Launcher construction failure → local `/home#form` fallback

## Contract confirmed

CoverageFit launch URLs include:

- `campaign`
- `source=408farmers`
- `entry`
- `assessment=home`
- `session_id`
- supported UTM fields
- optional `creative`, `referral`, and `launch_surface`

## QA results

- Launcher behavior tests: 6/6 passed
- Static integration assertions: 43/43 passed
- Local route smoke tests: 8/8 returned HTTP 200
- Internal local asset/link checks: 118 checked, 0 broken
- JavaScript syntax checks passed
- ZIP integrity passed

## Files added

- `qa/test-b1.2d.js`
- `qa/test-static.py`
- `qa/check-links.py`
- `B1_2D_QA.json`
- `SPRINT-B.1.2D.md`

## Production note

408Farmers.com and CoverageFit.com are separate origins, so browser local storage is not shared. The integration correctly passes attribution through URL query parameters. CoverageFit v3.6.1 B.1.1 is responsible for receiving and persisting those values.

## Scope intentionally excluded

- Live production submission to Formspree
- Live production deployment verification on Cloudflare Pages/DNS
- CoverageFit receiver-side changes, which belong to the separate CoverageFit repository
