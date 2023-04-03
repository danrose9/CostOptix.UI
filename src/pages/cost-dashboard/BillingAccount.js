import React from 'react';
import { ProviderImage } from '../../components/ProviderImage';
import { Table, Icon, Loader, Card, Popup, Label } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reduxState } from '../../services/redux/reduxState';
import { StandardTooltip } from '../../components/tooltips';
import { FailedToLoadBillingAccount } from '../../components/messages';
import * as appRoutes from '../../app/appRoutes';

const ToolTipData = (instance) => {
  const { currency } = instance.instance;
  return (
    <Card.Content textAlign="right">
      Currency : <strong>{currency}</strong>
    </Card.Content>
  );
};

export const BillingAccount = ({ billingAccount }) => {
  const navigate = useNavigate();

  const provider = billingAccount.provider;

  const billingAccountData = useSelector((state) =>
    state[reduxState.COST_DASHBOARD].billingAccounts.find((element) => {
      return element.id === billingAccount.id;
    })
  );

  const LoadingIndicator = () => {
    console.log('*******', billingAccountData);
    if (billingAccountData.isError) {
      return <Icon color="red" name="close" size="large" />;
    } else if (billingAccountData.isLoading) {
      return <Loader size="medium" active inline="centered" />;
    } else {
      return <Icon color="green" name="checkmark" size="large" />;
    }
  };

  return (
    <>
      <Popup
        trigger={
          <Table.Row
            style={{ cursor: 'pointer' }}
            // error={billingAccountData.isError}
            // disabled={billingAccountData.isLoading}
            data-testid="billingAccounts-2"
            onClick={() => {
              navigate(appRoutes.SERVICE_PROVIDERS);
            }}
          >
            <Table.Cell>
              <ProviderImage provider={provider} size="mini" />
            </Table.Cell>

            <Table.Cell>{billingAccount.accountName}</Table.Cell>
            <Table.Cell>
              {billingAccount.status === 'Transient' ? <Label color="blue">Transient</Label> : null}
            </Table.Cell>
            <Table.Cell textAlign="center">
              {/* <LoadingIndicator
                isLoading={billingAccountData.isLoading}
                isError={billingAccountData.isError}
                data-testid="billingAccounts-3"
              /> */}
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
