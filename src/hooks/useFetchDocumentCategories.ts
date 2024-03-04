import { useState, useEffect } from 'react';
import { ISubmenuItem } from 'src/types/menu-types';
import { searchDocs, FetchDocsResponse } from '../services/api/fetchDocs';

export type UseSearchDocumentsResponse = {
  category: FetchDocsResponse[];
  isLoading: boolean;
  error: string | null;
};

const useFetchDocumentCategories = () => {
  const [category, setCategory] = useState<{ title: string; items: ISubmenuItem[] }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await searchDocs();

        const transformedData = Object.keys(response.data).map((category) => ({
          title: category,
          items: response.data[category].documents.map((doc: ISubmenuItem) => ({
            id: doc.id,
            title: doc.title,
            category: doc.category,
            active: true,
          })),
        }));

        setCategory(transformedData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { category, isLoading, error };
};

export default useFetchDocumentCategories;
