"use client";

import styled from "styled-components";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { P1, P2 } from "@/components/Text";

const Styled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ul {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
  }
`;

const SharePost = () => {
  const btnProps = {
    url:
      typeof window !== "undefined"
        ? window?.location?.href
        : "https://vddeveloper.online/blog",
  };

  const iconProps = {
    size: 32,
    round: true,
  };

  return (
    <Styled>
      <P1>Share</P1>
      <ul>
        <FacebookShareButton {...btnProps}>
          <FacebookIcon {...iconProps} />
        </FacebookShareButton>
        <LinkedinShareButton {...btnProps}>
          <LinkedinIcon {...iconProps} />
        </LinkedinShareButton>
        {/* <PinterestShareButton  {...btnProps}>
          <PinterestIcon {...iconProps} />
        </PinterestShareButton> */}
        <TelegramShareButton {...btnProps}>
          <TelegramIcon {...iconProps} />
        </TelegramShareButton>
        <TwitterShareButton {...btnProps}>
          <TwitterIcon {...iconProps} />
        </TwitterShareButton>
      </ul>
    </Styled>
  );
};

export default SharePost;
