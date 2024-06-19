import React from 'react';
import { Document } from '../__styles__/DocumentStyles';
import { Document as DocumentType } from 'src/types/document-types';
import { Loader } from 'src/components/Loader';

interface HelpCenterArticleProps {
  documentRecord: { document: DocumentType; isLoading: boolean; error: Error | null };
}

export const HelpCenterArticle: React.FC<HelpCenterArticleProps> = ({ documentRecord }) => {
  const { document, isLoading, error } = documentRecord;

  if (isLoading) {
    return <Loader text="Loading document.." />;
  }

  if (error) {
    return <div>Error loading document</div>;
  }

  if (!document || !documentRecord) {
    return <div>Document not found</div>;
  }

  return (
    <>
      <Document dangerouslySetInnerHTML={{ __html: document.htmlContent }} />
    </>
  );
};

export default HelpCenterArticle;
