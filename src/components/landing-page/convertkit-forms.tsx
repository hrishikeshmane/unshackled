"use client";

import React from "react";
import ConvertKitForm from "convertkit-react";

const GETTING_STARTED_FORM_ID = 6173806;
const JOIN_THE_CLUB_FORM_ID = 6394156;
const JOIN_NEWSLETTER_FORM_ID = 5527329;
const STUDENT_PLAN_WAITLIST_FORM_ID = 6962493;

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
      submitText="Join 16500+ immigrants"
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
