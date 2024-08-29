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

interface VendorDeniedEmailTemplateProps {
  firstName: string;
}

export const VendorDeniedEmailTemplate: React.FC<
  Readonly<VendorDeniedEmailTemplateProps>
> = ({ firstName }) => (
  <Html>
    <Head />
    <Preview>
      We regret to inform you that your request to become a seller on the
      Unshackled marketplace has been denied.
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
        <Text style={paragraph}>
          We regret to inform you that your request to become a seller on the
          Unshackled marketplace has been denied.
        </Text>
        {/* TODO: Add reason why the vendor was denied */}
        {/* <Text style={paragraph}>
          You can now list your services on unshackled marketplace.
        </Text> */}
        {/* <Section style={btnContainer}>
          <Button style={button} href="https://getkoala.com">
            Get started
          </Button>
        </Section> */}
        <Text style={paragraph}>
          Best,
          <br />
          The Unshackled team
        </Text>
        {/* <Hr style={hr} />
        <Text style={footer}>
          470 Noor Ave STE B #1148, South San Francisco, CA 94080
        </Text> */}
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
