"use client";

import styled from "styled-components";
import { useState } from "react";

import { isObject } from "@/utils/isObject";
import { H4, P2 } from "./Text";

const StyledTable = styled.table`
  margin-top: 2.5rem;
  border-spacing: 1rem;
  max-width: 60rem;
  margin-left: auto;
  margin-right: auto;
  transition-duration: 0.5s;
  transition-property: height, max-height;
  display: block;
  position: relative;
  /* height: 10lh; */
  max-height: 10lh;
  overflow: hidden;

  th,
  td {
    vertical-align: top;
    text-align: left;
  }

  &:after {
    content: "";
    pointer-events: none;
    user-select: none;
    display: block;
    width: 100%;
    height: 6lh;
    position: absolute;
    bottom: 0;
    left: 0;
    background: ${({ theme }) =>
      `linear-gradient(to bottom, transparent, ${theme.bg})`};
    transition: opacity 0.5s;
    opacity: 1;
  }

  &.expanded {
    max-height: 46lh;
    /* height: calc-size(auto); */

    &:after {
      opacity: 0;
    }
  }
`;

const ShowMoreButton = styled.button`
  display: block;
  margin: 0 auto;
  background-color: transparent;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
  position: relative;
  font-weight: 700;
  font-size: 1rem;
`;

type ExpertiseTableProps = {
  expertiseTable: Record<string, string[]>;
};

const ExpertiseTable = (props: ExpertiseTableProps) => {
  const { expertiseTable } = props;

  const [isShowMore, setIsShowMore] = useState(false);

  return isObject(expertiseTable) ? (
    <>
      <H4>Full list of tools and technologies that I use</H4>

      <StyledTable className={isShowMore ? "expanded" : ""}>
        <tbody>
          {Object.entries(expertiseTable).map(([title, technologiesList]) => {
            return (
              <tr key={title}>
                <th>
                  <P2>
                    <strong>{title}</strong>
                  </P2>
                </th>
                <td>{technologiesList.join(", ")}</td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>

      <ShowMoreButton onClick={() => setIsShowMore((p) => !p)}>
        Show {isShowMore ? "Less" : "More"}
      </ShowMoreButton>
    </>
  ) : null;
};

export default ExpertiseTable;
