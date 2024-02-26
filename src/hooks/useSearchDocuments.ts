import { useState, useEffect } from 'react';
import { searchDocs, DocumentType, SearchDocsParams } from '../services/api/fetchDocs';

const useSearchDocuments = ({ search, top, skip }: SearchDocsParams) => {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!search) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await searchDocs({ search, top, skip });
        setDocuments(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return { documents, isLoading, error };
};

export default useSearchDocuments;
