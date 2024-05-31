import React from 'react';
import { PageContainer, ExternalPageWrapper } from '../__styles__/ExternalPageStyles';
import HomePageNav from './homepage/HomePageNav';
import styled from 'styled-components';
import { FONT } from 'src/app/constants';
import ApplicationFooter from '../ApplicationFooter';

const ChildrenContainer = styled.div`
  p,
  li {
    color: ${FONT.SECONDARY_COLOR} !important;
  }
  &.external-page {
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    padding: 2em 0;
    min-height: 90vh;
  }
`;

interface ExternalPageProps {
  children: React.ReactNode;
  className?: string;
}

const ExternalPage: React.FC<ExternalPageProps> = ({ children, className = 'external-page' }) => {
  return (
    <>
      <PageContainer fluid>
        <HomePageNav className={`nav-border, ${className}`} />
        <ExternalPageWrapper className={className}>
          <ChildrenContainer className={className}>{children}</ChildrenContainer>
          <ApplicationFooter />
        </ExternalPageWrapper>
      </PageContainer>
    </>
  );
};

export default ExternalPage;
