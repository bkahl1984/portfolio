"use client";

import { motion } from "framer-motion";

import styled from "styled-components";
import { P1 } from "./Text";

import { SectionDescriptionProps } from "../types";

const StyledSectionDescription = styled(P1)`
  text-align: center;
  padding: 0 80px;
  color: ${({ theme }) => theme.grey};
  margin-top: 40px;
  text-wrap: balance;

  @media screen and (max-width: 991.98px) {
    padding: 0 40px;
  }

  @media screen and (max-width: 767.98px) {
    padding: 0;
  }
`;

const MotionDescription = motion(StyledSectionDescription);

const SectionDescription = ({ children }: SectionDescriptionProps) => {
  return (
    <MotionDescription
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {children}
    </MotionDescription>
  );
};

export default SectionDescription;
