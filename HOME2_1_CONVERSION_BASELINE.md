# 408-HOME-2.1 Conversion Baseline

## Baseline experience

The pre-redesign `/home/` journey remains visually and behaviorally unchanged in this release:

1. The homeowner opens the general Home Coverage Review landing page.
2. The primary CTA scrolls to the existing lead form.
3. The form requests name, mobile, email, property address, review context, and consent.
4. A valid submission uses the existing Formspree grace behavior and canonical prospect profile.
5. The browser opens the existing CoverageFit transition route.
6. CoverageFit confirms the transferred structured address and starts the existing Home assessment.
7. Assessment completion creates the second lead/consultation point and opens the Protection Snapshot.

The three engagement questions, personalized payoff, and revised lead-form presentation are intentionally deferred to 408-HOME-2.2 through 408-HOME-2.4.

## Forward measurement baseline

No historical conversion rates are fabricated by this sprint. The following event sequence establishes a consistent forward baseline:

| Event | Meaning |
| --- | --- |
| `home_journey_viewed` | General `/home/` journey initialized |
| `home_primary_cta_selected` | Primary Home CTA selected |
| `home_lead_form_started` | First interaction with a non-hidden form control |
| `home_lead_submission_attempted` | Valid lead submission entered the delivery path |
| `home_lead_submission_confirmed` | Lead provider confirmed the initial lead |
| `home_lead_submission_pending` | CoverageFit opened during the bounded provider grace period |
| `home_lead_submission_unconfirmed` | CoverageFit continued without provider confirmation |
| `home_coveragefit_launched` | Canonical CoverageFit handoff was initiated |
| `home_assessment_started` | Recognized Home assessment began in CoverageFit |
| `home_assessment_completed` | Recognized Home assessment reached completion |

## Funnel calculations

- CTA engagement = `home_primary_cta_selected / home_journey_viewed`
- Form start = `home_lead_form_started / home_journey_viewed`
- Initial lead attempt = `home_lead_submission_attempted / home_lead_form_started`
- Confirmed initial lead = `home_lead_submission_confirmed / home_lead_submission_attempted`
- CoverageFit start = `home_assessment_started / home_coveragefit_launched`
- Full completion = `home_assessment_completed / home_journey_viewed`
- Assessment completion = `home_assessment_completed / home_assessment_started`

Events are joined by the existing non-personal CoverageFit integration session identifier. Analytics must not contain contact information, property addresses, or free-form homeowner answers.

## Protected controls

- Existing Home page copy and layout
- FLOW-1.5 structured-address confirmation
- Formspree grace and non-blocking continuation
- Required contact consent
- Zero-repeat CoverageFit completion
- Campaign, ZIP, variant, referral, and UTM attribution
- CoverageFit assessment questions and Protection Score methodology
