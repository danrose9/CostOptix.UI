import React, { useEffect } from 'react';
import { PageContainer } from '../__styles__/HomePageStyles';
import { Breadcrumb } from 'semantic-ui-react';
import styled from 'styled-components';
import HomePageNav from './homepage/HomePageNav';
import HelpCentreBanner from '../HelpCentreBanner';
import { Segment, Image, Container } from 'semantic-ui-react';
import { COLORS, FONT } from '../../app/constants';

import { helpCentreCategories } from './help-centre/helpCentreCategories';
import HelpCentreArticle from './help-centre/helpCentreArticle';

import { Sidebar } from '../sidebar/Sidebar';
import SearchByCategory, { Documents } from '../search/SearchByCategory';
import { searchDocs } from 'src/services/api/fetchDocs';
import useSearchDocuments from 'src/hooks/useSearchDocuments';

const options: Documents = {
  'Legal & Compliance': {
    name: 'Legal & Compliance',
    results: [
      {
        id: 'a1',
        adoFilePath: '/home/vsts/work/1/a/docs/External-Docs/Privacy-Policy.md',
        title: 'Privacy Policy',
        lastUpdatedDate: '2023-09-15T00:00:00Z',
        category: 'Legal',
        tags: [],
        summary: 'The Privacy Policy for DDIWare',
        htmlContent: null,
      },
      {
        id: 'a2',
        adoFilePath: '/home/vsts/work/1/a/docs/External-Docs/Terms-and-Conditions.md',
        title: 'Terms and Conditions',
        lastUpdatedDate: '2024-02-23T10:08:56.926Z',
        category: 'Legal',
        tags: null,
        summary: 'The Terms and Conditions for DDIWare',
        htmlContent: null,
      },
    ],
  },
  'Account & Setup': {
    name: 'Account & Setup',
    results: [
      {
        id: 'a3',
        adoFilePath: '/home/vsts/work/1/a/docs/External-Docs/User-Guides/Add-Azure-Service-Connection.md',
        title: 'Add an Azure Service Connection',
        lastUpdatedDate: '2024-02-23T10:08:57.165Z',
        category: 'Setup',
        tags: null,
        summary: 'How to add an Azure Service Connection to your project',
        htmlContent: null,
      },
      {
        id: 'a4',
        adoFilePath: '/home/vsts/work/1/a/docs/External-Docs/User-Guides/Add-Azure-Service-Connection.md',
        title: 'Add an AWS Service Connection',
        lastUpdatedDate: '2024-01-23T10:08:57.165Z',
        category: 'Setup',
        tags: null,
        summary: 'How to add an AWS Service Connection to your project',
        htmlContent: null,
      },
    ],
  },
  'Cost Containers': {
    name: 'Cost Containers',
    results: [
      {
        id: 'a5',
        adoFilePath: '/home/vsts/work/1/a/docs/External-Docs/User-Guides/Working-With-Cost-Containers.md',
        title: 'Working with Cost Containers',
        lastUpdatedDate: '2024-02-23T10:08:57.361Z',
        category: 'Cost Containers',
        tags: null,
        summary: 'How to work with Cost Containers in DDIWare',
        htmlContent: null,
      },
    ],
  },
};

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
  const [searchString, setSearchString] = React.useState('');

  // const searchResponse: any = useSearchDocuments({ search: searchString });
  // useEffect(() => {
  //   console.log('searchResponse', searchResponse.documents);
  // }, [searchResponse]);

  return (
    <>
      <PageContainer fluid>
        <HomePageNav className="nav-border" />

        <div style={{ height: '100%', overflowY: 'auto' }}>
          <Container>
            <HelpCentreBanner className="min-left-padding" heading="Help Centre" />
            <div style={{ display: 'flex' }}>
              <SidebarWrapper>
                <SearchByCategory
                  placeholder="Search Help Centre.."
                  options={options}
                  setSearchString={setSearchString}
                />
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
