"use client";

import styled from "styled-components";

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.fg};
  position: relative;
  transition: all var(--duration-long);
  min-height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr auto;

  > .content {
    padding-top: 5rem;
  }
`;

export default PageWrapper;
