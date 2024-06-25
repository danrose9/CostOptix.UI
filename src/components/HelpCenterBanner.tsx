import React from 'react';
import styled from 'styled-components';
import { Icon, Image } from 'semantic-ui-react';
import * as colors from '../app/constants';

export const StyledIcon = styled(Icon)`
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
  color: ${colors.FONT.PRIMARY_COLOR};
`;

interface IHelpCenterBannerProps {
  className?: string;
  heading: string;
  image?: string;
  strapline: string;
  content: React.ReactNode;
}

const HelpCenterBanner: React.FC<IHelpCenterBannerProps> = ({ className, heading, image, strapline, content }) => {
  return (
    <BannerWrapper>
      <SupportHeaderSection className={className}>
        <div>
          <Title>{heading}</Title>
          <p>{strapline}</p>
        </div>
        <SupportHeaderContent>{content}</SupportHeaderContent>
      </SupportHeaderSection>
      <div>
        <StyledImage src={image} />
      </div>
    </BannerWrapper>
  );
};

export default HelpCenterBanner;
