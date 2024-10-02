"use client";

import React from "react";
import ConvertKitForm from "convertkit-react";
import { siteConfig } from "~/lib/config";

const GETTING_STARTED_FORM_ID = 6173806;
const JOIN_THE_CLUB_FORM_ID = 6394156;
const JOIN_NEWSLETTER_FORM_ID = 5527329;
const STUDENT_PLAN_WAITLIST_FORM_ID = 6962493;
const FREE_RESOURCES_FORM_ID = 5527443;
const REFER_A_FRIEND_FORM_ID = 6550914;
const SEND_ME_EBOOK_FORM = 5755598;
const SEND_BOOK_REFERENCE_FORM = 5548041;
const SEND_MINDMAP_FORM = 5548040;

export const StartHereForm = () => {
  return (
    <ConvertKitForm
      template="clare"
      formId={GETTING_STARTED_FORM_ID}
      submitText="Start free course & join 2000+ immigrants"
      buttonBackground="#1454A1"
    />
  );
};

export const JoinNewsletterForm = () => {
  return (
    <ConvertKitForm
      template="clare"
      formId={JOIN_NEWSLETTER_FORM_ID}
      submitText={`Join ${siteConfig.newsletterCount} immigrants`}
      buttonBackground="#1454A1"
    />
  );
};

export const StudentPlanWaitlistForm = () => {
  return (
    <ConvertKitForm
      template="clare"
      formId={STUDENT_PLAN_WAITLIST_FORM_ID}
      submitText="Join the waitlist"
      buttonBackground="#1454A1"
    />
  );
};

export const FreeResourcesForm = () => {
  return (
    <ConvertKitForm
      template="clare"
      formId={FREE_RESOURCES_FORM_ID}
      submitText="Claim Free Resources"
      buttonBackground="#1454A1"
    />
  );
};

export const ReferAFriendForm = () => {
  return (
    <ConvertKitForm
      template="clare"
      formId={REFER_A_FRIEND_FORM_ID}
      submitText="Sign me up!"
      buttonBackground="#1454A1"
    />
  );
};

export const SendMeEbookForm = () => {
  return (
    <ConvertKitForm
      template="clare"
      formId={SEND_ME_EBOOK_FORM}
      submitText="Send me the e-book!"
      buttonBackground="#1454A1"
    />
  );
};

export const SendRefrenceForm = () => {
  return (
    <ConvertKitForm
      template="clare"
      formId={SEND_BOOK_REFERENCE_FORM}
      submitText="Send the reference document"
      buttonBackground="#1454A1"
    />
  );
};

export const SendMindmapForm = () => {
  return (
    <ConvertKitForm
      template="clare"
      formId={SEND_MINDMAP_FORM}
      submitText="Send me the mindmap"
      buttonBackground="#1454A1"
    />
  );
};
