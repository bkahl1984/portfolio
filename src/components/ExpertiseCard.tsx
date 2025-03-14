"use client";

import styled from "styled-components";
import Image from "next/image";
import { P2 } from "./Text";
import { ExpertiseCardProps } from "@/types";

const StyledCard = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5em 0;
  width: 140px;
  list-style-type: none;

  > * + * {
    margin-top: 1em;
  }

  .icon {
    width: 48px;
    height: 48px;
    position: relative;
  }

  .text {
    text-align: center;
    &__descr {
      margin-top: 8px;
      color: ${({ theme }) => theme.grey};
    }
  }

  @media screen and (max-width: 767.98px) {
    grid-auto-flow: column;
    align-items: center;
    font-weight: 400;

    .text {
      &__title {
        font-size: 24px;
        line-height: 32px;
        font-weight: 400;
      }

      &__descr {
        display: none;
      }
    }
  }
`;

const ExpertiseCard = ({ icon, title }: ExpertiseCardProps) => {
  return (
    <StyledCard>
      <div className="icon">
        <Image src={`${process.env.NEXT_PUBLIC_URL}/assets/tech-icons/${icon}`} alt="" title={title} fill />
      </div>

      <div className="text">
        <P2 className="text__title">{title}</P2>
      </div>
    </StyledCard>
  );
};

export default ExpertiseCard;
