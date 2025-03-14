"use client";

// Core
import { styled } from "styled-components";
import Image from "next/image";
import Link from "next/link";

// Utils
import { formatDate } from "@/utils/formatDate";

// UI
import { BlogPost } from "@/types/notion";
import { H4, P1, P2 } from "../Text";
import Logo from "@/components/icons/LOGO";

export const StyledBlogPostCard = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  color: ${({ theme }) => theme.fg};
  text-decoration: none;
  padding: 1rem 0;

  @media screen and (max-width: 575.98px) {
    grid-template-columns: 100%;
  }

  .cover {
    width: 16rem;
    height: 9rem;
    position: relative;
    clip-path: inset(0 round 0.5rem);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.cardBg};
    img {
      object-fit: cover;
    }
    svg {
      width: 4rem;
    }
  }
  .info {
    display: grid;
    grid-template-columns: 100%;
    align-content: center;
    gap: 0.5rem;
  }
  .additional {
    display: flex;
    gap: 0.5rem;
  }
  p {
    color: ${({ theme }) => theme.grey};
  }
`;

type BlogPostCardProps = BlogPost;

const BlogPostCard = ({
  title,
  date,
  description,
  slug,
  tags,
  coverUrl,
  blurDataUrl,
}: BlogPostCardProps) => {
  console.log("blurDataUrl: ", blurDataUrl);
  return (
    <StyledBlogPostCard href={`/blog/${slug}`}>
      <div className="cover">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={title}
            sizes="256px"
            quality={80}
            fill
            unoptimized
            {...(blurDataUrl && {
              placeholder: "blur",
              blurDataURL: blurDataUrl,
            })}
          />
        ) : (
          <Logo />
        )}
      </div>
      <div className="info">
        <H4>{title}</H4>
        {description && <P1>{description}</P1>}
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
        </div>
      </div>
    </StyledBlogPostCard>
  );
};

export default BlogPostCard;
