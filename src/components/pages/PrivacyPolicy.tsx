import React from 'react';
import useFetchDocumentById from 'src/hooks/useFetchDocumentById';
import { Document } from '../help-center/HelpCentreStyles';
import { Loader } from 'src/components/Loader';

const documentId = '65c8cdbe67367cae14bbabb9';

export const PrivacyPolicy = () => {
  const { document, isLoading, error } = useFetchDocumentById(documentId);

  if (isLoading) {
    return <Loader text="Loading document.." />;
  }

  if (error) {
    console.warn('Error loading the privacy policy: ', { error });
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

export default PrivacyPolicy;
