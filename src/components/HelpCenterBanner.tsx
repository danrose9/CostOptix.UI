import React from 'react';
import styled from 'styled-components';
import { Icon, Image } from 'semantic-ui-react';
import * as images from '../assets/index';

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
  &.min-left-padding {
    padding: 0;
  }
  p {
    font-size: 1.2em;
    width: 80%;
  }
`;

const SupportHeaderContent = styled.div`
  padding: 4em 0;
  display: flex;
  align-items: center;
  p {
    padding: 0 2em;
  }
`;

const StyledImage = styled(Image)`
  width: 50em !important;
  font-size: 70%;
`;

const BannerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface IHelpCenterBannerProps {
  className?: string;
  heading: string;
}

const HelpCenterBanner: React.FC<IHelpCenterBannerProps> = ({ className, heading }) => {
  return (
    <BannerWrapper>
      <SupportHeaderSection className={className}>
        <div>
          <Title>{heading}</Title>
          <p>Want to get in touch? We'd love to hear from you. Here's is how you can reach us..</p>
        </div>
        <SupportHeaderContent>
          <StyledIcon name="talk" />
          <p>
            Get in contact at <a href="mailto:support@ddiware.com">support@ddiware.com</a>
          </p>
        </SupportHeaderContent>
      </SupportHeaderSection>
      <div>
        <StyledImage src={images.SUPPORT} />
      </div>
    </BannerWrapper>
  );
};

export default HelpCenterBanner;
