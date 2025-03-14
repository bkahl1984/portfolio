// Core
import { cache } from "react";

// TS
import { BlogPost, BlogPostResponse, BlogPostWithBlocks } from "@/types/notion";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionBlock } from "@9gustin/react-notion-render";
// import calcReadingTime from "@/utils/calcReadingTime";
import { calcBlocksReadingTime } from "@/utils/calcBlocksReadingTime";
import { generateBlurDataUrl } from "@/utils/generateBlurDataUrl";
import { resolveNotionImage } from "@/utils/resolveNotionImage";

export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || "";
export const NOTION_TOKEN = process.env.NOTION_TOKEN || "";

export const getPosts = cache(async (): Promise<BlogPost[] | null> => {
  try {
    console.log("\u001b[1;44m getPosts \u001b[0m");

    if (!process.env.NOTION_TOKEN) {
      throw new Error("Add NOTION_TOKEN to env");
    }

    if (!process.env.NOTION_API_ENDPOINT) {
      throw new Error("Add NOTION_API_ENDPOINT path to env");
    }

    if (!process.env.NOTION_DATABASE_ID) {
      throw new Error("Add NOTION_DATABASE_ID to env");
    }

    const headers = new Headers({
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    });

    const body = JSON.stringify({
      filter: {
        and: [
          {
            property: "Published",
            checkbox: { equals: true },
          },
          {
            property: "Slug",
            rich_text: { is_not_empty: true },
          },
        ],
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    const url = `${process.env.NOTION_API_ENDPOINT}/v1/databases/${process.env.NOTION_DATABASE_ID}/query`;
    const options = {
      method: "POST",
      headers,
      body,
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      const errorObjectFromNotion = await res.json();

      if (errorObjectFromNotion?.object === "error") {
        console.error(
          `Error status: ${errorObjectFromNotion?.status}.\nCode: ${errorObjectFromNotion?.code}.\.Message: ${errorObjectFromNotion?.message} `
        );
      }

      return null;
    }

    const data = await res.json();

    const results = data.results as BlogPostResponse[];

    const posts = await Promise.all(
      results.map(async (post) => {
        const id = post.id;
        const title = post.properties.Title.title[0].plain_text;
        const description =
          post.properties.Description.rich_text[0]?.plain_text;
        const slug = post.properties.Slug?.rich_text[0].plain_text;
        const date = post.properties.Date.date?.start;
        const tags = post.properties.Tags.multi_select.map(({ name }) => name);

        // Handles both external and file images
        // const notionCoverUrl =
        //   post.cover?.type === "file"
        //     ? post.cover.file.url
        //     : post.cover?.type === "external"
        //     ? post.cover.external.url
        //     : null;

        const resolvedCoverUrl = await resolveNotionImage(post.cover, {
          width: 640,
        });

        const blurDataUrl = resolvedCoverUrl
          ? await generateBlurDataUrl(resolvedCoverUrl)
          : null;

        return {
          id,
          title,
          description,
          slug,
          date,
          tags,
          coverUrl: resolvedCoverUrl,
          blurDataUrl,
        };
      })
    );

    return posts;
  } catch (error) {
    console.error(`Error fetching Notion data in getPosts function: ${error}`);

    return null;
  }
});

export const getPostSlugs = cache(async () => {
  const posts = await getPosts();

  if (posts === null) return [];

  const slugs = posts.map(({ slug }) => ({
    postSlug: slug,
  }));

  return slugs;
});

export const getPostBySlug = cache(async (slug: string) => {
  const posts = await getPosts();

  if (posts === null) return null;

  const postBySlug = posts.find((post) => post.slug === slug);

  if (!postBySlug) {
    return null;
  }

  const blockId = postBySlug.id;

  try {
    const url = `${process.env.NOTION_API_ENDPOINT}/v1/blocks/${blockId}/children?page_size=100`;
    const options = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
      }),
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      const errorObjectFromNotion = await res.json();
      console.error(errorObjectFromNotion);

      return null;
    }

    const data = await res.json();
    const blocks = await Promise.all(
      data.results.map(async (block: any) => {
        if (block.type === "image" && block.image) {
          const notionImage = block.image as any;
          const imageUrl = await resolveNotionImage(notionImage);

          if (imageUrl) {
            const newImageBlock = {
              ...block,
              image: {
                ...block.image,
                file: {
                  ...block.image.file,
                  url: imageUrl,
                },
              },
            };

            return newImageBlock;
          }
        }

        return block;
      })
    );
    // console.log(
    //   "image blocks",
    //   blocks
    //     .filter((block) => block.type === "image")
    //     .map((block) => {
    //       if (block.type === "image") {
    //         return { type: block.type, ...block.image };
    //       }
    //     })
    // );

    // console.log(
    //   JSON.stringify(
    //     blocks.filter(
    //       ({ type }) =>
    //         ![
    //           "heading_1",
    //           "heading_2",
    //           "heading_3",
    //           "paragraph",
    //           "bulleted_list_item",
    //         ].includes(type)
    //     ),
    //     null,
    //     2
    //   )
    // );

    // Typical image block url
    // https://prod-files-secure.s3.us-west-2.amazonaws.com/ - domain
    // 337530cf-f9ed-4037-87c0-75bc5ee55ff3/ - smth like a post slug in AWS bucket
    // 6a528b98-7b03-4867-86cd-c5ff744f6a0b/ - smth like block slug in AWS bucket
    // 64x64.png? - exact filename of the uploaded image
    // X-Amz-Algorithm=AWS4-HMAC-SHA256&
    // X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&
    // X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20241005%2Fus-west-2%2Fs3%2Faws4_request&
    // X-Amz-Date=20241005T160129Z&X-Amz-Expires=3600&
    // X-Amz-Signature=2c1deab67e8ea6646003326b8d64a3313e1484073a47ac9a9d463be790a3fc2f&
    // X-Amz-SignedHeaders=host&
    // x-id=GetObject

    // DONE:
    // 1. Rework uploading images in the same structure: /awsPostSlug/awsBlockSlug/filename_transformed.png
    // 2. Handle getting images in this way
    // 3. Handle resolving block image urls

    // const { coverUrl } = postBySlug;
    // const blurDataUrl = coverUrl ? await generateBlurDataUrl(coverUrl) : null;

    const post = {
      ...postBySlug,
      // blurDataUrl,
      readingTime: calcBlocksReadingTime(blocks as BlockObjectResponse[]),
      blocks: blocks as NotionBlock[],
    } as BlogPostWithBlocks;

    return post;
  } catch (error) {
    console.error(
      `Error while fetching data from Notion, ${getPostBySlug.name}: ${error}`
    );

    return null;
  }
});
