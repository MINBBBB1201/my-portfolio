# DAEMUN III case study sources

Reviewed 2026-10-19. Both supplied repositories had the same 88 commits at the time of review. The personal repository is a fork of `junwonkim07/DAEMUN-III`.

## Contribution boundaries

- The user clarified that Junwon Kim and Minchan Kim worked together across the entire repository. Describe the full platform as jointly developed, including areas committed under either account. Commit authorship alone does not define participation. Do not imply sole authorship or invent an individual division of work.
- Minchan's merged contributions: admin scaffolding (#3), content editing (#8, #12, #15-18, #21-23, #46), FAQ model/editor (#13), keyword retrieval (#14), first chat endpoint/widget/logs/evaluation (#19), delegate/team model and permissions (#26), seed FAQ expansion (#47), team UI (#44-45), upload history/notifications/storage integration (#52), per-committee publishing (#57).
- The FAQ source contains 103 drafted entries. This is not a verified count of production FAQ rows or answered questions.
- Initial retrieval limitations are documented in `docs/chatbot-eval.md` and PR #19. The jointly developed scope also includes public-context changes (#60), provider fallback (#59), streaming/UI changes (#61-62), and document diagnostics (#68). Describe their evolution as shared work without assigning each decision to one person.
- Upload versioning applies to delegate uploads, not all admin document edits. PR #52 explicitly limits its local verification to proxy storage and console mail output; do not claim live object-storage or email-delivery tests were performed for this portfolio update.
- Completion is supplied by the user. No exact completion date, usage count, response-accuracy percentage, admissions outcome, or measured operational improvement is inferred.

The case study links twelve implementation records: the initial monorepo/database/API commit and PRs #19, #60, #59, #62, #61, #26, #52, #57, #8, #68, and #69. Coverage includes shared schemas/CRUD/auth, public/admin pages, AI context and failure handling, versioned submissions, file delivery, VPS-to-Vercel migration, and diagnostic infrastructure.

The repository README contains outdated status notes. Current code and merged changes take precedence for feature coverage. Telemetry and fallback providers depend on deployment configuration; no new live delivery or performance claim is made. Request limits are in-memory per API instance, not global guarantees. Sentry/Neon diagnostics are described as implemented infrastructure, not a claim that optional production configuration was verified in this update.

## Image provenance

Source revision: `c9ac9490e8` (public repository main at review time).

- `01-conference-preview.webp`: screenshot of the original public frontend running locally with bundled default content and no API connection. The hero includes the conference imagery already used in the source. It is a site preview, not evidence of an event date or a newly taken conference photograph.
- `02-roger-preview.webp`: screenshot of the same frontend with the chat panel open. Shows its fixed opening message only. No generated reply, participant account, chat log, or private admin data is included. The current UI includes subsequent team changes.
- `03-submission-flow.svg`: original explanatory illustration derived from the submission implementation. It is labeled as an illustration, not a production screenshot or performance result.

Screenshots were captured through the browser and encoded as WebP without changing their visual content. Captions identify local previews. `https://daemun.org/` displayed Vercel's deployment-paused page during review, so no active website link is added to the portfolio.

## Writing

English Humanizer and K-Humanizer were applied with the user's writing preferences taking precedence. Korean is a parallel account of the same supported work. No invented motivation, personal reaction, testimonial, or metric is added.
