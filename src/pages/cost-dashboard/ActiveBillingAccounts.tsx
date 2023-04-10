import React, { useEffect, useState } from 'react';
import { Table, Segment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceProviders, fetchBillingAccounts } from '../../services/redux/thunks/serviceProvidersThunk';
import { reduxState } from '../../services/redux/reduxState';
import BillingAccount from './BillingAccount';
import {
  fetchBillingAccountCosts,
  fetchTransientBillingAccountCosts,
} from '../../services/redux/thunks/costDashboardThunk';
import {
  resetCostDashboard,
  updateBillingAccountCount,
  addBillingAccount,
} from '../../services/redux/reducers/costDashboardSlice';
import { resetServiceProviders } from '../../services/redux/reducers/serviceProvidersSlice';
import { StyledIconButton } from '../../styles/StyledDashboardHeader';
import { CurrencyConflictWarning, NoBillingAccountMessage } from '../../components/messages/index';

import { IRootState } from '../../services/redux/rootReducer';
import { ICostDashboardBillingAccountProps, CostDashboardBillingAccountType } from 'cost-dashboard-types';
import { ServiceProviderBillingAccountType } from 'service-provider-types';
import { AppDispatch } from '../../services/redux/store';

const BillingAccounts = ({ billingAccount }: ICostDashboardBillingAccountProps) => {
  return (
    <>
      {billingAccount
        // .filter((account: CostDashboardBillingAccountType) => account.isError === false)
        .map((account: CostDashboardBillingAccountType, index: any) => {
          return <BillingAccount key={index} billingAccount={account} />;
        })}
    </>
  );
};

const ActiveBillingAccounts = ({ isCurrencyConflictCallback }: any) => {
  const dispatch = useDispatch();

  const billingAccounts: CostDashboardBillingAccountType = useSelector(
    (state: IRootState) => state[reduxState.COST_DASHBOARD].billingAccounts
  );

  const [accountStatus, setAccountStatus] = useState<string>('');

  const isBillingAccountsAvailable = useSelector(
    (state: IRootState) => state[reduxState.SERVICE_PROVIDERS].isAvailable
  );

  const { isComplete, refreshData, billingAccountCount, lastUpdated } = useSelector(
    (state: IRootState) => state[reduxState.COST_DASHBOARD]
  );

  const [isLoading, setIsLoading] = useState(true);

  const refreshPage = (payload: any) => {
    setIsLoading(true);
    dispatch(resetCostDashboard(payload));
    dispatch(resetServiceProviders());
  };

  const isNoBillingAccount = () => {
    return billingAccountCount === 0 && isComplete ? true : false;
  };

  const LastUpdated = () => {
    return (
      <>{isNoBillingAccount() ? null : <Table.HeaderCell colSpan="16">Last Updated: {lastUpdated}</Table.HeaderCell>}</>
    );
  };

  const AccountStatusMessage = () => {
    // const fetchStatus = useSelector((state: IRootState) => state[reduxState.COST_DASHBOARD].fetchStatus);

    return (
      <>
        <Table.Footer fullWidth>
          <Table.Row>
            {accountStatus && !isComplete ? (
              <Table.HeaderCell colSpan="16">{accountStatus}</Table.HeaderCell>
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
      <Segment color="green" data-testid="billingAccounts-1">
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="14">Active Billing Accounts</Table.HeaderCell>
              <Table.HeaderCell colSpan="2" textAlign="center">
                <StyledIconButton
                  name="refresh"
                  onClick={refreshPage}
                  // loading={!isComplete}
                  // disabled={!isComplete}
                  fitted
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{isLoading ? null : <BillingAccounts billingAccount={billingAccounts} />}</Table.Body>
          <AccountStatusMessage />
        </Table>
        <CurrencyConflict />
        <NoBillingAccounts />
      </Segment>
    );
  };

  const regex = /[^/]+$/g;

  const fetchBillingAccountData = async (billingAccount: any) => {
    // const id = accountId.match(regex)?.toString();

    if (billingAccount.status === 'Transient') {
      // await dispatch<AppDispatch>(fetchTransientBillingAccountCosts(billingAccount.accountId));
      console.log('xxxx', 'transient');
    } else {
      // await dispatch<AppDispatch>(fetchBillingAccountCosts(billingAccount.id));
      console.log('xxxx', 'non-transient');
    }
  };

  useEffect(() => {
    if (isBillingAccountsAvailable) {
      setIsLoading(false);
    } else {
      // Fetch a list of billing accounts
      setAccountStatus('Searching for billing accounts ..');
      dispatch<AppDispatch>(fetchServiceProviders());
      dispatch<AppDispatch>(fetchBillingAccounts()).then((response: ServiceProviderBillingAccountType) => {
        // const payloadIsCurrencyConflict: boolean = response.payload?.isCurrencyConflict;

        response.payload.billingAccounts
          .filter((billingAccount: ServiceProviderBillingAccountType) => billingAccount.status !== 'Disabled')
          .map((billingAccount: ServiceProviderBillingAccountType, index: any) => {
            dispatch(addBillingAccount(billingAccount.id));
            fetchBillingAccountData(billingAccount);
          });

        setAccountStatus(lastUpdated);
      });
    }
  }, [dispatch, isBillingAccountsAvailable, isCurrencyConflict]);

  useEffect(() => {
    isCurrencyConflictCallback(isCurrencyConflict);
  }, [isCurrencyConflict, isCurrencyConflictCallback]);

  return <RenderTable />;
};

export default ActiveBillingAccounts;
