"use client";

import { memo } from "react";
import styled from "styled-components";
import Section from "@/components/Section";
import SectionDivider from "@/components/SectionDivider";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/layout/Container";
import SectionDescription from "@/components/SectionDescription";

import ReviewCard from "@/components/ReviewCard";

import { reviews } from "@/data/reviews";
import REVIEWS from "@/data/reviews.json";

const StyledReviews = styled(Section)`
  .reviews {
    &__descr {
      margin-top: 48px;
    }
  }
`;

const Reviews = () => {
  const { title, description } = REVIEWS;

  return (
    <>
      <StyledReviews id="reviews">
        <Container>
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription className="reviews__descr">
            {description}
          </SectionDescription>

          {reviews.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Container>
      </StyledReviews>
      <Container>
        <SectionDivider />
      </Container>
    </>
  );
};

export default memo(Reviews);
