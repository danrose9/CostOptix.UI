import { useState, useEffect } from 'react';
import { searchDocs, SearchDocsParams } from '../services/api/fetchDocs';

const useSearchDocuments = ({ search, top, skip }: SearchDocsParams) => {
  const [documents, setDocuments] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!search) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await searchDocs({ search, top, skip });
        setDocuments(response);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search, top, skip]);

  return { documents, isLoading, error };
};

export default useSearchDocuments;
