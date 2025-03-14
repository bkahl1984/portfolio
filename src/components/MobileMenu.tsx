"use client";

import { useContext, memo } from "react";
import styled from "styled-components";

import Container from "@/components/layout/Container";
import Nav from "@/components/Nav";

import MobileMenuContext from "@/contexts/MobileMenuContext";
import ModalWrapper from "@/components/ModalWrapper";

const StyledWrapper = styled(ModalWrapper)`
  ul {
    margin-top: 5em;
  }
`;

const MobileMenu = () => {
  const { toggleMenu } = useContext(MobileMenuContext);

  return (
    <StyledWrapper closeModal={toggleMenu}>
      <Container>
        <Nav isMobile={true} toggleMenu={toggleMenu} />
      </Container>
    </StyledWrapper>
  );
};

export default memo(MobileMenu);
