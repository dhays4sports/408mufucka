# 408-FLOW-1.1 — Auto Bundle → CoverageFit Continuation

Status: Implemented

The existing `/auto-bundle/` lead form now participates in the established 408FARMERS → CoverageFit browser handoff. It preserves the existing form and shared lead delivery behavior, builds the existing prospect profile, and launches the existing CoverageFit Home assessment at `/assessment/`.

This sprint does not create a bundle-specific CoverageFit assessment. The current housing `segment` field remains under the pre-existing prospect-profile contract; semantic separation of occupation/review context is deferred to FLOW-1.3.

The existing thank-you page remains a launcher-failure fallback.
