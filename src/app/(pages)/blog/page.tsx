import BlogHero from "@/sections/blog/BlogHero";
import BlogPostsListServer from "@/sections/blog/BlogPostsListServer";
import BlogPostsListSkeleton from "@/sections/blog/BlogPostsListSkeleton";
import { Suspense } from "react";

export const dynamic = "force-static";
// export const revalidate = 3600; // 1 hour
export const revalidate = 10800; // 3 hours
// export const revalidate = 60; // 1 min
// export const revalidate = 259200; // 3 days

const BlogPage = () => {
  return (
    <>
      <BlogHero />
      <Suspense fallback={<BlogPostsListSkeleton />}>
        <BlogPostsListServer />
      </Suspense>
    </>
  );
};

export default BlogPage;
