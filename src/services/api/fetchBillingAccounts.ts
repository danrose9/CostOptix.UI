import { BILLING_ACCOUNTS } from './apiEndpoints';
import fetchInstance from './fetchInstance';

export const fetchBillingAccounts = async () => {
  const response = await fetchInstance(BILLING_ACCOUNTS, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    let data = await response.json();
    let count;
    try {
      count = data.billingAccounts.length;
    } catch {
      return { error: 'Found 0 accounts, please check settings' };
    }
    return { ...data, count: count };
  } else {
    return await response.json();
  }
};

export default fetchBillingAccounts;
