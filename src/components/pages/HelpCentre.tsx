import React from 'react';
import { PageContainer } from '../__styles__/HomePageStyles';
import { Header, Breadcrumb } from 'semantic-ui-react';
import styled from 'styled-components';
import HomePageNav from './homepage/HomePageNav';
import HelpCentreBanner from '../HelpCentreBanner';
import { Segment, Image, Container } from 'semantic-ui-react';
import * as images from '../../assets';
import { COLORS, FONT } from '../../app/constants';
import StyledSearchInput from '../search/SearchInput';
import { helpCentreCategories } from './help-centre/helpCentreCategories';
import HelpCentreArticle from './help-centre/helpCentreArticle';

import { Sidebar } from '../sidebar/Sidebar';

const StyledImage = styled(Image)`
  width: 50em !important;
`;

const PageSection = styled(Segment)`
  display: flex;
  height: auto;

  align-self: center !important;
  color: ${FONT.SECONDARY_COLOR} !important;
  * p {
    font-size: 1.2em;
  }
`;

const ContentContainer = styled(Container)`
  // background-color: white;
`;

const SidebarWrapper = styled.div`
  width: 20%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
  padding: 1em;
`;

const StyledBreadcrumb = styled(Breadcrumb)`
  font-size: 1.2em;
  padding-bottom: 1em;
`;

interface IHelpCentreProps {
  title?: string;
}

const GetStartedSpan = styled.span`
  height: 3em;
  display: flex;
  justify-content: flex-start;
  font-weight: 400;
  cursor: pointer;
  margin: 1em 0 0;
  align-items: center;
  background-color: ${COLORS.OFFWHITE};
  p {
    padding: 0 1em;
  }
`;

const breadcrumbSections = [
  { key: 'HelpCentre', content: 'Help Centre', link: true },
  { key: 'Account', content: 'Account & Setup', link: true },
  { key: 'AccountManagement', content: 'Account Management', active: true },
];

export const HelpCentre: React.FC<IHelpCentreProps> = ({ title }) => {
  const showDocs = false;
  return (
    <>
      <PageContainer fluid>
        <HomePageNav className="nav-border" />

        <div style={{ height: '100%', overflowY: 'auto' }}>
          <Container>
            <HelpCentreBanner className="min-left-padding" heading="Help Centre" />
            <div style={{ display: 'flex' }}>
              <SidebarWrapper>
                <StyledSearchInput />
                <GetStartedSpan>
                  <p>Get Started</p>
                </GetStartedSpan>
                <Sidebar menuItems={helpCentreCategories} className="help-centre" />
              </SidebarWrapper>
              <ContentWrapper>
                <StyledBreadcrumb icon="right angle" sections={breadcrumbSections} />
                <div>
                  <div className="heading" style={{ padding: '1em 0' }}>
                    <h1>Account Management</h1>
                  </div>
                  <>{showDocs ? <div className="doc-list"></div> : <HelpCentreArticle />}</>
                </div>
              </ContentWrapper>
            </div>
          </Container>
        </div>
      </PageContainer>
    </>
  );
};

export default HelpCentre;
