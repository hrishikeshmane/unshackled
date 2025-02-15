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

interface CustomerPaymentInitiatedEmailTemplateProps {
  firstName: string;
  orderId: string;
  productName: string;
  refNumber: string;
}

export const CustomerPaymentInitiatedEmailTemplate: React.FC<
  Readonly<CustomerPaymentInitiatedEmailTemplateProps>
> = ({ firstName, orderId, productName, refNumber }) => (
  <Html>
    <Head />
    <Preview>
      Payment Initiation Confirmation for {productName}
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
        <Text style={paragraph}>Dear {firstName},</Text>
        <Text style={paragraph}>
          Thank you for your recent order with Unshackled.
        </Text>
        <Text style={paragraph}>
          We are writing to confirm that your payment for the following item has been successfully initiated:
        </Text>
        <Text style={paragraph}>
          <strong>Order ID:</strong> {orderId}
        </Text>
        <Text style={paragraph}>
          <strong>Service:</strong> {productName}
        </Text>
        {refNumber && (
          <Text style={paragraph}>
            <strong>Reference Number:</strong> {refNumber}
          </Text>
        )}
        <Text style={paragraph}>
          Once your payment has been successfully processed, you will receive an email introducing you to your vendor. If you have already received this communication, kindly disregard this message.
        </Text>
        <Text style={paragraph}>
          Should you have any questions or need assistance, please don’t hesitate to contact our support team.
        </Text>
        <Text style={paragraph}>
          Best regards,
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
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
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
