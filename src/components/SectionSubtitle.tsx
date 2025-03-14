"use client";

import { useRef } from "react";
import styled from "styled-components";
import textByChars from "../functions/textByChars";
import { motion } from "framer-motion";
import { H3 } from "./Text";

import { SectionSubtitleProps } from "../types";
import { splitStringUsingRegex } from "@/functions/splitStringUsingRegex";

const StyledSectionSubtitle = styled(H3)`
  overflow: hidden;
  @media screen and (max-width: 991.98px) {
    text-align: center;
  }
`;

const SectionSubtitle = ({ children }: SectionSubtitleProps) => {
  return (
    <StyledSectionSubtitle>
      {splitStringUsingRegex(children).map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          {char}
        </motion.span>
      ))}
    </StyledSectionSubtitle>
  );
};

export default SectionSubtitle;
