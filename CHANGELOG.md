
## 2026-08-13 — QR deep-route Advanced Mode hotfix
- Mirrored dynamic `_redirects` page rewrites inside `_worker.js` because Cloudflare Pages Advanced Mode owns Function requests and does not apply `_redirects` to them.
- Fixed `/home/qr/<ZIP>/<rate|fit>/` incorrectly falling back to the generic root `index.html`.
- Added live-architecture regression coverage for Worker-level route resolution while preserving FLOW-2.5 runtime behavior.
# 408-HOME-2.7 — Deep QR Route Asset Resolution Hotfix

- Fixed nested `/home/qr/{ZIP}/{rate|fit}/` campaign pages rendering as unstyled generic HTML under Cloudflare 200 rewrites.
- Converted Home public asset, script, image, Privacy, and Terms references from parent-relative URLs to root-relative URLs.
- Added deep-route browser URL resolution QA across multiple ZIPs and both flyer variants.
- No lead, campaign, attribution, post-lead, CoverageFit invitation, or FLOW-2.5 conversion behavior changed.

# 408-FLOW-2.5 — End-to-End Conversion Certification

- Source-certified the seven property funnels from form-first lead capture through three post-lead questions, personalized payoff, and the explicit CoverageFit or Finish for Now choice.
- Certified confirmed, pending, unconfirmed, and local-fallback lead receipts; renter diversion; controller-failure recovery; one first 408FARMERS lead; and no lead creation by engagement or invitation controls.
- Certified the paired CoverageFit v3.20.62 private handoff, visible URL cleanup, question-two stability, zero-repeat completion, second consultation intake, Protection Score isolation, private Snapshot, and Save as PDF / Print delivery.
- Added a deterministic cross-project contract harness, runtime branch matrix, frozen runtime fingerprints, and a production conversion runbook.
- Left actual deployment, live Formspree and Cloudflare records, live telemetry, and physical-device PDF verification as explicit post-deployment gates.

# 408-CF-RPT-1.1 — Saveable Protection Report Promise Alignment

- Replaced the optional CoverageFit invitation’s vague downloadable-report promise with the concrete outcome: a free Home Protection Snapshot the customer can save as PDF or print.
- Updated the invitation benefit list to name the finished report action before the customer accepts CoverageFit.
- Synchronized the sender with CoverageFit v3.20.62 and its clear browser print-dialog delivery.
- Preserved form-first intake, three post-lead questions, personalized payoff, explicit CoverageFit acceptance, Finish for Now, renter routing, first-lead preservation, and Protection Score isolation.

# 408-FLOW-2.2 — Universal Form-First Restoration

- Restored immediate lead-form presentation on `/home/`, `/auto-bundle/`, Healthcare, Teachers, Tech, and Engineers; `/buyer/` remains its already-certified form-first experience.
- Removed the pre-form three-question gate from `/home/` and retired situation-first progressive transformations on bundle and occupational pages.
- Removed obsolete empty layout placeholders so every restored direct form renders cleanly without relying on the retired wizard runtime.
- Preserved all required lead fields, explicit consent, attribution, Formspree delivery, branch controls, confirmation, and CoverageFit continuation.
- Kept the certified Life application, CoverageFit v3.20.61 assessment questions, Question-Two stabilization, recommendations, and Protection Score unchanged.

# 408-FLOW-2.1 — Occupational Visual Simplification

- Removed the rendered campaign hero images from Healthcare, Teachers, Tech, and Engineers while retaining their existing social-sharing metadata and assets.
- Rebalanced each occupational hero into a clean copy-and-form layout with isolated responsive styling from 320-pixel phones through desktop.
- Preserved every occupational form fragment and ordered runtime script list byte-for-byte, including progressive intake, address autocomplete, consent, attribution, Formspree delivery, and CoverageFit continuation.
- Left `/home/`, `/buyer/`, `/auto-bundle/`, Life, contact, and referral routes unchanged.

# 408-HOME-2.9 — Mobile, Accessibility & Performance Certification

- Added responsive WebP hero and logo delivery with intrinsic dimensions, eager priority for the primary visual, and lazy behavior retained below the fold.
- Added narrow-phone, landscape, safe-area, text-zoom, touch-target, reduced-motion, forced-colors, and horizontal-overflow safeguards for the complete `/home/` journey.
- Connected engagement and lead progress to accessible progressbar semantics and exposed invalid questions/fields programmatically.
- Parallelized ordered route scripts with `defer` and certified the optimized `/home/` initial transfer below the 500 KB route budget.
- Synchronized CoverageFit v3.20.60 accessibility and performance corrections while preserving HOME-2.8 recovery, branching, campaign attribution, consent continuity, two lead points, and Protection Score isolation.

# 408-HOME-2.8 — Continuity, Branching & Recovery

- Added a six-hour, tab-scoped checkpoint for the three bounded Home engagement answers, current stage, current step, and campaign context.
- Added a visible Continue or Start Over recovery choice without persisting pre-consent identity, contact, property, consent, or free-form data.
- Centralized owner-occupied, landlord, buyer, and renter branch resolution; only renters leave the homeowner assessment path.
- Added post-lead back/refresh recovery that reuses the existing consented prospect profile and destination without re-submitting Formspree.
- Synchronized CoverageFit v3.20.59 to recover a trusted browser handoff and redirect a recent misrouted renter to the bounded renters path.
- Preserved the existing seven-day assessment draft, two lead points, campaign attribution, assessment questions, recommendations, and Protection Score.

# 408-HOME-2.7 — Campaign Matching & QR Routing

- Added durable `/home/qr/<ZIP>/rate/` and `/home/qr/<ZIP>/fit/` campaign routes while preserving the existing query-string QR format.
- Matched the `/home/` hero, primary action, reassurance, text-message starter, and attribution to the scanned creative without changing the three engagement questions or lead flow.
- Normalized every valid route to `home_flyer_<ZIP>_<rate|fit>` and carried the bounded campaign context through the existing 408FARMERS → CoverageFit handoff.
- Added privacy-safe campaign-match and QR-route events; malformed routes safely retain the generic Home experience.
- Synchronized CoverageFit v3.20.58 to acknowledge the flyer context while preserving assessment questions, recommendations, and Protection Score calculations.

# 408-HOME-2.6 — CoverageFit Intent Reception

- Synchronized the existing `/home/` engagement handoff with CoverageFit v3.20.57.
- Preserved the three bounded engagement answers through the private handoff so CoverageFit can acknowledge the visitor’s goal, property context, and timing.
- Preserved the visible confirmation, one-time property confirmation, zero-repeat contact and consent reuse, automatic assessment start, and two lead points.
- Kept the 408FARMERS questions, payoff, progressive lead form, Formspree behavior, renter branch, and privacy-safe analytics unchanged.
- Explicitly contracts that the three entry-intent fields are record context only and cannot affect Protection Score calculations.

# 408-HOME-2.5 — Confirmation & Automatic CoverageFit Continuation

- Added a truthful post-submit confirmation to `/home/` for confirmed, pending, unconfirmed, and local-fallback lead states.
- Automatically continues after a short visible receipt, with an accessible Continue now control and a safe immediate-handoff fallback if the confirmation module is unavailable.
- Sends homeowners through the existing CoverageFit one-time property confirmation and Home assessment, while renters retain the direct Dylan route.
- Added privacy-safe confirmation telemetry without identity, contact, property-address, or free-form values.
- Preserved the 900 ms Formspree grace window, consent, attribution, structured handoff, zero-repeat behavior, two lead points, CoverageFit v3.20.56, assessment questions, and Protection Score.

# 408-HOME-2.4 — Progressive Lead Capture

- Reorganized the `/home/` lead capture after the personalized payoff into two short screens: contact details, then property and consent.
- Added accessible progress, step-specific validation, Back/Continue controls, Enter-key handling, focus recovery, responsive layouts, and privacy-safe step telemetry.
- Removed the redundant review-reason question from the JavaScript journey because HOME-2.2 answers already derive it; the original select remains visible in the complete no-JavaScript fallback.
- Tailored the renter branch to skip an unnecessary property-address request and explain the direct Dylan follow-up before submission.
- Preserved all existing field names, explicit consent, Formspree grace behavior, attribution, renter routing, zero-repeat CoverageFit handoff, and two lead points for CoverageFit journeys.
- Keeps CoverageFit v3.20.56, its assessment, Protection Score, and recommendations unchanged.

# 408-HOME-2.3 — Personalized Intent Payoff

- Added a personalized review-focus screen after the three `/home/` engagement answers and before contact capture.
- Composes bounded payoff copy from review goal, property context, and timing without producing an eligibility, savings, quote, coverage, or scoring conclusion.
- Gives renters an explicit renters-specific next-step explanation before the existing first lead capture and direct Dylan routing.
- Added Change My Answers navigation, accessible focus and announcements, responsive payoff cards, and three privacy-safe payoff events.
- Preserved the HOME-2.2 questions, no-JavaScript lead-form fallback, Formspree grace behavior, consent, attribution, zero-repeat handoff, and two lead points for CoverageFit journeys.
- Keeps CoverageFit v3.20.56, its assessment, Protection Score, and recommendations unchanged.

# 408-HOME-2.2 — Three-Question Engagement Experience

- Added a one-question-per-screen `/home/` engagement sequence for review goal, property context, and review timing before contact capture.
- Added explicit Continue and Back navigation, selection validation, accessible progress announcements, keyboard-native controls, reduced-motion support, and responsive layouts.
- Maps each bounded answer into the HOME-2.1 journey contract, derives the existing review context, and preserves zero-repeat CoverageFit handoff.
- Preserves the complete lead form as the no-JavaScript fallback and sends renters to the existing renters-specific direct conversation after lead submission.
- Adds privacy-safe engagement telemetry without name, contact, property address, or free-form data.
- Keeps CoverageFit v3.20.56, its assessment questions, Protection Score, Formspree grace behavior, consent, attribution, and both lead intake points unchanged.

# 408-HOME-2.1 — Journey Contract & Conversion Baseline

- Established `home-review-journey-v1` for the general `/home/` funnel.
- Added privacy-safe conversion events from landing view through CoverageFit completion.
- Reserved bounded `home_review_goal`, `housing_context`, and `review_timing` semantics.
- Extended the prospect profile and launcher allowlist without changing the visible Home journey.
- Preserved FLOW-1.5 confirmation, zero-repeat handoff, attribution, consent, and two lead points.

# 408-FLOW-1.5 — Universal Confirmed Assessment Handoff

- Standardized Home, Buyer, homeowners Auto Bundle, Healthcare, Teachers, Tech, and Engineers on the same successful-lead → property confirmation → existing CoverageFit assessment sequence.
- Extended structured address capture to the five funnels that previously handed off only a free-form address, enabling the same one-click confirmation used by Buyer.
- Preserved manual-address fallback, renters direct routing, two lead points, Formspree grace behavior, consent, attribution, and the LIFE secure-data boundary.
- Merged the 408-CRO-1.6.2.2 hero and progressive-intake rendering correction into the LIFE-1.7-based release branch.

# 408-LIFE-1.7 — Conversion + Production Certification

- Added same-origin first-party conversion measurement for five funnel milestones with random memory-only journey/event IDs and normalized campaign attribution only.
- Added a strict Cloudflare Worker conversion endpoint and D1 conversion table with per-journey event deduplication.
- Added protected conversion summaries by creative to `/life-ops/` without exposing applicant answers or identity data.
- Added a protected production-readiness endpoint that verifies Cloudflare assets, D1, schema, encryption, allowed origin, Access configuration, audience and producer allowlist.
- Preserved the no-third-party-pixel, no-CAPI, no-GA/dataLayer, no-browser-persistence and no-sensitive-analytics boundary.
- Completed local static, regression, Worker contract and rendered browser certification. Live Cloudflare readiness remains an explicit post-deploy check rather than an unverified claim.
- Paid traffic is release-ready only after the protected readiness panel returns ready and one production canary is confirmed.

# 408-LIFE-1.6 — Campaign Message Matching + Attribution

- Added one-route creative matching for LIFE Creatives A–D on `/life/`.
- Added memory-only UTM/campaign normalization with no browser persistence or analytics emission.
- Carried normalized campaign context through the same-origin secure application-start payload and encrypted D1 producer queue.
- Added campaign context to protected `/life-ops/` queue cards and applicant detail.
- Preserved the LIFE secure-data boundary and kept paid traffic gated until LIFE-1.7 production certification.

# 408-LIFE-1.5 — Producer Application Queue

- Added a Cloudflare-native encrypted D1 queue for LIFE application-start records.
- Added `/life-ops/` as the protected producer workspace with list/detail/status/delete controls.
- Added Cloudflare Access JWT verification plus producer-email allowlisting for every producer API request.
- Added application-layer AES-256-GCM encryption before D1 persistence, idempotent queue writes, and non-PII status/deletion audit events.
- Removed the external producer-relay requirement from the active LIFE architecture; the secure public endpoint now writes directly to the protected Cloudflare queue.
- Preserved the no-Formspree, no-CoverageFit, no-analytics, no-URL, no-browser-persistence and no-ordinary-email rules for LIFE applicant data.
- The producer-queue prerequisite is complete; paid traffic remains gated through LIFE-1.6 and LIFE-1.7 production certification.

# 408-LIFE-1.4.1 — Cloudflare Secure Submission Alignment

- Removed the LIFE-1.4 Netlify runtime/configuration and aligned the secure application-start boundary to the existing Cloudflare Pages deployment.
- Added a Cloudflare Pages Advanced Mode `_worker.js` that owns `/api/life/application-init` and forwards all other requests to `env.ASSETS.fetch(request)`.
- Added Cloudflare `_headers` rules for `/life/*` static responses while keeping API security headers in the Worker response itself.
- Replaced Node `crypto` with Workers-native Web Crypto HMAC-SHA256 and moved runtime configuration to Cloudflare Variables and Secrets.
- Preserved all LIFE-1.4 validation, sensitive-data isolation, authenticated HTTPS relay, fail-closed behavior, and the LIFE-1.5 paid-traffic gate.

# 408-LIFE-1.4 — Secure Submission Boundary

- Added a dedicated same-origin life application-start API route and public transport module.
- Added strict payload allowlisting/validation, no-store responses, origin enforcement, anti-bot timing/honeypot checks, and generic client responses.
- Added authenticated producer relay using HTTPS + Bearer token + HMAC-SHA256 + timestamp + idempotency key.
- Kept Formspree, CoverageFit, browser storage, URLs and analytics outside the sensitive LIFE payload.
- Updated life privacy disclosure and thank-you experience.
- Paid traffic remains gated until LIFE-1.5 producer queue certification.

## 408-LIFE-1.3 — Application Initialization

- Added the application-detail phase immediately after the three light qualification questions, without adding a coverage-needs analysis.
- Added legal first/middle/last name, gender, date of birth, structured residential address, email, optional mobile, last 4 of Social Security number, and an application-preparation acknowledgement.
- Added phase-aware progress, local validation, accessible error states, mobile layouts, a deliberate quick-questions → application-details transition, and a no-JavaScript safeguard that leaves application fields disabled.
- Keeps all application data in native DOM memory only; no FormData serialization, localStorage/sessionStorage, URL encoding, Formspree, CoverageFit handoff, analytics payload, fetch/XHR, or producer notification is enabled.
- Treats `ssn_last4` as a dedicated sensitive field: it is masked, accepts exactly four digits, is excluded from all network/persistent paths, and all application-detail fields are cleared on completion, pagehide, and bfcache restoration.
- Preserved the direct Dylan fallback and the paid-traffic gate until LIFE-1.4 implements and certifies secure submission.
- Certified LIFE-1.3 at 45/45 dedicated checks, 265/265 static checks, 273/273 local links, 14/14 logo checks, and 34 passing local historical Node tests with 7 external receiver prerequisites blocked and 0 unexpected failures.
- Next sprint: `408-LIFE-1.4 — Secure Submission Boundary`.

## 408-LIFE-1.2 — Engagement Intake

- Converted the `/life/` three-question preview into a real progressive quick-start flow with standard checkbox/radio controls, explicit Continue/Back navigation, answer validation, and completion state.
- Added the approved engagement questions for protection priority, household income runway, and existing life coverage without turning the page into a full coverage-needs analysis.
- Kept all answers memory-only for the open page session: no localStorage/sessionStorage, Formspree, fetch/XHR, URL answer encoding, CoverageFit profile, or analytics payload is used.
- Added accessible progress announcements, keyboard-native form controls, reduced-motion/forced-colors styling, mobile one-column behavior, and a no-JavaScript direct-contact fallback.
- Preserved the sensitive-data boundary: no legal name, DOB, gender, address, email, phone, SSN, health data, application submission, or producer notification is introduced yet.
- Preserved the paid-traffic gate until secure application initiation is certified in `408-LIFE-1.4`.
- Next sprint: `408-LIFE-1.3 — Application Initialization Intake`.

## 408-LIFE-1.1 — Life Campaign Foundation

- Added the dedicated `/life/` campaign route with the **Before Anything Changes** positioning, campaign-specific dark visual system, bounded 20-minute application and potential same-day decision language, and Dylan/Farmers trust cues.
- Routed the homepage Life Insurance entry to `/life/` while preserving `/contact/?intent=life` as the production-safe text/call/email fallback.
- Added the three-question journey preview and reserved life thank-you surface without enabling applicant-data or sensitive-data collection.
- Added an explicit trust boundary: no Formspree, CoverageFit, browser storage, applicant form, DOB, SSN, or health-data collection is introduced in this foundation sprint.
- Marked paid campaign traffic as gated until the secure application-initiation boundary is production-certified in 408-LIFE-1.4.
- Preserved all existing CoverageFit, Formspree, Buyer, professional, referral, and RC-SMS behavior.
- Certified LIFE-1.1 at 25/25 dedicated checks, 265/265 static checks, 272/272 local links, and 31 local historical Node regressions with no unexpected failures.

## 408-RC-SMS-1.9.1 — Immediate Producer Queue Alert Synchronization

- Synchronized the protected SMS contract to CoverageFit v3.20.54 and RC-SMS-1.9.1.
- Documented one privacy-safe, deduplicated producer email for completed guided intake, DYLAN requests, direct-handling requests, and second invalid-response escalation.
- Documented `[RUSH]` priority, the opaque protected-dashboard link, nonblocking webhook delivery, and the protected pre-port test action.
- Preserved all public 408FARMERS pages, CRO-1.6.2.1 intent language, two lead intake points, Formspree fail-open behavior, handoff payload, and the unported-number boundary.

## 408-CRO-1.6.2.1 — Intent Payoff and Promise Alignment

- Strengthened the homepage, homeowner, buyer, and professional value propositions around the outcome of the review.
- Corrected the auto + renters mismatch by routing homeowners to CoverageFit Home and renters to a direct, renters-specific conversation after lead submission.
- Simplified the progressive handoff while preserving role, property, contact, consent, attribution, and zero-repeat context.
- Preserved the two lead points for CoverageFit journeys and kept CoverageFit independent of a hard Formspree confirmation gate.

## 408-CRO-1.6.2 — Professional Intent Continuity

- Replaced the formal occupational submit CTA with “See Which Professional Discounts May Apply.”
- Added professional-specific handoff copy that explains how CoverageFit keeps the role connected through the educational Snapshot.
- Paired all occupational routes with CoverageFit v3.20.52 and the shared professional-intent contract.
- Preserved role-first intake, contact consent, lead delivery, attribution, zero-repeat continuation, and every existing form field.
- Added no eligibility calculator, guaranteed discount, repeated question, or Protection Score change.

## 408-CRO-1.6.1 — Occupational Eligibility Intent Correction

- Restored the occupational routes’ explicit professional discount eligibility-review purpose.
- Changed the professional CTA to “Review My Professional Discount Eligibility” and aligned homepage, hero, card, and prefilled-SMS copy.
- Preserved the licensed boundary: Dylan verifies available Farmers discounts during quoting and underwriting; the website and CoverageFit make no automated eligibility decision.
- Preserved role-first intake, `*_eligibility_form` entry identifiers, semantic occupation context, consent, fail-open lead delivery, and zero-repeat `/assessment/` continuation.
- Left CoverageFit v3.20.51 unchanged.

## 408-CRO-1.4 — Low-Friction Intake

- Converted Auto Bundle, Healthcare, Teachers, Tech, and Engineers into one shared, bounded two-step intake while retaining a complete flat form when JavaScript is unavailable.
- Kept campaign-specific housing or professional context in Step 1 and contact, property address, explicit consent, and submission in Step 2.
- Added visible progress, concise time and obligation cues, Back/Continue controls, after-submit expectations, and first-invalid-field focus recovery.
- Kept property address on 408FARMERS and confirmed CoverageFit v3.20.51 consumes the prefilled address without asking for it again.
- Preserved profile construction, attribution, consent provenance, fail-open Formspree delivery, /assessment/ continuation, and zero-repeat handoff.
- Left the existing Buyer progressive flow and CoverageFit source unchanged.

## 408-CRO-1.3 — Mobile Performance

- Added responsive 480, 800, and full-width WebP campaign artwork for Auto Bundle, Healthcare, Teachers, Tech, and Engineers.
- Preserved original PNG artwork as explicit browser fallbacks and social-preview assets.
- Added responsive Dylan headshot variants and one optimized carrier-mark source.
- Lazy-loaded all below-fold producer and carrier imagery and reserved high fetch priority for true hero media.
- Added enforceable route-specific transfer budgets and a dedicated performance certification suite.
- Preserved every form, contact choice, attribution field, CoverageFit handoff, and RC-SMS contract.

## 408-CRO-1.2 — Reliable Contact Choices

- Public runtime advances to `408-CRO-1.2`.
- Corrected call links whose visible label previously implied that the same link could also start a text.
- Standardized all public prefilled message links on one consistent `sms:+14083276377?body=` URI format.
- Added explicit Text Dylan and Call Dylan alternatives beside every public lead form without changing the form or CoverageFit continuation.
- Added one focused `/contact/` choice surface for conversation-only business, landlord, and life entry cards, with direct text, call, and email routes and an allowlisted intent configuration.
- Preserved CoverageFit v3.20.51 handoff compatibility, attribution, zero-repeat behavior, Buyer partner context, and RC-SMS through 1.9. Live SMS certification remains deferred.

## 408-CRO-1.1 — Entry Integrity and Trust

- Public runtime advances to `408-CRO-1.1`.
- Fixed the direct Buyer page so its hidden referral acknowledgement cannot render as an empty **Referred by** pill; partner-referred traffic continues to show its bounded partner name.
- Removed the stale `/home/Wowindex.html` sender and permanently redirects that URL to canonical `/home/`.
- Updated current paired-receiver metadata to CoverageFit v3.20.51 while retaining v3.20.13 as the audited minimum compatible receiver.
- Corrected SMS production state: RC-SMS through 1.9 remains implemented, but live SMS is false and RC-SMS-1.10 remains deferred until the 408-FARMERS number port.
- Added bounded CRO-1.1 QA without changing prospect-profile, launch, attribution, assessment, or CoverageFit code.

## 408-PC-1.1 — End-to-End Consultation Workflow Certification

- Public runtime remains `408-BUY-1.5`; the FLOW-1.4 handoff already supplies all context required by CoverageFit v3.20.47.
- Replaced stale NP-1.4 and NP-1.5 cross-project version allowlists with minimum compatible receiver checks while retaining the actual referral, campaign, attribution, API, and migration contract assertions.
- No acquisition page, prospect profile, launch route, attribution field, assessment destination, or SMS behavior changed.

## 408-FLOW-1.4 — Entry-Specific Transition Messaging Synchronization

- Public runtime remains `408-BUY-1.5`; the existing sender already supplies the required semantic, buyer, urgency, entry, launch-surface, campaign, and attribution context.
- Synchronizes the handoff manifest with CoverageFit v3.20.29 and its single context-sensitive transition component.
- Homebuyer, professional, home + auto, general homeowner, and time-sensitive entries continue into the same CoverageFit Home assessment.
- No campaign-specific transition page, alternate assessment, or second personalization engine was added to 408FARMERS.

## 408-FLOW-1.3 — Semantic Context Separation

- Public runtime advances to `408-BUY-1.5`.
- The shared prospect profile contract advances to v1.2 and separates `reviewContext`, `occupationSegment`, and `housingContext`.
- Home and buyer forms now send true review reasons through `review_context`.
- Healthcare, teacher, tech, and engineer forms send professional role through `occupation_segment` and a separate professional-review reason through `review_context`.
- Auto Bundle sends current housing through `housing_context` and `Home and auto together` as the actual review reason.
- The launcher sends `review_context`, `occupation_segment`, and `housing_context`; legacy `segment` remains receiver-compatible only.

## 408-FLOW-1.2 — Direct-Start Routing

- Public runtime advances to `408-BUY-1.4`.
- Explicit `Start My Coverage Review` actions on the 408FARMERS homepage and Home Protection Score now preserve the existing CoverageFit transition but continue directly to `/assessment/`, eliminating the redundant second Start click on CoverageFit Home.
- The shared launcher now honors declarative `data-cf-next` on ordinary CoverageFit launch elements, so future direct-start surfaces can use the same centralized routing contract rather than page-specific navigation.
- Softer/exploratory routes remain unchanged and may still land on CoverageFit Home. Existing form handoffs, buyer flows, attribution, zero-repeat behavior, and RC-SMS synchronization are preserved.

## 408-FLOW-1.1 — Auto Bundle → CoverageFit Continuation

- Public runtime advances to `408-BUY-1.3` because `/auto-bundle/` now continues into the existing CoverageFit Home assessment after lead submission.
- The existing lead form now uses the shared prospect-profile and CoverageFit handoff modules with `entry=auto_bundle_form`, `launch_surface=auto_bundle`, and `next=/assessment/`.
- Contact, property, housing context, campaign attribution, consent, and lead-capture status use the same zero-repeat browser handoff contract as the established Home and occupational forms.
- The prior thank-you page remains the safe fallback if the CoverageFit launcher is unavailable; no parallel bundle assessment or recommendation engine was introduced.
- Auto Bundle CTA language now describes a coverage review rather than promising a bundle price.

## 408-RC-SMS-1.9 — Operations Dashboard + Reliability Synchronization

- Public runtime remains `408-BUY-1.2`; RC-SMS-1.9 requires no new public acquisition fields or secrets.
- Synchronizes with CoverageFit v3.20.27 protected SMS operations dashboard, delivery retry queue, webhook health, stale detection, retention cleanup, redacted audit trail, and campaign reporting.
- Secure handoff URLs remain opaque; CoverageFit lifecycle tracking uses a separate server-backed opaque reference after handoff resolution.
- Existing buyer, homeowner, bundle, RUSH, realtor attribution, and manual-takeover contracts remain intact.

## 408-RC-SMS-1.8 — Homeowner, Bundle + Expanded RUSH Synchronization

- Public runtime remains `408-BUY-1.2`; no new public acquisition fields or secrets are required.
- Synchronizes with CoverageFit v3.20.26 deterministic current-home review and home+auto SMS paths.
- Servicing, landlord, business, life, and special requests route safely to Dylan.
- Existing buyer, partner attribution, opaque secure handoff, and manual takeover contracts remain intact.

## 408-RC-SMS-1.7 — Producer Handoff + Manual Takeover Synchronization

- Public buyer runtime remains `408-BUY-1.2`; RC-SMS-1.7 adds no new public acquisition fields or secrets.
- CoverageFit v3.20.25 now queues completed buyer SMS intake for Dylan with a concise producer summary.
- Manual outbound RingCentral replies are distinguished from automation echoes and move the conversation to `human_takeover`.
- Protected producer controls can pause/resume intake, resend the existing secure CoverageFit link, complete, or mark not proceeding.
- Existing realtor partner attribution and `/buyer/` text-first behavior remain unchanged.

## 408-RC-SMS-1.6 — Realtor Partner Attribution

- Public buyer runtime advances to `408-BUY-1.2` because partner text links can now carry a bounded `partner_code`.
- `/buyer/` accepts `partner_code`, `sms_code`, or `ref_code` and includes `Ref: CODE` in the existing buyer SMS prefill.
- Website-first `partner_id` / `partner_name` attribution remains intact.
- CoverageFit v3.20.24 resolves SMS codes server-side and carries the canonical partner identity through the opaque handoff.
- No RingCentral credentials or partner registry secrets are added to the static frontend.

## 408-RC-SMS-1.5 — Secure CoverageFit Continuation Synchronization

- Synchronized the public project contract with CoverageFit v3.20.23.
- Recorded the new opaque `/sms/continue/` zero-repeat handoff.
- Public runtime remains `408-BUY-1.1`; no carrier credentials or buyer PII were added.

## RC-SMS-1.4 — Complete Homebuyer SMS Intake Synchronization

- Keeps the public 408FARMERS runtime at `408-BUY-1.1` with no buyer-facing code change.
- Synchronizes the manifest with CoverageFit v3.20.22 and the live buyer address, closing-date, occupancy, auto-review, and RUSH sequence.
- Records that RUSH is operational priority only and that the secure CoverageFit continuation remains RC-SMS-1.5.
- Adds cross-project acceptance coverage without adding RingCentral credentials or SMS data to the public project.

## RC-SMS-1.3 — Intent Router and Messaging Controls Synchronization

- Keeps the existing production `/buyer/` text-first and website-first routes unchanged.
- Synchronizes the 408FARMERS manifest with CoverageFit v3.20.21 and the deterministic live intent router.
- Records Buyer, Home Review, Home and Auto, and Other classification plus STOP, START, RESTART, HELP, DYLAN, and AGENT controls.
- Records the one-retry invalid-response policy before the conversation is queued for Dylan.
- Confirms that carrier credentials, phone-number hashing, and conversation state remain outside the public 408FARMERS codebase.

## RC-SMS-1.2 — RingCentral Live Connection Synchronization

- Keeps the existing production `/buyer/` text-first and website-first routes unchanged.
- Synchronizes the 408FARMERS manifest with CoverageFit v3.20.20 and the server-side RingCentral live SMS connection.
- Records the protected webhook, temporary-sender configuration boundary, and one-welcome-message behavior.
- Confirms that RingCentral client secrets, JWT credentials, validation tokens, and live conversation data remain outside the public 408FARMERS codebase.

# Changelog

## RC-SMS-1.1 — CoverageFit Conversation Simulator Synchronization

- Keeps the existing production `/buyer/` text-first and website-first routes unchanged.
- Synchronizes the 408FARMERS handoff manifest with CoverageFit v3.20.19 and the protected RC-SMS-1.1 simulator.
- Confirms that no RingCentral credentials, webhook endpoints, or live-SMS behavior are added to the public 408FARMERS site in this sprint.

## 408-BUY-1.1 — Homebuyer Coverage Concierge

- Adds a production `/buyer/` route matching the 408FARMERS buyer partner card.
- Makes a prefilled text to Dylan the primary entry while offering a focused two-step online intake.
- Captures property address, estimated closing date, occupancy, contact details, consent, and privacy-safe realtor partner attribution.
- Continues the existing Formspree and CoverageFit zero-repeat handoff instead of creating a duplicate assessment.
- Adds a buyer-specific local fallback, responsive presentation, analytics hooks, route integration, and dedicated QA.

## 408-NP-1.5 — Any-ZIP Flyer Campaign Attribution

- Adds canonical A/B flyer identifiers for any five-digit ZIP: `home_flyer_<ZIP>_rate` and `home_flyer_<ZIP>_fit`.
- Normalizes readable `campaign_zip` and `campaign_variant` QR parameters before Formspree delivery and CoverageFit handoff.
- Preserves `campaign_id`, `campaign_variant`, and `campaign_zip` through the Home form, prospect profile, launcher, and branded referral bridge.
- Advances the referral bridge contract to CoverageFit 3.20.18 NP-1.5 without changing the existing intake or back-button behavior.
- Adds local and cross-repository acceptance tests plus reusable QR URL templates.

## 408-NP-1.4 — 408FARMERS Referral Bridge

- Adds clean `408farmers.com/neighbor/r/[anonymous-token]` referral routes and a generic `/neighbor/` fallback.
- Adds a full-screen 408FARMERS → CoverageFit progress handoff without duplicating the CoverageFit intake.
- Preserves the anonymous referral token, approved share channel, and bounded campaign attribution into CoverageFit Home referral mode.
- Uses `location.replace` for stable back-button behavior and routes malformed tokens to the generic neighbor welcome.
- Packages dedicated local and cross-repository NP-1.4 acceptance tests.

## 408-CONV-1.1 — CONV-1.1 Zero-Repeat Handoff Sender

- Sends validated 408FARMERS lead forms through the animated CoverageFit transition directly to `/assessment/`.
- Adds explicit contact-consent provenance, submission time, consent version, sender build, handoff version, and lead-delivery status to the allowlisted handoff.
- Preserves Formspree keepalive delivery, structured property data, UTM attribution, address autocomplete, and local fallback behavior.
- Aligns the production manifest with CoverageFit v3.20.13 and its zero-repeat contract.
- Updates the Home CTA to `Start My 5-Minute Coverage Review`.

## 408-BRAND-1A — 408FARMERS Logo Integration

- Replaced the previous logo with the supplied 408FARMERS Insurance Text Line identity.
- Converted the white-matte source into a tightly cropped transparent two-color production asset.
- Added a white footer lockup, shield-only icon, favicon, and Apple touch icon.
- Updated responsive header sizing and standardized logo alternative text across the site.
- Removed the duplicate 408FARMERS wordmark from the Home hero image.
- Standardized all personalized landing-page sender fingerprints on the current 408-HO-1G contract.

## 408-HO-1F — Non-Blocking CoverageFit Transition

- Restored reliable 408FARMERS → CoverageFit continuation when Formspree is slow, unavailable, or returns an error.
- Added keepalive lead delivery and a bounded submission grace period.
- Preserved the prospect profile, address data, campaign attribution, consent, and CoverageFit transition experience.
- Added explicit confirmed, pending, and unconfirmed lead-capture metadata without exposing personal information.
- Updated the sender fingerprint and receiver manifest for CoverageFit v3.20.7.

## 408-ADDR-1G — Places API (New) Input Stability

- Fixed the Property Address field stopping or erroring after two characters.
- Migrated from the legacy Google Places Autocomplete widget to the current Autocomplete Data API.
- Preserved unrestricted manual typing, structured address capture, Google attribution, keyboard navigation, and CoverageFit handoff.
- Added explicit two-character non-blocking and three-character request-threshold regression tests.

## 408-ADDR-1F — Google Places Activation

- Installed the configured Google Maps Platform browser key for the Home address field.
- Added explicit Google callback initialization and authentication-failure handling.
- Preserved manual address entry whenever Google is unavailable or rejects the key.
- Expanded runtime and static certification for live-loader readiness.

## 408-HO-1E — CoverageFit Handoff Contract Alignment

- Mapped legacy `referral` attribution into CoverageFit's canonical `ref` parameter without emitting duplicate referral keys.
- Added Non-renewal or cancellation and Premium increased to the Home review-reason choices.
- Replaced the TX-1.1-specific diagnostic label with the stable `coveragefit-handoff-v1` schema contract.
- Updated sender fingerprints to 408-HO-1E and cross-repository smoke verification to use exact CoverageFit TX-1.9 receiver assets.
- Preserved all five personalized routes, Formspree-first submission, shared session handling, and local fallback behavior.

## 408-HO-1C — Production-Domain Handoff Smoke Certification

- Added a public handoff deployment manifest and per-form build/contract fingerprints.
- Added non-personal sender-build and handoff-contract metadata to CoverageFit launches.
- Added a dependency-free production smoke runner for Home, Tech, Engineers, Healthcare, Teachers, Formspree, and CoverageFit TX-1.1.
- Added a full local production simulation with five accepted Formspree submissions and verified CoverageFit URL cleanup/transition routing.
- Recorded a production NO-GO because the currently deployed Teachers route remains blank and the corrected sender/receiver builds are not yet confirmed live.

## 408-HO-1B — Teachers Campaign Landing-Page Restoration

- Replaced the blank `/teachers/` route with a complete educator campaign landing page.
- Added a working educator eligibility form using the existing Formspree, prospect-profile, and CoverageFit handoff pipeline.
- Added a complete local thank-you fallback with direct call and text actions.
- Added production-page, static, and cross-page regression coverage for the Teachers handoff.

## 408-HO-1A — Personalized Handoff Coverage Alignment

- Connected the Tech, Engineers, and Healthcare forms to the existing prospect-profile pipeline.
- Preserved each form's contact, property, campaign, entry-point, launch-surface, and session context during CoverageFit handoff.
- Added production-page handoff QA and strengthened static checks so future forms cannot opt into CoverageFit without loading the profile builder.
- Kept Auto Bundle intentionally local until a CoverageFit Auto destination exists.

## 408-ADDR-1E — Validation and Deployment Readiness

- Added address-autocomplete runtime regression tests.
- Added live deployment and Google API restriction checklist.
- Certified manual, autocomplete, timeout, structured capture, and stale-data clearing paths.


## 408-ADDR-1D — Manual Address Fallback

- Added submit-time canonicalization for manually typed addresses.
- Added paste handling, stale-component clearing, and Google loader timeout fallback.
- Added an `address:ready` integration event without changing the current form pipeline.

## 408-ADDR-1C — Structured Address Capture

- Added structured Google Places address component capture.
- Added hidden street, city, county, state, ZIP, country and place ID fields.
- Added explicit autocomplete/manual selection tracking.
- Clears stale structured values when a selected address is edited.

# Changelog

## 408-ADDR-1B — Smart Suggestion Interface

- Added a styled, touch-friendly Google Places suggestion dropdown.
- Added a three-character suggestion threshold and live address guidance.
- Added selected/loading/manual/unavailable UI states while preserving manual entry.
- Added keyboard and click-away dismissal support.

## Sprint 1.4C
- Production optimization and accessibility pass for the homepage.
- Added vendor-neutral analytics event hooks.
- Improved metadata, image loading, mobile behavior and navigation.

## Sprint 1.4B
- Added homepage storytelling, CoverageFit explanation, trust content and professional pathways.

## Sprint 1.4A
- Rebuilt the homepage as an intent-based routing hub.

- Sprint 1.5: Added campaign routing architecture documentation.

## B.1.2A — Shared CoverageFit Launcher
- Added the reusable sending-side CoverageFit launcher.
- Added attribution and UTM pass-through URL construction.
- Added shared integration session IDs.
- Added launch/fallback analytics events.
- Added configurable production and fallback destinations.
- No live CTA behavior changed in this sprint.

## B.1.2B — `/score` CoverageFit Handoff

- Connected all `/score` review CTAs to the shared CoverageFit launcher.
- Preserved campaign, UTM, referral, creative, and session attribution.
- Preserved the existing transition and mobile sticky CTA.
- Retained `/home#form` as the local fallback.

## B.1.2C — Additional Home Entry Points
- Connected the homepage primary Home review CTA and featured Home intent card to CoverageFit.
- Preserved Formspree lead capture on Home, Tech, Engineer, and Healthcare landers, then continued successful submissions into CoverageFit.
- Added distinct entry and launch-surface attribution for every connected path.
- Left Auto Bundle, Business, Landlord, Life, and non-Home routes unchanged.


## B.1.2D — End-to-End Integration QA

- Added repeatable launcher, static integration, route, and local-link QA tests.
- Verified all 408-FARMERS Home entry points preserve their intended funnel behavior.
- Confirmed campaign, UTM, session, entry, assessment, and launch-surface attribution.
- Confirmed safe local fallback behavior.
- Added `B1_2D_QA.json` and `SPRINT-B.1.2D.md`.

## B1.2F — Home Flyer-to-Web Journey Alignment
- Rebuilt `/home` hero to visually continue the printed 408FARMERS homeowner flyer.
- Added a full-width California home image, flyer-scale headline, increased whitespace, and one dominant above-the-fold CTA.
- Moved the full Coverage Review form below the hero to reduce first-screen friction.
- Added a concise review-benefits section and streamlined the Meet Dylan presentation.
- Updated campaign attribution copy to match the homeowner campaign message.
- Preserved CoverageFit launch, Formspree submission, UTM attribution, consent, and thank-you behavior.

## 408-ADDR-1A — Address Autocomplete Foundation

- Added optional Google Places loading for the `/home` property-address field.
- Restricted provider suggestions to US addresses and biased results toward California.
- Added resilient manual-entry fallback and duplicate-loader protection.
- Added `googlePlacesApiKey` configuration placeholder and sprint documentation.

## CF-INT-1A — Prospect Profile Builder
- Added `shared/prospect-profile.js` with canonical profile construction, normalization, storage, and retrieval.
- Home form now builds and stores the prospect profile after validation.
- CoverageFit launcher now accepts a profile object without serializing or transferring personal data.
- Added `coveragefit:profile-ready` integration event for future handoff sprints.


## CF-INT-1B — Intelligent Profile Handoff
- Added allowlisted prospect profile serialization to the CoverageFit launch URL.
- Transfers contact, review-context, and structured property-address data after successful lead capture.
- Added prefill and handoff-version markers while preserving existing attribution and fallback behavior.
## 408-CRO-1.5 — Accessibility and Responsive Polish

- Added a first-tab skip link and focusable main landmark to all 20 public pages.
- Added consistent dual-contrast keyboard focus, corrected audited color contrast, 320px reflow, 16px mobile controls, and 44px primary targets.
- Added site-wide reduced-motion and forced-color handling.
- Added polite step announcements and programmatic validation state to both established progressive intake engines.
- Prevented the hidden Score mobile CTA from remaining keyboard-focusable.
- Preserved CRO-1.4, Buyer architecture, CoverageFit v3.20.51, zero-repeat handoff, attribution, consent, and fail-open delivery.
## 408-CRO-1.6 — Promise and Journey Consistency

- Standardized every acquisition route on one Coverage Review → intake → educational Protection Snapshot → producer conversation sequence.
- Replaced professional “Check My Eligibility” actions with Coverage Review actions and explicit quote/underwriting verification language.
- Removed unbounded “fast” and “shortly” response claims and automatic option-preparation promises from local fallback pages.
- Aligned Home, Auto Bundle, Buyer, Score, Neighbor, and professional copy with CoverageFit v3.20.51.
- Added a machine-readable promise contract and route-level source and rendered QA.
- Preserved CRO-1.4, CRO-1.5, Buyer, consent, attribution, fail-open delivery, and zero-repeat handoff behavior.

## 408-CRO-1.5 — Accessibility and Responsive Polish

- Added keyboard skip links, consistent visible focus, 320px reflow, reduced-motion support, and accessible intake validation across all public routes.
- Preserved CRO-1.4 intake, Buyer architecture, CoverageFit v3.20.51, and zero-repeat handoff behavior.
## 408-FLOW-2.3 — Post-Lead Engagement & Payoff

- Kept Home, Buyer, Auto Bundle, and occupational acquisition routes form-first.
- Moved the three bounded intent questions to a universal post-lead stage after the existing Formspree attempt.
- Added a truthful lead receipt, one-question-per-screen engagement, and personalized payoff.
- Replaced automatic CoverageFit launch with explicit Protection Score continuation or a no-pressure follow-up choice.
- Preserved renter branching, exactly one pre-assessment lead submission, CoverageFit v3.20.61, Protection Score behavior, and the Life application.
## 408-FLOW-2.4 — Optional CoverageFit Invitation

- Added a dedicated, accessible two-outcome invitation after the FLOW-2.3 personalized payoff.
- Positioned CoverageFit as an optional five-minute Protection Score and downloadable Snapshot experience.
- Added an equally clear Finish for Now path that preserves the submitted lead for Dylan’s follow-up.
- Removed the timed Home-confirmation and immediate-handoff fallback from every invitation-enabled property funnel.
- Added safe degraded behavior that still requires an explicit click before CoverageFit can open.
- Preserved renter routing, the two lead-intake points, CoverageFit v3.20.61, Protection Score calculations, and the Life application.
