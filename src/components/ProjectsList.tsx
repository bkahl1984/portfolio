import styled from "styled-components";

import { useContext } from "react";

import ProjectSlide from "@/components/ProjectSlide";
import ProjectContext from "@/contexts/ProjectContext";
import { Project } from "@/types";

type ProjectsListProps = {
  projects: Project[];
};

const StyledProjectsList = styled.div`
  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-top: 42px;

    @media screen and (max-width: 991.98px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .showAll {
    display: flex;
    justify-content: center;
    margin: 1em auto 0;
    cursor: pointer;
    font-size: 1em;
    padding: 0.5em 1em;
    border: none;
    border-radius: 0.25em;
    background-color: ${({ theme }) => theme.cyan};
    color: ${({ theme }) => theme.white};
    transition: background-color var(--duration), color var(--duration);

    &:hover {
      background-color: ${({ theme }) => theme.cyanHover};
    }
  }
`;

const ProjectsList = ({ projects }: ProjectsListProps) => {
  const { previewProject } = useContext(ProjectContext);

  if (!Array.isArray(projects)) {
    return null;
  }

  const visibleProjects = projects.filter((project) => project?.isVisible);

  return (
    <StyledProjectsList>
      <ul>
        {visibleProjects.map(
          ({ img, title, description, previewLink, codeLink, soon }) => (
            <ProjectSlide
              key={title}
              img={img}
              title={title}
              description={description}
              previewLink={previewLink}
              previewProject={previewProject}
              codeLink={codeLink}
              soon={soon}
            />
          )
        )}
      </ul>
    </StyledProjectsList>
  );
};

export default ProjectsList;
