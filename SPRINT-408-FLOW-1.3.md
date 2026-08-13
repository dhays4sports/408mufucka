# 408-FLOW-1.3 — Separate occupation/context from review reason

Status: Implemented

The 408FARMERS prospect-profile contract now models three distinct concepts:

- `reviewContext`: why the prospect is seeking a review
- `occupationSegment`: professional/affinity context
- `housingContext`: renter/homeowner context used by bundle acquisition

The web handoff sends these as `review_context`, `occupation_segment`, and `housing_context`. Legacy `segment` remains a CoverageFit fallback for older senders but is no longer the canonical semantic field.
