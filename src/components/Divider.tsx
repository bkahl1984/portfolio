"use client";

import styled from "styled-components";

const Divider = styled.hr`
  width: 100%;
  margin: 0 auto;
  border: none;
  height: 2px;
  background-color: ${({ theme }) => theme.cardBg};
`;

export default Divider;
