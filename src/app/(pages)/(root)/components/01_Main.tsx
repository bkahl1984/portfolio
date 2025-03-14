"use client";

import { memo, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import Section from "@/components/Section";
import SectionDivider from "@/components/SectionDivider";
import Container from "@/components/layout/Container";
import { H1, H2, P1 } from "@/components/Text";
import ScrollDownIcon from "@/components/icons/ScrollDown";

import bg from "public/assets/bg.jpg";
import { animate, stagger, useIsomorphicLayoutEffect } from "framer-motion";

const StyledMain = styled(Section)`
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background: transparent;
  z-index: 1;
  white-space: pre-wrap;

  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.2;
    pointer-events: none;
    user-select: none;
    img {
      object-fit: cover;
    }
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        transparent 70%,
        ${({ theme }) => theme.bg} 100%
      );
    }
  }

  .main {
    position: relative;
    padding: 6em 0;

    &__content {
      display: flex;
      justify-content: space-between;

      @media screen and (max-width: 991.98px) {
        flex-direction: column-reverse;
        align-items: center;
        text-align: center;
      }
    }

    &__info {
      margin-right: 16px;
    }

    &__photo {
      position: relative;
      margin-right: calc(20px + var(--strokeWidth) * 2);
      margin-top: 10px;
      --photo-size: 210px;
      @media screen and (max-width: 991.98px) {
        --photo-size: 180px;
        margin-bottom: 32px;
      }

      &_inner {
        width: var(--photo-size);
        height: var(--photo-size);
        border-radius: var(--borderRadiusNormal);
        border: solid var(--strokeWidth) ${({ theme }) => theme.cyan};
        flex-shrink: 0;
        position: relative;
        background-color: ${({ theme }) => theme.bg};
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &::before {
        content: "";
        display: block;
        width: var(--photo-size);
        height: var(--photo-size);
        border-radius: var(--borderRadiusNormal);
        border: solid var(--strokeWidth) ${({ theme }) => theme.cyan};
        border-color: ${({ theme }) => theme.grey};
        position: absolute;
        top: calc(var(--photo-size) / 12);
        left: calc(var(--photo-size) / 12);
        box-sizing: border-box;
      }
    }

    &__scroll-btn {
      display: block;
      margin: 64px auto 0;
      padding: 0;
      position: absolute;
      left: calc(50% - 1em);
      bottom: 40px;
      width: 2em;
      height: 2em;
      font-size: 1em;
      color: ${({ theme }) => theme.cyan};
      background-color: transparent;
      border: none;
      cursor: pointer;
      transition: transform var(--duration);
      img,
      svg {
        width: 100%;
        height: 100%;
      }
      &:hover {
        transform: translateY(0.125em);
      }
    }
  }

  .accent {
    color: ${({ theme }) => theme.cyan};
  }

  .description {
    margin-top: 16px;
    color: ${({ theme }) => theme.grey};
    span {
      font-weight: 700;
    }
  }
`;

const Main = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const contentWrapper = contentRef.current;

    if (!contentWrapper) return;

    const titleSpans = contentWrapper.querySelectorAll(".title span");
    const subtitleSpans = contentWrapper.querySelectorAll(".subtitle span");
    const description = contentWrapper.querySelector(".description")!;
    const photoWrapper = contentWrapper.querySelector(".main__photo")!;

    const elementsToAnimate = [
      ...Array.from(titleSpans),
      ...Array.from(subtitleSpans),
    ];

    animate(
      elementsToAnimate,
      {
        opacity: [0, 1],
      },
      {
        duration: 0.5,
        delay: stagger(0.25, { ease: "easeIn" }),
      }
    );

    animate(
      description,
      {
        opacity: [0, 1],
      },
      {
        duration: 0.7,
        delay: 1.7,
      }
    );

    animate(
      photoWrapper,
      {
        opacity: [0, 1],
      },

      { duration: 1, delay: 2 }
    );
  }, [contentRef]);

  return (
    <>
      <StyledMain id="home">
        <div className="bg">
          <Image
            src={bg}
            alt=""
            placeholder="blur"
            quality="50"
            fill
            priority
          />
        </div>

        <div className="main">
          <Container>
            <div className="main__content" ref={contentRef}>
              <div className="main__info">
                <H1 className="title">
                  <span>Hello,</span>
                </H1>
                <H2 className="subtitle">
                  <span>I </span>
                  <span>am </span>
                  <span className="accent">Brad Kahl</span>
                  <span>{`, \n`}</span>
                  <span>Frontend </span>
                  <span>Developer</span>
                </H2>
                <P1 className="description">
                  Based in <span>Roanoke, Virginia</span>, I&apos;m passionate about
                  creating engaging, digital experiences on the web.
                </P1>
              </div>
              <div className="main__photo">
                <div className="main__photo_inner">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_URL}/IMG_BKAHL-3.jpg`}
                    sizes="(max-width: 991.98px) 464px, 624px"
                    alt="Photo of Brad Kahl, frontend developer"
                    fill
                    priority
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>

        <a
          href="#about"
          className="main__scroll-btn"
          aria-label="scroll down"
          title="scroll down"
        >
          <ScrollDownIcon />
        </a>
      </StyledMain>
      <Container>
        <SectionDivider />
      </Container>
    </>
  );
};

export default memo(Main);
