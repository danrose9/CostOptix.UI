import React from 'react';
import { Container } from 'semantic-ui-react';
import HelpCenter from '../help-center/HelpCenter';
import styled from 'styled-components';

const PageContainer = styled(Container)`
  padding: 2em;
`;

const InternalHelpPageWrapper = () => {
  return (
    <>
      <PageContainer>
        <HelpCenter />
      </PageContainer>
    </>
  );
};

export default InternalHelpPageWrapper;
