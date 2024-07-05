import React, { useState, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import HelpCenterBanner from '../HelpCenterBanner';
import { COLORS } from '../../app/constants';
import HelpCenterArticle from './HelpCenterArticle';
import { Sidebar } from '../sidebar/Sidebar';
import { SearchDocumentsResponseType } from 'src/types/document-types';
import * as images from '../../assets/index';
import GetStartedDocument from './GetStartedDocument';
import { DocumentContext } from '../context/DocumentContext';
import { useFetchDocumentById, useFetchDocumentCategories, useSearchDocuments } from 'src/hooks/index';
import Breadcrumb, { buildBreadcrumbSections } from '../Breadcrumb';
import SearchDocument from '../search/SearchDocument';
import { DOCS } from 'src/services/api/apiEndpoints';
import { StyledIcon } from '../HelpCenterBanner';

const TITLE = 'Help Center';
const STRAPLINE = "Want to get in touch? We'd love to hear from you. Here's is how you can reach us..";

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

const HelpCenterWrapper = styled.div`
  display: flex;
`;

export const HelpCenter: React.FC<IHelpCenterProps> = ({ title }) => {
  const [showGetStarted, setShowGetStarted] = useState(true);
  const [searchString, setSearchString] = React.useState('');
  const searchResponse: SearchDocumentsResponseType = useSearchDocuments({ search: searchString, endpoint: DOCS });

  const categories = useFetchDocumentCategories();

  const { documentId, category, setDocumentId } = useContext(DocumentContext);
  const documentRecord = useFetchDocumentById(documentId, DOCS);

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

  const SupportHeaderContent = () => {
    return (
      <>
        <StyledIcon name="talk" />
        <p>
          Get in contact at <a href="mailto:support@ddiware.com">support@ddiware.com</a>
        </p>
      </>
    );
  };

  return (
    <>
      <HelpCenterBanner
        className="min-left-padding"
        heading={TITLE}
        image={images.SUPPORT}
        strapline={STRAPLINE}
        content={<SupportHeaderContent />}
      />
      <HelpCenterWrapper>
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
      </HelpCenterWrapper>
    </>
  );
};

export default HelpCenter;
