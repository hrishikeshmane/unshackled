"use server";

import { Resend } from "resend";
import { EmailTemplate } from "~/components/email-templates/welcome";

export async function sendWelcomeEmail() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "Hello World",
    react: EmailTemplate({ firstName: "John" }) as React.ReactElement,
  });

  console.log(data);
}
