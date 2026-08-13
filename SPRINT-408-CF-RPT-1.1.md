# 408-CF-RPT-1.1 — Saveable Protection Report Promise Alignment

## Outcome

The optional post-lead CoverageFit invitation now states the exact customer takeaway: complete the educational assessment to receive a Protection Score and a free Home Protection Snapshot that can be saved as a PDF or printed.

## Promise-to-delivery continuity

1. The prospect’s first 408FARMERS lead remains submitted before the three engagement questions.
2. The personalized payoff leads to the existing explicit two-outcome invitation.
3. **Continue to CoverageFit** promises a Snapshot that can be saved as PDF or printed.
4. CoverageFit v3.20.62 shows the completed private Snapshot, explains the browser print dialog, and exposes **Save as PDF / Print** at the opening and final next step.
5. **Finish for Now** still ends the digital flow without launching CoverageFit or erasing the submitted lead.

## Preserved behavior

- No automatic or timed CoverageFit launch.
- No second 408FARMERS lead submission from the questions or invitation.
- Renters continue to renter-specific options instead of the Home assessment.
- LIFE remains outside CoverageFit.
- Contact, property, consent, campaign attribution, and bounded intent handoff remain unchanged.
- The CoverageFit assessment, recommendation behavior, completed consultation delivery, and Protection Score calculations remain unchanged.

## Deployment boundary

Deploy this package to the 408FARMERS Cloudflare-connected repository with CoverageFit v3.20.62. Production certification still requires one complete Home journey through both invitation choices and one saved PDF from the private report.
