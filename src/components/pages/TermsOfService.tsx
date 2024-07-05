import React from 'react';
import useFetchDocumentById from 'src/hooks/useFetchDocumentById';
import { Document } from '../__styles__/DocumentStyles';
import { Loader } from 'src/components/Loader';
import { LegalDocumentWrapper } from '../__styles__/ExternalPageStyles';
import { DOCS } from 'src/services/api/apiEndpoints';

const documentId = 'Legal-Terms-and-Conditions';

export const TermsOfService = () => {
  const { document, isLoading, error } = useFetchDocumentById(documentId, DOCS);

  if (isLoading) {
    return <Loader text="Loading document.." />;
  }

  if (error) {
    console.warn('Error loading the terms of service: ', { error });
  }

  if (!document) {
    return <div>Document not found</div>;
  }

  return (
    <>
      <LegalDocumentWrapper>
        <Document dangerouslySetInnerHTML={{ __html: document.htmlContent }} />
      </LegalDocumentWrapper>
    </>
  );
};

export default TermsOfService;
