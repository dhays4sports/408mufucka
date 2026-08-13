# 408-FLOW-1.5 — Universal Confirmed Assessment Handoff

## Outcome

The Home, Buyer, homeowners Auto Bundle, Healthcare, Teachers, Tech, and Engineers lead forms now share the same successful-submission path: preserve the lead handoff, carry a structured property address, show the one-click CoverageFit property confirmation, and continue into the existing Home assessment.

## Changes

- Extended the established address-autocomplete controller to the five property-owning funnels that previously sent only a free-form address.
- Made the controller create missing structured-address hidden fields at runtime, keeping page markup and the shared profile contract aligned.
- Kept the established `/transition/?next=/assessment/` handoff, Formspree grace behavior, contact consent, campaign/occupation context, and second CoverageFit completion lead point.
- Preserved the 408-CRO-1.6.2.2 hero and progressive-intake rendering correction in the LIFE-1.7 branch used for this release.
- Left renters on the direct Dylan path and left LIFE, contact-only, business, and exploratory no-address paths outside the Home assessment confirmation contract.

## Acceptance

- All seven property-owning intake routes expose structured address capture and the existing assessment continuation contract.
- CoverageFit receives street, city, state, and postal code when an address suggestion is selected and therefore presents the same one-click confirmation used by Buyer.
- Manual address entry remains valid; if it is not structurally complete, CoverageFit shows its editable property confirmation form rather than fabricating address components.
