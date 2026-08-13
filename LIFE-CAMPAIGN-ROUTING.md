# 408-LIFE-1.7 — Campaign Routing, Message Matching & First-Party Conversion

Status: complete.

All paid-social creatives use one canonical destination: `https://408farmers.com/life/`. The page reads only an allowlisted set of non-sensitive campaign parameters from the current URL, matches the opening hero to the creative, and carries the normalized attribution in memory into the encrypted LIFE producer queue. No campaign parameter is written to localStorage, sessionStorage, IndexedDB, cookies, dataLayer, or any applicant profile.

## Canonical Meta links

### Creative A — Before Anything Changes
`https://408farmers.com/life/?utm_source=meta&utm_medium=paid_social&utm_campaign=life_insurability&utm_content=before_anything_changes&campaign_id=life-2026-01&campaign_variant=A`

### Creative B — 20 Minutes
`https://408farmers.com/life/?utm_source=meta&utm_medium=paid_social&utm_campaign=life_insurability&utm_content=20_minutes&campaign_id=life-2026-01&campaign_variant=B`

### Creative C — This Is The Time
`https://408farmers.com/life/?utm_source=meta&utm_medium=paid_social&utm_campaign=life_insurability&utm_content=this_is_the_time&campaign_id=life-2026-01&campaign_variant=C`

### Creative D — Financial Picture
`https://408farmers.com/life/?utm_source=meta&utm_medium=paid_social&utm_campaign=life_insurability&utm_content=financial_picture&campaign_id=life-2026-01&campaign_variant=D`

## Message-matching contract

- A → `Before Anything Changes.`
- B → `20 Minutes.`
- C → `This Is The Time.`
- D → `Your Health Is Part of Your Financial Picture.`
- Unknown or malformed variants fail safely to Creative A.
- Resolution precedence: `campaign_variant` → `utm_content` → `creative`.
- Recognized aliases are normalized to one of four canonical `landing_variant` values.

## Attribution contract

The secure LIFE submission may contain only this campaign group:

- `channel` = `life_campaign`
- `landing_variant`
- `creative_code`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `campaign_id`
- `campaign_variant`

The Cloudflare Worker independently allowlists and normalizes the group. Attribution is encrypted with the applicant payload before D1 persistence and is visible to authorized staff in `/life-ops/`. It does not weaken the existing SSN/DOB/application-data trust boundary.

## Direct-contact fallback

If a visitor chooses the same-origin `/contact/?intent=life` fallback before submitting the LIFE intake, the module appends only normalized non-sensitive campaign parameters to that link. No applicant answer or identity field is placed in a URL.

## Conversion measurement

LIFE-1.7 adds a same-origin, first-party conversion stream to `/api/life/conversion`. It records only the event name, random memory-only journey/event UUIDs, and normalized campaign attribution. It does **not** record applicant answers, name, DOB, address, email, phone, SSN, health information, browser storage identifiers, Meta Pixel/CAPI identifiers, GA identifiers, or `dataLayer` payloads.

Measured events: `landing_view`, `start_clicked`, `quick_questions_complete`, `application_details_started`, and `application_start_submitted`. The protected producer workspace displays aggregate counts and rates by creative. Measurement is fail-open and never blocks application submission.
