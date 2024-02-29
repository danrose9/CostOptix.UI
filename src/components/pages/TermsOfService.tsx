import React from 'react';
import useFetchDocumentById from 'src/hooks/useFetchDocumentById';
import { Document } from './help-center/HelpCentreStyles';

const documentId = '65c8cdbe67367cae14bbabba';

export const TermsOfService = () => {
  const { document, isLoading, error } = useFetchDocumentById(documentId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.warn('Error loading the terms of service: ', { error });
  }

  if (!document) {
    return <div>Document not found</div>;
  }

  return (
    <>
      <Document dangerouslySetInnerHTML={{ __html: document.htmlContent }} />
    </>
  );
};

export default TermsOfService;
