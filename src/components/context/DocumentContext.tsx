import React, { createContext, useContext, useState } from 'react';

// Updated context initial value to include category
const contextDefaultValue = {
  documentId: '',
  setDocumentId: (documentId: string) => {},
  category: '',
  setCategory: (category: string) => {},
  selectDocument: (documentId: string, category: string) => {},
};

// Type definition for the context
export interface IDocumentContextProps {
  documentId: string;
  setDocumentId: (documentId: string) => void;
  category: string;
  setCategory: (category: string) => void;
}

// Creating context with the updated structure
export const DocumentContext = createContext<IDocumentContextProps>(contextDefaultValue);

export interface IDocumentProviderProps {
  children: React.ReactNode;
}

export const DocumentProvider: React.FC<IDocumentProviderProps> = ({ children }) => {
  const [documentId, setDocumentId] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  return (
    <DocumentContext.Provider value={{ documentId, setDocumentId, category, setCategory }}>
      {children}
    </DocumentContext.Provider>
  );
};

// Custom hook to use document context more easily
export const useDocument = () => useContext(DocumentContext);
