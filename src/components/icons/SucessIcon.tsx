import styled from "styled-components";

const StyledSVG = styled.svg`
  width: 4em;
  height: 4em;
  .circle,
  .checkmark {
    stroke: ${({ theme }) => theme.cyan};
    stroke-width: 0.5em;
    stroke-linecap: round;
    fill: transparent;
  }
  .circle {
    stroke-dasharray: 220 283;
    border-radius: 4px;
    transform: rotate(90deg);
    transform-origin: center;
    animation: circle 1s ease-out;
  }
  .checkmark {
    --dasharray: 180px;
    stroke-dashoffset: 0px;
    stroke-dasharray: var(--dasharray), var(--dasharray);
    animation: checkmark 1s ease-out;
  }

  @keyframes circle {
    0% {
      stroke-dasharray: 0 283;
      opacity: 0;
    }
    20% {
      stroke-dasharray: 0 283;
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    100% {
      stroke-dasharray: 200 283;
    }
  }

  @keyframes checkmark {
    0% {
      stroke-dashoffset: 180px;
      opacity: 0;
    }
    10% {
      opacity: 0;
      stroke-dashoffset: 180px;
    }
    15% {
      opacity: 1;
    }
    100% {
      stroke-dashoffset: 70px;
    }
  }
`;

const SuccessIcon = () => {
  return (
    <StyledSVG viewBox="0 0 100 100">
      <path
        className="circle"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
      <path
        className="checkmark"
        d="
          M 28,45
          50,68
          94,15
        "
      />
    </StyledSVG>
  );
};

export default SuccessIcon;
