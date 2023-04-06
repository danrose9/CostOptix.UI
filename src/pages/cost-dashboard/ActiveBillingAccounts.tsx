import React, { useEffect, useState } from 'react';
import { Table, Segment, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceProviders, fetchBillingAccounts } from '../../services/redux/thunks/serviceProvidersThunk';
import { reduxState } from '../../services/redux/reduxState';
import BillingAccount from './BillingAccount';
import { fetchBillingAccountCosts } from '../../services/redux/thunks/costDashboardThunk';
import {
  updateMonthToDateCost,
  updateMostExpensiveInstance,
  updateFastestGrowingInstance,
  updateMonthlySpend,
  resetCostDashboard,
  updateFetchStatus,
  updateBillingAccountCount,
  addBillingAccount,
} from '../../services/redux/reducers/costDashboardSlice';
import { resetServiceProviders } from '../../services/redux/reducers/serviceProvidersSlice';
import { StyledIconButton } from '../../styles/StyledDashboardHeader';
import { CurrencyConflictWarning, NoBillingAccountMessage } from '../../components/messages/index';
import * as appRoutes from '../../app/appRoutes';
import { useNavigate } from 'react-router-dom';
import { IRootState } from '../../services/redux/rootReducer';
import { ICostDashboardBillingAccountProps, CostDashboardBillingAccountType } from 'cost-dashboard-types';
import { AddBillingAccountType } from 'cloud-billingaccounts-types';
import { AppDispatch } from '../../services/redux/store';

const BillingAccounts = ({ billingAccount }: ICostDashboardBillingAccountProps) => {
  return (
    <>
      {billingAccount
        .filter((account: CostDashboardBillingAccountType) => account.isError === false)
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

  const isBillingAccountsAvailable = useSelector(
    (state: IRootState) => state[reduxState.SERVICE_PROVIDERS].isAvailable
  );

  const { isComplete, billingAccountCount } = useSelector((state: IRootState) => state[reduxState.COST_DASHBOARD]);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const refreshPage = (payload: any) => {
    setIsLoading(true);
    dispatch(resetCostDashboard(payload));
    dispatch(resetServiceProviders());
  };

  const isNoBillingAccount = () => {
    return billingAccountCount === 0 && isComplete ? true : false;
  };

  const LastUpdated = () => {
    const lastUpdated = useSelector((state: IRootState) => state[reduxState.COST_DASHBOARD].lastUpdated);

    return (
      <>{isNoBillingAccount() ? null : <Table.HeaderCell colSpan="5">Last Updated: {lastUpdated}</Table.HeaderCell>}</>
    );
  };

  const LoadingStatus = () => {
    const fetchStatus = useSelector((state: IRootState) => state[reduxState.COST_DASHBOARD].fetchStatus);

    return (
      <>
        <Table.Footer fullWidth>
          <Table.Row>
            {fetchStatus && !isComplete ? (
              <Table.HeaderCell colSpan="5">{fetchStatus}</Table.HeaderCell>
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
              <Table.HeaderCell colSpan="2">Active Billing Accounts</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                {/* <StyledIconButton onClick={() => navigate(appRoutes.SERVICE_PROVIDERS)} name="plus" /> */}
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
          <Table.Body>{isLoading ? null : <BillingAccounts billingAccount={billingAccounts} />}</Table.Body>
          <LoadingStatus />
        </Table>
        <CurrencyConflict />
        <NoBillingAccounts />
      </Segment>
    );
  };

  useEffect(() => {
    if (isBillingAccountsAvailable) {
      setIsLoading(false);
    } else {
      // Fetch a list of billing accounts
      dispatch(updateFetchStatus('Searching for billing accounts ..'));
      dispatch<AppDispatch>(fetchServiceProviders());
      dispatch<AppDispatch>(fetchBillingAccounts()).then((response: any) => {
        const payloadIsCurrencyConflict = response.payload?.isCurrencyConflict;

        // Add each billing account to state
        response.payload?.billingAccounts.forEach((billingAccount: any) => {
          dispatch(addBillingAccount(billingAccount.id));
        });
        setIsLoading(false);

        dispatch(updateBillingAccountCount(response.payload?.billingAccounts.length));

        // Get billing costs for each billing account
        if (response.payload?.billingAccounts.length > 0) {
          // eslint-disable-next-line array-callback-return
          response.payload?.billingAccounts.map((billingAccount: any, index: any) => {
            dispatch<AppDispatch>(fetchBillingAccountCosts(billingAccount.id))
              .unwrap()
              .then((response: any) => {
                dispatch(
                  updateMonthToDateCost({
                    isCurrencyConflict: payloadIsCurrencyConflict,
                    response,
                  })
                );
                dispatch(
                  updateMostExpensiveInstance({
                    isCurrencyConflict: payloadIsCurrencyConflict,
                    response,
                  })
                );
                dispatch(updateFastestGrowingInstance(response));
                dispatch(
                  updateMonthlySpend({
                    isCurrencyConflict: payloadIsCurrencyConflict,
                    response,
                  })
                );
              });
          });
        }
      });
    }
  }, [dispatch, isBillingAccountsAvailable, isCurrencyConflict]);

  useEffect(() => {
    isCurrencyConflictCallback(isCurrencyConflict);
  }, [isCurrencyConflict, isCurrencyConflictCallback]);

  return <RenderTable />;
};

export default ActiveBillingAccounts;
