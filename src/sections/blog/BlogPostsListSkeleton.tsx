"use client";

import { styled } from "styled-components";
import Section from "@/components/Section";
import Container from "@/components/layout/Container";
import BlogPostCardSkeleton from "@/components/Blog/BlogPostCardSkeleton";

const Styled = styled(Section)`
  .inner {
    display: grid;
    grid-template-columns: 100%;
    gap: 2rem;
  }

  .posts-list {
    list-style-type: none;
    display: grid;
    gap: 1rem;

    max-width: 60rem;
    margin-left: auto;
    margin-right: auto;
  }
`;

const BlogPostsListSkeleton = () => {
  return (
    <Styled>
      <Container>
        <ul className="posts-list">
          <li>
            <BlogPostCardSkeleton />
          </li>
          <li>
            <BlogPostCardSkeleton />
          </li>
          <li>
            <BlogPostCardSkeleton />
          </li>
        </ul>
      </Container>
    </Styled>
  );
};

export default BlogPostsListSkeleton;
