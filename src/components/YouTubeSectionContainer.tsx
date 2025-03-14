"use client";

import styled from "styled-components";
import Section from "./Section";
import Container from "./layout/Container";
import SectionTitle from "./SectionTitle";
import SectionDescription from "./SectionDescription";
import SectionDivider from "./SectionDivider";
import { ReactNode } from "react";

const StyledSection = styled(Section)`
  .wrapper {
    margin-top: 2rem;
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    justify-items: center;
    align-items: start;
    gap: 2rem;
  }
`;

type YouTubeSectionContainerProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

const YouTubeSectionContainer = (props: YouTubeSectionContainerProps) => {
  const { title, description, children } = props;

  return (
    <>
      <StyledSection>
        <Container>
          <div className="inner">
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription className="reviews__descr">
              {description}
            </SectionDescription>
            <ul className="wrapper">{children}</ul>
          </div>
        </Container>
      </StyledSection>
      <Container>
        <SectionDivider />
      </Container>
    </>
  );
};

export default YouTubeSectionContainer;
