import React, { createContext, useContext, useState } from 'react';

// Create a context
export const DocumentContext = createContext({ documentId: '', setDocumentId: (documentId: string) => {} });

interface IDocumentContext {
  children: React.ReactNode;
}

export const DocumentProvider: React.FC<IDocumentContext> = ({ children }) => {
  const [documentId, setDocumentId] = useState('');

  return <DocumentContext.Provider value={{ documentId, setDocumentId }}>{children}</DocumentContext.Provider>;
};

// Custom hook to use document context
export const useDocument = () => useContext(DocumentContext);
