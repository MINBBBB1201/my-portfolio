---
title: "Building Tern: A Flight Booking App with Next.js, Duffel, and React Three Fiber"
date: "2026-08-15"
description: "How I built Tern — a flight search app that compares fares by price, duration, and delay risk — from the Duffel API integration to a custom glassmorphism design system and 3D scroll interactions."
tags: ["Next.js", "TypeScript", "React Three Fiber", "GSAP", "APIs"]
readingTime: 5
featured: true
---

Tern started from a simple annoyance: every flight search tool ranks results by price alone, even when a slightly more expensive flight is an hour shorter or far less likely to be delayed. I wanted a search experience that surfaced all three factors at once.

## Why the Duffel API

Duffel gives direct access to live fare and schedule data without needing individual airline integrations. The trade-off is that the raw response is dense — a single search returns nested offer, slice, and segment objects that needed to be flattened into something a UI component could actually render (layover duration, airline logos, per-leg delay signals).

## Civil Twilight — the design system

Rather than reach for a generic component library, I built a small custom design system called **Civil Twilight**: a glassmorphism aesthetic (frosted panels, soft gradients evoking the sky at dusk) applied consistently across search results, flight cards, and the booking flow. Keeping it as a real system — shared tokens for blur, opacity, and border treatment — made it much faster to add new screens without the UI drifting.

## From Three.js to React Three Fiber

The landing page includes a 3D scene that reacts to scroll. I started with raw Three.js, but manually managing the render loop and scene graph inside a React component fought the framework at every step. Migrating to **React Three Fiber** let the 3D scene live inside the normal React tree — state, props, and hooks all worked as expected — and pairing it with **GSAP ScrollTrigger** made scroll-driven camera movement and object transitions dramatically smoother than my original manual scroll-listener approach.

## Small details that mattered

- **Real-time airport weather and layover badges** — small signals, but they're exactly the kind of context that's normally buried in a fifth click.
- **next-intl for English/Korean support** — since the people most likely to use this are bilingual, this wasn't optional.
- **Instagram Story polls for user research** — before building a feature, I ran quick polls asking what people actually cared about when picking a flight. It's not a formal research method, but it kept me from building things nobody wanted.

## What's next

Tern is live at [flytern.site](https://flytern.site). The current focus is tightening the delay-risk model and cleaning up the codebase before making the repository public.
