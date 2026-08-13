# Sprint 408-BUY-1.1 — Homebuyer Coverage Concierge

## Status

Implemented and verified.

## Objective

Create the production `408farmers.com/buyer/` flow referenced by the buyer partner card without duplicating the CoverageFit assessment.

## User-visible behavior

- The page opens with one primary action: **Text Dylan at 408-FARMERS**.
- The SMS body is prefilled and can acknowledge a realtor when a safe `partner_name` is supplied.
- Homebuyers who prefer online can complete a focused two-step intake.
- The intake captures the property address, estimated closing date, occupancy, name, phone, email, and required contact consent.
- The existing Formspree request is preserved, followed by the existing CoverageFit transition and `/assessment/` continuation.
- A buyer-specific thank-you page remains available as the local fallback.

## Partner URL contract

Generic:

```text
https://408farmers.com/buyer/
```

Partner attributed:

```text
https://408farmers.com/buyer/?partner_id=<partner-slug>&partner_name=<encoded-name>&utm_source=realtor_partner&utm_medium=partner_card&utm_campaign=buyer_referral
```

The partner ID is normalized to a bounded lowercase slug. The partner name is rendered only through `textContent` and is submitted to the agency lead record, but it is not added to the CoverageFit handoff URL.

## Handoff context

The buyer form carries these additional fields into the existing prospect profile and CoverageFit transition:

- `closing_date`
- `occupancy`
- `closing_urgency`
- `partner_id`
- `referral_source`

## Acceptance criteria

- `/buyer/` and `/buyer` resolve to the same production route.
- Text-first and online entry paths both function.
- No RUSH automation is claimed before the SMS system exists.
- The online form is optional, validated, and uses the existing submission controller.
- The homeowner does not re-enter name, contact, address, or review reason in the 408FARMERS-to-CoverageFit handoff.
- Direct and realtor-attributed traffic receive stable campaign IDs.
- Existing Home, professional, flyer, and referral routes remain intact.

## Verification

```text
node qa/test-buyer-flow.js
python qa/test-static.py
python qa/check-links.py
```
