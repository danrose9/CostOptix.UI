import React from 'react';
import PageWrapper from './PageWrapper';
import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';
import { FONT } from '../../app/constants/index';
import HelpCentreBanner from '../HelpCentreBanner';

const PageSection = styled(Segment)`
  // text-align: center;
  display: flex;
  height: auto;
  width: 90%;
  align-self: center;
  color: ${FONT.SECONDARY_COLOR} !important;
  * p {
    font-size: 1.2em;
  }
`;

export const HelpPage = () => {
  return (
    <PageWrapper>
      <PageSection>
        <HelpCentreBanner heading="How can we help?" />
      </PageSection>
    </PageWrapper>
  );
};

export default HelpPage;
