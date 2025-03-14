"use client";

import styled from "styled-components";
import { StyledBlogPostCard } from "./BlogPostCard";
import { H4, P1, P2 } from "../Text";

const StyledSkeleton = styled(StyledBlogPostCard)`
  pointer-events: none;
  user-select: none;

  .cover {
    animation: cover-shine 2s infinite;
    background-size: 600px;
  }

  .skeleton {
    --baseColor: ${({ theme }) => theme.cardBg};
    --shineColor: #77777788;
    background-image: linear-gradient(
      to right,
      var(--baseColor) 0%,
      var(--shineColor) 30%,
      var(--baseColor) 60%
    );
    clip-path: inset(0 round 0.5rem);
    > * {
      opacity: 0;
    }
  }

  .text-skeleton {
    animation: text-shine 2s infinite 0.3s;
    background-size: 1600px;
  }

  .title {
    margin-bottom: 1rem;
  }

  .description {
    &:last-child {
      width: 70%;
    }
  }

  @keyframes cover-shine {
    from {
      background-position: -320px;
    }
    to {
      background-position: 256px;
    }
  }

  @keyframes text-shine {
    from {
      background-position: -900px;
    }
    to {
      background-position: 600px;
    }
  }
`;

const BlogPostCardSkeleton = () => {
  return (
    <StyledSkeleton href="/">
      <div className="cover skeleton"></div>
      <div className="info">
        <div className="title text-skeleton skeleton">
          <H4>title</H4>
        </div>
        <div className="description text-skeleton skeleton">
          <P1>description</P1>
        </div>
        <div className="description text-skeleton skeleton">
          <P1>description</P1>
        </div>
      </div>
    </StyledSkeleton>
  );
};

export default BlogPostCardSkeleton;
