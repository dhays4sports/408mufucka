# FLOW-2.5 Production Conversion Runbook

Use this after the paired 408FARMERS `408-FLOW-2.5` and CoverageFit `v3.20.62` archives are published to their correct Cloudflare-connected repositories.

## Preconditions

1. Confirm `408farmers.com` serves `408-FLOW-2.5` and `coveragefit.com` serves `3.20.62`.
2. Use a controlled test prospect and a private/incognito browser.
3. Have access to the Formspree lead receipt and the protected CoverageFit consultation inbox.
4. Use one supported desktop browser and one physical iOS or Android device.

## Primary owner path

1. Open `/home/` with test campaign and UTM values.
2. Confirm the lead form is the first interactive intake.
3. Submit valid contact, property, and consent details.
4. Verify one Formspree receipt and no duplicate 408FARMERS submission.
5. Complete the three post-lead questions and verify the personalized payoff.
6. Leave the CoverageFit invitation untouched for 30 seconds; confirm no navigation occurs.
7. Select **Continue to CoverageFit** once.
8. Confirm transferred personal and consent values disappear from the visible URL.
9. Confirm the transferred property once and proceed immediately into the existing assessment.
10. Complete questions one through three without a pause, freeze, or unresponsive-tab warning; finish the assessment.
11. Confirm contact and consent are reused without another form.
12. Verify one new completed consultation in the protected CoverageFit inbox, with attribution and the three intent values.
13. Confirm the Protection Score and private Home Protection Snapshot open.
14. Select **Save as PDF / Print**, choose **Save as PDF**, and inspect all three pages.

## Finish-for-now path

1. Repeat the 408FARMERS lead and post-lead questions with a second controlled prospect.
2. Select **Finish for Now**.
3. Confirm the first lead remains in Formspree.
4. Confirm no request or navigation to CoverageFit and no second lead point.

## Renter path

1. Repeat with `housing_context=renter`.
2. Confirm the invitation offers renter-specific options.
3. Continue and verify `/contact/?intent=renters` opens.
4. Confirm the CoverageFit Home assessment does not start.

## Resilience and device checks

1. Repeat one owner path with network throttling so the first lead status becomes pending; confirm truthful continuation.
2. Verify the primary actions at 320 px width, 200% text zoom, keyboard-only navigation, and reduced motion.
3. Repeat the report save/print action on a physical iOS or Android device.

## Release decision

Mark live production certification **GO** only when every step passes and evidence records the deployed version pair, date, browser/device, Formspree receipt, opaque consultation/report IDs, and PDF inspection. Any duplicate lead, automatic CoverageFit launch, renter misroute, visible personal URL data, question-two freeze, missing consultation, or broken report is a **NO-GO**.
