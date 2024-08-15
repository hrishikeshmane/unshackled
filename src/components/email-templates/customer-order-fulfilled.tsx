import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VendorListingConfirmationEmailTemplateProps {
  firstName: string;
}

export const VendorListingConfirmationEmailTemplate: React.FC<
  Readonly<VendorListingConfirmationEmailTemplateProps>
> = ({ firstName }) => (
  <Html>
    <Head />
    <Preview>Your order has been marked as fullfilled by the vendor.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://www.unshackled.club/brand-logo.png`}
          width="240"
          height="70"
          alt="Unshackled by Greencard.inc"
          style={logo}
        />
        <Text style={paragraph}>Hi {firstName},</Text>
        <Text style={paragraph}>
          Your order has been marked as fullfilled by the vendor.
        </Text>
        <Text style={paragraph}>
          If you disagree, please reach out us at hi@readunshackled.com
        </Text>
        <Text style={paragraph}>
          Best,
          <br />
          The Unshackled team
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#1454A1",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
