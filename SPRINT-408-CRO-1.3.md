# 408-CRO-1.3 — Mobile Performance

## Status

Complete in public runtime `408-CRO-1.3`.

## Objective

Reduce first-load image cost for campaign and QR traffic while preserving the approved visual identity, existing entry behavior, and canonical handoff architecture.

## Implemented

- Auto Bundle, Healthcare, Teachers, Tech, and Engineers use responsive WebP hero sources at 480, 800, and full width.
- Each responsive `<picture>` retains the original PNG as an explicit compatibility fallback and social-preview asset.
- Width and height attributes reserve the original aspect ratio before media decodes.
- `sizes` describes the actual campaign layout so mobile and desktop browsers can select the smallest suitable source.
- Only the true above-the-fold hero image uses `fetchpriority="high"`.
- Dylan's headshot has 160, 320, and 640 pixel WebP variants selected for its rendered size.
- Below-fold headshots and Farmers Authorized Agency marks use native lazy loading and asynchronous decoding.
- `performance-budgets.json` establishes route-specific and shared-media byte ceilings.

## Preserved

- Approved image composition and original source assets
- Form fields, validation, consent, and Formspree fail-open behavior
- Contact choices from 408-CRO-1.2
- Entry attribution, partner attribution, flyer attribution, and zero-repeat handoff
- CoverageFit v3.20.51 receiver compatibility
- RC-SMS-1.1 through RC-SMS-1.9 architecture

CoverageFit was inspected and regression-tested but not modified.

## Certification

Run:

```text
node qa/test-cro-1.3.js
CHROMIUM_PATH=/path/to/chromium node qa/test-cro-1.3-browser.mjs
python3 qa/test-static.py
python3 qa/check-links.py
```

The dedicated source suite checks encoded image dimensions, responsive source contracts, fallbacks, priority, lazy loading, route budgets, and unchanged handoff behavior. The browser suite exercises all five routes at 390 × 844 under simulated cellular throttling and 1440 × 1000 desktop, including actual candidate selection, fallback decoding, deferred media, runtime errors, and horizontal overflow.

## Deferred

- 408-CRO-1.4 low-friction intake
- 408-CRO-1.5 accessibility and responsive polish
- Real cellular field measurements and conversion-pilot evidence in 408-CRO-1.8
- RC-SMS-1.10 production carrier certification until the 408-FARMERS number is ported
