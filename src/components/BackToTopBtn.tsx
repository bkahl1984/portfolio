"use client";

import styled from "styled-components";
import { useContext, useMemo } from "react";

import ArrowIcon from "@/components/icons/Arrow";
import useScrollDelta from "@/hooks/useScrollDelta";
import ScrollLockContext from "@/contexts/ScrollLockContext";
import { motion, AnimatePresence } from "framer-motion";

type StyledBtnProps = {
  $scrollbarCompensation: number | null;
};

const StyledBtn = styled(motion.button)<StyledBtnProps>`
  position: fixed;
  font-size: 1.5em;
  width: 2em;
  height: 2em;
  /* bottom: calc(100lvh - 3em); */
  bottom: 1em;
  right: 1em;
  padding: 0.5em;
  margin-right: ${({ $scrollbarCompensation }) =>
    $scrollbarCompensation + "px" || 0};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.bg};
  z-index: 1;
  pointer-events: none;
  user-select: none;
  opacity: 0.75;
  cursor: pointer;
  transition: opacity var(--duration);

  pointer-events: initial;
  user-select: initial;

  &:hover {
    background-color: ${({ theme }) => theme.fg};
    opacity: 0.9;
  }

  > svg {
    transform: rotate(90deg);
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const BackToTopBtn = () => {
  const { scrollbarCompensation } = useContext(ScrollLockContext);

  const { scrolledUp, scrollPosition } = useScrollDelta();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const visible = scrolledUp && scrollPosition > 400;

  return (
    <AnimatePresence>
      {visible && (
        <StyledBtn
          key="backToTopBtn"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.75, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.15, ease: "easeIn" }}
          $scrollbarCompensation={scrollbarCompensation}
          onClick={scrollToTop}
        >
          <ArrowIcon />
        </StyledBtn>
      )}
    </AnimatePresence>
  );
};

export default BackToTopBtn;
