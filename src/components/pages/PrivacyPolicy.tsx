import React from 'react';
import { PageContainer, HomePageMainContent } from '../__styles__/HomePageStyles';
import { Header } from 'semantic-ui-react';
import { PrivacyPolicy as PrivacyPolicyContent } from 'src/app/constants';
import { TITLE } from 'src/app/constants/application';

import HomePageNav from '../navbar/HomePageNav';

export const PrivacyPolicy = () => {
  return (
    <>
      <PageContainer fluid>
        <HomePageNav className="nav-border" />

        <Header as="h1" textAlign="center">
          {TITLE.PRIVACY}
        </Header>
        <HomePageMainContent className="centre">
          <PrivacyPolicyContent />
        </HomePageMainContent>
      </PageContainer>
    </>
  );
};

export default PrivacyPolicy;
