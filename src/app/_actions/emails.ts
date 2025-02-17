"use server";

import { Resend } from "resend";
import { AdminListingNotificationEmailTemplate } from "~/components/email-templates/admin-notify-listing-request";
import { AdminSellerNotificationEmailTemplate } from "~/components/email-templates/admin-notify-seller-request";
import { ApprovalFormResponses } from "~/components/email-templates/approval-form-responses";
import { CustomerListingApproval } from "~/components/email-templates/customer-listing-approval";
import { CustomerOrderConfirmationEmailTemplate } from "~/components/email-templates/customer-order-confirmation";
import { CustomerOrderFullfilledConfirmationEmailTemplate } from "~/components/email-templates/customer-order-fulfilled";
import { VendorApprovedEmailTemplate } from "~/components/email-templates/vendor-approved";
import { VendorDeniedEmailTemplate } from "~/components/email-templates/vendor-denied";
import { VendorListingApprovedEmailTemplate } from "~/components/email-templates/vendor-listing-approved";
import { VendorListingDeniedEmailTemplate } from "~/components/email-templates/vendor-listing-denied";
import { EmailTemplate } from "~/components/email-templates/welcome";

const FROM_EMAIL = "Unshackled <hi@unshackled.club>";
const RESEND_KEY = process.env.RESEND_KEY;
const UNSHACKLED_ADMIN_EMAIL = "hi+admin@readunshackled.com";

export async function sendWelcomeEmail() {
  const resend = new Resend(RESEND_KEY);

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ["delivered@resend.dev"],
    subject: "Hello World",
    react: EmailTemplate({ firstName: "Hrishi" }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  console.log("email sent from ", FROM_EMAIL);

  return data;
}

////////////////////////////////////////
// Vendor onboarding emails
////////////////////////////////////////
export async function sendAdminNotificationForSellerRequest() {
  const resend = new Resend(RESEND_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [UNSHACKLED_ADMIN_EMAIL],
    subject: "We have a new Vendor Request!",
    react: AdminSellerNotificationEmailTemplate({
      firstName: "Admin",
    }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}

export async function sendVendorSellerRequestApproved(
  email: string,
  firstName: string,
) {
  const resend = new Resend(RESEND_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject:
      "Your request to be a seller on unshackled marketplace has been approved",
    react: VendorApprovedEmailTemplate({
      firstName: firstName,
    }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}

export async function sendVendorSellerRequestDenied(
  email: string,
  firstName: string,
) {
  const resend = new Resend(RESEND_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject:
      "Your request to be a seller on unshackled marketplace has been denied",
    react: VendorDeniedEmailTemplate({
      firstName: firstName,
    }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}

////////////////////////////////////////
// Vendor listing emails
////////////////////////////////////////
export async function sendAdminNotificationForListing(listingId: string) {
  const resend = new Resend(RESEND_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [UNSHACKLED_ADMIN_EMAIL],
    subject: "We have a new/edit listing request!",
    react: AdminListingNotificationEmailTemplate({
      firstName: "Admin",
      listingId: listingId,
    }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}

export async function sendVenorListingApproval(
  email: string,
  firstName: string,
  isEdit: boolean,
) {
  const resend = new Resend(RESEND_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: "Your listing on Unshackled marketplace has been approved.",
    react: VendorListingApprovedEmailTemplate({
      firstName: firstName,
      isEdit: false,
    }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}

export async function sendVenorListingDenied(
  email: string,
  firstName: string,
  isEdit: boolean,
) {
  const resend = new Resend(RESEND_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: "Your listing on Unshackled marketplace has been denied.",
    react: VendorListingDeniedEmailTemplate({
      firstName: firstName,
      isEdit: false,
    }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}

////////////////////////////////////////
// Customer order emails
////////////////////////////////////////
export async function sendCustomerOrderEmail(
  email: string,
  firstName: string,
  vendorEmail: string,
  orderId: string,
  productName: string,
  refNumber: string,
  orderCommunicationEmail: string,
  orderTotal: string,
) {
  const resend = new Resend(RESEND_KEY);
  const recipients = [email, vendorEmail];
  if (orderCommunicationEmail.trim() !== "") {
    recipients.push(orderCommunicationEmail);
  }
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: recipients,
    cc: UNSHACKLED_ADMIN_EMAIL,
    subject: `[Unshackled Marketplace] Order Confirmation: ${productName}`,
    react: CustomerOrderConfirmationEmailTemplate({
      firstName: firstName,
      orderId,
      productName,
      refNumber,
      orderTotal,
    }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}

export async function sendCustomerOrderFullfilledEmail(
  email: string,
  firstName: string,
  vendorEmail: string,
) {
  const resend = new Resend(RESEND_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email, vendorEmail],
    cc: UNSHACKLED_ADMIN_EMAIL,
    subject:
      "[Unshackled Marketplace] Your order has been marked as fulfilled by the vendor!",
    react: CustomerOrderFullfilledConfirmationEmailTemplate({
      firstName: firstName,
    }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}

////////////////////////////////////////
// Test emails
////////////////////////////////////////
export async function sendTestEmailToSelf(email: string) {
  const resend = new Resend(RESEND_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: "[Unshackled Marketplace] Vendor approval",
    react: VendorApprovedEmailTemplate({
      firstName: "Hrishi",
    }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}

////////////////////////////////////////
// Request Approval Emails
////////////////////////////////////////


export async function sendVendorApprovalFormResponse(
  customerId: string,
  productId: string,
  responses: {question: string, answer: string}[],
  email: string,
  name: string,
) {
  const resend = new Resend(RESEND_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject:
      "You have a new customer request pending for approval/denial",
    react: ApprovalFormResponses({
      formResponses: responses,
      customerId,
      name
    }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}

export async function sendCustomerApprovalForListing(
  productId: string,
  email: string,
  name: string,
  status: "pending" | "approved" | "denied",
) {
  const resend = new Resend(RESEND_KEY);
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject:
      "Your service request Update",
    react: CustomerListingApproval({
      name,
      productId,
      status,
    }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}
