"use client";

import { styled } from "styled-components";
import { Fragment } from "react";

// UI
import Section from "@/components/Section";
import Container from "@/components/layout/Container";
import BlogPostCard from "@/components/Blog/BlogPostCard";
import Divider from "@/components/Divider";
import { BlogPost } from "@/types/notion";
import { P1 } from "@/components/Text";

const Styled = styled(Section)`
  .inner {
    display: grid;
    grid-template-columns: 100%;
    gap: 2rem;
  }

  .posts-list {
    list-style-type: none;
    display: grid;
    gap: 1rem;

    max-width: 60rem;
    margin-left: auto;
    margin-right: auto;
  }
`;

const BlogPostsListClient = ({ posts }: { posts: BlogPost[] }) => {
  return (
    <Styled>
      <Container>
        <ul className="posts-list">
          {posts && posts.length > 0 ? (
            posts.map((post, index) => {
              return (
                <Fragment key={post.id}>
                  <li>
                    <BlogPostCard {...post} />
                  </li>
                  {index < posts.length - 1 && <Divider />}
                </Fragment>
              );
            })
          ) : (
            <P1>No posts yet.</P1>
          )}
        </ul>
      </Container>
    </Styled>
  );
};

export default BlogPostsListClient;
