---
title: "Building Tern: Flight Search, Booking, and 3D Interfaces"
date: "2026-08-15"
description: "How I connected Duffel flight offers, multilingual booking pages, and a scroll-based 3D landing page in Tern."
tags: ["Next.js", "TypeScript", "React Three Fiber", "GSAP", "APIs"]
readingTime: 3
featured: true
---

*Updated October 20, 2026.*

Tern began as a flight-booking concept in Mechanics Club. I continued it as a personal project because I wanted to compare a fare with the time and connections that came with it. That meant working on the search interface, the booking flow, and the information around each itinerary.

## Turning flight offers into readable results

Duffel supplies the flight offers. Its response contains nested offers, slices, and segments, while a traveler needs a readable price, departure time, journey duration, and connection summary. I mapped that data into flight cards with airline details and layover badges, and added airport weather alongside the itinerary.

Tern also includes a schedule-risk score. It uses rules for the number of stops, late departures, and short connections. It is a comparison aid, not a trained prediction model or a measured probability that a flight will be delayed.

## Civil Twilight

I called the visual system Civil Twilight. It uses translucent panels, soft gradients, and shared styles for blur, opacity, and borders. Reusing those styles across search results and booking screens gives new pages a consistent appearance.

The landing page has a 3D scene tied to scrolling. I moved it from raw Three.js to React Three Fiber so the scene could use React's component and state structure. GSAP ScrollTrigger coordinates the camera movement and transitions with the page.

## Language through the booking flow

The app now has English, Korean, Japanese, and Chinese routes through next-intl. Language support includes dates, number formatting, and the return from the external booking flow. A traveler returning to the app should keep the language they selected before leaving it.

I also used informal Instagram Story polls to help prioritize features. I treated those responses as informal feedback, rather than a representative survey.

Tern is available at [flytern.site](https://flytern.site), and development is ongoing. The current code is in the public [Tern repository](https://github.com/MINBBBB1201/Tern).
