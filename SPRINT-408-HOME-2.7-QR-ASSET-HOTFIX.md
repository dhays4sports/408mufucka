# 408-HOME-2.7 — Deep QR Route Asset Resolution Hotfix

## Problem

Cloudflare serves `/home/index.html` for `/home/qr/{ZIP}/{rate|fit}/` with a `200` rewrite so the clean campaign URL remains visible. The Home document previously referenced public assets with `../shared/...`. At a nested QR URL, the browser resolved those references beneath `/home/qr/{ZIP}/`, causing CSS, JavaScript, images, and campaign matching to fail.

## Fix

`home/index.html` now uses root-relative public URLs for shared CSS, JavaScript, images, Privacy, and Terms:

- `/shared/...`
- `/privacy.html`
- `/terms.html`

The campaign route, lead form, campaign identifiers, attribution, post-lead flow, CoverageFit invitation, and FLOW-2.5 conversion logic are unchanged.

## Regression coverage

`qa/test-home-2.7-deep-route-assets.js` verifies:

- the QR rewrite still precedes the general Home rewrite;
- the Home document contains no parent-relative `../` public references;
- critical CSS, campaign JS, main form JS, images, and legal links are root-relative;
- all collected local Home references resolve to real packaged files when the visible browser URL is each of:
  - `/home/qr/95118/rate/`
  - `/home/qr/95118/fit/`
  - `/home/qr/10001/rate/`
  - `/home/qr/99999/fit/`

## Production gate

After deploying this sender archive, open both live 95118 routes and confirm the styled, message-matched campaign experience appears before printing QR-coded flyers.
