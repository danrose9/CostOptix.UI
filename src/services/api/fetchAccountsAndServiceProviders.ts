import { fetchServiceProviders, fetchBillingAccounts } from '../redux/thunks/serviceProvidersThunk';
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

export const fetchAccountsAndServiceProviders = async ({
  dispatch,
  updateIsLoading,
  updateSetAccountStatus,
  lastUpdated,
}: IFetchAccountsAndServiceProviders): Promise<void> => {
  try {
    if (updateIsLoading && updateSetAccountStatus) {
      updateIsLoading(true);
      updateSetAccountStatus('Searching for billing accounts...');
    }

    await dispatch(fetchServiceProviders());

    const response = await dispatch(fetchBillingAccounts());

    if (response.payload?.billingAccounts.length === 0) {
      dispatch(setStatus(true));
      return;
    }

    response.payload?.billingAccounts
      .filter((billingAccount: IBillingAccount) => billingAccount.status !== 'Disabled')
      .forEach((billingAccount: IBillingAccount) => {
        dispatch(addBillingAccount(billingAccount));
        dispatch(fetchBillingAccountCosts(billingAccount.id));
      });

    if (updateSetAccountStatus) updateSetAccountStatus(lastUpdated);
  } catch (error) {
    console.error('Failed to fetch billing accounts or service providers:', error);
  } finally {
    if (updateIsLoading) updateIsLoading(false);
  }
};
