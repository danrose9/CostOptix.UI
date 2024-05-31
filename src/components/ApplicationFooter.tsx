import * as React from 'react';
import { Container, Icon, Image as SemanticImage, SemanticICONS } from 'semantic-ui-react';
import styled from 'styled-components';
import { COLORS, FONT } from '../app/constants';
import { APP_FOOTER } from '../app/constants';
import * as appRoutes from '../app/router/appRoutes';
import { ProductName } from './ProductName';
import * as images from '../assets/index';
import { useNavigate } from 'react-router-dom';

const socialMediaLinks: { [key: string]: { name: SemanticICONS; link: string } } = {
  YOUTUBE: {
    name: 'youtube' as SemanticICONS,
    link: 'https://www.youtube.com/channel/UCrLh7boI1uq8RA-R3UUbSfw',
  },
  LINKEDIN: {
    name: 'linkedin' as SemanticICONS,
    link: 'https://www.linkedin.com/company/ddiware',
  },
};

const footerLinks = [
  {
    title: 'Products',
    items: [
      {
        title: 'CostOptix',
        path: appRoutes.LOGIN,
        active: true,
      },
      {
        title: 'Blog',
        path: appRoutes.LOGIN,
        active: false,
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        title: 'Help Center',
        path: appRoutes.HELP_CENTER,
        active: true,
      },
    ],
  },
  {
    title: 'About',
    items: [
      {
        title: 'Contact',
        path: appRoutes.CONTACT_PAGE,
        active: true,
      },
      {
        title: 'Privacy Policy',
        path: appRoutes.PRIVACY,
        active: true,
      },
      {
        title: 'Terms of Service',
        path: appRoutes.TERMS,
        active: true,
      },
    ],
  },
];

const StyledFooter = styled.div`
  height: 15em;
  background-color: ${COLORS.PRIMARY};
  &.large-footer {
    5em;
  }
  & p {
    cursor: default;
    font-size: 0.9em;
    @media only screen and (max-width: 600px) {
      text-align: center;
    }
  }
  & h3 {
    color: ${FONT.WHITE};
  }
`;

const FooterCompany = styled.div`
  flex-basis: 40%;
  p {
    padding: 1em;
    color: ${FONT.TERNARY_COLOR};
  }
`;

const Image = styled(SemanticImage)`
  width: 15em;
  height: auto;
`;

const FooterContainer = styled(Container)`
  padding: 2em 0 0;
  display: flex !important;
`;

const FooterLinkSection = styled.div`
  padding: 1em 0;
  margin-bottom: 1em;
  flex-basis: 20%;
`;

const FooterLinkItem = styled.a`
  display: block;
  color: ${FONT.TERNARY_COLOR};
  text-decoration: none;
  padding: 0.5em 0;
  &:hover {
    color: ${FONT.TERNANY_HOVER};
  }
`;
const SocialMediaLinks = styled.div`
  padding: 1em;
  i {
    color: ${FONT.TERNARY_COLOR};
    font-size: 2em;
    padding-right: 2em;
    cursor: pointer;
    &:hover {
      color: ${FONT.TERNANY_HOVER};
    }
  }
`;

interface IApplicationFooterProps {
  content?: string;
}

const ApplicationFooter: React.FC<IApplicationFooterProps> = ({ content }) => {
  const navigate = useNavigate();

  const onSocialMediaClick = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <StyledFooter>
      <FooterContainer>
        <FooterCompany>
          <Image src={images.LOGOWHITE} />
          <SocialMediaLinks>
            <Icon
              name={socialMediaLinks.YOUTUBE.name}
              onClick={() => {
                onSocialMediaClick(socialMediaLinks.YOUTUBE.link);
              }}
            />
            <Icon
              name={socialMediaLinks.LINKEDIN.name}
              onClick={() => {
                onSocialMediaClick(socialMediaLinks.LINKEDIN.link);
              }}
            />
          </SocialMediaLinks>
          <p>{APP_FOOTER.SHORT}</p>
        </FooterCompany>

        {footerLinks.map((section) => (
          <FooterLinkSection key={section.title}>
            <h3>{section.title}</h3>
            {section.items
              .filter((item) => item.active)
              .map((item) => (
                <FooterLinkItem key={item.title} href={item.path}>
                  {item.title}
                </FooterLinkItem>
              ))}
          </FooterLinkSection>
        ))}
      </FooterContainer>
    </StyledFooter>
  );
};

export default ApplicationFooter;
