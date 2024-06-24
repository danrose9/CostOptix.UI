import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchDocumentById from 'src/hooks/useFetchDocumentById';
import { Document } from '../__styles__/DocumentStyles';
import styled from 'styled-components';

import { COLORS } from 'src/app/constants';
import BlogInformation from './BlogInformation';

const BLOG_ENDPOINT = 'blogs';

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
        <BlogInformation blog={blog} />
      </BlogHeaderContainer>
      <Document dangerouslySetInnerHTML={{ __html: blog.htmlContent }} />
    </>
  );
};

export default BlogDetail;
