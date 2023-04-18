import React, { useEffect, useState } from 'react';
import { Table, Segment, TableHeaderCell } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceProviders, fetchBillingAccounts } from '../../services/redux/thunks/serviceProvidersThunk';
import { reduxState } from '../../services/redux/reduxState';
import BillingAccount from './BillingAccount';
import {
  fetchBillingAccountCosts,
  fetchTransientBillingAccountCosts,
} from '../../services/redux/thunks/costDashboardThunk';
import { resetCostDashboard, addBillingAccount } from '../../services/redux/reducers/costDashboardSlice';
import { resetServiceProviders } from '../../services/redux/reducers/serviceProvidersSlice';
import { StyledIconButton } from '../../styles/StyledDashboardHeader';
import { CurrencyConflictWarning, NoBillingAccountMessage } from '../../components/messages/index';

import { IRootState } from '../../services/redux/rootReducer';
import { IBillingAccount, IBillingAccountsCostDashboard, IBillingAccountCostDashboard } from '../../types';
import { AppDispatch } from '../../services/redux/store';

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
    dispatch(resetCostDashboard(true));
    dispatch(resetServiceProviders());
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
              <Table.HeaderCell colSpan="3">Active Billing Accounts</Table.HeaderCell>
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
          <Table.Body style={{ height: '30px' }}>
            {isLoading ? null : <BillingAccounts billingAccounts={billingAccounts} />}
          </Table.Body>
          <AccountStatusMessage />
        </Table>

        <CurrencyConflict />
        <NoBillingAccounts />
      </Segment>
    );
  };

  const fetchBillingAccountData = async (billingAccount: any) => {
    if (billingAccount.status === 'Transient') {
      await dispatch<AppDispatch>(fetchTransientBillingAccountCosts(billingAccount.accountId));
    } else {
      await dispatch<AppDispatch>(fetchBillingAccountCosts(billingAccount.id));
    }
  };

  useEffect(() => {
    if (isBillingAccountsAvailable) {
      setIsLoading(false);
    } else {
      // Fetch a list of billing accounts
      setAccountStatus('Searching for billing accounts ..');
      dispatch<AppDispatch>(fetchServiceProviders());
      dispatch<AppDispatch>(fetchBillingAccounts()).then((response: { payload: any }) => {
        response.payload?.billingAccounts
          .filter((billingAccount: IBillingAccount) => billingAccount.status !== 'Disabled')
          .map((billingAccount: IBillingAccount, index: any) => {
            // console.log('xxxxx', billingAccount);
            dispatch(addBillingAccount(billingAccount));
            fetchBillingAccountData(billingAccount);
          });

        setAccountStatus(lastUpdated);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isBillingAccountsAvailable, isCurrencyConflict, lastUpdated]);

  useEffect(() => {
    isCurrencyConflictCallback(isCurrencyConflict);
  }, [isCurrencyConflict, isCurrencyConflictCallback]);

  return <RenderTable />;
};

export default ActiveBillingAccounts;
