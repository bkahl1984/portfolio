import { Suspense, cache } from "react";
import { getPostSlugs } from "@/lib/notion";

import BlogPostPageWrapper from "@/sections/blog/blogPost/BlogPostPageWrapper";
import PostSkeleton from "./components/PostSkeleton";
import BlogPostServer from "./components/BlogPostServer";

export const dynamic = "force-static";
// export const revalidate = 3600; // 1 hour
export const revalidate = 10800; // 3 hours
// export const revalidate = 60; // 1 min
// export const revalidate = 259200; // 3 days

export const generateStaticParams = cache(async () => {
  const slugs = await getPostSlugs();

  return slugs;
});

const BlogPostPage = async ({ params }: { params: { postSlug: string } }) => {
  const { postSlug } = params;

  return <BlogPostServer postSlug={postSlug} />;
};

export default BlogPostPage;
