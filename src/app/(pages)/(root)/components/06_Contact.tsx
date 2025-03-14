"use client";

import { memo } from "react";
import { motion } from "framer-motion";

import styled from "styled-components";
import Section from "@/components/Section";
import SectionDivider from "@/components/SectionDivider";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/layout/Container";
import SectionDescription from "@/components/SectionDescription";

import DownloadIcon from "@/components/icons/Download";

// Data
import CONTACT from "@/data/contact.json";
import contactBtns from "@/data/contactBtns";
import ContactForm from "@/components/ContactForm";

const StyledContact = styled(Section)`
  .contact {
    &__descr {
      margin-top: 48px;
      color: ${({ theme }) => theme.fg};
    }
    &__wrapper {
      margin-top: 4em;
      display: grid;
      grid-auto-flow: column;
      align-content: center;
      gap: 1.5em;
      justify-content: center;

      @media screen and (max-width: 479.98px) {
        grid-auto-flow: unset;
        grid-template-columns: repeat(3, auto);
      }
    }
    &__link {
      border-radius: var(--borderRadiusSmall);
      width: 48px;
      height: 48px;
      text-decoration: none;
      color: ${({ theme }) => theme.cyan};
      transition: all var(--duration);
      display: inline-block;
      /* align-self: center; */

      &:hover {
        color: ${({ theme }) => theme.cyanHover};
      }
      > * {
        width: 100%;
        height: 100%;
      }
    }
    &__download-cv {
      display: flex;
      justify-content: center;
      margin-top: 3em;
      a {
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme.cyan};
        text-decoration: none;
        border-radius: var(--borderRadiusSmall);
        border: solid var(--strokeWidth) ${({ theme }) => theme.cyan};
        font-weight: 700;
        font-size: 1em;
        padding: 1em 2em;
        transition: all var(--duration);
        &:hover {
          color: ${({ theme }) => theme.white};
          background-color: ${({ theme }) => theme.cyan};
        }
        svg {
          width: 1em;
          height: 1em;
          margin-right: 0.5em;
        }
      }
    }
  }
`;

const Contact = () => {
  const { title, description, formHeading, downloadCV } = CONTACT;

  return (
    <>
      <StyledContact id="contact">
        <Container>
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription className="contact__descr">
            {description}
          </SectionDescription>
          <SectionDescription className="contact__descr">
            {formHeading}
          </SectionDescription>   
          <SectionDescription className="contact__descr">
            Cell: <a className="contact__descr" href="tel:540-314-8352">540.314.8352</a>
          </SectionDescription>

          {/* <ContactForm /> */}

          <div className="contact__wrapper">
            {contactBtns.map(({ href, ariaLabel, icon }, index) => {
              const Icon = icon;

              return (
                <motion.a
                  href={href}
                  className="contact__link"
                  target="_blank"
                  aria-label={ariaLabel}
                  title={ariaLabel}
                  key={href}
                  initial={{ y: 32, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.05 * index }}
                >
                  <Icon />
                </motion.a>
              );
            })}
          </div>
          <div className="contact__download-cv">
            <motion.a
              href="Brad_Kahl_Resume_March_2025.docx"
              title={"Get my CV in DOCX Form"}
              target="_blank"
              initial={{ y: 32, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <DownloadIcon />
              {downloadCV}
            </motion.a>
          </div>
        </Container>
      </StyledContact>
      <Container>
        <SectionDivider />
      </Container>
    </>
  );
};

export default memo(Contact);
