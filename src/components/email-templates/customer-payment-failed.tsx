import * as React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Button,
  Link,
} from "@react-email/components";

interface CustomerPaymentFailedEmailTemplateProps {
  firstName: string;
  orderId: string;
  productId: string;
  storeId: string;
  productName: string;
  refNumber: string;
  orderTotal: string;
}

export const CustomerPaymentFailedEmailTemplate: React.FC<
  Readonly<CustomerPaymentFailedEmailTemplateProps>
> = ({ firstName, orderId, productId, storeId, productName, refNumber, orderTotal }) => (
  <Html>
    <Head />
    <Preview>
      Payment Failed for {productName}
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
          We noticed there was an issue processing your payment for your recent order with Unshackled.
        </Text>
        <Text style={paragraph}>
          Here are the details of the order that couldn't be processed:
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
          <strong>Order Total:</strong> {orderTotal}
        </Text>
        <Section style={buttonContainer}>
          <Link
            href={`https://www.unshackled.club/marketplace/${storeId}/products/${productId}`}
            style={button}
          >
            Try Payment Again
          </Link>
        </Section>
        <Text style={paragraph}>
          Before retrying, please ensure:
        </Text>
        <Text style={paragraph}>
          • Your card/account has sufficient funds
          <br />
          • Your card/account details are entered correctly
          <br />
          • Your card is not expired or blocked for online transactions
        </Text>
        <Text style={paragraph}>
          If you continue to experience issues, our support team is here to help.
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

const buttonContainer = {
  textAlign: "center" as const,
  marginTop: "26px",
  marginBottom: "26px",
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 20px",
  margin: "0 auto",
};