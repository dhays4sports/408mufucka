# CONV-1.1 Sender Release Certification

Build: `408-CONV-1.1`
Receiver: `CoverageFit v3.20.13`
Status: **Deployable**

## Verified journey

`408farmers.com/home/` → `coveragefit.com/transition/` → `coveragefit.com/assessment/`

## Release checks

- Dedicated CONV-1.1 sender QA: 7/7
- Form submission runtime QA: 3/3
- CoverageFit v3.20.13 cross-repository contract QA: 5/5
- Legacy cross-repository regression: 132/132 with 5/5 mock Formspree submissions
- Current handoff compatibility: 26/26 across Home, Teachers, and shared profile tests
- Address autocomplete runtime QA: 11/11
- Shared launcher QA: 6/6
- Prospect profile QA: 29/29
- Logo integration QA: 14/14
- Static release QA: 163/163
- Local links checked: 157, broken: 0
- JavaScript syntax: 28 files, 0 failures
- HTML structural parsing: 19 files, 0 failures
- Local HTTP routes: 7/7 returned 200

## Preserved behavior

- Formspree keepalive submission
- Manual and Google Places address entry
- Structured address transfer
- UTM, campaign, referral, and session attribution
- Animated CoverageFit transition
- Local thank-you fallback
- Existing logo and responsive design

## Live-production note

No live Cloudflare deployment or real lead submission was performed from the build environment. Deploy the sender and CoverageFit v3.20.13, then run the full journey in a private browser.
