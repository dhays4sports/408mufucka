# Sprint 1.4C — Homepage Optimization

## Objective
Harden the repositioned homepage for production use without changing its conversion architecture.

## Completed
- Added canonical, robots, Open Graph URL, Twitter card and theme-color metadata.
- Preloaded the homepage hero image and assigned explicit image dimensions to reduce layout shift.
- Lazy-loaded Dylan’s below-the-fold headshot.
- Added a keyboard-accessible skip link and stronger focus-visible states.
- Refined the sticky mobile header, small-screen typography, card spacing and tap behavior.
- Added reusable analytics hooks for hero CTAs, intent routes, occupation routes, phone, text and email clicks.
- Added one-time section-view events for the routing, professional and contact sections.
- Added smooth anchor navigation with reduced-motion support.
- Added conservative content-visibility performance hints for below-the-fold cards.
- Preserved all current routes, forms, SMS links and the `/score` experience.

## Analytics contract
Events are pushed to `window.dataLayer` and emitted as a `408farmers:analytics` CustomEvent. This keeps the site ready for Google Tag Manager, Meta Pixel or another analytics layer without hard-coding a vendor in this sprint.

## Files added
- `shared/homepage-optimization.css`
- `shared/homepage-optimization.js`
- `SPRINT-1.4C.md`

## Files updated
- `index.html`
- `ROADMAP.md`

## QA checklist
- [x] Homepage loads with all referenced local assets.
- [x] Existing routes remain present.
- [x] Analytics script passes JavaScript syntax validation.
- [x] Keyboard skip link and focus styles are present.
- [x] Hero image is prioritized and below-the-fold headshot is lazy-loaded.
- [x] Reduced-motion behavior is respected.
- [x] ZIP integrity passes.
