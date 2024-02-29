import React, { useEffect, useContext } from 'react';
import { PageContainer } from '../__styles__/HomePageStyles';
import { Breadcrumb } from 'semantic-ui-react';
import styled from 'styled-components';
import HomePageNav from './homepage/HomePageNav';
import HelpCenterBanner from '../HelpCenterBanner';
import { Segment, Image, Container } from 'semantic-ui-react';
import { COLORS, FONT } from '../../app/constants';

import { helpCenterCategories } from './help-center/helpCenterCategories';
import HelpCenterArticle from './help-center/HelpCenterArticle';

import { Sidebar } from '../sidebar/Sidebar';
import SearchByCategory, { Documents } from '../search/SearchByCategory';
import { FetchDocsResponse } from 'src/services/api/fetchDocs';
import useSearchDocuments, { UseSearchDocumentsResponse } from 'src/hooks/useSearchDocuments';
import { use } from 'chai';
import useFetchDocumentCategories from 'src/hooks/useFetchDocumentCategories';
import { DocumentContext, DocumentProvider } from './help-center/DocumentContext';

const data: any = {
  'Legal & Compliance': {
    name: 'Legal & Compliance',
    results: [
      {
        id: 'a1',
        title: 'Privacy Policy',
      },
      {
        id: 'a2',
        title: 'Terms and Conditions',
      },
    ],
  },
  'Account & Setup': {
    name: 'Account & Setup',
    results: [
      {
        id: 'a3',
        title: 'Add an Azure Service Connection',
      },
      {
        id: 'a4',

        title: 'Add an AWS Service Connection',
      },
    ],
  },
  'Cost Containers': {
    name: 'Cost Containers',
    results: [
      {
        id: 'a5',
        title: 'Working with Cost Containers',
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

interface IHelpCenterProps {
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
  { key: 'HelpCenter', content: 'Help Center', link: true },
  { key: 'Account', content: 'Account & Setup', link: true },
  { key: 'AccountManagement', content: 'Account Management', active: true },
];

export const HelpCenter: React.FC<IHelpCenterProps> = ({ title }) => {
  const showDocs = false;
  const [searchString, setSearchString] = React.useState('');
  const [selectedId, setSelectedId] = React.useState<string>('');
  const { documentId } = useContext(DocumentContext);
  // const searchResponse: UseSearchDocumentsResponse = useSearchDocuments({ search: searchString });

  useEffect(() => {
    console.log('searchString', searchString);
  }, [searchString]);
  const categories = useFetchDocumentCategories();

  return (
    <>
      <DocumentProvider>
        <PageContainer fluid>
          <HomePageNav className="nav-border" />

          <div style={{ height: '100%', overflowY: 'auto' }}>
            <Container>
              <HelpCenterBanner className="min-left-padding" heading="Help Center" />
              <div style={{ display: 'flex' }}>
                <SidebarWrapper>
                  <SearchByCategory
                    placeholder="Search Help Center.."
                    options={data}
                    setSearchString={setSearchString}
                    setSelectedId={setSelectedId}
                  />
                  <GetStartedSpan>
                    <p>Get Started</p>
                  </GetStartedSpan>
                  <Sidebar menuItems={categories.category} className="light" />
                </SidebarWrapper>
                <ContentWrapper>
                  <StyledBreadcrumb icon="right angle" sections={breadcrumbSections} />
                  <div>
                    <div className="heading" style={{ padding: '1em 0' }}></div>
                    <>{showDocs ? <div className="doc-list"></div> : <HelpCenterArticle />}</>
                  </div>
                </ContentWrapper>
              </div>
            </Container>
          </div>
        </PageContainer>
      </DocumentProvider>
    </>
  );
};

export default HelpCenter;
