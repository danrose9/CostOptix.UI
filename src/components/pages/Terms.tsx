import React from 'react';
import { PageContainer, HomePageMainContent } from '../__styles__/HomePageStyles';
import { Header } from 'semantic-ui-react';
import { TermsOfService } from 'src/app/constants';
import { TITLE } from 'src/app/constants/application';

import HomePageNav from '../navbar/HomePageNav';

export const Terms = () => {
  return (
    <>
      <PageContainer fluid>
        <HomePageNav className="nav-border" />

        <Header as="h1" textAlign="center">
          {TITLE.TERMS}
        </Header>
        <HomePageMainContent className="centre">
          <TermsOfService />
        </HomePageMainContent>
      </PageContainer>
    </>
  );
};

export default Terms;
