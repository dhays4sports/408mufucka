# 408-FLOW-2.4 — Optional CoverageFit Invitation

## Outcome

CoverageFit is now presented as an explicit optional value exchange after the post-lead questions and personalized payoff. Completing the lead form or the third engagement question never launches CoverageFit.

The invitation asks: **“Would you like to get a head start on Dylan’s review?”** It presents two clear outcomes:

- **Continue to CoverageFit** — complete the existing educational assessment to receive a Protection Score and free downloadable Home Protection Snapshot that Dylan can review.
- **Finish for Now** — stop without additional questions. The already-submitted 408FARMERS lead remains available for Dylan’s follow-up.

## Journey

`Lead form → lead receipt → three questions → personalized payoff → optional invitation → prospect-selected outcome`

CoverageFit opens only from the invitation’s accept button. Viewing the payoff, completing the questions, waiting, returning from browser history, or selecting Finish for Now cannot call the launcher.

Renters see the same voluntary choice structure, but the accept path opens renter-specific contact options instead of the homeowner assessment.

## Failure behavior

Invitation-enabled routes no longer fall back to the older timed Home confirmation or immediate handoff. If the post-lead controller is unavailable, the invitation controller is offered directly. If both optional controllers are unavailable, the completed lead remains in place and the original button becomes a non-submitting, explicitly labeled optional-continuation button. There is no automatic CoverageFit fallback.

## Preserved boundaries

- The seven property funnels remain form-first.
- The three FLOW-2.3 questions and bounded semantic fields are unchanged.
- The invitation does not submit a lead or modify Formspree.
- CoverageFit completion remains the second intake point.
- CoverageFit v3.20.61, Question-Two stabilization, assessment questions, reports, and Protection Score calculations are unchanged.
- The Life application is excluded.

## Deployment note

These archives are deployment sources. Production verification still requires publishing the correct repository pair, submitting a controlled lead, waiting on the invitation without clicking to prove no redirect occurs, then testing both Continue and Finish for Now on the deployed domains.
