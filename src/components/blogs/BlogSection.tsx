import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';
import { Category } from 'src/types/document-types';
import BlogInformation from './BlogInformation';
import { COLORS } from 'src/app/constants';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from 'src/app/router/appRoutes';
import DocumentPagination from '../pagination/DocumentPagination';
import { SearchDocumentsResponseType } from 'src/types/document-types';
import { useSearchDocuments } from 'src/hooks/index';
import { BLOGS } from 'src/services/api/apiEndpoints';
import { PaginationProps } from 'semantic-ui-react';

const BlogContainer = styled(Container)`
  margin: 1em;
  padding-bottom: 2em;
  cursor: pointer;
`;

const BlogSectionContainer = styled.div`
  &:hover {
    background-color: #d8edeb;
  }
`;

const BlogSummary = styled.p`
  font-size: 1.2em;
  padding-bottom: 2em;
`;

const BlogPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BlogTitle = styled.div`
  font-size: 2em;
  padding: 0.5em 0;
`;

const BlogFooterSection = styled.div`
  border-bottom: 1px solid ${COLORS.HIGHLIGHT};
`;

const BlogSection = () => {
  const top = 10;
  const [skip, setSkip] = useState(0);
  const fetchBlogs: SearchDocumentsResponseType = useSearchDocuments({
    search: ' ',
    top: top,
    skip: skip,
    endpoint: BLOGS,
  });

  const handlePageChange = (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => {
    setSkip((data.activePage as number) * top - 10);
  };

  const navigate = useNavigate();

  if (!fetchBlogs.documents || !fetchBlogs.documents.data) {
    return <div>Loading...</div>;
  }

  const handleClick = (webPath?: string) => {
    navigate(`${appRoutes.BLOGS}/${webPath}`);
  };

  return (
    <>
      {Object.values(fetchBlogs.documents.data).map((category: Category) =>
        category.documents.map((document) => (
          <BlogSectionContainer key={document.id} onClick={() => handleClick(document.webPath)}>
            <BlogContainer>
              <BlogInformation blog={document} className="large-font" />

              <BlogPostsContainer>
                <BlogTitle>{document.title}</BlogTitle>
                <BlogSummary>{document.summary}</BlogSummary>
              </BlogPostsContainer>
              <BlogFooterSection />
            </BlogContainer>
          </BlogSectionContainer>
        ))
      )}

      <DocumentPagination totalDocuments={20} isLoading={false} handlePageChange={handlePageChange} />
    </>
  );
};

export default BlogSection;
