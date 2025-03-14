"use client";

import styled from "styled-components";
import BurgerMenuIcon from "@/components/icons/BurgerMenu-Icon";

import { BurgerButtonProps } from "@/types";

const Button = styled.button`
  color: ${({ theme }) => theme.cyan};
  background-color: transparent;
  border: none;
  transition: color var(--duration);
  cursor: pointer;
  display: none;
  width: 2em;
  height: 2em;
  align-self: center;

  @media screen and (max-width: 991.98px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 575.98px) {
    width: 32px;
    height: 32px;
  }

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.fg};
    }
  }
`;

const BurgerButton = ({ isOpen, toggleMenu }: BurgerButtonProps) => {
  return (
    <Button className="burger" onClick={toggleMenu} aria-label="menu">
      <BurgerMenuIcon isOpen={isOpen} />
    </Button>
  );
};

export default BurgerButton;
