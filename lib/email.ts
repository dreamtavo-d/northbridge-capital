import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(to: string, url: string) {
  await resend.emails.send({
    from: "Northbridge Capital <onboarding@resend.dev>",
    to,
    subject: "Verify your Northbridge Capital account",
    html: `
      <p>Welcome to Northbridge Capital.</p>
      <p>Please verify your email address to activate your account:</p>
      <p><a href="${url}">${url}</a></p>
      <p>If you didn't create this account, you can ignore this email.</p>
    `,
  });
}

export async function sendPasswordResetEmail(to: string, url: string) {
  await resend.emails.send({
    from: "Northbridge Capital <onboarding@resend.dev>",
    to,
    subject: "Reset your Northbridge Capital password",
    html: `
      <p>We received a request to reset your password.</p>
      <p><a href="${url}">Click here to set a new password</a></p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `,
  });
}