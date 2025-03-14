"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

const StyledMotionSVG = styled(motion.svg)`
  path {
    color: ${({ theme }) => theme.cyan};
  }
`;

const CheckIcon = () => {
  return (
    <StyledMotionSVG
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15.04 11.06"
      width="16"
      height="16"
      initial={{
        clipPath: "inset(0 100% 0 0)",
      }}
      animate={{
        clipPath: "inset(0 0% 0 0)",
      }}
    >
      <path
        d="m.82,4.8c.23,0,.41.1.58.25,1.06.96,2.12,1.91,3.18,2.86.18.16.36.33.55.49.4.35.86.32,1.22-.07,1.86-2.06,3.72-4.12,5.57-6.18.57-.63,1.13-1.26,1.7-1.88.25-.28.61-.34.93-.2.31.14.52.46.46.8-.03.18-.12.38-.24.52-1.6,1.8-3.22,3.58-4.83,5.37-1.18,1.31-2.36,2.62-3.54,3.93-.44.48-.88.5-1.35.06-1.59-1.5-3.18-3-4.77-4.49-.25-.23-.35-.51-.27-.84.08-.3.27-.49.57-.58.07-.02.15-.02.22-.04Z"
        fill="currentColor"
      />
    </StyledMotionSVG>
  );
};

export default CheckIcon;
