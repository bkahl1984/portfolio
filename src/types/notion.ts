import { NotionBlock } from "@9gustin/react-notion-render";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type NotionExternalImage = {
  type: "external";
  external: {
    url: string;
  };
};

export type NotionImage = {
  type: "file";
  file: {
    url: string;
    expiry_time: string;
  };
};

export type NotionCoverImage = NotionImage | NotionExternalImage | null;

type Date = {
  id: string;
  type: string;
  date: {
    start: string;
    end?: string;
  };
};

type Published = {
  id: string;
  type: string;
  checkbox: boolean;
};

type Description = {
  id: string;
  type: string;
  rich_text: {
    type: string;
    text: {
      content: string;
      link?: string;
    };
    plain_text: string;
    href?: string;
  }[];
};

type Slug = {
  id: string;
  type: string;
  rich_text: {
    type: string;
    text: {
      content: string;
      link?: string;
    };
    plain_text: string;
    href?: string;
  }[];
};

type TagColor =
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "default";

export type Tag = {
  id: string;
  name: string;
  color: TagColor;
  count?: number;
};

type Tags = {
  id: string;
  type: string;
  multi_select: Tag[];
};

type Title = {
  id: string;
  type: string;
  title: {
    type: string;
    text: {
      content: "Test Page";
      link?: string;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: TagColor;
    };
    plain_text: string;
    href: string | null;
  }[];
};

export type BlogPostResponse = PageObjectResponse & {
  // cover: Cover;
  properties: {
    Title: Title;
    Description: Description;
    Slug: Slug;
    Tags: Tags;
    Date: Date;
    Published: Published;
  };
};

export type BlogPost = {
  id: string;
  title: string;
  description?: string;
  slug: string;
  tags: string[];
  date?: string;
  // published: boolean;
  coverUrl: string | null;
  blurDataUrl: string | null;
  readingTime?: number;
};

export type BlogPostWithBlocks = BlogPost & {
  blocks: NotionBlock[];
};
