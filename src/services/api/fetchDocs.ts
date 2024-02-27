import { DOCS, BASE } from './apiEndpoints';

export type FetchDocsResponse = {
  totalCount: number;
  data: DocumentType[];
};

export type DocumentType = {
  adoFilePath: string;
  category: string;
  htmlContent: string;
  id: string;
  lastUpdatedDate: string;
  summary: string;
  tags: string[] | null;
  title: string;
};

export interface SearchDocsParams {
  search?: string;
  top?: number | undefined;
  skip?: number | undefined;
}

export const fetchDocById = async (documentId: string) => {
  const url = `${BASE}${DOCS}/${documentId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok && response.headers.get('Content-Type')?.includes('application/json')) {
    let data = await response.json();
    return data;
  } else if (response.ok) {
    throw new Error('Expected JSON response, but received non-JSON.');
  } else {
    throw new Error(`Failed to fetch document with status: ${response.status}`);
  }
};

export const searchDocs = async ({ search = '', top = 10, skip = 0 } = {}) => {
  const queryParams = new URLSearchParams({
    $search: search,
    $top: String(top),
    $skip: String(skip),
  });

  const url = `${BASE}${DOCS}?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    let data = await response.json();
    return data;
  } else if (response.ok) {
    throw new Error('Expected JSON response, but received non-JSON.');
  } else {
    throw new Error(`Failed to fetch documents with status: ${response.status}`);
  }
};
