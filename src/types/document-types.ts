export type Document = {
  id: string;
  adoFilePath: string;
  author?: string;
  webPath?: string;
  title: string;
  lastUpdatedDate: string;
  createdDate?: string;
  category: string;
  tags: string[] | null;
  summary: string;
  htmlContent: string;
  lengthInMinutes?: number;
};

export type Category = {
  name: string;
  documents: Document[];
};

export type DocumentStructure = {
  [key: string]: Category;
};

export type DocumentData = {
  totalCount: number;
  data: DocumentStructure;
};

export type SearchDocumentsResponseType = {
  documents: DocumentData;
  error?: any;
  isLoading: boolean;
};

export interface SearchDocsParams {
  search?: string;
  top?: number | undefined;
  skip?: number | undefined;
  endpoint: string;
}
