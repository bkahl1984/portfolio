"use client";

import { useRef } from "react";
import styled from "styled-components";
import {
  animate,
  stagger,
  useInView,
  useIsomorphicLayoutEffect,
} from "framer-motion";
import { H2 } from "./Text";

import { splitStringUsingRegex } from "@/functions/splitStringUsingRegex";

// TS
import { SectionTitleProps } from "../types";

const StyledSectionTitle = styled(H2)`
  display: flex;
  justify-content: center;

  position: relative;
  h2 {
    font-size: 1em;
    line-height: 1;
    padding-bottom: 14px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    white-space: pre-wrap;
    span {
      flex-shrink: 0;
    }
  }
  .line {
    background-color: ${({ theme }) => theme.cyan};
    height: var(--strokeWidth);
    width: calc(100% - 32px);
    left: 16px;
    position: relative;
    display: block;
  }
`;

const SectionTitle = ({ children, id }: SectionTitleProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true });

  useIsomorphicLayoutEffect(() => {
    const title = titleRef.current;
    const line = lineRef.current;

    if (!title || !line) return;

    const titleChars = Array.from(title.children);

    animate(
      titleChars,
      { y: inView ? [16, 0] : [0, 16], opacity: inView ? [0, 1] : [1, 0] },
      { duration: 0.5, delay: stagger(0.05) }
    );

    const insetStart = "inset(0 100% 0 0)";
    const insetEnd = "inset(0 0% 0 0)";

    animate(
      line,
      {
        clipPath: inView ? [insetStart, insetEnd] : [insetEnd, insetStart],
      },
      { duration: 0.8, delay: 0.15 }
    );
  }, [titleRef, lineRef, inView]);

  return (
    <StyledSectionTitle id={id} as="div">
      <div>
        <h2 ref={titleRef}>
          {splitStringUsingRegex(children).map((char, index) => (
            <span key={index} style={{ opacity: 0 }}>
              {char}
            </span>
          ))}
        </h2>
        <div
          ref={lineRef}
          className="line"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        ></div>
      </div>
    </StyledSectionTitle>
  );
};

export default SectionTitle;
