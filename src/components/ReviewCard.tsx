"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect, animate, useInView } from "framer-motion";
import styled from "styled-components";
import Image from "next/image";

import { Review, ReviewCardRef } from "../types";
import { P1, P2 } from "@/components/Text";
import UserIcon from "@/components/UserIcon";

interface ReviewCardProps extends Review {}

const StyledReviewCard = styled.div`
  margin-top: 48px;
  padding: 32px;
  background: ${({ theme }) => theme.cardBg};
  border-radius: var(--borderRadiusNormal);
  max-width: 60rem;
  margin-left: auto;
  margin-right: auto;

  @media screen and (max-width: 991.98px) {
    padding: 24px;
  }

  .card {
    &__text {
      & > *:not(:first-child) {
        margin-top: 16px;
      }
      .bold-white {
        font-weight: 700;
        color: ${({ theme }) => theme.fg};
      }

      .bold-cyan {
        font-weight: 700;
        color: ${({ theme }) => theme.cyan};
      }
      * {
        @media screen and (max-width: 991.98px) {
          font-size: 16px;
          line-height: 24px;
        }
      }
    }
    &__sign {
      display: flex;
      align-items: center;
      margin-top: 16px;
    }
    &__photo {
      position: relative;
      width: 72px;
      height: 72px;
      border-radius: 50%;
      margin-right: 16px;
      overflow: hidden;
      flex-shrink: 0;
      svg {
        color: ${({ theme }) => theme.grey};
      }
    }
    &__name {
      color: ${({ theme }) => theme.cyan};
      font-weight: 700;
    }
    &__position {
      color: ${({ theme }) => theme.grey};
    }
  }
`;

const ReviewCard = ({
  reviewText,
  name,
  position,
  company,
  photo,
}: ReviewCardProps) => {
  const ref = useRef<ReviewCardRef>(null);
  const inView = useInView(ref, { once: true });

  useIsomorphicLayoutEffect(() => {
    const cardElement = ref.current;

    if (!cardElement) return;

    animate(cardElement, { y: 50, opacity: 0 }, { duration: 0 });

    if (!inView) return;

    animate(cardElement, { y: 0, opacity: 1 }, { duration: 0.7 });
  }, [ref, inView]);

  return (
    <StyledReviewCard className="card" ref={ref}>
      <div className="card__text">{reviewText}</div>
      <div className="card__sign">
        <div className="card__photo">
          {photo ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_URL}/assets/reviews/${photo}`}
              alt={`Photo of ${name}`}
              fill
              sizes="72px"
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <P1 className="card__name">{name}</P1>
          <P2 className="card__position">
            {[position, company].filter(Boolean).join(", ")}
          </P2>
        </div>
      </div>
    </StyledReviewCard>
  );
};

export default ReviewCard;
