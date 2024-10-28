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

interface CustomerListingApprovalProps {
  productId: string;
  name: string;
  status: "pending" | "approved" | "denied";
}

export const CustomerListingApproval: React.FC<
  Readonly<CustomerListingApprovalProps>
> = ({ name, status }) => (
  <Html>
    <Head />
    <Preview>
        {
          status === "approved" ?
          "Congratulations, Your request for a service was approved." :
          "Your request for a sevice you requested has been deined"
        }
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
        <Text style={paragraph}>Hello {name},</Text>
        <Text style={paragraph}>
            {
                status === "approved" ?
                "A vendor approved your request for a service.":
                "Your request for a sevice you requested has been deined"
            }
        </Text>
        
        <Hr style={hr} />

        <Text style={paragraph}>
            {
                status === "approved" ?
                "Please head service listing page for purchase." :
                "Please head service listing page for submitting new request again."
            }
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

const questionStyle = {
  fontWeight: "bold",
  fontSize: "15px",
  lineHeight: "24px",
};

const answerStyle = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#333",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
