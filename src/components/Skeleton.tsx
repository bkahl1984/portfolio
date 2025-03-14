"use client";

import styled from "styled-components";

const Skeleton = styled.div`
  background: linear-gradient(
    110deg,
    ${({ theme }) => theme.cardBg} 8%,
    ${({ theme }) => theme.shine} 20%,
    ${({ theme }) => theme.cardBg} 36%
  );
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
  width: 100%;
  height: 100%;

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
`;

export default Skeleton;
