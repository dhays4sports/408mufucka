# 408-LIFE-1.2 — Engagement Intake

Status: complete.

## Goal

Turn the LIFE-1.1 three-question preview into a real, accessible, progressive **non-sensitive** interaction that gives the visitor a useful first step without forcing a needs-analysis questionnaire before the Farmers application.

This sprint intentionally stops before identity/application details. It does not collect or transmit applicant identity, health, DOB, Social Security, address, email, phone, or other application data.

## Public experience

Canonical route remains:

- `https://408farmers.com/life/`

The hero CTA now enters the interactive quick start directly.

### Question 1 — Protection priority

> What would you most want life insurance to protect?

Multi-select options:

- My family's income
- Our home / mortgage
- My children
- Debt & final expenses
- My business
- I just want coverage in place
- I'm not sure yet

`I'm not sure yet` behaves as an exclusive option so it cannot be selected alongside a more specific priority.

### Question 2 — Financial resilience

> If something happened to you, how long could your household comfortably continue without your income?

Single-select options:

- Less than 3 months
- 3–6 months
- 6–12 months
- More than a year
- My income isn't the primary concern

### Question 3 — Current protection

> What life insurance do you already have today?

Single-select options:

- None
- Coverage through work
- A personal policy
- Both work + personal coverage
- Not sure

## Completion behavior

After question 3, the intake shows a bounded completion state:

- confirms that the quick questions are complete;
- explains that application details are the next phase;
- does not imply that an application has been submitted;
- provides **Review answers** without losing in-memory selections;
- preserves **Continue with Dylan now** as the safe production fallback.

## State model

The three answers are held only by the browser controls/in-memory page state while the current page is open.

LIFE-1.2 does **not** use:

- `localStorage`
- `sessionStorage`
- IndexedDB
- cookies for answer storage
- URL/query/hash answer encoding
- Formspree
- `fetch` / XHR / `sendBeacon`
- CoverageFit prospect profiles or handoff
- network analytics carrying answer values

A refresh intentionally resets the quick-start answers.

The script emits only a local `life:intake-progress` CustomEvent containing step number, completion boolean, and build identifier. It never includes the selected answer values.

## Accessibility and interaction

- Native checkboxes and radios preserve keyboard and assistive-technology behavior.
- Continue remains disabled until the current question has a valid selection.
- Back navigation preserves prior selections.
- A polite live region announces question changes and completion.
- Visible progress provides both question count and progress bar.
- Focus moves to the newly active question/completion surface.
- Reduced-motion and forced-colors modes are explicitly supported.
- Without JavaScript, all questions remain readable and a direct-contact fallback is shown; no submission is attempted.

## Sensitive-data boundary

Still absent from `/life/`:

- legal name
- gender
- DOB
- residential address
- email
- mobile number
- SSN / last four
- medical or health questions
- applicant submission
- producer application-initiation notification

The existing trust-zone rule remains: future application-initiation data must not enter ordinary 408FARMERS prospect-profile, URL, analytics, or Formspree pathways.

## Preserved contracts

Unchanged:

- Home, Buyer, Auto Bundle, Healthcare, Teachers, Tech, and Engineers flows.
- Existing Formspree delivery for non-life forms.
- CoverageFit zero-repeat handoff and seven existing routes.
- Buyer/referral attribution.
- RC-SMS through 1.9.1.
- `/contact/?intent=life` direct text/call/email fallback.
- LIFE paid-traffic gate.

## Paid-traffic gate

`paidTrafficReady` remains `false`.

Do not point paid campaign traffic at the life conversion funnel until `408-LIFE-1.4` has implemented and certified the secure application-initiation submission boundary.

## Next sprint

`408-LIFE-1.3 — Application Initialization Intake`

Add the identity/contact/application-detail user interface while keeping real sensitive submission disabled until LIFE-1.4.
