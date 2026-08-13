# 408-LIFE-1.1 — Life Campaign Foundation

Status: complete.

## Goal

Add a dedicated 408FARMERS life-insurance campaign destination that carries the new **Before Anything Changes** positioning without forcing life traffic through the generic contact chooser or the homeowner CoverageFit journey.

This sprint is intentionally a **foundation release**. It creates the route, visual system, campaign promise, safe fallback, and future intake shell. It does **not** collect application details, Social Security information, health data, or any other sensitive applicant data.

## Public route

- Canonical path: `https://408farmers.com/life/`
- Exact Cloudflare Pages `_redirects` rules: `/life` and `/life/` → `/life/index.html`
- Homepage Life Insurance card now routes to `/life/`.
- The established direct-contact fallback remains `https://408farmers.com/contact/?intent=life`.

## Campaign positioning

Primary headline:

> BEFORE ANYTHING CHANGES.

Supporting promise:

- Age and health can affect life-insurance eligibility and cost.
- The application may take about 20 minutes.
- Eligible applicants may receive a potential same-day underwriting decision.
- Application timing and underwriting outcomes vary; coverage remains subject to underwriting, policy terms, and availability.

The page avoids guaranteed approval, guaranteed same-day decisions, instant coverage, or a claim that coverage is effective in 20 minutes.

## Foundation experience

`/life/` now contains:

1. Dark campaign-specific hero aligned to the approved ad creative direction.
2. Two bounded speed/effort proof points.
3. A financial-protection visual that frames income, mortgage/debt, loved ones, and business continuity.
4. A visible three-question journey preview:
   - What would you most want life insurance to protect?
   - How long could your household comfortably continue without your income?
   - What life insurance do you already have today?
5. A clear transition explaining that application details come after those quick questions.
6. Dylan / Virginia Tam Insurance Agency trust section.
7. Production-safe text, call, and email fallback through the established `/contact/?intent=life` experience.

## New files

- `life/index.html`
- `life/thank-you.html`
- `shared/life.css`
- `shared/life-intake.js`
- `SPRINT-408-LIFE-1.1.md`
- `qa/test-408-life-1.1.js`

## Modified files

- `index.html`
- `_redirects`
- `VERSION`
- `CHANGELOG.md`
- `handoff-manifest.json`
- bounded regression allowlists / static assertions required to recognize `408-LIFE-1.1` as a later public runtime.

## Sensitive-data boundary

408-LIFE-1.1 intentionally contains **no applicant form** and **no sensitive fields**.

The new `shared/life-intake.js`:

- performs only safe same-page navigation;
- does not call `fetch`;
- does not call Formspree;
- does not use `localStorage` or `sessionStorage`;
- does not place user data in URLs;
- does not invoke CoverageFit;
- does not create a prospect profile.

This preserves the architectural rule that the future application-initiation path will be a separate trust boundary from ordinary 408FARMERS acquisition data.

## Paid-traffic gate

**Do not point paid Meta/Instagram life campaign traffic to `/life/` yet.**

The page is production-safe as a marketing/fallback route, but the intended ad conversion path is not complete until the secure application-initiation submission boundary is implemented and certified in `408-LIFE-1.4`.

Until then, the primary actionable fallback is direct contact with Dylan.

## Preserved contracts

Unchanged:

- CoverageFit sender/receiver contract and all seven existing personalized CoverageFit routes.
- Home, Buyer, Auto Bundle, Healthcare, Teachers, Tech, and Engineers form behavior.
- Formspree lead delivery for existing forms.
- Prospect-profile and zero-repeat CoverageFit handoff.
- Buyer/referral attribution.
- RC-SMS through 1.9.1 and the unported-number boundary.
- Existing `contact/?intent=life` SMS/tel/email fallback.

## Next sprint

`408-LIFE-1.2 — Engagement Intake`

Implement the three-question progressive intake as real, accessible, stateful non-sensitive interaction while still stopping before application identity and sensitive fields.
## QA certification

- Dedicated LIFE-1.1 contract: 25/25 pass.
- Static repository certification: 265/265 pass.
- Local link verification: 272 checked / 0 broken.
- Logo integration: 14/14 pass.
- Local historical Node regression: 31 pass / 0 unexpected failures.
- Seven historical cross-project assertions are blocked in this isolated package because the paired CoverageFit source tree is not mounted; each stops only on the missing paired receiver prerequisite.
- `shared/life.css` parses with 0 stylesheet syntax errors.

See `LIFE1_1_QA.json` for the packaged summary.

