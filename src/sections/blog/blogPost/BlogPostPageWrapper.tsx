"use client";

import styled from "styled-components";
import Container from "@/components/layout/Container";
import { ReactNode } from "react";

const Styled = styled.div`
  padding-top: 8rem;

  .inner {
    display: grid;
    grid-template-columns: 100%;
    gap: 2rem;
    max-width: 40rem;
    margin-left: auto;
    margin-right: auto;
  }

  .heading {
    display: grid;
    gap: 1rem;
    position: relative;
    z-index: 1;
  }

  .subheading {
    display: flex;
    > * + * {
      margin-left: 2rem;
    }
  }
`;

const BlogPostPageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Styled>
      <Container>
        <div className="inner">{children}</div>
      </Container>
    </Styled>
  );
};

export default BlogPostPageWrapper;
