import BlogPostPageHeading from "@/sections/blog/blogPost/BlogPostPageHeading";
import NotionBlocksRenderer from "@/components/Blog/BlogPost/NotionBlocksRenderer";
import BlogPostPageFooter from "@/sections/blog/blogPost/BlogPostPageFooter";

import { getPostBySlug } from "@/lib/notion";
import { notFound } from "next/navigation";

const BlogPostServer = async ({ postSlug }: { postSlug: string }) => {
  const post = await getPostBySlug(postSlug);

  if (post === null) {
    notFound();
  }

  const { blocks, ...postInfo } = post;

  return (
    <>
      <BlogPostPageHeading {...postInfo} />
      <NotionBlocksRenderer blocks={blocks} />
      <BlogPostPageFooter />
    </>
  );
};

export default BlogPostServer;
