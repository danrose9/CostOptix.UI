export type Document = {
  adoFilePath: string;
  category: string;
  htmlContent: string;
  id: string;
  lastUpdatedDate: string;
  summary: string;
  tags: string[] | null;
  title: string;
};

export type Blog = {
  id: string;
  adoFilePath: string;
  title: string;
  lastUpdatedDate: string;
  createdDate: string;
  category: string;
  tags: string[] | null;
  summary: string;
  htmlContent: string;
  lengthInMinutes: number;
};

export type Category = {
  name: string;
  documents: Document[] | Blog[];
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
