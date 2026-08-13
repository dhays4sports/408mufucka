# CF-INT-1A — Prospect Profile Builder

## Status
Complete and deployable.

## Scope
Creates a canonical, normalized prospect profile after the `/home` form validates, stores it in session storage, and passes it into the CoverageFit launcher interface without transferring personal data cross-domain yet.

## Profile contract
- firstName / lastName / fullName
- normalized 10-digit phone
- lowercase email
- canonical property address plus structured components
- reviewContext
- source and campaign
- UTM attribution
- integration sessionId
- createdAt and version

## Storage
`coveragefit_prospect_profile_v1` in sessionStorage.

## Backward compatibility
Formspree submission, campaign attribution, address autocomplete/manual fallback, success fallback, and existing CoverageFit destination URL remain unchanged.
