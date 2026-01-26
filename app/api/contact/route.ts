import { contactFormSchema } from "@/features/contact/helpers/validations";
import { getIdentifier, rateLimit } from "@/lib/utils";
import { escape } from "html-escaper";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiter: 5 requests per minute per IP
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function POST(request: Request) {
  try {
    // Rate limiting check
    const identifier = getIdentifier(request);
    try {
      await limiter.check(5, identifier); // 5 requests per minute
    } catch {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();

    // Validate input using Zod schema
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      const errorMessage = result.error.issues
        .map((issue) => issue.message)
        .join(", ");
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { email, message, name } = result.data;

    // Sanitize user input to prevent XSS
    const sanitizedName = escape(name);
    const sanitizedEmail = escape(email);
    const sanitizedMessage = escape(message);

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <contact@hiretimsf.com>",
      to: process.env.CONTACT_EMAIL || "hiretimsf@gmail.com",
      subject: `New Contact Form Submission from ${sanitizedName}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${sanitizedMessage}</p>
      `,
    });

    if (error) {
      return NextResponse.json(
        {
          error: "Failed to send email. Please try again later.",
          details: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}
