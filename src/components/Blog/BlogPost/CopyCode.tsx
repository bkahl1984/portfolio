"use client";

import CheckIcon from "@/components/icons/CheckIcon";
import CopyIcon from "@/components/icons/CopyIcon";
import SuccessIcon from "@/components/icons/SucessIcon";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledCopyButton = styled.button`
  padding: 0.5rem;
  background-color: transparent;
  background-color: #77777700;
  color: ${({ theme }) => theme.grey};

  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  transition: background-color, color;
  transition-duration: 0.15s;

  &:hover {
    background-color: #77777733;
    color: ${({ theme }) => theme.fg};
  }

  svg {
    color: currentColor;
  }
`;

const CopyCode = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!copied) return;

    // Clear timeout each time we click on "Copy" button
    clearTimeout(timeoutRef.current!);

    timeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 3000);

    return () => clearTimeout(timeoutRef.current!);
  }, [copied]);

  return (
    <StyledCopyButton
      onClick={async () => {
        try {
          await window?.navigator?.clipboard?.writeText(code);
          setCopied(true);
        } catch (error) {
          console.warn("Navigator API is not available in your browser");
        }
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </StyledCopyButton>
  );
};

export default CopyCode;
