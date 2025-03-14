"use client";

import { Video } from "@/app/(pages)/(root)/utils/getYoutubeContent";
import { P1 } from "@/components/Text";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

type Props = {
  video: Video;
};

const YouTubeVideoCardClient = ({ video }: Props) => {
  return (
    <>
      <LiteYouTubeEmbed id={video.id} title={video.title} />
      {/* <div className="thumbnail">
        <Image
          src={video.thumbnail.url}
          alt={video.title}
          // width={video.thumbnail.width}
          // height={video.thumbnail.height}
          fill
          unoptimized
        />
      </div> */}
      <P1>{video.title}</P1>
    </>
  );
};

export default YouTubeVideoCardClient;
