"use client";

import styled from "styled-components";
import { useState, useRef, useContext, memo } from "react";
import dynamic from "next/dynamic";

// UI
import Section from "@/components/Section";
import SectionDivider from "@/components/SectionDivider";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/layout/Container";
import SectionDescription from "@/components/SectionDescription";
import ProjectsList from "@/components/ProjectsList";

// Data
import PROJECTS from "@/data/projects.json";

const StyledProjects = styled(Section)`
  .projects {
    &__descr {
      margin-top: 48px;
    }
  }

  .slider {
    display: flex;
    align-items: center;
    margin-top: 48px;
    &__main {
      width: calc(100% - (32px + 16px) * 2);

      @media screen and (max-width: 991.98px) {
        width: 100%;
      }
    }
    &__arrow {
      background-color: transparent;
      border: none;
      width: 32px;
      height: 32px;
      flex-shrink: 0;
      position: relative;
      cursor: pointer;
      z-index: 1;
      color: ${({ theme }) => theme.cyan};

      &-right {
        transform: rotate(180deg);
      }
      &-disabled {
        opacity: 0.5;
        pointer-events: none;
        color: ${({ theme }) => theme.grey};
        transition: color 0s;
      }
      > * {
        width: 100%;
        height: 100%;
        transition: color var(--duration);
        color: currentColor;
      }
      &:hover {
        color: #178695;
      }

      @media screen and (max-width: 991.98px) {
        display: none;
      }
    }

    &__main {
      margin: 0 16px;
    }

    .swiper-pagination {
      position: relative;
      margin-top: 16px;
      &-bullet {
        opacity: 0.5;
        background-color: ${({ theme }) => theme.cyan};
        &-active {
          opacity: 1;
        }
      }
    }
  }
`;

const Projects = () => {
  const { title, description, projects } = PROJECTS;

  return (
    <>
      <StyledProjects id="projects">
        <Container>
          <div className="projects">
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription className="projects__descr">
              {description}
            </SectionDescription>

            <ProjectsList projects={projects} />
          </div>
        </Container>
      </StyledProjects>
      <Container>
        <SectionDivider />
      </Container>
    </>
  );
};

export default memo(Projects);
