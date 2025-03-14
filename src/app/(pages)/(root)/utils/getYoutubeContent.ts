import { cache } from "react";
// import path from "path";
// import fs from "fs";

const API_KEY = process.env.YOUTUBE_API_KEY || "";
const CHANNEL_ID = "UCr1JTjRb_IrJ0OkTFwT3xug";

import mockLatest from "src/data/youtubeContentMocks/latest.json";
import mockPopular from "src/data/youtubeContentMocks/popular.json";

export type Video = {
  id: string;
  title: string;
  thumbnail: Thumbnail;
};

type YoutubeSearchResult = {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: Record<string, number>;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
};

type Thumbnail = { url: string; width: number; height: number };

type getYoutubeContentProps = {
  order: "viewCount" | "date";
  maxResults: number;
};

export const getYoutubeContent = cache(
  async (props: getYoutubeContentProps): Promise<Video[] | null> => {
    const { order, maxResults } = props;

    const queryParams = {
      key: API_KEY,
      channelId: CHANNEL_ID,
      part: "snippet,id",
      order,
      maxResults: String(maxResults),
    };
    const searchParams = new URLSearchParams(queryParams);
    const url = `https://www.googleapis.com/youtube/v3/search?${searchParams.toString()}`;

    try {
      let data;

      // Fetch only in production mode
      console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
      if (process.env.NODE_ENV === "production") {
        const response = await fetch(url, {
          next: {
            revalidate: 10800, // 3 hrs
          },
        });

        data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error?.message);
        }
      }

      // Use mocks on dev mode to save API call bandwidth
      if (process.env.NODE_ENV === "development") {
        if (order === "viewCount") {
          data = mockPopular;
        } else {
          data = mockLatest;
        }
      }

      // Solution to write mocks in jsons
      // if (order === "viewCount") {
      //   const filePath = path.join(
      //     process.cwd(),
      //     "src/data/youtubeContentMocks/popular.json"
      //   );
      //   fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
      //   console.log(`Data written to popular.json`);
      // }

      // if (order === "date") {
      //   const filePath = path.join(
      //     process.cwd(),
      //     "src/data/youtubeContentMocks/latest.json"
      //   );
      //   fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
      //   console.log(`Data written to latest.json`);
      // }

      const items: YoutubeSearchResult[] = data.items;

      const videos = items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high,
      }));

      // await delay(5000);

      return videos;
    } catch (error) {
      console.error(
        `Error fetching content from Youtube API, ${getYoutubeContent.name}, ${error}`
      );

      return null;
    }
  }
);
