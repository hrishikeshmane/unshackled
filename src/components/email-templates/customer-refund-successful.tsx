import * as React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";

interface CustomerRefundSuccessfulEmailTemplateProps {
  firstName: string;
  orderId: string;
  productName: string;
  refNumber: string;
  orderTotal: string;
}

export const CustomerRefundSuccessfulEmailTemplate: React.FC<
  Readonly<CustomerRefundSuccessfulEmailTemplateProps>
> = ({ firstName, orderId, productName, refNumber, orderTotal }) => (
  <Html>
    <Head />
    <Preview>
      Refund Processed for Order #{orderId}
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
          We have successfully processed your refund for the following order:
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
          <strong>Refund Amount:</strong> {orderTotal}
        </Text>
        <Text style={paragraph}>
          The refund has been processed and should appear in your account within 5-10 business days, 
          depending on your payment method and financial institution.
        </Text>
        <Text style={paragraph}>
          If you have any questions about this refund, please don't hesitate to contact our support team.
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