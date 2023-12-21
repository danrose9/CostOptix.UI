import React from 'react';
import { ProviderImage } from '../../ProviderImage';
import { Table, Icon, Loader, Card, Popup, Label } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { StandardTooltip } from '../../tooltips';
import * as appRoutes from '../../../app/router/appRoutes';
import { FailedToLoadBillingAccount } from '../../messages';
import { IBillingAccountCostDashboardProps } from '../../../types';
import { StyledTableRow } from '../../tables/DefaultTableStyles';

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

  const { provider, accountName, status, isLoading, isError } = billingAccount;

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
    if (status === 'transient') {
      return <Label color="blue">Transient</Label>;
    } else return null;
  };

  return (
    <>
      <Popup
        trigger={
          <Table.Row
            as={StyledTableRow}
            disabled={isLoading}
            data-testid="billingAccounts-2"
            onClick={() => {
              navigate(appRoutes.SERVICE_PROVIDERS);
            }}
          >
            <Table.Cell collapsing>
              <ProviderImage provider={provider} size="mini" />
            </Table.Cell>

            <Table.Cell>{accountName}</Table.Cell>
            <Table.Cell>
              <BillingAccountLabel />
            </Table.Cell>

            <Table.Cell textAlign="center" data-testid="billingAccounts-3" collapsing>
              <LoadingIndicator />
            </Table.Cell>
          </Table.Row>
        }
        content={
          <StandardTooltip instance={billingAccount}>
            {isError ? <FailedToLoadBillingAccount size="mini" /> : null}
            <ToolTipData instance={billingAccount} />
          </StandardTooltip>
        }
      ></Popup>
    </>
  );
};

export default BillingAccount;
