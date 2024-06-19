import React from 'react';
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';
import { Blog } from 'src/types/document-types';
import BlogTags from './BlogTags';

const BlogContainer = styled(Container)`
  margin: 1em;
  padding-bottom: 5em;
`;

const BlogPostsSection = styled.div``;

const BlogPostsContainer = styled.div`
  display: flex;
`;

const BlogTitle = styled.div`
  font-size: 2em;
  padding: 0.2em 0;
`;

const BlogFooterSection = styled.div``;

const BlogAuthorSection = styled.div``;

interface IBlogSectionProps {
  blogs: Blog[];
}

const BlogSection: React.FunctionComponent<IBlogSectionProps> = ({ blogs }) => {
  return (
    <>
      {blogs.map((blog) => (
        <BlogContainer key={blog.id}>
          <BlogTags tags={blog.tags} />
          <BlogPostsContainer>
            <div>
              <BlogTitle>{blog.title}</BlogTitle>
              <BlogPostsSection>{blog.summary}</BlogPostsSection>
            </div>
            <BlogAuthorSection>Author Info {blog.createdDate}</BlogAuthorSection>
          </BlogPostsContainer>
          <BlogFooterSection></BlogFooterSection>
        </BlogContainer>
      ))}
    </>
  );
};

export default BlogSection;
