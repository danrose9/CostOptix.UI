import React from 'react';
import { Button, Image } from 'semantic-ui-react';

import * as images from '../../assets/index';
import * as appRoutes from '../../app/appRoutes';

import { useNavigate } from 'react-router-dom';
import { PageContainer, PageTitle, PageContent, PageDescription } from '../__styles__/StaticPageStyles';

export const PageNotFound404 = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    // This is a protected route so outside of the application it will return /home
    // inside the application it will direct to cost dashboard
    navigate(appRoutes.COST_DASHBOARD);
  };
  return (
    <PageContainer fluid>
      <Image src={images.ERROR404} fluid />
      <PageContent>
        <PageTitle>Oops! can't seem to find that page.</PageTitle>
        <PageDescription>The page you are looking for might have been removed.</PageDescription>
        <Button positive size="large" onClick={handleOnClick} data-testid="return-home-button" disabled={false}>
          Return to Home
        </Button>
      </PageContent>
    </PageContainer>
  );
};

export default PageNotFound404;
