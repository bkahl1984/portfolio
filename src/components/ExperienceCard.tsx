"use client";

// Core
import styled from "styled-components";
import { motion } from "framer-motion";

// Components
import { H4, P1, P2 } from "./Text";

// TS
import { ExperienceCardProps, StyledExpCardProps } from "../types";

const StyledExpCard = styled.div<StyledExpCardProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: ${({ $secondary }) => ($secondary ? "0" : "24px")};
  border-radius: var(--borderRadiusNormal);
  background-color: ${({ $secondary, theme }) =>
    $secondary ? "transparent" : theme.cardBg};

  > * + * {
    margin-top: 1em;
  }

  &.secondary {
    background-color: transparent;
    border-radius: 0;
    padding: 0;
  }

  .info {
    display: grid;
    gap: 0.5em;
  }

  .time-range {
    * {
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.cyan};
    }
  }
  .position {
    color: ${({ theme }) => theme.cyan};
  }
  .descr {
    margin-top: 1em;
    color: ${({ theme }) => theme.grey};
    > * + * {
      margin-top: 1em;
    }
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;

    > * {
      background-color: ${({ $secondary, theme }) =>
        $secondary ? theme.cardBg : theme.bg};
    }
  }

  .icons {
    display: flex;
    *:not(:last-child) {
      margin-right: 16px;
    }
  }
`;

const MotionStyledExperienceCard = motion(StyledExpCard);

const Chip = styled(P2)`
  display: inline-block;
  border-radius: 2em;
  padding: 0.25em 0.5em;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.grey};
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;

const ExperienceCard = ({
  timerange,
  position,
  company,
  chips,
  description,
  icons,
  secondary,
  preview,
}: ExperienceCardProps) => {
  return (
    <MotionStyledExperienceCard
      $secondary={secondary}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="info">
        <div className="time-range">
          <P2>{timerange}</P2>
        </div>
        <H4 as="h3" className="position">
          {position}
        </H4>
        <P1>{company}</P1>
        {chips && chips.length > 0 ? (
          <div className="chips">
            {chips.map((chip) => (
              <Chip key={`${company} ${chip}`}>{chip}</Chip>
            ))}
          </div>
        ) : null}
        {description && (
          <div className="descr">
            {description
              .split(`\n`)
              .filter(Boolean)
              .map((p) => (
                <P2 key={p}>{p}</P2>
              ))}
          </div>
        )}
        {preview && (
          <div>
            <a className="contact__descr" href={preview.link} target="_blank" style={{color: "#B1B1B1"}}>{preview.title}</a>
          </div>
        )}
      </div>
      {icons && icons.length > 0 ? (
        <div className="icons">
          {icons.map(({ src, alt }) => (
            <Icon
              key={`${company} ${alt}`}
              src={`${process.env.NEXT_PUBLIC_URL}/assets/tech-icons/${src}`}
              alt={alt}
              title={alt}
            />
          ))}
        </div>
      ) : null}
    </MotionStyledExperienceCard>
  );
};

export default ExperienceCard;
