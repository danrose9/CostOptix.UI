import React, { useContext } from 'react';
import useFetchDocumentById from 'src/hooks/useFetchDocumentById';
import { Document } from './HelpCentreStyles';
import { DocumentContext } from './DocumentContext';

interface HelpCenterArticleProps {}

export const HelpCenterArticle: React.FC<HelpCenterArticleProps> = () => {
  const { documentId } = useContext(DocumentContext);
  const { document, isLoading, error } = useFetchDocumentById(documentId);

  if (isLoading) {
    return <div>Loading...</div>;
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

export default HelpCenterArticle;
