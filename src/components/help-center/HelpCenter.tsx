import React, { useState, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import HelpCenterBanner from '../HelpCenterBanner';
import { Container } from 'semantic-ui-react';
import { COLORS, FONT } from '../../app/constants';
import HelpCenterArticle from './HelpCenterArticle';
import { Sidebar } from '../sidebar/Sidebar';
import { UseSearchDocumentsResponse } from 'src/services/api/fetchDocs';
import useSearchDocuments from 'src/hooks/useSearchDocuments';
import useFetchDocumentCategories from 'src/hooks/useFetchDocumentCategories';
import { DocumentContext } from './DocumentContext';
import GetStartedDocument from './GetStartedDocument';
import useFetchDocumentById from 'src/hooks/useFetchDocumentById';
import Breadcrumb, { buildBreadcrumbSections } from '../Breadcrumb';
import SearchDocument from '../search/SearchDocument';

const HELP_CENTER = 'Help Center';

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

  const searchResponse: UseSearchDocumentsResponse = useSearchDocuments({ search: searchString });

  const categories = useFetchDocumentCategories();

  const { documentId, category, setDocumentId } = useContext(DocumentContext);
  const documentRecord = useFetchDocumentById(documentId);

  const renderGetStartedDocument = useCallback(() => {
    setShowGetStarted(true);
    setDocumentId(''); // Clear the documentId
  }, [setShowGetStarted, setDocumentId]);

  useEffect(() => {
    if (documentId) {
      setShowGetStarted(false);
    }
  }, [documentId]);

  // Fetch the get started document on initial render
  useEffect(() => {
    renderGetStartedDocument();
  }, [renderGetStartedDocument]);

  const breadcrumbSections = buildBreadcrumbSections({
    showGetStarted,
    category,
    documentRecord,
  });

  return (
    <ContentContainer>
      <HelpCenterBanner className="min-left-padding" heading={HELP_CENTER} />
      <div style={{ display: 'flex' }}>
        <SidebarWrapper>
          <SearchDocument placeholder="Search" options={searchResponse.documents} setSearchString={setSearchString} />
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
