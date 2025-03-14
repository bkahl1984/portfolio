"use client";

import styled from "styled-components";
import { P1 } from "@/components/Text";
import BackToBlogBtn from "@/sections/blog/blogPost/BackToBlogBtn";

const Styled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 0;

  button {
    margin-top: 2rem;
  }
`;

const NotFound = () => {
  return (
    <Styled>
      <P1 className="heading">Post not found.</P1>
      <BackToBlogBtn />
    </Styled>
  );
};

export default NotFound;
