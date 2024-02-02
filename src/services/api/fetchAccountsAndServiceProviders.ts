import { fetchServiceProviders, fetchBillingAccounts } from '../redux/thunks/serviceProviderThunk';
import { fetchBillingAccountCosts } from '../redux/thunks/costDashboardThunk';
import { addBillingAccount, setStatus } from '../redux/reducers/costDashboardSlice';
import { AppDispatch } from 'src/services/redux/store';
import { IBillingAccount } from 'src/types';

interface IFetchAccountsAndServiceProviders {
  dispatch: AppDispatch;
  updateIsLoading?: (isLoading: boolean) => void;
  updateSetAccountStatus?: (status: string) => void;
  lastUpdated: string;
}

type ReturnedPayload = Promise<number | undefined>;

export const fetchAccountsAndServiceProviders = async ({
  dispatch,
  updateIsLoading,
  updateSetAccountStatus,
  lastUpdated,
}: IFetchAccountsAndServiceProviders): Promise<ReturnedPayload> => {
  try {
    if (updateIsLoading && updateSetAccountStatus) {
      updateIsLoading(true);
      updateSetAccountStatus('Searching for billing accounts...');
    }

    await dispatch(fetchServiceProviders());

    const response = await dispatch(fetchBillingAccounts());
    const billingAccountCount = response.payload?.billingAccounts.length;

    if (billingAccountCount === 0) {
      dispatch(setStatus(true));
      return 0;
    }

    response.payload?.billingAccounts
      .filter((billingAccount: IBillingAccount) => billingAccount.status !== 'Disabled')
      .forEach((billingAccount: IBillingAccount) => {
        dispatch(addBillingAccount(billingAccount));
        dispatch(fetchBillingAccountCosts(billingAccount.id));
      });

    if (updateSetAccountStatus) updateSetAccountStatus(lastUpdated);
    return billingAccountCount;
  } catch (error) {
    console.error('Failed to fetch billing accounts or service providers:', error);
  } finally {
    if (updateIsLoading) updateIsLoading(false);
  }
};
