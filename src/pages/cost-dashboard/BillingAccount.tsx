import React from 'react';
import { ProviderImage } from '../../components/ProviderImage';
import { Table, Icon, Loader, Card, Popup, Label } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reduxState } from '../../services/redux/reduxState';
import { StandardTooltip } from '../../components/tooltips';
import * as appRoutes from '../../app/appRoutes';
import { ServiceProviderBillingAccountType, IConnectedBillingAccountProps } from 'service-provider-types';
import { IRootState } from '../../services/redux/rootReducer';
import { ICostDashboardBillingAccountProps, CostDashboardBillingAccountType } from 'cost-dashboard-types';

const ToolTipData = (instance: { instance: { currency: string } }) => {
  const { currency } = instance.instance;
  return (
    <Card.Content textAlign="right">
      Currency : <strong>{currency}</strong>
    </Card.Content>
  );
};

export const BillingAccount = ({ billingAccount }: ICostDashboardBillingAccountProps) => {
  const navigate = useNavigate();

  const provider = billingAccount.provider;

  // const billingAccountData: ServiceProviderBillingAccountType = useSelector((state: IRootState) =>
  //   state[reduxState.COST_DASHBOARD].billingAccounts.find((element: { id: string }) => {
  //     return element.id === billingAccount.id;
  //   })
  // );
  // const costDashboardBillingAccount: CostDashboardBillingAccountType = useSelector(
  //   (state: IRootState) => state[reduxState.COST_DASHBOARD].billingAccounts
  // );

  // const LoadingIndicator = () => {
  //   if (billingAccountData.isError) {
  //     return <Icon color="red" name="close" size="large" />;
  //   } else if (billingAccountData.isLoading) {
  //     return <Loader size="medium" active inline="centered" />;
  //   } else {
  //     return <Icon color="green" name="checkmark" size="large" />;
  //   }
  // };

  return (
    <>
      <Popup
        trigger={
          <Table.Row
            style={{ cursor: 'pointer' }}
            disabled={billingAccount.isLoading}
            data-testid="billingAccounts-2"
            onClick={() => {
              navigate(appRoutes.SERVICE_PROVIDERS);
            }}
          >
            <Table.Cell>
              <ProviderImage provider={provider} size="mini" />
            </Table.Cell>

            <Table.Cell>{billingAccount.accountName}</Table.Cell>
            {/* <Table.Cell>
              {billingAccount.status === 'Transient' ? <Label color="blue">Transient</Label> : null}
            </Table.Cell> */}
            <Table.Cell textAlign="center" data-testid="billingAccounts-3">
              {billingAccount.isLoading ? (
                <Loader size="medium" active inline="centered" />
              ) : (
                <Icon color="green" name="checkmark" size="large" />
              )}
            </Table.Cell>
          </Table.Row>
        }
        content={
          <StandardTooltip instance={billingAccount}>
            {/* {billingAccountData.isError ? <FailedToLoadBillingAccount size="mini" /> : null} */}
            <ToolTipData instance={billingAccount} />
          </StandardTooltip>
        }
      ></Popup>
    </>
  );
};

export default BillingAccount;
