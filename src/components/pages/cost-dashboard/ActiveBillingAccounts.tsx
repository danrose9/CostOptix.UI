import React, { useEffect, useState } from 'react';
import { Table, Segment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceProviders, fetchBillingAccounts } from '../../../services/redux/thunks/serviceProvidersThunk';
import { reduxState } from '../../../services/redux/reduxState';
import BillingAccount from './BillingAccount';
import {
  fetchBillingAccountCosts,
  fetchTransientBillingAccountCosts,
} from '../../../services/redux/thunks/costDashboardThunk';
import { addBillingAccount } from '../../../services/redux/reducers/costDashboardSlice';
import useResetCostDashboard from '../../../hooks/useResetCostDashboard';
import { StyledIconButton } from '../../../styles/StyledDashboardHeader';
import { CurrencyConflictWarning, NoBillingAccountMessage } from '../../messages/index';

import { IRootState } from '../../../services/redux/rootReducer';
import { IBillingAccount, IBillingAccountsCostDashboard, IBillingAccountCostDashboard } from '../../../types';
import { AppDispatch } from '../../../services/redux/store';

const BillingAccounts: React.FC<IBillingAccountsCostDashboard> = ({ billingAccounts }) => {
  return (
    <>
      {billingAccounts.map((billingAccount: IBillingAccountCostDashboard, index: any) => {
        return <BillingAccount key={index} billingAccount={billingAccount} />;
      })}
    </>
  );
};

const ActiveBillingAccounts = ({ isCurrencyConflictCallback }: any) => {
  const dispatch = useDispatch();
  const reset = useResetCostDashboard();
  const billingAccounts = useSelector((state: IRootState) => state[reduxState.COST_DASHBOARD].billingAccounts);

  const [accountStatus, setAccountStatus] = useState<string>('');

  const isBillingAccountsAvailable = useSelector(
    (state: IRootState) => state[reduxState.SERVICE_PROVIDERS].isAvailable
  );

  const { isComplete, billingAccountCount, lastUpdated } = useSelector(
    (state: IRootState) => state[reduxState.COST_DASHBOARD]
  );

  const [isLoading, setIsLoading] = useState(true);

  const refreshPage = () => {
    setIsLoading(true);
    reset();
  };

  const isNoBillingAccount = () => {
    return billingAccountCount === 0 && isComplete ? true : false;
  };

  const LastUpdated = () => {
    return (
      <>{isNoBillingAccount() ? null : <Table.HeaderCell colSpan="4">Last Updated: {lastUpdated}</Table.HeaderCell>}</>
    );
  };

  const AccountStatusMessage = () => {
    return (
      <>
        <Table.Footer fullWidth>
          <Table.Row>
            {accountStatus && !isComplete ? (
              <Table.HeaderCell colSpan="4">{accountStatus}</Table.HeaderCell>
            ) : (
              <LastUpdated />
            )}
          </Table.Row>
        </Table.Footer>
      </>
    );
  };

  const NoBillingAccounts = () => {
    return <>{isNoBillingAccount() ? <NoBillingAccountMessage /> : null}</>;
  };

  const { isCurrencyConflict } = useSelector((state: IRootState) => state[reduxState.SERVICE_PROVIDERS]);

  const CurrencyConflict = () => {
    return <>{isCurrencyConflict ? <CurrencyConflictWarning /> : null}</>;
  };

  const RenderTable = () => {
    return (
      <Segment color="green">
        <Table selectable>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="3" data-testid="billing-accounts">
                Active Billing Accounts
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" width={2}>
                <StyledIconButton
                  name="refresh"
                  onClick={refreshPage}
                  loading={!isComplete}
                  disabled={!isComplete}
                  fitted
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{isLoading ? null : <BillingAccounts billingAccounts={billingAccounts} />}</Table.Body>
          <AccountStatusMessage />
        </Table>

        <CurrencyConflict />
        <NoBillingAccounts />
      </Segment>
    );
  };

  useEffect(() => {
    if (!isBillingAccountsAvailable) {
      setIsLoading(true);
      setAccountStatus('Searching for billing accounts...');

      const fetchBillingAccountData = async (billingAccount: IBillingAccount) => {
        if (billingAccount.status === 'Transient') {
          await dispatch<AppDispatch>(fetchTransientBillingAccountCosts(billingAccount.accountId));
        } else {
          await dispatch<AppDispatch>(fetchBillingAccountCosts(billingAccount.id));
        }
      };

      const fetchAccountsAndServiceProviders = async () => {
        try {
          await dispatch<AppDispatch>(fetchServiceProviders());

          const response = await dispatch<AppDispatch>(fetchBillingAccounts());

          response.payload?.billingAccounts
            .filter((billingAccount: IBillingAccount) => billingAccount.status !== 'Disabled')
            .forEach((billingAccount: IBillingAccount, index: any) => {
              dispatch(addBillingAccount(billingAccount));
              fetchBillingAccountData(billingAccount);
            });

          setAccountStatus(lastUpdated);
        } catch (error) {
          console.error('Failed to fetch billing accounts or service providers:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchAccountsAndServiceProviders();
    }
  }, [isBillingAccountsAvailable, lastUpdated, dispatch]);

  useEffect(() => {
    isCurrencyConflictCallback(isCurrencyConflict);
  }, [isCurrencyConflict, isCurrencyConflictCallback]);

  return <RenderTable />;
};

export default ActiveBillingAccounts;
