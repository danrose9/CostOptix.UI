import React from 'react';
import { PageContainer } from '../__styles__/HomePageStyles';
import HomePageNav from '../pages/homepage/HomePageNav';
import HelpCenter from '../help-center/HelpCenter';
import styled from 'styled-components';

const HelpCenterWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const HelpCenterPage = () => {
  return (
    <>
      <PageContainer fluid>
        <HomePageNav className="nav-border" />

        <HelpCenterWrapper>
          <HelpCenter />
        </HelpCenterWrapper>
      </PageContainer>
    </>
  );
};

export default HelpCenterPage;
