import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactEmail = ({ name, email, message }: ContactEmailProps) => {
  const htmlNewlinesAsBreakPoints = (text?: string | null) => {
    const nParagraphs = text?.split("\n").length || 0;
    return text?.split("\n").map((paragraph, index) => (
      <React.Fragment key={index}>
        {paragraph}
        {index < nParagraphs - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <Html>
      <Head />
      <Preview>New message from {name} via Brad Kahl&apos;s portfolio</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={paragraph}>{htmlNewlinesAsBreakPoints(message)}</Text>
          <Hr style={hr} />
          <Text style={footer}>{name}</Text>
          <Text style={footer}>{email}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#000",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "1.2",
  margin: "4px 0",
};
