import React, { useEffect, useState } from 'react';
import { Table, Segment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchServiceProviders,
  fetchBillingAccounts,
} from '../../services/redux/thunks/serviceProvidersThunk';
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
import { StyledRefreshButton } from '../../styles/StyledDashboardHeader';
import {
  CurrencyConflictWarning,
  NoBillingAccountMessage,
} from '../../components/messages/index';

const BillingAccounts = ({ billingAccounts }) => {
  return (
    <>
      {billingAccounts.map((billingAccount, index) => {
        return <BillingAccount key={index} billingAccount={billingAccount} />;
      })}
    </>
  );
};

const ActiveBillingAccounts = ({ isCurrencyConflictCallback }) => {
  const dispatch = useDispatch();

  const billingAccounts = useSelector(
    (state) => state[reduxState.SERVICE_PROVIDERS].billingAccounts
  );

  const isBillingAccountsAvailable = useSelector(
    (state) => state[reduxState.SERVICE_PROVIDERS].isAvailable
  );

  const isComplete = useSelector(
    (state) => state[reduxState.COST_DASHBOARD].isComplete
  );

  const billingAccountCount = useSelector(
    (state) => state[reduxState.COST_DASHBOARD].count
  );

  const [isLoading, setIsLoading] = useState(true);

  const refreshPage = () => {
    setIsLoading(true);
    dispatch(resetCostDashboard());
    dispatch(resetServiceProviders());
  };

  const isNoBillingAccount = () => {
    return billingAccountCount === 0 && isComplete ? true : false;
  };

  const LastUpdated = () => {
    const lastUpdated = useSelector(
      (state) => state[reduxState.COST_DASHBOARD].lastUpdated
    );

    return (
      <>
        {isNoBillingAccount() ? null : (
          <Table.HeaderCell colSpan="5">
            Last Updated: {lastUpdated}
          </Table.HeaderCell>
        )}
      </>
    );
  };

  const LoadingStatus = () => {
    const fetchStatus = useSelector(
      (state) => state[reduxState.COST_DASHBOARD].fetchStatus
    );

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

  const { isCurrencyConflict } = useSelector(
    (state) => state[reduxState.SERVICE_PROVIDERS]
  );

  const CurrencyConflict = () => {
    return <>{isCurrencyConflict ? <CurrencyConflictWarning /> : null}</>;
  };

  const RenderTable = () => {
    return (
      <Segment color="green" data-testid="billingAccounts-1">
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="2">
                Active Billing Accounts
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                <StyledRefreshButton
                  name="refresh"
                  onClick={refreshPage}
                  loading={!isComplete}
                  disabled={!isComplete}
                  fitted
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isLoading ? null : (
              <BillingAccounts billingAccounts={billingAccounts} />
            )}
          </Table.Body>
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
      dispatch(fetchServiceProviders());
      dispatch(fetchBillingAccounts()).then((response) => {
        const payloadIsCurrencyConflict = response.payload?.isCurrencyConflict;

        // Add each billing account to state
        response.payload?.billingAccounts.forEach((billingAccount) => {
          dispatch(addBillingAccount(billingAccount.id));
        });
        setIsLoading(false);

        dispatch(
          updateBillingAccountCount(response.payload?.billingAccounts.length)
        );

        // Get billing costs for each billing account
        if (response.payload?.billingAccounts.length > 0) {
          // eslint-disable-next-line array-callback-return
          response.payload?.billingAccounts.map((billingAccount, index) => {
            dispatch(fetchBillingAccountCosts(billingAccount.id))
              .unwrap()
              .then((response) => {
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
