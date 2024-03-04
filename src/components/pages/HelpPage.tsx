import React from 'react';
import PageWrapper from './PageWrapper';
import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';
import HelpCenter from '../help-center/HelpCenter';

const PageSection = styled(Segment)`
  display: flex;
  height: auto;
  width: 90%;
  align-self: center;
  * p {
    font-size: 1.2em;
  }
`;

export const HelpPage = () => {
  return (
    <PageWrapper>
      <PageSection>
        <HelpCenter />
      </PageSection>
    </PageWrapper>
  );
};

export default HelpPage;
