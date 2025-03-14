"use client";

import { useRef, MouseEvent } from "react";
import Image from "next/image";
import styled from "styled-components";
import { ProjectSlideProps } from "../types";
import { H4, P1, P2 } from "@/components/Text";

import { BiCodeAlt } from "react-icons/bi";

import {
  animate,
  motion,
  useInView,
  useIsomorphicLayoutEffect,
} from "framer-motion";
import { useMouseEnter } from "@/hooks/useMouseEnter";

const StyledSlide = styled.li<{ $soon?: boolean }>`
  aspect-ratio: 16/9;
  display: flex;
  align-items: flex-end;
  position: relative;
  border-radius: var(--borderRadiusNormal);
  overflow: hidden;
  min-height: 240px;
  width: 100%;
  cursor: ${({ $soon }) => ($soon ? "initial" : "pointer")};
  .slide {
    &__img {
      --slide-size: 100%;
      width: var(--slide-size);
      height: var(--slide-size);
      flex-shrink: 0;
      overflow: hidden;
      box-shadow: 0 0 8px #35353533;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 1;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
      }
    }
    &__heading {
      p {
        color: ${({ theme }) => theme.grey};
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
    &__main {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 24px;
      color: ${({ theme }) => theme.white};

      &:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: calc(100% + 4em);
        pointer-events: none;
        user-select: none;
        background: linear-gradient(to bottom, transparent -00%, #090909 100%);
      }
      > * {
        position: relative;
      }
    }
    &__buttons {
      display: flex;
      margin-left: 1em;
      @media screen and (max-width: 991.98px) {
        justify-content: center;
      }
      > * + * {
        margin-left: 0.5em;
      }
    }
    &__btn {
      text-decoration: none;
      font-weight: 700;
      padding: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: var(--borderRadiusNormal);
      color: inherit;
      cursor: pointer;
      transition: background-color var(--duration), color var(--duration);
      border: none;
      &:hover {
        color: #dddcdc;
      }
      &-primary {
        background-color: ${({ theme }) => theme.cyan};
        color: inherit;

        &:hover {
          background-color: ${({ theme }) => theme.cyanHover};
        }
      }
      p {
        font-weight: 700;
      }

      &-disabled {
        color: #686868;
      }
    }
  }
  .overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #05050599;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;

const ProjectSlide = ({
  img,
  title,
  description,
  previewLink,
  codeLink,
  previewProject,
  soon,
}: ProjectSlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const inView = useInView(slideRef, { once: true });
  const { isMouseEntered } = useMouseEnter(slideRef);

  useIsomorphicLayoutEffect(() => {
    const slideElement = slideRef.current;

    if (!slideElement) return;

    if (!inView) return;

    animate(slideElement, { y: [32, 0], opacity: [0, 1] }, { duration: 0.5 });
  }, [slideRef, imageRef, inView]);

  // Hover
  useIsomorphicLayoutEffect(() => {
    const slideElement = slideRef.current;
    const imageElement = imageRef.current;

    if (!slideElement || !imageElement) return;

    if (isMouseEntered) {
      animate(imageElement, { scale: [1, 1.05] }, { duration: 0.15 });
    } else {
      animate(imageElement, { scale: [1.05, 1] }, { duration: 0.3 });
    }
  }, [slideRef, imageRef, isMouseEntered]);

  const projectImg = (
    <div className="slide__img">
      <Image
        src={`${process.env.NEXT_PUBLIC_URL}/${img}`}
        sizes="(max-width: 991.98px) 511px, (max-width: 991.98px) 720px, 645px"
        quality={80}
        loading="lazy"
        alt=""
        fill
        ref={imageRef}
      />
    </div>
  );

  if (soon) {
    return (
      <StyledSlide $soon={soon}>
        {projectImg}

        <div className="overlay">
          <H4 as="h3">Soon!</H4>
        </div>
      </StyledSlide>
    );
  }

  return (
    <StyledSlide
      onClick={() => {
        // zoomOut();
        previewLink && previewProject(previewLink);
      }}
      ref={slideRef}
      style={{ opacity: 0 }}
    >
      {projectImg}

      <div className="slide__main">
        <div className="slide__heading">
          <H4 as="h3">{title}</H4>
          {description && <P2>{description}</P2>}
        </div>
        <div className="slide__buttons">
          {codeLink && codeLink.length > 0 ? (
            <P1
              as="a"
              href={codeLink}
              target="_blank"
              className="slide__btn slide__btn-primary"
              onClick={(e: MouseEvent<HTMLAnchorElement>) =>
                e.stopPropagation()
              }
              aria-label={`View the source code of ${title}`}
            >
              <BiCodeAlt />
            </P1>
          ) : null}
        </div>
      </div>
    </StyledSlide>
  );
};

export default ProjectSlide;
