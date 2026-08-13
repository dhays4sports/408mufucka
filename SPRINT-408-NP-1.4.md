# 408-NP-1.4 — 408FARMERS Referral Bridge

## Status

Implemented, verified, and deployable with CoverageFit v3.20.17.

## Goal

Give every anonymous CoverageFit neighbor referral a short, trusted public entry route on 408FARMERS while preserving the existing CoverageFit intake and referral-token contract.

## Public routes

- Unique referral: `https://408farmers.com/neighbor/r/ref_[anonymous-token]`
- Safe generic fallback: `https://408farmers.com/neighbor/`

The Cloudflare Pages `_redirects` rule maps `/neighbor/r/*` to one integrated bridge page. The token remains in the path rather than a long visible query string.

## User-visible behavior

The visitor sees a full-screen 408FARMERS → CoverageFit handoff with:

- `Preparing your personalized CoverageFit review`
- a visible 408FARMERS-to-CoverageFit trust bridge
- three bounded progress steps
- a manual `Continue now` fallback
- privacy language explaining that the shared link contains no homeowner identity or coverage details

The page waits about 2.3 seconds under standard motion and 650 milliseconds under reduced motion. It then opens the existing CoverageFit Home experience in referral mode. It does not create a duplicate intake. No duplicate intake is created.

## Routing and fallback contract

A valid token is transferred to CoverageFit as `rid` beside exact `ref=neighbor`. The token survives the bridge without being exposed as homeowner data. The approved `share` channel and bounded campaign/UTM values survive the redirect.

Malformed, missing, duplicated, or extra-path tokens are never forwarded. Those visitors continue to the safe generic neighbor welcome instead of an error page.

The bridge navigates with `location.replace`, preventing the transition from becoming a back-button loop. The destination is always `coveragefit.com/home/`, never the bridge itself and never a second transition route.

## Privacy

The public URL contains only the random anonymous token and an optional bounded share-channel marker. It contains no name, address, phone number, email, report ID, score, answers, or coverage details.

## Existing behavior preserved

- Existing Home and occupational lead forms retain the `408-CONV-1.1` zero-repeat sender contract.
- Existing Formspree delivery, address autocomplete, consent, campaign attribution, and CoverageFit assessment handoff are unchanged.
- CoverageFit remains the single intake implementation.

## Verification

Run:

```bash
node qa/test-np-1.4.js
COVERAGEFIT_ROOT=/path/to/CoverageFit node qa/test-np-1.4-cross-repo.js
node qa/test-conv-1.1.js
python qa/test-static.py
python qa/check-links.py
```
