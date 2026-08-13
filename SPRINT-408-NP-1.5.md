# Sprint 408-NP-1.5 — Any-ZIP Flyer Campaign Attribution

## Status

Implemented, verified, and paired with CoverageFit **3.20.18 NP-1.5**.

## Feature

408FARMERS now creates the same canonical A/B flyer campaign identifiers for any five-digit ZIP:

- Version A: `home_flyer_<ZIP>_rate`
- Version B: `home_flyer_<ZIP>_fit`

A flyer QR may use the readable input pair:

```text
campaign_zip=95118&campaign_variant=rate
```

or:

```text
campaign_zip=95118&campaign_variant=fit
```

The browser normalizes those values into the canonical campaign ID before the existing Formspree and CoverageFit handoff.

## Generic templates

Version A:

```text
https://408farmers.com/home/?campaign_zip=<ZIP>&campaign_variant=rate&utm_source=flyer&utm_medium=qr&utm_campaign=home_flyer
```

Version B:

```text
https://408farmers.com/home/?campaign_zip=<ZIP>&campaign_variant=fit&utm_source=flyer&utm_medium=qr&utm_campaign=home_flyer
```

Replace `<ZIP>` with any five-digit ZIP. The QR destination, form payload, prospect profile, CoverageFit transition, private report, referral origin, and referral event records retain the same campaign identifier.

## Referral bridge

The branded `/neighbor/r/[anonymous-token]` bridge forwards `campaign_id`, `campaign_variant`, and `campaign_zip` when present while preserving the NP-1.4 generic fallback and stable `location.replace` navigation.

## Privacy

No homeowner identity or contact information is added to campaign identifiers or referral URLs. Campaign values contain only the fixed family, a five-digit ZIP, and the bounded `rate` or `fit` variant.

## Acceptance result

- No ZIP is hard-coded into the campaign engine.
- `A` and `rate` normalize to `rate`.
- `B` and `fit` normalize to `fit`.
- Invalid ZIP or variant input does not produce a canonical flyer campaign.
- Formspree delivery and the existing CoverageFit zero-repeat handoff remain unchanged.
- Cross-repository tests confirm the same identifier contract in 408FARMERS and CoverageFit.
