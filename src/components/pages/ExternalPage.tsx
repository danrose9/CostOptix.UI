import React from 'react';
import { PageContainer } from '../__styles__/ExternalPageStyles';
import HomePageNav from './homepage/HomePageNav';
import styled from 'styled-components';
import { Container as SemanticContainer } from 'semantic-ui-react';
import { COLORS, FONT } from 'src/app/constants';
import { EXTERNAL_BACKGROUND } from 'src/assets/index';

const ExternalPageWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  background-color: ${COLORS.BACKGROUND};
  &.show-background-image {
    background-image: url(${EXTERNAL_BACKGROUND});
    background-size: cover;
  }
`;

const Container = styled(SemanticContainer)`
  padding: 2em 0;
  p,
  li {
    color: ${FONT.SECONDARY_COLOR} !important;
  }
`;

interface ExternalPageProps {
  children: React.ReactNode;
}

const ExternalPage: React.FC<ExternalPageProps> = ({ children }) => {
  return (
    <>
      <PageContainer fluid className="external-page">
        <HomePageNav className="nav-border" />

        <ExternalPageWrapper className="show-background-image">
          <Container>{children}</Container>
        </ExternalPageWrapper>
      </PageContainer>
    </>
  );
};

export default ExternalPage;
