# Admissions-reader review

Reviewed October 20, 2026; final browser and dependency checks continued October 21, 2026. This is a first-time-reader review, not an admissions decision or a claim about any university's submission rules. The resume and downloadable source documents remain unchanged.

## Corrected in this pass

- The 1280 by 720 homepage initially showed a large portrait and light decoration before the name and project entry points. The introduction and selected-work link now come first, with a compact portrait on larger screens.
- The selected projects now include a completed AI application, DAEMUN III, alongside ongoing TVC-Hopper and JSL work. Shared authorship is retained.
- Project summaries and labeled source links now precede large screenshots. Role descriptions are visible across all eight projects; no sole ownership or unmeasured performance is added. DAEMUN screens and the submission diagram precede its six technical sections.
- Skill descriptions remain tied to work, while unexplained five-star self-ratings are no longer displayed.
- The Airbus entry explicitly identifies Springpod virtual work experience, avoiding an implication of employment at Airbus. Official programme information: https://www.springpod.com/virtual-work-experience/aerospace-work-experience/WEXP-00043
- The chatbot previously received no profile GitHub URL despite a visible footer link. Its server-owned context now includes the public profile URLs. Replies support readable Markdown links, lists, and tables; raw HTML, images, and executable URLs are not enabled.
- Internship periods: JSL is shown at month precision (since August 2026, ongoing) and no exact start day is inferred. Mintech is July 20 to August 19, 2026, as stated on its internship certificate (updated 2026-10-31; earlier text said August to September). The KAU camp ran August 3 to 7, 2026.
- Shared-link artwork and the icon identify the portfolio owner instead of using the template monogram. An unverified Twitter username was removed from metadata.
- Dependency installation exposed existing critical Next.js advisories. Next.js and the matching Next packages were updated within version 16 to 16.4.2. The production-only audit reports no critical findings and no Next.js finding after the update. Other existing findings remain: 22 production dependency findings (3 low, 5 moderate, 14 high). A critical fast-xml-parser finding remains in a development-only AWS dependency of @types/nodemailer; it is outside the runtime dependency tree. This is not a claim that all dependency findings are resolved.

## Remaining evidence gaps

- The AI work shows application development more clearly than independently measured model performance. Keep DAEMUN's retrieval limitation and design decision concrete; do not describe ongoing controller comparisons as research results.
- TVC-Hopper and JSL would benefit from an actual, publishable demonstration or labeled screenshot. The present lack of those assets should not be filled with invented output or a mockup presented as a working system.
- Mintech now has a duration and supported task description, but no independently verified impact metric or public work sample. Retain the assisted-work boundary.
- The profile photo is casual. A clearer portrait or a genuine project-work photo could fit an academic presentation better; no particular photo style is an admissions requirement.
- The research-paper link remains available with an English project summary. A separate English abstract may help readers who cannot read the full paper's language, if the owner chooses to provide one.
- A complete personal-history audit is outside this review. No admissions outcome, usage count, model accuracy, or operational business impact is inferred.

## Validation

The pull request records tests, build and browser checks, exact revisions, deployment results, and remaining dependency limits. Eleven public project/repository URLs responded successfully during this review; that does not verify every external application's full workflow.
