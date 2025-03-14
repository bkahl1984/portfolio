import { getPosts } from "@/lib/notion";
import BlogPostsListClient from "./BlogPostsListClient";

const BlogPostsListServer = async () => {
  const posts = await getPosts();

  if (!posts) {
    return null;
  }

  return <BlogPostsListClient posts={posts} />;
};

export default BlogPostsListServer;
