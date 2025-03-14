// Import styles for blog posts,
// Applied to all individual blog pages
import "@9gustin/react-notion-render/dist/index.css";
import "@/components/Blog/BlogPost/NotionBlocksRenderer.css";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default BlogLayout;
