"use client";

import { styled } from "styled-components";
import Container from "@/components/layout/Container";
import { H2, P1 } from "@/components/Text";
import Image from "next/image";
import HeroBg from "/public/assets/blog/FullSizeRender2.jpg";

const Styled = styled.div`
  padding-top: 6rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .heading {
    padding: 8rem 0;
    text-align: center;
    max-width: 36rem;
    position: relative;
    z-index: 1;
  }

  h2 {
    position: relative;
    margin-bottom: 1.5rem;
  }

  p {
    span {
      color: ${({ theme }) => theme.cyan};
    }
  }

  .bg {
    opacity: 0.25;
    object-fit: cover;
  }
`;

const BlogHero = () => {
  return (
    <Styled>
      <Container>
        <div className="inner">
          <Image
            className="bg"
            src={HeroBg}
            placeholder="blur"
            quality={60}
            sizes="(min-width: 1200px) 1200px, (min-width: 768px) 768px, 480px"
            alt=""
            fill
          />
          <div className="heading">
            <H2>Blog</H2>
            <P1>
              Discover the latest <span>Brad&apos;s posts</span> about{" "}
              <span>frontend development</span>, sharing his best practices,
              tips and tricks.
            </P1>
          </div>
        </div>
      </Container>
    </Styled>
  );
};

export default BlogHero;
