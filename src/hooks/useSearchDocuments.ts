import { useState, useEffect } from 'react';
import { searchDocs } from '../services/api/fetchDocs';
import { SearchDocsParams } from '../types/document-types';

const useSearchDocuments = ({ search, top, skip, endpoint }: SearchDocsParams) => {
  const [documents, setDocuments] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!search) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await searchDocs({ search, top, skip, endpoint });
        setDocuments(response);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search, top, skip, endpoint]);

  return { documents, isLoading, error };
};

export default useSearchDocuments;
