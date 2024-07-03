"use client";

import React from "react";
import ConvertKitForm from "convertkit-react";

const GETTING_STARTED_FORM_ID = 6173806;
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

const JOIN_THE_CLUB_FORM_ID = 6394156;
export const JoinTheClubForm = () => {
  return (
    <ConvertKitForm
      template="clare"
      formId={JOIN_THE_CLUB_FORM_ID}
      submitText="Join 400+ ambitious immigrants"
      buttonBackground="#1454A1"
    />
  );
};

const JOIN_NEWSLETTER_FORM_ID = 5527329;
export const JoinNewsletterForm = () => {
  return (
    <ConvertKitForm
      template="clare"
      formId={JOIN_NEWSLETTER_FORM_ID}
      submitText="Join 15000+ immigrants"
      buttonBackground="#1454A1"
    />
  );
};
