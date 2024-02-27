import React from 'react';
import useFetchDocumentById from 'src/hooks/useFetchDocumentById';
import styled from 'styled-components';

const documentId = '65c8cdbe67367cae14bbabb9';

const StyledDiv = styled.div`
  ul {
    padding: 0.5em 3em;
  }
`;

export const PrivacyPolicy = () => {
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
      <StyledDiv dangerouslySetInnerHTML={{ __html: document.htmlContent }} />
    </>
  );
};

export default PrivacyPolicy;
