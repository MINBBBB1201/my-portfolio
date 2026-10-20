---
title: "Portfolio Chatbot: Grounding Answers and Handling API Errors"
date: "2026-07-30"
description: "How the portfolio assistant uses published site data, handles unavailable models, and reports upstream errors."
tags: ["Next.js", "TypeScript", "APIs"]
readingTime: 3
featured: true
---

*Updated October 20, 2026.*

I wanted visitors to be able to ask about a project without opening every page. The assistant needs the same facts the portfolio publishes, including my role and whether a project is still in progress.

## The current implementation

The Next.js `/api/chat` route calls Groq from the server. It defaults to `openai/gpt-oss-20b`, with an environment variable for a different model. If the configured model is unavailable, the route retries once with the default. Authentication, rate-limit, and network failures return a temporary-unavailability message.

The route loads projects, experience, academic information, honors, and community activities from `config/*.ts`. Visitors send their question; the server supplies the portfolio context. The prompt asks the assistant to answer from those records, acknowledge missing information, and use the question's language. Generated answers can still be wrong, so the underlying project pages remain available for checking details.

## What I changed after the Azure prototype

An earlier version used Azure AI Foundry. During that integration, a failed upstream request could still become a `200` response from my own API route. The browser then saw an apparently successful response with no usable answer.

The useful fix was to inspect the upstream status before returning data. Provider errors belong in server-side diagnostics; the visitor needs a clear failure message and a way to try again. The current route follows that separation instead of returning an empty answer as a success.

## Checking behavior without publishing secrets

The API key stays on the server. Tests exercise the route with controlled provider responses, including unavailable models and malformed requests. Those checks verify the handling paths without depending on a live provider for every test.

The frontend also prevents Enter from sending a message while Korean text is still being composed. That small input rule matters when the same chat interface serves English and Korean questions.
