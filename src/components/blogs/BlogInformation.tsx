import React from 'react';
import { Document as Blog } from 'src/types/document-types';
import styled from 'styled-components';
import { formatISODateToMMMDDYYYY } from 'src/utils/dateFormatter';

import BlogTags from './BlogTags';

const BLOG_TIME_LENGTH = ' mins read';

const BlogInformationContainer = styled.div`
  display: flex;
  padding: 1em 0;
  justify-content: space-between;
  * {
    align-items: center;
  }
  p {
    padding: 0 2em;
  }
  span {
    display: flex;
  }
  &.large-font {
    font-size: 1.1em;
  }
`;

const BlogAuthor = styled.div`
  display: flex;
  align-items: center;
  h4 {
    margin: 0;
    font-size: 1em;
  }
  p {
    margin: 0;
  }
`;
interface IBlogInformationProps {
  blog: Blog;
  className?: string;
}

const BlogInformation: React.FC<IBlogInformationProps> = ({ blog, className }) => {
  return (
    <BlogInformationContainer className={className}>
      <span>
        <BlogTags tags={blog.tags} />
        <p>
          {blog.lengthInMinutes}
          {BLOG_TIME_LENGTH}
        </p>
      </span>

      <BlogAuthor>
        <h4>{blog.author}</h4>
        <p>{formatISODateToMMMDDYYYY(blog.createdDate ?? '')}</p>
      </BlogAuthor>
    </BlogInformationContainer>
  );
};

export default BlogInformation;
