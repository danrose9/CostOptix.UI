import React from 'react';
import PageWrapper from './PageWrapper';
import styled from 'styled-components';
import { Segment, Icon, Image } from 'semantic-ui-react';
import * as images from '../../assets';
import { FONT } from '../../app/constants/index';

// const StyledSearchInput = styled(Search)`
//   padding: 0 2em;
//   &.ui.search .prompt {
//     border-radius: unset !important;
//   }
// `;

const PageSection = styled(Segment)`
  // text-align: center;
  display: flex;
  width: 100%;
  height: auto;
  color: ${FONT.SECONDARY_COLOR} !important;
  * p {
    font-size: 1.2em;
  }
`;

const StyledImage = styled(Image)`
  width: 50em !important;
`;

const StyledIcon = styled(Icon)`
  &.icon {
    font-size: 3em;
    line-height: 1em;
    vertical-align: middle;
  }
`;

const Title = styled.h1`
  font-size: 2.5em;
  padding: 0.5em 0;
`;

const SupportHeaderSection = styled.div`
  padding: 1em 3em;
`;

const SupportHeaderContent = styled.div`
  padding: 4em 0;
  display: flex;
  align-items: center;
  p {
    padding: 0 2em;
  }
`;

export const HelpPage = () => {
  return (
    <PageWrapper>
      <PageSection>
        <SupportHeaderSection>
          <div>
            <Title>How can we help?</Title>
            <p>Want to get in touch? We'd love to hear from you. Here's is how you can reach us..</p>
          </div>
          <SupportHeaderContent>
            <StyledIcon name="talk" />
            <p>
              Get in contact at <a href="mailto:support@ddiware.com">support@ddiware.com</a>
            </p>
          </SupportHeaderContent>
          {/* <div style={{ display: 'flex', alignItems: 'center' }}>
            <StyledIcon name="search" />
            <StyledSearchInput size="large" placeholder="Search support articles.." fluid />
          </div> */}
        </SupportHeaderSection>
        <div>
          <StyledImage src={images.SUPPORT} />
        </div>
      </PageSection>
    </PageWrapper>
  );
};

export default HelpPage;
