"use server";

import { Resend } from "resend";
import { EmailTemplate } from "~/components/email-templates/welcome";

const FROM_EMAIL = "Acme <onboarding@resend.dev>";
const RESEND_KEY = process.env.RESEND_KEY;

export async function sendWelcomeEmail() {
  const resend = new Resend(RESEND_KEY);

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ["delivered@resend.dev"],
    subject: "Hello World",
    react: EmailTemplate({ firstName: "John" }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}

////////////////////////////////////////
// Vendor onboarding emails
////////////////////////////////////////
export async function sendVenorApprovalPendingEmail(email: string) {
  const resend = new Resend(RESEND_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: "Hello World",
    react: EmailTemplate({ firstName: "John" }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}

export async function sendVenorIsApprovedEmail(email: string) {
  const resend = new Resend(RESEND_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: "Hello World",
    react: EmailTemplate({ firstName: "John" }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}

////////////////////////////////////////
// Vendor product emails
////////////////////////////////////////
export async function sendVenorProductApprovalPendingEmail(
  email: string,
  productId: string,
) {
  const resend = new Resend(RESEND_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: "Hello World",
    react: EmailTemplate({ firstName: "John" }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}

export async function sendVenorProductIsApprovedEmail(
  email: string,
  productId: string,
) {
  const resend = new Resend(RESEND_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: "Hello World",
    react: EmailTemplate({ firstName: "John" }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}
