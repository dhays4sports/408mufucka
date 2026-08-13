Current production hotfix: **408-HOME-2.7 Deep QR Route Asset Resolution**

The clean flyer routes `/home/qr/{ZIP}/rate/` and `/home/qr/{ZIP}/fit/` now load Home CSS, JavaScript, images, and legal links with root-relative public URLs so Cloudflare 200 rewrites work correctly at any supported ZIP depth. Campaign matching, attribution, lead capture, FLOW-2.5 post-lead behavior, and CoverageFit continuation are unchanged.

Run: `node qa/test-home-2.7-deep-route-assets.js`

Current public release: **408-LIFE-1.7 — Conversion + Production Certification**

The LIFE campaign now includes privacy-bounded first-party conversion measurement for landing, start, quick-question completion, application-detail start, and confirmed application-start submission. Conversion events contain only random memory-only journey/event IDs plus normalized campaign attribution; applicant answers and identity fields never enter analytics.

The protected `/life-ops/` workspace now includes aggregate funnel performance by creative and a Cloudflare production-readiness panel. No Meta Pixel, CAPI, GA/dataLayer, browser persistence, Formspree, or CoverageFit transport was added to the LIFE path.

Run: `node qa/test-408-life-1.7.js`
Rendered QA: `CHROMIUM_PATH=/usr/bin/chromium python3 qa/test-408-life-1.7-browser.py`

Canonical paid-social URLs: `LIFE-CAMPAIGN-ROUTING.md`
Production activation checklist: `LIFE-PRODUCTION-CERTIFICATION.md`

Paid traffic may be activated only after the deployed protected readiness endpoint returns `ready:true` and one canary application start is visible in both the encrypted queue and conversion summary.

Current synchronization: **408-RC-SMS-1.9.1 — Immediate Producer Queue Alerts**

CoverageFit v3.20.54 now sends one privacy-safe, deduplicated producer email when the SMS journey becomes actionable: a guided intake completes, the prospect requests DYLAN, a direct-handling category is captured, or the intent router escalates after a second unclear response. RUSH work is labeled in the subject, and the protected SMS Operations dashboard exposes delivery state plus a pre-port test action.

No public 408FARMERS page or intake behavior changed. CRO-1.6.2.1 intent cultivation, the zero-repeat handoff, both lead intake points, fail-open Formspree delivery, STOP handling, manual takeover, and the unported production-number boundary are preserved. Live carrier cutover remains RC-SMS-1.10.

Run: COVERAGEFIT_ROOT=/path/to/coveragefit node qa/test-rc-sms-1.9.1.js

Previous release: **408-CRO-1.6.2.1 — Intent Payoff and Promise Alignment**

Current release: **408-CRO-1.6.2 — Professional Intent Continuity**

PROFESSIONAL INTENT CONTINUITY
Healthcare, Education, Technology, and Engineering visitors now see one continuous professional discount eligibility-review promise from 408FARMERS through CoverageFit transition, the five-minute Protection Snapshot, completion, the private customer Snapshot, and Dylan’s Producer Workspace. The CTA is now the more inviting “See Which Professional Discounts May Apply.”

CoverageFit does not decide eligibility or calculate a discount. The role and completed educational Snapshot provide context for Dylan to verify which Farmers professional discounts may be available during quoting and underwriting. No additional assessment questions or Protection Score changes were introduced.

Paired release: CoverageFit v3.20.52
Run: node qa/test-cro-1.6.2.js
Rendered QA: CHROMIUM_PATH=/path/to/chromium node qa/test-cro-1.6.2-browser.mjs

Previous release: **408-CRO-1.6.1 — Occupational Eligibility Intent Correction**

OCCUPATIONAL ELIGIBILITY INTENT CORRECTION
The Healthcare, Education, Technology, and Engineering paths once again clearly invite a professional discount eligibility review. Each route asks for the visitor’s role, carries that occupational context into the established zero-repeat journey, and asks Dylan to verify which Farmers professional discounts are available while preparing options.

The website and CoverageFit do not make an eligibility decision. CoverageFit remains an educational Protection Snapshot; discount availability remains subject to Farmers eligibility, quoting, and underwriting requirements. No forms, fields, consent, attribution, lead delivery, buyer architecture, or CoverageFit v3.20.51 source changed.

Run: node qa/test-cro-1.6.1.js
Rendered intent QA: CHROMIUM_PATH=/path/to/chromium node qa/test-cro-1.6.1-browser.mjs

Previous release: **408-CRO-1.6 — Promise and Journey Consistency**

PROMISE AND JOURNEY CONSISTENCY
Every acquisition route now describes one sequence: start with a Coverage Review, share the minimum intake details, complete CoverageFit’s educational Protection Snapshot, review the completed Snapshot with Dylan, and prepare options only if Farmers appears to fit. Professional pages invite a review rather than promising an eligibility result; discount availability is explicitly verified during quoting and underwriting. Local fallback pages no longer promise a response “shortly” or automatic option preparation.

The short 408FARMERS intake is distinguished from the approximately five-minute CoverageFit assessment. CRO-1.4 intake, CRO-1.5 accessibility, Buyer architecture, attribution, consent, fail-open delivery, CoverageFit v3.20.51, and the zero-repeat `/assessment/` continuation remain unchanged.

Run: node qa/test-cro-1.6.js
Rendered journey QA: CHROMIUM_PATH=/path/to/chromium node qa/test-cro-1.6-browser.mjs

ACCESSIBILITY AND RESPONSIVE POLISH
All 20 public HTML pages now provide a first-tab skip link, a focusable main landmark, consistent dual-contrast keyboard focus, browser zoom support, 320px reflow, 16px mobile form controls, and 44px primary touch targets. Site-wide reduced-motion and forced-color behavior is included. Contrast tokens identified by the WCAG audit were corrected without changing the established visual architecture.

The CRO-1.4 and Buyer intake engines now announce step changes, associate validation feedback with invalid controls, and clear error state after correction. The hidden Score mobile CTA is disabled until visible. CoverageFit v3.20.51, the zero-repeat handoff, form architecture, attribution, consent, and fail-open lead delivery remain unchanged.

Run: node qa/test-cro-1.5.js
Rendered WCAG/reflow QA: CHROMIUM_PATH=/path/to/chromium AXE_PATH=/path/to/axe.min.js node qa/test-cro-1.5-browser.mjs

LOW-FRICTION INTAKE
The Auto Bundle, Healthcare, Teachers, Tech, and Engineers forms now use a bounded two-step interaction. Step 1 asks only for the campaign-specific housing or professional context. Step 2 asks once for contact details, property address, and explicit contact consent, then explains that CoverageFit opens with those details already added so the visitor can build an educational Protection Snapshot without repeating the address. The completed Snapshot can focus a later conversation with Dylan. Visible progress, Back and Continue controls, responsive layouts, and first-invalid-field focus recovery support completion. With JavaScript unavailable, the original complete form remains visible and usable.

Property address remains in the 408FARMERS form because CoverageFit v3.20.51 receives and stores that value for the Home assessment. Moving the question downstream would risk a repeat. The existing profile, attribution, consent, fail-open Formspree delivery, and zero-repeat /assessment/ handoff remain unchanged. The Buyer route keeps its established progressive engine and was not modified.

Run: node qa/test-cro-1.4.js
Rendered QA: CHROMIUM_PATH=/path/to/chromium node qa/test-cro-1.4-browser.mjs

MOBILE PERFORMANCE
The Auto Bundle campaign hero continues to use responsive WebP sources at 480, 800, and full widths. As of 408-FLOW-2.1, Healthcare, Teachers, Tech, and Engineers intentionally render without campaign hero images; their optimized image files remain packaged only for historical compatibility and social-sharing metadata. Dylan headshots use 160, 320, and 640 pixel WebP variants, and below-fold headshots and carrier marks are lazy-loaded. Route and shared-asset ceilings are defined in `performance-budgets.json` and enforced by `node qa/test-cro-1.3.js`.

Call links are now labeled as calls, prefilled text links use one consistent `sms:+14083276377?body=` format, and every public form offers explicit Text Dylan and Call Dylan alternatives. Business, landlord, and life entry cards now open a focused `/contact/` choice surface with visible text, call, and email routes instead of assuming SMS is available on every device. The chooser carries only an allowlisted intent and does not collect personal information.

The CRO-1.1 entry-integrity fixes remain intact. All production forms continue to use the FLOW-1.3 semantic context fields. CoverageFit v3.20.51 is the current paired receiver, while v3.20.13 remains the audited minimum contract receiver. CoverageFit was not modified for CRO-1.2.

RC-SMS through 1.9 remains implemented in the protected CoverageFit architecture. Live SMS is not production-certified because the 408-FARMERS number has not been ported; RC-SMS-1.10 remains deferred.

PC-1.1 synchronization: the public runtime and FLOW-1.4 handoff remain unchanged. Cross-project referral certification now validates the preserved CoverageFit contract for v3.20.17/v3.20.18 and later releases instead of stopping at v3.20.29.

408-RC-SMS-1.7 synchronization: CoverageFit v3.20.25 provides producer handoff, protected operator controls, and RingCentral manual-reply takeover. The public runtime remains 408-BUY-1.2.

408-RC-SMS-1.6 synchronization: CoverageFit v3.20.24 provides server-side realtor partner attribution for text-first SMS. The public runtime is 408-BUY-1.2 and supports partner_code in the existing buyer text prefill.

408-RC-SMS-1.5 synchronization: CoverageFit v3.20.23 now provides the secure zero-repeat SMS continuation. The public runtime remains 408-BUY-1.1.

RC-SMS-1.4 synchronization

The public 408FARMERS runtime remains 408-BUY-1.1. CoverageFit v3.20.22 now owns the complete deterministic homebuyer SMS intake for property address, closing date, occupancy, auto-review interest, and operational RUSH priority. The public website contains no RingCentral credentials, conversation records, or buyer SMS data. Personalized CoverageFit continuation remains RC-SMS-1.5.

RC-SMS-1.3 synchronization

The public 408FARMERS runtime remains 408-BUY-1.1. CoverageFit v3.20.21 now owns the deterministic RingCentral intent router, Buyer/Home Review/Bundle/Other classification, STOP/START/RESTART/HELP/DYLAN/AGENT controls, and one-retry invalid-response escalation. No RingCentral credentials or live conversation records are included in this 408FARMERS build.

RC-SMS-1.2 synchronization

The public 408FARMERS runtime remains 408-BUY-1.1. CoverageFit v3.20.20 now owns the protected RingCentral live connection, webhook validation, one-message automated welcome, sender health check, and webhook subscription control. No RingCentral credentials or live conversation records are included in this 408FARMERS build.

RC-SMS-1.1 synchronization

The public 408FARMERS runtime remains 408-BUY-1.1. CoverageFit v3.20.19 now provides the protected deterministic SMS simulator. No RingCentral credentials or live SMS behavior are included in this 408FARMERS build.

Prior buyer release: **408-BUY-1.2 — Homebuyer Coverage Concierge + Partner Text Attribution**

The new `/buyer/` route gives homebuyers two clear entry paths: a prefilled text to Dylan or a short online intake that collects the property, estimated closing date, occupancy, and contact details before continuing into the existing CoverageFit assessment. Optional realtor partner parameters personalize the referral acknowledgement and create a privacy-safe partner campaign ID.

The release preserves the current Formspree delivery, Google Places address capture, zero-repeat CoverageFit handoff, any-ZIP flyer attribution, and Neighborhood Protection Pass bridge.

408-FARMERS CAMPAIGN LANDING PAGES

UPLOAD STRUCTURE
Place the contents of this folder in your website root/public_html. Keep the folder structure intact.

URLs
/buyer
/home
/auto-bundle
/healthcare
/teachers
/tech
/engineers
/neighbor
/neighbor/r/[anonymous-token]

TEACHERS CAMPAIGN
The /teachers route is a complete educator eligibility campaign and uses the same personalized CoverageFit handoff as Home, Tech, Engineers, and Healthcare.


HOMEBUYER COVERAGE CONCIERGE
The `/buyer/` route is the website destination printed on the buyer partner card. The primary action opens a prefilled SMS. The secondary online path uses the existing validated form and CoverageFit handoff.

Generic URL:
https://408farmers.com/buyer/

Partner-attributed URL:
https://408farmers.com/buyer/?partner_id=jessica-martinez&partner_name=Jessica%20Martinez&utm_source=realtor_partner&utm_medium=partner_card&utm_campaign=buyer_referral

Supported partner query aliases:
- partner_id, partner, realtor_id
- partner_name, referred_by, realtor_name

Run: node qa/test-buyer-flow.js

FORM SETUP
1. Open shared/config.js
2. Confirm the Formspree endpoint and Google Places browser key.
3. Upload the full package.

SMART ADDRESS AUTOCOMPLETE
The Home property-address field is activated with Google Places. The browser key must remain restricted in Google Cloud to the production 408FARMERS domains and any approved preview domain, with billing and the required Maps/Places APIs enabled. Manual address entry remains available if Google cannot load.

TRACKING
Each form automatically captures campaign, landing-page URL, timestamp, and UTM parameters.

META PIXEL
Add your base Pixel code to the <head> of each index.html. Add your Lead event to each thank-you.html.

IMPORTANT
Discounts and eligibility are not guaranteed. All pages include appropriate qualifier language and consent text.

SPRINT 1.2 — SHARED VISUAL SYSTEM
- Added shared/design-system.css
- Standardized colors, spacing, radius, shadows, typography, buttons, cards, chips, panels, grids, links, and reveal motion
- Applied reusable components to /score without changing its campaign layout
- Imported the shared system into root.css, styles.css, and score.css for future page adoption
- Added DESIGN-SYSTEM.md implementation guidance

COVERAGEFIT HANDOFF
The Home, Auto Bundle, Tech, Engineers, Healthcare, and Teachers forms start a keepalive Formspree submission, then continue the canonical prospect profile into CoverageFit after a short bounded grace period. A slow or failed lead-delivery response no longer blocks the CoverageFit transition. Every personalized handoff includes the stable `coveragefit-handoff-v1` contract, explicit contact-permission provenance, and `/assessment/` as the post-transition destination. Legacy `referral` attribution is emitted as CoverageFit's canonical `ref` parameter.

HANDOFF QA
Run: node qa/test-conv-1.1.js
Run: node qa/test-conv-1.1-cross-repo.js
Run: node qa/test-408-ho-1a.js
Run: node qa/test-408-ho-1e.js
Run: node qa/test-408-ho-1f.js
Run: python qa/test-static.py
Run: python qa/check-links.py

PRODUCTION HANDOFF CERTIFICATION
Read-only live verification:
node qa/production-handoff-smoke.js

Full live verification (creates five clearly labeled test leads):
node qa/production-handoff-smoke.js --submit --acknowledge-leads --output qa/production-smoke-latest.json

The deployment is certified only when the command returns CERTIFIED. See PRODUCTION-HANDOFF-CERTIFICATION.md.


NEIGHBOR REFERRAL BRIDGE
CoverageFit neighbor shares now open a clean 408FARMERS URL at /neighbor/r/[anonymous-token]. The integrated full-screen bridge preserves the token and bounded campaign attribution, then uses replace navigation to continue into the existing CoverageFit Home referral welcome. /neighbor/ is the safe generic fallback. Run node qa/test-np-1.4.js and the cross-repository contract test before release.

RC-SMS-1.6 text-first realtor attribution:
Use /buyer/?partner_id=<canonical-slug>&partner_name=<encoded-name>&partner_code=<issued-code>. Text Dylan will include Ref: <issued-code>; CoverageFit resolves that code server-side to the same canonical partner ID.

RC-SMS-1.8 synchronization: CoverageFit v3.20.26 adds deterministic current-home and home+auto guided SMS paths, expanded RUSH priority, and safe servicing/special routing. Public runtime remains 408-BUY-1.2.

RC-SMS-1.9 synchronization: CoverageFit v3.20.27 adds the protected operations dashboard and reliability controls. Public runtime remains 408-BUY-1.2.
