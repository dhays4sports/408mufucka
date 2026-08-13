# 408-FLOW-2.3 — Post-Lead Engagement & Payoff

## Outcome

The seven property-acquisition funnels remain form-first. Once the existing lead submission reaches a confirmed or safe continuation state, the submitted form is replaced by three light questions and a personalized payoff. CoverageFit no longer opens automatically from these routes.

## Journey

1. The prospect completes the existing contact, property, and required-consent form.
2. The existing Formspree request is attempted once.
3. A truthful receipt reflects `confirmed`, `pending`, `unconfirmed`, or local-fallback status.
4. The prospect answers `home_review_goal`, `housing_context`, and `review_timing`, one question per screen.
5. A bounded payoff explains how the next step matches the prospect’s goal, property context, and timing.
6. The prospect can choose CoverageFit for an educational Protection Score and downloadable Home Protection Snapshot, choose renter-specific options, or stop and let Dylan follow up.

The engagement sequence does not create another Formspree submission. Abandoning or deferring after the first form does not erase that lead.

## Handoff

Answers are copied into the existing semantic handoff fields after lead capture. Immediately before an opted-in continuation, the prospect profile is rebuilt and stored so CoverageFit receives the new context without re-asking for contact or property details. The receiver already stores these fields in the completed consultation record and excludes them from Protection Score calculations.

The renter answer resolves to the existing 408FARMERS renter contact route. All other bounded housing contexts retain the CoverageFit Home assessment path.

## Accessibility and privacy

The controller provides semantic fieldsets, native radio controls, Back and Continue actions, an announced three-step progressbar, inline validation, programmatic focus, reduced-motion behavior, forced-colors support, and single-column mobile reflow.

Engagement telemetry is limited to bounded answer values, route entry, lead status, question number, and destination type. It excludes identity, contact information, property address, consent content, and free-form data.

## Preserved boundaries

- Existing lead forms, required consent, Formspree endpoint, campaign attribution, property autocomplete, and direct contact choices.
- Exactly one 408FARMERS lead submission before the optional assessment and the existing CoverageFit completion intake afterward.
- CoverageFit v3.20.61, including Question-Two stabilization, assessment content, recommendation behavior, reports, and Protection Score.
- The Life application and its secure submission pipeline.

## Deployment note

The ZIPs are deployment sources. Production still requires publishing each archive’s contents to the correct Cloudflare-connected repository and verifying one real Formspree receipt plus the opted-in CoverageFit handoff on the deployed domains.
