"use client";

import styled from "styled-components";
import { usePathname } from "next/navigation";

// Types
import { MenuLinksProps, StyledLinksProps } from "../types";

// UI
import NavLinkItem from "./NavLinkItem";

const StyledNav = styled.ul<StyledLinksProps>`
  display: grid;
  justify-content: center;

  ${({ $isMobile }) =>
    $isMobile
      ? {
          // Mobile Nav
          gap: "5vh",
          alignItems: "center",
          gridAutoFlow: "row",
        }
      : {
          // Desktop Nav
          gap: "3em",
          alignItems: "stretch",
          gridAutoFlow: "column",
        }}
`;

const navLinks = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/#about",
    text: "About",
  },
  {
    href: "/#projects",
    text: "Projects",
  },
  // {
  //   href: "/#reviews",
  //   text: "Reviews",
  // },
  {
    href: "/#contact",
    text: "Contact",
    isExternal: false,
  },
  // {
  //   href: "/blog",
  //   text: "Blog",
  //   isExternal: false,
  // },
  // {
  //   href:
  //   text: "YouTube",
  //   isExternal: true,
  // },
];

function isLinkActive(href: string, pathname: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname.includes(href);
}

const Nav = ({ isMobile = false, toggleMenu }: MenuLinksProps) => {
  const pathname = usePathname();

  const handleClick = () => {
    if (isMobile && toggleMenu) toggleMenu();
  };

  return (
    <StyledNav $isMobile={isMobile}>
      {navLinks.map(({ text, href, isExternal, ...props }) => (
        <NavLinkItem
          key={text}
          text={text}
          href={href}
          isMobile={isMobile}
          isActive={isLinkActive(href, pathname)}
          isExternal={isExternal}
          onClick={handleClick}
          {...props}
        />
      ))}
    </StyledNav>
  );
};

export default Nav;
