import React, { useState, useContext, useEffect } from 'react';
import { PageContainer } from '../__styles__/HomePageStyles';
import styled from 'styled-components';
import HomePageNav from '../pages/homepage/HomePageNav';
import HelpCenterBanner from '../HelpCenterBanner';
import { Segment, Image, Container } from 'semantic-ui-react';
import { COLORS, FONT } from '../../app/constants';

import HelpCenterArticle from './HelpCenterArticle';

import { Sidebar } from '../sidebar/Sidebar';
import SearchByCategory from '../search/SearchByCategory';
import { Documents } from 'src/services/api/fetchDocs';
import { UseSearchDocumentsResponse } from 'src/services/api/fetchDocs';
import useSearchDocuments from 'src/hooks/useSearchDocuments';
import useFetchDocumentCategories from 'src/hooks/useFetchDocumentCategories';
import { DocumentContext } from './DocumentContext';
import GetStartedDocument from './GetStartedDocument';
import useFetchDocumentById from 'src/hooks/useFetchDocumentById';
import Breadcrumb, { buildBreadcrumbSections } from '../Breadcrumb';
import SearchDocuments from '../search/SearchDocuments';
import Search from '../search/Search';
import SearchByCategoryId from '../search/SearchByCategoryId';

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
  p,
  li {
    color: ${FONT.SECONDARY_COLOR} !important;
  }
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

export const HelpCenter: React.FC<IHelpCenterProps> = ({ title }) => {
  const [showGetStarted, setShowGetStarted] = useState(true);
  const [searchString, setSearchString] = React.useState('');
  const [selectedId, setSelectedId] = React.useState<string>('');

  const searchResponse: UseSearchDocumentsResponse = useSearchDocuments({ search: searchString });

  const categories = useFetchDocumentCategories();

  const { documentId, category, setDocumentId } = useContext(DocumentContext);
  const documentRecord = useFetchDocumentById(documentId);

  const renderGetStartedDocument = () => {
    setShowGetStarted(true);
    setDocumentId(''); // Clear the documentId
  };

  useEffect(() => {
    if (documentId) {
      setShowGetStarted(false);
    }
  }, [documentId]);

  useEffect(() => {
    renderGetStartedDocument();
  }, []);

  const breadcrumbSections = buildBreadcrumbSections({
    showGetStarted,
    category,
    documentRecord,
  });

  // useEffect(() => {
  //   console.log('searchResponse', searchResponse);
  // }, [searchResponse]);

  return (
    <ContentContainer>
      <HelpCenterBanner className="min-left-padding" heading="Help Center" />
      <div style={{ display: 'flex' }}>
        <SidebarWrapper>
          {/* <SearchByCategory
            placeholder="SearchByCategory"
            options={data}
            setSearchString={setSearchString}
            setSelectedId={setSelectedId}
          /> */}
          {/* <SearchByCategoryId
            placeholder="SearchByCategoryId"
            options={data}
            setSearchString={setSearchString}
            setSelectedId={setSelectedId}
          /> */}
          {/* <Search placeholder="Search" options={searchResponse.documents} setSearchString={setSearchString} /> */}

          {/* <AISearch options={searchResponse.documents} setSearchString={setSearchString} /> */}
          <GetStartedSpan onClick={renderGetStartedDocument}>
            <p>Get Started</p>
          </GetStartedSpan>
          <Sidebar menuItems={categories.category} className="light" />
        </SidebarWrapper>
        <ContentWrapper>
          <StyledBreadcrumb sections={breadcrumbSections} />

          {showGetStarted ? <GetStartedDocument /> : <HelpCenterArticle documentRecord={documentRecord} />}
        </ContentWrapper>
      </div>
    </ContentContainer>
  );
};

export default HelpCenter;
