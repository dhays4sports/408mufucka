# 408-FARMERS / CoverageFit Design System

Sprint 1.2 introduces `shared/design-system.css`, a reusable visual foundation shared by the homepage, campaign pages, and future CoverageFit integrations.

## Core tokens

- Colors: `--cf-color-*`
- Typography: `--cf-font-*`, `--cf-text-*`
- Spacing: `--cf-space-*`
- Radius: `--cf-radius-*`
- Shadows: `--cf-shadow-*`
- Motion: `--cf-transition-*`

## Reusable components

- `.cf-container`
- `.cf-eyebrow`, `.cf-heading`, `.cf-muted`
- `.cf-btn`, `.cf-btn--primary`, `.cf-btn--secondary`, `.cf-btn--wide`
- `.cf-card`, `.cf-card--flat`, `.cf-card--soft`
- `.cf-icon-tile`
- `.cf-chip`
- `.cf-panel-dark`
- `.cf-link-button`
- `.cf-grid-3`, `.cf-grid-4`
- `.cf-reveal`

## Implementation rule

New pages should use `cf-*` classes first. Page-specific CSS should only control unique layout or campaign-specific artwork. This keeps typography, controls, spacing, and interaction behavior consistent across the ecosystem.

## Sprint 1.3B visual polish

The optional `shared/visual-polish.css` layer refines gradients, surface depth, icon treatment, spacing, and responsive presentation without changing funnel behavior. Load it after `motion.css` on premium campaign pages.
