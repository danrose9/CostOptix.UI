import { fetchServiceProviders, fetchBillingAccounts } from '../redux/thunks/serviceProvidersThunk';
import { fetchBillingAccountCosts, fetchTransientBillingAccountCosts } from '../redux/thunks/costDashboardThunk';
import { addBillingAccount } from '../redux/reducers/costDashboardSlice';
import { AppDispatch } from 'src/services/redux/store';
import { IBillingAccount } from 'src/types';

interface IFetchAccountsAndServiceProviders {
  dispatch: AppDispatch;
  updateIsLoading: (isLoading: boolean) => void;
  setAccountStatus: (status: string) => void;
  lastUpdated: string;
}

export const fetchAccountsAndServiceProviders = async ({
  dispatch,
  updateIsLoading,
  setAccountStatus,
  lastUpdated,
}: IFetchAccountsAndServiceProviders): Promise<void> => {
  try {
    updateIsLoading(true);
    setAccountStatus('Searching for billing accounts...');

    await dispatch(fetchServiceProviders());

    const response = await dispatch(fetchBillingAccounts());

    response.payload?.billingAccounts
      .filter((billingAccount: IBillingAccount) => billingAccount.status !== 'Disabled')
      .forEach((billingAccount: IBillingAccount) => {
        dispatch(addBillingAccount(billingAccount));
        if (billingAccount.status === 'Transient') {
          dispatch(fetchTransientBillingAccountCosts(billingAccount.accountId));
        } else {
          dispatch(fetchBillingAccountCosts(billingAccount.id));
        }
      });

    setAccountStatus(lastUpdated);
  } catch (error) {
    console.error('Failed to fetch billing accounts or service providers:', error);
  } finally {
    updateIsLoading(false);
  }
};
