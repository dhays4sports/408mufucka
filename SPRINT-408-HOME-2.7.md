# 408-HOME-2.7 — Campaign Matching & QR Routing

HOME-2.7 connects each printed Home campaign to a message-matched entry while retaining one canonical `/home/` conversion journey.

## Delivered

- Canonical short QR routes: `/home/qr/<ZIP>/rate/` and `/home/qr/<ZIP>/fit/`.
- Backward compatibility with the existing query-string flyer URLs.
- ZIP- and variant-matched hero copy, CTA, reassurance, SMS starter, and document metadata.
- Canonical attribution `home_flyer_<ZIP>_<rate|fit>` carried through the existing lead and CoverageFit records.
- Bounded campaign continuity in CoverageFit v3.20.58.
- Safe generic fallback for invalid, incomplete, or unsupported routes.

The sprint adds no engagement or assessment questions, no extra lead form, and no scoring input. Campaign context explains why the visitor arrived; CoverageFit responses still evaluate protection understanding.
