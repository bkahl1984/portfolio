"use client";

// Core
import { memo } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

// UI
import Container from "@/components/layout/Container";
import { P2 } from "@/components/Text";
const MotionP2 = motion(P2);

const StyledFooter = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.grey};
  padding: 60px 0;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <MotionP2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{ duration: 0.7 }}
        >
          © Copyright {new Date().getFullYear()} | Brad Kahl | All
          Rights Reserved
        </MotionP2>
      </Container>
    </StyledFooter>
  );
};

export default memo(Footer);
