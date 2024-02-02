import { useState, useEffect } from 'react';
import { fetchBillingAccounts } from '../services/api/fetchBillingAccounts';

// Custom hook to get the billing account count
export const useBillingAccountCount = () => {
  const [billingAccountCount, setBillingAccountCount] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBillingAccounts = async () => {
      setIsLoading(true);
      try {
        const { count } = await fetchBillingAccounts();
        setBillingAccountCount(count);
      } catch (error) {
        // Handle error
        console.error('Failed to fetch billing accounts', error);
        setBillingAccountCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadBillingAccounts();
  }, []);

  return { billingAccountCount, isLoading };
};
