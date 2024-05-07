import React from 'react';
import PageWrapper from './PageWrapper';
import { PageSection } from './DefaultPageStyles';
import HelpCenter from '../help-center/HelpCenter';

export const HelpPage = () => {
  return (
    <PageWrapper>
      <PageSection className="narrow-column">
        <HelpCenter />
      </PageSection>
    </PageWrapper>
  );
};

export default HelpPage;
