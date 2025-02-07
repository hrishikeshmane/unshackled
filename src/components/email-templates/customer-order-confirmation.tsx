import * as React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface CustomerOrderConfirmationEmailTemplateProps {
  firstName: string;
  orderId: string;
  productName: string;
  refNumber: string;
}

export const CustomerOrderConfirmationEmailTemplate: React.FC<
  Readonly<CustomerOrderConfirmationEmailTemplateProps>
> = ({ firstName, orderId, productName, refNumber }) => (
  <Html>
    <Head />
    <Preview>
      Thanks for your order. Let us introduce you to your vendor who will be
      working with you to deliver the promised service.
    </Preview>
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
        <Text style={paragraph}>Thanks for your order.</Text>
        <Text style={paragraph}>Order ID: <strong>{orderId}</strong></Text>
        <Text style={paragraph}>Product Name: <strong>{productName}</strong></Text>
        {
          refNumber &&
          <Text style={paragraph}>Reference Number: <strong>{refNumber}</strong></Text>
        }
        <Text style={paragraph}>
          Let us introduce you to your vendor, who will be working with you to deliver the promised service.
        </Text>
        <Text style={paragraph}>
          The vendor will be taking over this email thread. Please keep your
          communication on this email thread for visibility.
        </Text>
        <Text style={paragraph}>
          Best,
          <br />
          The Unshackled Team
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
