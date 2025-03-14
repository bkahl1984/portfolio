"use client";

import styled from "styled-components";
import Link from "next/link";
import ArrowIcon from "@/components/icons/Arrow";
import { P2 } from "@/components/Text";
// import SharePost from "../../../components/Blog/BlogPost/SharePost";
import dynamic from "next/dynamic";
import BackToBlogBtn from "./BackToBlogBtn";
const SharePost = dynamic(
  () => import("../../../components/Blog/BlogPost/SharePost"),
  { ssr: false }
);

const Styled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    margin-top: 2rem;
  }
`;

const BlogPostPageFooter = () => {
  return (
    <Styled>
      <SharePost />
      <BackToBlogBtn />
    </Styled>
  );
};

export default BlogPostPageFooter;
