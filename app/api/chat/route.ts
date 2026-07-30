const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

export async function POST(req: Request) {
  const { message, projectContext } = await req.json();

  if (!process.env.GROQ_API_KEY) {
    console.error("GROQ_API_KEY is missing from environment variables.");
    return Response.json(
      { error: "Server is missing Groq API configuration." },
      { status: 500 }
    );
  }

  let response: Response;
  try {
    response = await fetch(GROQ_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: 500,
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant embedded in Minchan Kim's personal portfolio site. Answer visitor questions about his projects using the provided project data (in JSON below). Be concise and friendly. IMPORTANT: Always respond in the exact same language as the visitor's question, whatever language that is (English, Korean, etc.) — never default to Korean or any other language regardless of what language the project data is in.",
          },
          {
            role: "user",
            content: `Project data (JSON): ${JSON.stringify(projectContext)}\n\nVisitor question: ${message}`,
          },
        ],
      }),
    });
  } catch (err) {
    console.error("Failed to reach Groq API:", err);
    return Response.json(
      { error: "Failed to reach Groq API." },
      { status: 502 }
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // Log full detail server-side (visible in the `npm run dev` terminal)
    // so the actual Groq error (bad key, invalid model name, rate limit, etc.)
    // is easy to diagnose instead of silently swallowed.
    console.error(
      `Groq API request failed: ${response.status} ${response.statusText}`,
      JSON.stringify(data)
    );
    return Response.json(
      {
        error:
          data?.error?.message ||
          `Groq API request failed with status ${response.status}.`,
      },
      { status: response.status }
    );
  }

  return Response.json(data);
}
