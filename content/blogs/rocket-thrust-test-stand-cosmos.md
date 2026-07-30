---
title: "Leading COSMOS: Building a Rocket Thrust Test Stand from Scratch"
date: "2026-03-01"
description: "Founding an aero-engineering club, leading a 10-person team through a full design-build-test cycle, and what 190N of peak thrust actually tells you."
tags: ["Arduino", "System Architecture", "Python"]
readingTime: 5
featured: true
---

I founded COSMOS, my school's aero-engineering club, because I wanted a place to run projects that couldn't fit inside a single class — projects with real fabrication, real instrumentation, and real failure modes. The first major build: a solid propellant rocket motor thrust test stand.

## Why build a test stand at all

You can simulate a rocket motor's theoretical performance from its propellant grain geometry, but simulation only tells you what *should* happen. A thrust test stand tells you what actually did — and the gap between the two is where the real engineering learning happens.

## Leading the build

With a 10-member team, the project ran through a full theory → design → fabrication → test-validation cycle. My role was less "do everything myself" and more directing the sequence: making sure the load cell and data acquisition setup were validated before we ever loaded a motor, and that the mechanical mounting could handle the expected thrust without introducing measurement error.

## Static-fire test #1: a data-logging failure

Our first static-fire test ran, physically, without issue — but the data logger failed to capture the full burn. Diagnosing this mid-project (rather than after the fact) meant checking the sampling rate against the expected burn duration, the wiring between the load cell amplifier and the logger, and the logger's own buffer handling. We traced it to a sampling configuration issue and fixed it before the second test.

## The numbers

The second static fire gave us clean data. From the thrust-time curve:

- **Peak thrust:** 190 N
- **Total impulse:** 270.6 N·s
- **Specific impulse:** 95.2 s

We cross-validated these against theoretical predictions from a solid rocket internal ballistics simulator — the experimental and theoretical curves tracked closely, which was the real confirmation that both the motor design and the test stand's instrumentation were sound.

## What I'd do differently

Build in a data-logging dry run with a known reference signal before the first live test, not after a failed one. It would have caught the sampling issue for free.

The stand and its data pipeline are open source: [Rocket-Thrust-Test-Stand](https://github.com/COSMOS-Aero-Engineering/Rocket-Thrust-Test-Stand).
