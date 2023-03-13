import { CLOUD_BILLING_ACCOUNTS } from './apiEndpoints';
import fetchInstance from './fetchInstance';
import { ICloudBillingAccountsArgs } from 'cloud-billingaccounts-types';

export const fetchCloudBillingAccounts = async (args: ICloudBillingAccountsArgs) => {
  const response = await fetchInstance(CLOUD_BILLING_ACCOUNTS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accountId: args.directoryId,
      username: args.applicationId,
      password: args.secretValue,
      cloudProvider: args.provider,
    }),
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

export default fetchCloudBillingAccounts;
