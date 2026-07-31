# Minchan Kim — Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://minchankim-portfolio.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Personal portfolio site for Minchan Kim, a 12th-grade student at Qingdao Daewon School studying Aviation, Aeronautics, and Aerospace Science and Technology. The site showcases hands-on engineering work — a rocket motor thrust test stand, an open-circuit wind tunnel, an F-22-inspired RC aircraft research project, and a dual-turret drone-tracking system — alongside software projects, experience, and contributions.

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

## Project Structure

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
