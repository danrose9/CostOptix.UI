import React, { useEffect, useState } from 'react';
import { Table, Segment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { reduxState } from '../../../services/redux/reduxState';
import BillingAccount from './BillingAccount';
import useResetCostDashboard from '../../../hooks/useResetCostDashboard';
import { StyledIconButton } from '../../../styles/StyledDashboardHeader';
import { CurrencyConflictWarning, NoBillingAccountMessage } from '../../messages/index';
import { fetchAccountsAndServiceProviders } from '../../../services/api/fetchAccountsAndServiceProviders';
import { IRootState } from '../../../services/redux/rootReducer';
import { IBillingAccountsCostDashboard, IBillingAccountCostDashboard } from '../../../types';

const BillingAccounts: React.FC<IBillingAccountsCostDashboard> = ({ billingAccounts }) => {
  return (
    <>
      {billingAccounts.map((billingAccount: IBillingAccountCostDashboard, index: any) => {
        return <BillingAccount key={index} billingAccount={billingAccount} />;
      })}
    </>
  );
};

interface IActiveBillingAccountsProps {
  isCurrencyConflictCallback: (val: boolean) => void;
}

const ActiveBillingAccounts: React.FC<IActiveBillingAccountsProps> = ({ isCurrencyConflictCallback }) => {
  const dispatch = useDispatch();
  const reset = useResetCostDashboard();

  const billingAccounts = useSelector((state: IRootState) => state[reduxState.COST_DASHBOARD].billingAccounts);
  const [accountStatus, setAccountStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const { isComplete, count, lastUpdated } = useSelector((state: IRootState) => state[reduxState.COST_DASHBOARD]);

  const updateSetAccountStatus = (val: string) => {
    setAccountStatus(val);
  };

  const refreshPage = () => {
    setIsLoading(true);
    reset();
    fetchAccountsAndServiceProviders({ dispatch, lastUpdated, updateIsLoading, updateSetAccountStatus });
  };

  const isNoBillingAccount = () => {
    return count === 0 && isComplete;
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

  const updateIsLoading = (val: boolean) => {
    setIsLoading(val);
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
    isCurrencyConflictCallback(isCurrencyConflict);
  }, [isCurrencyConflict, isCurrencyConflictCallback]);
  return <RenderTable />;
};
export default ActiveBillingAccounts;
