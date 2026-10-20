---
title: "COSMOS Rocket Thrust Stand: Recovering a Failed Test Record"
date: "2026-03-01"
description: "How our 10-member club built a thrust stand, corrected a recording failure, and analyzed the second static-fire test."
tags: ["Arduino", "System Architecture", "Python"]
readingTime: 3
featured: true
---

*Updated October 20, 2026.*

I founded COSMOS, my school's aerospace engineering club, and led a 10-member team building a thrust test stand for a solid-propellant rocket motor. The stand combined a mechanical frame, a load cell, and a microcontroller-based data logger. We needed a record of force over time to compare the test with our calculations.

## Checking the measurement setup

Before the static-fire tests, we added and removed known loads on the sensor. We checked whether its output responded to the changes and returned to zero after the load was removed. This gave us a way to inspect the measurement chain before using it during a burn.

My work included coordinating the design and fabrication, reviewing the engineering setup, and helping interpret the recorded data. The build and testing were shared team work.

## The first test did not save the data

The first motor burned, but the logger did not save the thrust record. A visible firing was not enough to analyze the motor's performance.

We reviewed the recording start sequence and data-storage logic before repeating the test. In the second test, calibration, countdown, ignition, and recording ran in sequence, and we obtained a continuous record from ignition through burnout.

## Reading the thrust curve

We converted the load-cell readings to force and plotted them against time. The report records a peak thrust of about **190 N** and a total impulse of **270.6 N·s**, calculated from the area under the curve.

We compared the experimental results with an internal-ballistics simulation. The report also discusses CFD and a qualitative comparison with the visible exhaust. Only the second test produced the complete record used for this analysis.

The project archive is available at [Rocket-Thrust-Test-Stand](https://github.com/MINBBBB1201/Rocket-Thrust-Test-Stand).
