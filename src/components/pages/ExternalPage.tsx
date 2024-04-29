import React from 'react';
import { PageContainer } from '../__styles__/HomePageStyles';
import HomePageNav from './homepage/HomePageNav';
import styled from 'styled-components';

const ExternalPageWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

interface ExternalPageProps {
  children: React.ReactNode;
}

const ExternalPage: React.FC<ExternalPageProps> = ({ children }) => {
  return (
    <>
      <PageContainer fluid>
        <HomePageNav className="nav-border" />

        <ExternalPageWrapper>{children}</ExternalPageWrapper>
      </PageContainer>
    </>
  );
};

export default ExternalPage;
