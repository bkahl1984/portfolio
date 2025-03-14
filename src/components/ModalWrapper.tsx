import { useContext } from "react";
import styled from "styled-components";
import { m, LazyMotion, AnimatePresence } from "framer-motion";

const framerFeatures = () =>
  import("./../features/framerFeatures").then((res) => res.default);

import ScrollLockContext from "@/contexts/ScrollLockContext";
import { ModalWrapperProps, StyledModalWrapperProps } from "@/types";

const StyledModalWrapper = styled(m.div)<StyledModalWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding-right: ${({ $scrollbarCompensation }) =>
    $scrollbarCompensation ? `${$scrollbarCompensation}px` : 0};
  height: 100%;
  height: 100dvh;
  z-index: 2;

  &:after {
    content: "";
    display: inline-block;
    background-color: ${({ theme }) => theme.bg};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    opacity: 0.85;
  }
`;

const ModalWrapper = ({ closeModal, ...props }: ModalWrapperProps) => {
  const { scrollbarCompensation } = useContext(ScrollLockContext);

  return (
    <LazyMotion features={framerFeatures}>
      <StyledModalWrapper
        $scrollbarCompensation={scrollbarCompensation}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
        {...props}
      ></StyledModalWrapper>
    </LazyMotion>
  );
};

export default ModalWrapper;
