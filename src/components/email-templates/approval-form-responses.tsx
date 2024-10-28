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
import { IApprovalFormResponses } from "~/server/db/schema";

interface ApprovalFormResponsesProps {
  formResponses: {question: string, answer: string}[];
  customerId: string;
  name: string;
}

export const ApprovalFormResponses: React.FC<
  Readonly<ApprovalFormResponsesProps>
> = ({ formResponses, name }) => (
  <Html>
    <Head />
    <Preview>
      You have a new request for approval/denial, review form responses below.
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
          You have a new request for approval/denial. Please review the form responses below.
        </Text>
        
        <Hr style={hr} />

        {formResponses.map((response, index) => (
          <Section key={index}>
            <Text style={questionStyle}>Question: {response.question}</Text>
            <Text style={answerStyle}>Answer: {response.answer}</Text>
            <Hr style={hr} />
          </Section>
        ))}

        <Text style={paragraph}>
          Please head to your vendor dashboard to accept/deny this request.
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
