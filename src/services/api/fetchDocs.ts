import { DOCS, BASE } from './apiEndpoints';

type DocumentType = { documentId: string; endpoint: string };

export const fetchDocById = async (args: DocumentType) => {
  const { documentId, endpoint } = args;
  const url = `${BASE}${endpoint}/${documentId}`;

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

export const searchDocs = async ({ search = '', top = 10, skip = 0, endpoint = DOCS } = {}) => {
  const queryParams = new URLSearchParams({
    $search: search,
    $top: String(top),
    $skip: String(skip),
  });

  const url = `${BASE}${endpoint}?${queryParams.toString()}`;

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
