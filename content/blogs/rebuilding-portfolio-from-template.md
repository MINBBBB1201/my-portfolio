---
title: "Rebuilding My Portfolio's Content and Data"
date: "2026-07-30"
description: "Replacing template content, handling incomplete project data, and keeping the pages and chatbot connected to the same records."
tags: ["Next.js", "TypeScript"]
readingTime: 3
featured: false
---

*Updated October 20, 2026.*

I started this site from an open-source Next.js portfolio template. It gave me a layout and components, but its project records, work history, and metadata still described the original author. I needed to replace those records before the site could represent my own work.

## Updating the data behind the pages

Most of the content lives in `config/*.ts`: projects, experience, skills, honors, and community activities. I replaced the template records with my own projects and checked names, roles, dates, and links against my activity notes and project files.

Some identity information was outside the config files. The homepage, structured data, metadata, and web app manifest also needed attention. A correct heading on the page did not mean every search preview or machine-readable record was correct.

## Letting incomplete records stay incomplete

A project may have no public image or exact start date. Components need to handle those cases without an empty image URL, broken link, or invented value.

The project cards now show a status and, where available, my role. The project list separates ongoing and completed work. The homepage selects featured items by ID, so changing the order of the full data array does not silently change every preview.

Experience dates use a shared formatter. An internship with a confirmed completion status and no exact dates can display “Completed.” That is more useful than filling in a month just to satisfy the layout.

## One set of records for pages and chat

The portfolio assistant loads the published configuration on the server. That keeps its source material connected to the same project and experience records visitors can read on the site.

Content checks cover project status, selected homepage items, and missing dates. They help catch inconsistencies in the data; they cannot establish that a biographical claim is true. That still requires checking the underlying records.
