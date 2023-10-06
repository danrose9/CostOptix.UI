import React from 'react';
import { Button, Image } from 'semantic-ui-react';

import * as images from '../../assets/index';

import { PageContainer, PageTitle, PageContent, PageDescription } from '../__styles__/StaticPageStyles';

export const ErrorDefault = ({ error, resetErrorBoundary }) => {
  console.error('Default Error Boundary', error?.message);

  return (
    <PageContainer fluid>
      <Image src={images.BROKENPAGE} fluid />
      <PageContent>
        <PageTitle>Oops! something done broke!</PageTitle>
        <PageDescription>
          It appears we ran into a little problem, but don't worry we'll look into that and get it fixed.
        </PageDescription>
        <Button positive size="large" onClick={resetErrorBoundary} data-testid="return-home-button" disabled={false}>
          Return to Home
        </Button>
      </PageContent>
    </PageContainer>
  );
};

export default ErrorDefault;
