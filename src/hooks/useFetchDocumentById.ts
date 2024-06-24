import { useState, useEffect } from 'react';
import { fetchDocById } from '../services/api/fetchDocs';

const useFetchDocumentById = (documentId: string, endpoint: string) => {
  const [document, setDocument] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!documentId) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchDocById({ documentId, endpoint });
        setDocument(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [documentId, endpoint]);

  return { document, isLoading, error };
};

export default useFetchDocumentById;
