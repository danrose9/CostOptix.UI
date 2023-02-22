import { CLOUD_BILLING_ACCOUNTS } from './apiEndpoints';
import fetchInstance from './fetchInstance';

interface ICloudBillingAccountsArgs {
  directoryId: string;
  applicationId: string;
  secretValue: string;
  provider: string;
}

export const fetchCloudBillingAccounts = async (args: ICloudBillingAccountsArgs) => {
  let response = await fetchInstance(CLOUD_BILLING_ACCOUNTS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accountId: args.directoryId,
      username: args.applicationId,
      password: args.secretValue,
      cloudProvider: args.provider,
    }),
  });
  let data = response.json();

  return data;
};

export default fetchCloudBillingAccounts;
