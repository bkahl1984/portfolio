// Core
import { useRef } from "react";
import styled from "styled-components";
import {
  animate,
  stagger,
  useInView,
  useIsomorphicLayoutEffect,
} from "framer-motion";

// UI
import { H4 } from "@/components/Text";
import ExpertiseCard from "@/components/ExpertiseCard";
import { ExpertiseGroup } from "@/types";

const StyledGroup = styled.div`
  display: grid;
  gap: 2em;
  margin-top: 3.75em;
  max-width: 60em;
  margin-left: auto;
  margin-right: auto;
  .expGroupTitle {
    text-align: center;
  }

  .icons {
    display: grid;
    grid-template-columns: repeat(auto-fill, 140px);
    gap: 1em;
    justify-content: center;
  }
`;

const ExpertiseGroup = ({ groupTitle, groupCards }: ExpertiseGroup) => {
  const groupTitleRef = useRef<HTMLHeadingElement>(null);
  const groupIconsRef = useRef<HTMLUListElement>(null);

  const inView = useInView(groupIconsRef, { once: true });

  useIsomorphicLayoutEffect(() => {
    const groupTitleElement = groupTitleRef.current;
    const groupIconsElement = groupIconsRef.current;

    if (!groupTitleElement || !groupIconsElement) return;

    const elementsToAnimate = Array.from([
      groupTitleElement,
      ...groupIconsElement.children,
    ]);

    animate(
      elementsToAnimate,
      {
        y: 50,
        opacity: 0,
      },
      { duration: 0 }
    );

    if (!inView) return;

    animate(
      elementsToAnimate,
      {
        y: [50, 0],
        opacity: [0, 1],
      },
      { duration: 0.7, delay: stagger(0.05) }
    );
  }, [groupTitleRef, groupIconsRef, inView]);

  return (
    <StyledGroup>
      <H4
        key={groupTitle}
        as="h3"
        className="expGroupTitle"
        ref={groupTitleRef}
      >
        {groupTitle}
      </H4>

      <ul className="icons" ref={groupIconsRef}>
        {groupCards.map(({ icon, title }, key) => (
          <ExpertiseCard key={icon} icon={icon} title={title} />
        ))}
      </ul>
    </StyledGroup>
  );
};

export default ExpertiseGroup;
