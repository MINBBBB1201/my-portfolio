---
title: "Wiring a Project Chatbot into My Portfolio with Azure AI Foundry"
date: "2026-07-30"
description: "A debugging log: connecting a visitor-facing chatbot to GPT-5.6-Sol through Azure AI Foundry, and the control-plane vs. data-plane endpoint mistake that broke it."
tags: ["Next.js", "TypeScript", "APIs"]
readingTime: 4
featured: true
---

I wanted a small chatbot on this site that visitors could ask about my projects — grounded in real project data instead of a generic model with no context. The plan: a `ChatBot` component that sends the visitor's question plus my project data to a Next.js API route, which calls an Azure AI Foundry deployment of GPT-5.6-Sol server-side, so the API key never touches the browser.

## The setup

The component itself was straightforward: local state for the message list, a fetch to `/api/chat`, and the response rendered into the thread. The API route reads project data, builds a single user message, and forwards it to Azure with the API key from an environment variable.

## Where it broke: control plane vs. data plane

Azure AI Foundry resources expose two different kinds of endpoints, and it's easy to grab the wrong one from the Azure portal:

- **Control plane** — URLs shaped like `.../api/projects/{project-name}`, used for managing the resource itself. These require Entra ID (Azure AD) authentication, not a simple API key.
- **Data plane** — the actual inference endpoint, shaped like `https://{resource}.services.ai.azure.com`, which accepts a plain `api-key` header.

I had the control-plane URL in `.env`. The request wasn't failing loudly — it was failing in a way that was easy to miss, because my API route was forwarding whatever Azure returned with a `200` status regardless of whether the upstream call actually succeeded. So the client saw a "successful" response with no usable `choices` field, and silently fell back to a generic error message. No stack trace, no obvious signal — just a chatbot that didn't answer.

## The fix

Two changes:

1. Swapped the endpoint in `.env` to the data-plane URL, and corrected the route path to `/openai/v1/chat/completions` (the unified chat completions path — not `/openai/v1/messages`, which is a different API's convention entirely).
2. Made the API route actually check `response.ok` before forwarding data, log the real Azure error server-side, and return a matching status code to the client instead of always returning `200`.

That second part mattered more than it might sound — once errors propagate correctly, a broken integration tells you *why* it's broken instead of just failing silently.

## Takeaway

When an API integration "succeeds" but returns nothing useful, check whether your own server is swallowing the upstream error before assuming the model or the prompt is the problem.
