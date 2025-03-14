"use client";

import Link from "next/link";
const MotionLink = motion(Link);

import styled from "styled-components";
import { Variants, motion } from "framer-motion";

// UI
import { H3, P1 } from "./Text";
import ExternalIcon from "./icons/ExternalIcon";

// Types
type NavLinkItemProps = {
  text: string;
  href: string;
  isExternal?: boolean;
  isActive?: boolean;
  isMobile?: boolean;
  onClick: () => void;
};

// Framer Motion Variants
const variants: Variants = {
  normal: {},
  active: {},
  hovered: {},
};

const linkVariants: Variants = {
  normal: {
    opacity: 0.7,
  },
  active: {
    opacity: 1,
  },
  hovered: {
    opacity: 1,
  },
};

const decoratorVariants: Variants = {
  normal: {
    clipPath: "inset(0 50% 0 50%)",
  },
  active: {
    clipPath: "inset(0 0% 0 0%)",
  },
  hovered: {},
};

// Styled component
const StyledMotionLinkItem = styled(motion.li)`
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: stretch;
  /* outline: solid red; */
  position: relative;

  a {
    color: ${({ theme }) => theme.fg};
    text-decoration: none;
    position: relative;
    display: flex;
    align-items: center;
    opacity: 0.7;
    /* &:after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0%;
      height: 0.1em;
      background-color: ${({ theme }) => theme.cyan};
      pointer-events: none;
      user-select: none;
      transition: width var(--duration);
    }
    &:hover:after {
      width: 100%;
    } */
  }
  svg,
  img {
    margin-left: 0.25rem;
    color: currentColor;
  }

  .decorator {
    display: block;

    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    height: 2.5px;
    transform: translateX(-50%);
    clip-path: inset(0 50% 0 50%);

    background-color: ${({ theme }) => theme.cyan};
    pointer-events: none;
    user-select: none;
  }
`;

const NavLinkItem = ({
  href,
  text,
  onClick,
  isExternal,
  isMobile,
  isActive,
}: NavLinkItemProps) => {
  const LinkText = isMobile ? H3 : P1;

  return (
    <StyledMotionLinkItem
      animate={isActive ? "active" : "normal"}
      whileHover="hovered"
      variants={variants}
    >
      <MotionLink
        variants={linkVariants}
        href={href}
        target={isExternal ? "_blank" : "_self"}
        className={`${isActive ? "active" : ""}`}
        onClick={onClick}
      >
        <LinkText as="span">{text}</LinkText>
        {isExternal && <ExternalIcon />}
      </MotionLink>

      <motion.span className="decorator" variants={decoratorVariants} />
    </StyledMotionLinkItem>
  );
};

export default NavLinkItem;
