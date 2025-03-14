import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  path {
    transition: opacity var(--duration);

    &:nth-child(1) {
      opacity: 0.5;
    }
  }

  &:hover {
    path {
      &:nth-child(1) {
        opacity: 1;
      }

      &:nth-child(2) {
        opacity: 0.5;
      }
    }
  }
`;

const ScrollDown = () => {
  return (
    <Svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // opacity="0.5"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 16.5839L3.37365 13.3334L16 25.499L28.6264 13.3334L32 16.5839L16 32L0 16.5839Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 3.13445L3.37365 0L16 11.7311L28.6264 0L32 3.13445L16 18L0 3.13445Z"
        fill="currentColor"
      />
    </Svg>
  );
};

export default ScrollDown;
