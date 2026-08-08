import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formLink = process.env.GOOGLE_FORM_LINK;
  const fieldIdName = process.env.GOOGLE_FORM_FIELD_ID_NAME;
  const fieldIdEmail = process.env.GOOGLE_FORM_FIELD_ID_EMAIL;
  const fieldIdMessage = process.env.GOOGLE_FORM_FIELD_ID_MESSAGE;
  const fieldIdSocial = process.env.GOOGLE_FORM_FIELD_ID_SOCIAL;

  // Treat unset AND leftover placeholder values (from .env.copy) as "not configured"
  // so submissions fail loudly instead of silently POSTing to a bogus URL.
  const isPlaceholder = (v: string | undefined) =>
    !v || v.startsWith("your_") || v.startsWith("entry_field_id");

  if (
    isPlaceholder(formLink) ||
    isPlaceholder(fieldIdName) ||
    isPlaceholder(fieldIdEmail) ||
    isPlaceholder(fieldIdMessage) ||
    isPlaceholder(fieldIdSocial)
  ) {
    console.error(
      "Contact form is not configured: GOOGLE_FORM_LINK / GOOGLE_FORM_FIELD_ID_* env vars are missing or still set to placeholder values."
    );
    return new NextResponse("Please configure the env variables", {
      status: 500,
    });
  }

  try {
    const body = await req.json();
    const { name, message, social, email } = body;

    const res = await fetch(
      `${formLink}/formResponse?${fieldIdName}=${encodeURIComponent(
        name
      )}&${fieldIdEmail}=${encodeURIComponent(
        email
      )}&${fieldIdMessage}=${encodeURIComponent(
        message
      )}&${fieldIdSocial}=${encodeURIComponent(social ?? "")}`
    );

    if (!res.ok) {
      console.error("Google Form submission failed with status", res.status);
      return new NextResponse("Form submission failed", { status: 502 });
    }

    return NextResponse.json("Success!");
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
