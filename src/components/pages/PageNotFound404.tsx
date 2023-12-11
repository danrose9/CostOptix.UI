import React from 'react';
import { Button, Image } from 'semantic-ui-react';

import * as images from '../../assets/index';
import * as appRoutes from '../../app/router/appRoutes';

import { useNavigate } from 'react-router-dom';
import { PageContainer, PageTitle, PageContent, PageDescription } from '../__styles__/StaticPageStyles';
import { PAGE404 } from 'src/app/constants/index';
export const PageNotFound404 = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(appRoutes.COST_DASHBOARD);
  };

  return (
    <PageContainer fluid>
      <Image src={images.ERROR404} fluid />
      <PageContent>
        <PageTitle>{PAGE404.TITLE}</PageTitle>
        <PageDescription>{PAGE404.DESCRIPTION}</PageDescription>
        <Button positive size="large" onClick={handleOnClick} data-testid="return-home-button" disabled={false}>
          {PAGE404.BUTTONTEXT}
        </Button>
      </PageContent>
    </PageContainer>
  );
};

export default PageNotFound404;
