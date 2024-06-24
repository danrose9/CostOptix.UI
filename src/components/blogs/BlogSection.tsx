import React from 'react';
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';
import { Category } from 'src/types/document-types';
import BlogInformation from './BlogInformation';
import { DocumentData } from 'src/types/document-types';
import { COLORS } from 'src/app/constants';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from 'src/app/router/appRoutes';

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

const BlogAuthorSection = styled.div``;

interface IBlogSectionProps {
  blogs?: DocumentData;
}

const BlogSection: React.FC<IBlogSectionProps> = ({ blogs }) => {
  const navigate = useNavigate();
  if (!blogs || !blogs.data) {
    return <div>Loading...</div>;
  }

  const handleClick = (webPath?: string) => {
    navigate(`${appRoutes.BLOGS}/${webPath}`);
  };

  return (
    <>
      {Object.values(blogs.data).map((category: Category) =>
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
    </>
  );
};

export default BlogSection;
