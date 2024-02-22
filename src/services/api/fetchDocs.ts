import { DOCS, BASE } from './apiEndpoints';

export type DocumentType = {
  adoFilePath: string;
  category: string;
  htmlContent: string;
  id: string;
  lastUpdatedDate: string;
  summary: string;
  tags: string[];
  title: string;
};

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
