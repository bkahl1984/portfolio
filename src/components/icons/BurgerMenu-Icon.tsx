import styled from "styled-components";

const StyledWrapper = styled.span`
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-block;

  span {
    --span-height: 3.5px;
    width: 100%;
    left: 0;
    height: var(--span-height);
    position: absolute;
    display: inline-block;
    background-color: ${({ theme }) => theme.cyan};
    transition: all 0.3s;

    &:nth-child(1) {
      top: 0;
      transform-origin: 1.75px 0;
    }
    &:nth-child(2) {
      top: calc(50% - var(--span-height) / 2);
      transform: rotate(0deg) scaleY(1);
    }
    &:nth-child(3) {
      bottom: 0;
      transform-origin: var(--span-height) 0;
    }
  }

  &.isOpen {
    span {
      &:nth-child(1) {
        transform: rotate(45deg) scaleX(1.5);
      }
      &:nth-child(2) {
        transform: rotate(45deg);
        opacity: 0;
      }
      &:nth-child(3) {
        transform: rotate(-45deg) scaleX(1.5);
      }
    }
  }

  &:hover {
    span {
      background-color: ${({ theme }) => theme.cyanHover};
    }
  }
`;

const BurgerMenuIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <StyledWrapper className={isOpen ? "isOpen" : ""}>
      <span></span>
      <span></span>
      <span></span>
    </StyledWrapper>
  );
};

export default BurgerMenuIcon;
