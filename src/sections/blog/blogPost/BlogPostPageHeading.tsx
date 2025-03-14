"use client";

import { H2, P2 } from "@/components/Text";
import { BlogPost } from "@/types/notion";
import { formatDate } from "@/utils/formatDate";
import styled from "styled-components";
import Image from "next/image";

const Styled = styled.div`
  .cover {
    width: 100%;
    aspect-ratio: 16 / 9;
    position: relative;
    clip-path: inset(0 round 1rem);
    /* border: solid 2px ${({ theme }) => theme.cyan}; */
    img {
      object-fit: cover;
    }
  }
  .title {
    margin-top: 2rem;
  }
  .additional {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    color: ${({ theme }) => theme.grey};
  }
`;

const BlogPostPageHeading = ({
  id,
  title,
  description,
  slug,
  date,
  tags,
  coverUrl,
  blurDataUrl,
  readingTime,
}: BlogPost) => {
  return (
    <Styled>
      {coverUrl && (
        <div className="cover">
          <Image
            src={coverUrl}
            priority
            sizes="(max-width: 479px) 432px, (max-width: 767px) 540px, 640px"
            alt=""
            fill
            quality={80}
            unoptimized
            {...(blurDataUrl && {
              placeholder: "blur",
              blurDataURL: blurDataUrl,
            })}
          />
        </div>
      )}
      <H2 className="title">{title}</H2>
      <div className="additional">
        {date && <P2>{formatDate(date)}</P2>}
        {tags && tags.length > 0 && (
          <>
            {date && <P2>•</P2>}
            {tags.map((tag) => (
              <P2 key={tag}>#{tag.toLowerCase()}</P2>
            ))}
          </>
        )}
        {readingTime && (
          <>
            {(date || tags) && <P2>•</P2>}
            {
              <P2>
                {readingTime} {readingTime > 1 ? "mins" : "min"} read
              </P2>
            }
          </>
        )}
      </div>
    </Styled>
  );
};

export default BlogPostPageHeading;
