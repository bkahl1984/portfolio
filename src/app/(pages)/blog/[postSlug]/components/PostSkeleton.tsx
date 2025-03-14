"use client";

import styled from "styled-components";
import Skeleton from "@/components/Skeleton";

const PostCoverSkeleton = styled(Skeleton)`
  aspect-ratio: 16 / 9;
  position: relative;
  clip-path: inset(0 round 1rem);
`;

const HeadingSkeleton = styled.div`
  .title {
    display: grid;
    row-gap: 16px;

    > div {
      height: 44px;
      &:last-child {
        width: 65%;
      }
    }
  }

  .additional {
    margin-top: 1rem;
    height: 18px;
    width: 40%;
  }
`;

const ParagraphSkeleton = styled.div`
  display: grid;
  row-gap: 8px;
  > div {
    height: 14px;
    &:nth-child(even) {
      width: 97%;
    }
    &:last-child {
      width: 40%;
    }
  }
`;

const PostSkeleton = () => {
  return (
    <>
      <PostCoverSkeleton />
      <HeadingSkeleton>
        <div className="title">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
        <div className="additional">
          <Skeleton />
        </div>
      </HeadingSkeleton>
      <ParagraphSkeleton>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </ParagraphSkeleton>
      <ParagraphSkeleton>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </ParagraphSkeleton>
      <ParagraphSkeleton>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </ParagraphSkeleton>
    </>
  );
};

export default PostSkeleton;
