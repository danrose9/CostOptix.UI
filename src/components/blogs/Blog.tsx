import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchDocumentById from 'src/hooks/useFetchDocumentById';
import { Document } from '../__styles__/DocumentStyles';
import BlogTags from './BlogTags';
import styled from 'styled-components';
import { formatISODateToMMMDDYYYY } from 'src/utils/dateFormatter';
import { COLORS } from 'src/app/constants';

const BLOG_ENDPOINT = 'blogs';
const TIME_LENGTH = ' mins read';

interface IBlogDetailProps {}

const BlogHeaderContainer = styled.div`
  height: 15em;
  padding: 2em 0 !important;
  margin-bottom: 2em;
  border-bottom: 1px solid ${COLORS.HIGHLIGHT};
  h1 {
    font-size: 3em;
  }
`;

const BlogTitle = styled.h1`
  margin: 0 0 1.5em;
`;

const BlogInformation = styled.div`
  display: flex;
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

const BlogDetail: React.FC<IBlogDetailProps> = () => {
  const { blogId } = useParams<{ blogId: any }>();
  const { document: blog, isLoading, error } = useFetchDocumentById(blogId, BLOG_ENDPOINT);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <>
      <BlogHeaderContainer>
        <BlogTitle>{blog.title}</BlogTitle>
        <BlogInformation>
          <span>
            <BlogTags tags={blog.tags} />
            <p>
              {blog.lengthInMinutes}
              {TIME_LENGTH}
            </p>
          </span>

          <BlogAuthor>
            <h4>{blog.author}</h4>
            <p>{formatISODateToMMMDDYYYY(blog.createdDate)}</p>
          </BlogAuthor>
        </BlogInformation>
      </BlogHeaderContainer>
      <Document dangerouslySetInnerHTML={{ __html: blog.htmlContent }} />
    </>
  );
};

export default BlogDetail;
