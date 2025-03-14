"use client";

import styled from "styled-components";
import { H4 } from "../../Text";
import { ReactNode } from "react";
import { motion } from "framer-motion";

const StyledWrapper = styled.li`
  text-align: center;

  width: 100%;
  position: relative;

  > div {
    margin-top: 0.5rem;
    position: relative;
    width: 100%;
    min-height: 20rem;
    > * + * {
      margin-top: 0.5rem;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.cyan};
    filter: blur(48px);
    opacity: 0.15;
    transform: scale(0.8);
    transition-property: transform, opacity;
    transition-duration: 0.5s;
  }

  &:hover:before {
    transform: scale(1);
    opacity: 0.3;
  }
`;

type Props = {
  heading: string;
  children: ReactNode;
};

const MotionHeading = motion(H4);
const MotionStyledWrapper = motion(StyledWrapper);

const Wrapper = (props: Props) => {
  const { heading, children } = props;

  return (
    <MotionStyledWrapper
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        opacity: {
          duration: 0.7,
        },
      }}
    >
      <MotionHeading>{heading}</MotionHeading>
      <div>{children}</div>
    </MotionStyledWrapper>
  );
};

export default Wrapper;
