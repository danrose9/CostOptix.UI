import { useState, useEffect } from 'react';
import { ISubmenuItem } from 'src/types/menu-types';
import { searchDocs } from '../services/api/fetchDocs';

const LEGAL = 'Legal';

const useFetchDocumentCategories = () => {
  const [category, setCategory] = useState<{ title: string; items: ISubmenuItem[] }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await searchDocs();

        let transformedData = Object.keys(response.data).map((category) => ({
          title: category,
          items: response.data[category].documents.map((doc: ISubmenuItem) => ({
            id: doc.id,
            webPath: doc.webPath,
            title: doc.title,
            category: doc.category,
            active: true,
          })),
        }));

        // Filter out the 'Legal' category
        transformedData = transformedData.filter((category) => category.title !== LEGAL);

        // Sort the transformed data by category title
        const sortedData = transformedData.sort((a, b) => a.title.localeCompare(b.title));

        setCategory(sortedData);
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
