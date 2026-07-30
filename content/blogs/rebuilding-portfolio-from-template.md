---
title: "From Template to Real Site: Rebuilding My Portfolio's Content"
date: "2026-07-30"
description: "Notes on turning a cloned open-source portfolio template into an actual application hub — replacing placeholder content, pulling real project data, and fixing the bugs that came with it."
tags: ["Next.js", "TypeScript"]
readingTime: 4
featured: false
---

I started this site from an open-source Next.js portfolio template rather than building the layout from zero — the goal was to spend my time on content and the Tern devlog, not on rebuilding a component library that already existed. That trade-off worked, but it came with a cost I underestimated: a cloned template doesn't just give you structure, it gives you someone else's entire identity baked into the data layer.

## The cleanup

Every config file — projects, experience, skills, site metadata, even the blog posts themselves — was still populated with the original author's real work history, GitHub links, and bio. None of it was placeholder text; it was someone else's actual resume, which meant a careless copy-paste could have put another person's professional history on an application document. Going through it meant rebuilding, file by file:

- **Projects** — swapped a list of unrelated web-dev projects for the ones that are actually mine: Tern, and the COSMOS aerospace builds (thrust test stand, wind tunnel, drone tracking turret, RC aircraft).
- **Experience and skills** — pulled directly from my own LinkedIn profile rather than reusing the template's fields, so the data was accurate rather than just restyled.
- **Site metadata, structured data (JSON-LD), and the PWA manifest** — all still had the original author's name and job title hardcoded in places the config files didn't cover.

## Bugs that came along with the template

A few things broke or looked wrong along the way, worth noting for anyone doing the same thing:

- Components that render an image or link from config data need to handle the case where that field is legitimately empty — a project without a public repo yet, for example. A few components rendered `<Image src="">` or `<Link href="">` unconditionally, which crashes or throws a console error.
- A "star this repo" badge and a "like this template?" card were both wired to the original template's own repository — harmless in the original context, actively confusing on a personal site.

## Where the data came from

Rather than writing project descriptions from memory, I pulled real detail — dates, metrics, project descriptions — from my own LinkedIn profile, so the site reflects what's already documented elsewhere instead of introducing a second, slightly-different version of the same facts.
