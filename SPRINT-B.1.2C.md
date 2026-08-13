# Sprint B.1.2C — Additional Home Entry Points

## Objective
Connect the remaining appropriate Home-focused 408-FARMERS entry points to the tested CoverageFit launcher without losing existing lead capture.

## Connected paths
- Homepage primary CTA → `entry=homepage_hero`
- Homepage Home intent card → `entry=homepage_home_intent`
- Home landing form after successful submission → `entry=home_lander_form`
- Tech eligibility form after successful submission → `entry=tech_eligibility_form`
- Engineer eligibility form after successful submission → `entry=engineers_eligibility_form`
- Healthcare eligibility form after successful submission → `entry=healthcare_eligibility_form`

## Deliberately unchanged
- Auto Bundle funnel
- Business, Landlord, and Life SMS routes
- Home Protection Score `/score` integration from B.1.2B
- Teachers page, which is currently an empty placeholder in this repository

## Behavior
Homepage launch elements go directly into CoverageFit. Forms first submit to Formspree; only a successful lead capture continues into CoverageFit. If the launcher is unavailable, form flows retain their existing thank-you destination.
