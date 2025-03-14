import { Suspense } from "react";
import Wrapper from "./components/Wrapper";
import YouTubeVideoCardServer from "./components/YouTubeVideoCardServer";
import YOUTUBE from "@/data/youtube.json";
import Loading from "../Loading";

export type YouTubeVideoCardProps = {
  type: "popular" | "latest";
};

const YouTubeVideoCard = (props: YouTubeVideoCardProps) => {
  const { type } = props;

  const { popularVideoHeading, latestVideoHeading } = YOUTUBE;

  return (
    <Wrapper
      heading={type === "popular" ? popularVideoHeading : latestVideoHeading}
    >
      <Suspense fallback={<Loading />}>
        <YouTubeVideoCardServer type={type} />
      </Suspense>
    </Wrapper>
  );
};

export default YouTubeVideoCard;
