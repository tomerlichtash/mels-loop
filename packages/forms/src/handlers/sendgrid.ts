import { NextRequest, NextResponse } from "next/server";

export async function handleSendgridSubmission(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    const toEmail = process.env.SENDGRID_TO_EMAIL || "about@melsloop.com";
    const fromEmail = process.env.SENDGRID_FROM_EMAIL || "noreply@melsloop.com";

    if (!apiKey) {
      console.error("SENDGRID_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: toEmail }] }],
        from: { email: fromEmail, name: "Mel's Loop Contact Form" },
        reply_to: { email, name },
        subject: `Contact form message from ${name}`,
        content: [
          {
            type: "text/plain",
            value: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          },
        ],
      }),
    });

    if (response.ok || response.status === 202) {
      return NextResponse.json({ success: true });
    }

    const errorText = await response.text();
    console.error("SendGrid error:", errorText);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
