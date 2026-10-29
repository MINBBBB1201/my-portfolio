# Minchan Kim — Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://minchankim-portfolio.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![XERJ Corpus Hub contributor](https://hub.xerj.org/contributors/MINBBBB1201/badge.svg)](https://hub.xerj.org/contributors/MINBBBB1201)

Personal portfolio site for Minchan Kim, a 12th-grade student at Qingdao Daewon School interested in AI-related degree programs. The site connects computer vision, ongoing reinforcement-learning work, and AI-assisted software with engineering projects and internship experience.

**Live site:** [minchankim-portfolio.vercel.app](https://minchankim-portfolio.vercel.app/)

## Highlights

- **Rocket Motor Thrust Test Stand** — Designed, built, and instrumented a static-fire test stand for a student-made solid rocket motor, logging real thrust-time data (190N peak thrust)
- **Open-Circuit Wind Tunnel** — Directing the CAD design and fabrication of an open-circuit wind tunnel for flow visualization and aerodynamic validation testing (in progress)
- **F-22-Inspired RC Aircraft** — Designed, built, and flight-tested a hand-built RC aircraft; the resulting research paper won 1st place in the Physics Division of the school's research competition
- **Dual-Turret Drone-Tracking System** — Built an OpenCV/YOLO-based dual-turret camera tracking system
- Founder and lead of **COSMOS**, a 10-member student aero-engineering club

## Features

- **Project showcase** with real build photos, flight/static-fire test videos, and a linked research paper
- **AI chatbot** that answers visitor questions about the projects, grounded in the site's own content
- **Blueprint / technical-drawing theme** (light + dark) with a custom aerospace color palette
- **Experience timeline**, skills, honors, and community contributions sections
- **PDF resume** and a working contact form
- **GitHub activity widget** and SEO-ready structured data

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Deployment**: [Vercel](https://vercel.com)

## Local Development

```bash
git clone https://github.com/MINBBBB1201/my-portfolio.git
cd my-portfolio
npm install
```

Copy `.env.copy` to `.env` and fill in the required values, then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Portfolio chatbot

The server reads published projects, experience, academics, honors, and community data from `config/*.ts`. Set `GROQ_API_KEY` in local and Vercel environments. `GROQ_MODEL` is optional and defaults to `openai/gpt-oss-20b`. If a configured model becomes unavailable, the route retries once with the default. The API key stays server-side. Run `npm test` for request validation, model fallback, and provider-failure checks.

## Update the resume

`public/resume.pdf` is served by the Resume button. After changing portfolio content, run:

```bash
python -m pip install reportlab
npm run resume
```

The generator reads the published config files and writes a two-page PDF. Set `PDF_PYTHON` to a Python executable if needed. Review both pages before committing the regenerated PDF. Scores and unlisted activities are not inferred.

## Project Structure

### Project selection

The home page features three projects selected for their connection to AI, not by repository order. Projects contains substantial, distinct work with a clear role and evidence; related repositories belong to one project. In-progress work is labeled explicitly and simulation or prototype work is not described as validated production performance. Contributions is a broader repository index, not a claim that every repository is a flagship project.

TVC-Hopper and JSL remain in progress. DAEMUN III is a completed team contribution. Mintech is listed as completed internship experience; only internship completion and onboarding topics are supported by the supplied information. Dates are omitted when unconfirmed. The private JSL design archive is not linked publicly, and this update does not regenerate the resume.

| Section            | File Location              |
| ------------------ | --------------------------- |
| Personal info      | `config/site.ts`            |
| Skills             | `config/skills.ts`          |
| Projects           | `config/projects.ts`        |
| Experience         | `config/experience.ts`      |
| Honors             | `config/honors.ts`          |
| Community          | `config/community.ts`       |
| Contributions      | `config/contributions.ts`   |
| Theme colors       | `app/globals.css`           |

## License

MIT — see [LICENSE](LICENSE).

This project started from [namanbarkiya/minimal-next-portfolio](https://github.com/namanbarkiya/minimal-next-portfolio), an open-source Next.js portfolio template, and has since been substantially rewritten: new theme and design system, new content and data layer, an AI chatbot, and several custom components. 
