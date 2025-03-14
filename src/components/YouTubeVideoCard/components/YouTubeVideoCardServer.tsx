import type { YouTubeVideoCardProps } from "..";
import { getYoutubeContent } from "@/app/(pages)/(root)/utils/getYoutubeContent";
import YouTubeVideoCardClient from "./YouTubeVideoCardClient";

type Props = YouTubeVideoCardProps & {};

const YouTubeVideoCardServer = async (props: Props) => {
  const { type } = props;

  const content = await getYoutubeContent({
    order: type === "popular" ? "viewCount" : "date",
    maxResults: 1,
  });

  if (!content || content.length === 0) {
    return null;
  }

  return <YouTubeVideoCardClient video={content[0]} />;
};

export default YouTubeVideoCardServer;
