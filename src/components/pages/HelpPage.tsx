import React from 'react';
import PageWrapper from './PageWrapper';
import styled from 'styled-components';
import HelpCenter from '../help-center/HelpCenter';

const PageSection = styled.div`
  display: flex;
  height: auto;
  width: 90%;
  align-self: center;
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
