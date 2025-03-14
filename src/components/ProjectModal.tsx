"use client";

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import Loading from "./Loading";
import { ProjectModalProps, ProjectModalRef } from "../types";
import ModalWrapper from "./ModalWrapper";

const StyledModal = styled(ModalWrapper)`
  z-index: 3;

  .close {
    position: absolute;
    right: 2%;
    top: 2%;
    width: 2em;
    height: 2em;
    background: transparent;
    border: none;
    cursor: pointer;
    span {
      display: inline-block;
      position: absolute;
      left: 0;
      top: calc(50% - 1px);
      height: 2px;
      width: 100%;
      background-color: ${({ theme }) => theme.cyan};
      &:first-child {
        transform: rotate(-45deg) scale(1.2);
      }
      &:last-child {
        transform: rotate(45deg) scale(1.2);
      }
    }
  }

  .content {
    width: 90%;
    height: 80%;
    background-color: ${({ theme }) => theme.cardBg};
    color: #000;
    border-radius: var(--borderRadiusSmall);
    border: solid var(--strokeWidth) ${({ theme }) => theme.cyan};
    position: relative;

    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }

  > a {
    color: ${({ theme }) => theme.fg};
    margin-top: 1em;
    font-size: 1em;
  }
`;

const ProjectModal = ({ projectSrc, closeModal }: ProjectModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<ProjectModalRef>(null);

  useEffect(() => {
    const iframeElement = iframeRef.current;

    if (!iframeElement) return;

    iframeElement.addEventListener("load", () => {
      setIsLoading(false);
    });

    document.body.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });

    return () => {
      iframeElement?.removeEventListener("load", () => {
        setIsLoading(false);
      });

      document.body.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
      });
    };
  }, [closeModal]);

  return (
    <StyledModal closeModal={closeModal}>
      <button className="close" onClick={closeModal}>
        <span></span>
        <span></span>
      </button>
      <div className="content">
        <iframe src={projectSrc} ref={iframeRef}></iframe>
        {isLoading ? <Loading /> : null}
      </div>
      <a href={projectSrc} target="_blank">
        Open in a new tab
      </a>
    </StyledModal>
  );
};

export default ProjectModal;
