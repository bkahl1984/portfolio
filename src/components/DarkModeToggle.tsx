"use client";

import styled from "styled-components";
import { useTheme } from "next-themes";

import SunIcon from "@/components/icons/Sun";
import MoonIcon from "@/components/icons/Moon";
import useMounted from "@/hooks/useMounted";

const StyledToggle = styled.label`
  position: relative;
  display: inline-block;
  align-self: center;
  width: 4em;
  height: 2em;
  background-color: ${({ theme }) => theme.cardBg};
  border-radius: 1em;
  --size: 1.25em;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow var(--duration);
  box-sizing: content-box;
  input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  @media screen and (hover: hover) {
    &:hover {
      box-shadow: 0 0 4px #05050533;
    }
  }

  .slider {
    box-shadow: 0 0 4px #05050533;
    background-color: ${({ theme }) => theme.bg};

    width: var(--size);
    height: var(--size);
    top: 0.375em;
    left: 0.375em;
    position: relative;
    border-radius: 50%;
    display: inline-block;
    transition: all var(--duration-long);
    z-index: 1;
  }

  input:checked ~ .slider {
    transform: translateX(2em);
    background-color: ${({ theme }) => theme.fg};
  }

  input:checked ~ .moon {
    opacity: 1;
    left: 0.375em;
  }

  input:checked ~ .sun {
    opacity: 0;
    right: -1em;
  }

  svg {
    width: var(--size);
    height: var(--size);
    position: absolute;
    top: 0.375em;
    color: ${({ theme }) => theme.cyan};
    transition: all var(--duration-long);
  }

  &:hover {
    svg {
      color: ${({ theme }) => theme.cyanHover};
    }
  }

  .sun {
    right: 0.375em;
    opacity: 1;
  }
  .moon {
    left: -1em;
    opacity: 0;
  }
`;

function DarkModeToggle() {
  const isMounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();

  // If not mounted, render a skeleton
  if (!isMounted) return <StyledToggle></StyledToggle>;

  return (
    <StyledToggle
      aria-label={`switch to ${
        resolvedTheme === "light" ? "dark" : "light"
      } theme`}
    >
      <input
        type="checkbox"
        checked={resolvedTheme === "dark"}
        onChange={() => {
          setTheme(resolvedTheme === "light" ? "dark" : "light");
        }}
      />
      <span className="slider"></span>
      <MoonIcon />
      <SunIcon />
    </StyledToggle>
  );
}

export default DarkModeToggle;
