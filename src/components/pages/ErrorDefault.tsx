import React from 'react';
import { Button, Image } from 'semantic-ui-react';
import { ERRORPAGE } from 'src/app/constants/index';
import * as images from '../../assets/index';

import { PageContainer, PageTitle, PageContent, PageDescription } from '../__styles__/StaticPageStyles';

interface IErrorDefaultProps {
  error: any;
  resetErrorBoundary: any;
}

export const ErrorDefault: React.FC<IErrorDefaultProps> = ({ error, resetErrorBoundary }) => {
  console.error('Default Error Boundary', error?.message);

  return (
    <PageContainer fluid>
      <Image src={images.BROKENPAGE} fluid />
      <PageContent>
        <PageTitle>{ERRORPAGE.TITLE}</PageTitle>
        <PageDescription>{ERRORPAGE.DESCRIPTION}</PageDescription>
        <Button positive size="large" onClick={resetErrorBoundary} data-testid="return-home-button" disabled={false}>
          {ERRORPAGE.BUTTONTEXT}
        </Button>
      </PageContent>
    </PageContainer>
  );
};

export default ErrorDefault;
