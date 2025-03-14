"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";

import Link from "next/link";
import ArrowIcon from "@/components/icons/Arrow";

const StyledBtn = styled.button`
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.fg};
  text-decoration: none;
  border-radius: 0.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  font-size: 1rem;

  svg {
    width: 0.75rem;
    height: 0.75rem;
    margin-right: 0.5rem;
    position: relative;
    transform: translateX(0px);
    transition: transform 0.15s;
  }

  &:hover {
    svg {
      transform: translateX(-4px);
    }
  }
`;

const BackToBlogBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    window?.history?.length > 2 ? router.back() : router.push("/blog");
  };

  return (
    <StyledBtn onClick={handleClick}>
      <ArrowIcon />
      Back to blog
    </StyledBtn>
  );
};

export default BackToBlogBtn;
