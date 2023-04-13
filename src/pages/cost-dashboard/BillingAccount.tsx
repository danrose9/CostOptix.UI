import React from 'react';
import { ProviderImage } from '../../components/ProviderImage';
import { Table, Icon, Loader, Card, Popup, Label } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { StandardTooltip } from '../../components/tooltips';
import * as appRoutes from '../../app/appRoutes';
import { FailedToLoadBillingAccount } from '../../components/messages';
import { IBillingAccountCostDashboardProps } from '../../types';

const ToolTipData = (instance: { instance: { currency: string } }) => {
  const { currency } = instance.instance;
  return (
    <Card.Content textAlign="right">
      Currency : <strong>{currency}</strong>
    </Card.Content>
  );
};

export const BillingAccount: React.FC<IBillingAccountCostDashboardProps> = ({ billingAccount }) => {
  const navigate = useNavigate();

  const provider = billingAccount.provider;

  const LoadingIndicator = () => {
    if (billingAccount.isError) {
      return <Icon color="red" name="close" size="large" />;
    } else if (billingAccount.isLoading) {
      return <Loader size="medium" active inline="centered" />;
    } else {
      return <Icon color="green" name="checkmark" size="large" />;
    }
  };

  const BillingAccountLabel = () => {
    if (billingAccount.status === 'transient') {
      return <Label color="blue">Transient</Label>;
    } else return null;
  };

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
            <Table.Cell width={1}>
              <ProviderImage provider={provider} size="mini" />
            </Table.Cell>

            <Table.Cell width={8}>{billingAccount.accountName}</Table.Cell>
            <Table.Cell width={6}>
              <BillingAccountLabel />
            </Table.Cell>

            <Table.Cell width={1} textAlign="center" data-testid="billingAccounts-3">
              <LoadingIndicator />
            </Table.Cell>
          </Table.Row>
        }
        content={
          <StandardTooltip instance={billingAccount}>
            {billingAccount.isError ? <FailedToLoadBillingAccount size="mini" /> : null}
            <ToolTipData instance={billingAccount} />
          </StandardTooltip>
        }
      ></Popup>
    </>
  );
};

export default BillingAccount;
