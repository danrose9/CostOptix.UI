import React from 'react';
import { PageContainer } from '../__styles__/ExternalPageStyles';
import HomePageNav from './homepage/HomePageNav';
import styled from 'styled-components';
import { Container as SemanticContainer } from 'semantic-ui-react';
import { COLORS, FONT } from 'src/app/constants';

const ExternalPageWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  background-color: ${COLORS.BACKGROUND};
`;

const Container = styled(SemanticContainer)`
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
      <PageContainer fluid>
        <HomePageNav className="nav-border" />

        <ExternalPageWrapper>
          <Container>{children}</Container>
        </ExternalPageWrapper>
      </PageContainer>
    </>
  );
};

export default ExternalPage;
