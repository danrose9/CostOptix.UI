import React from 'react';
import { Grid } from 'semantic-ui-react';
import getSymbolFromCurrency from 'currency-symbol-map';

import { reduxState } from '../../../services/redux/reduxState';
import AzureBillingChart from './AzureBillingChart';
import AzureBillingInvoices from './AzureBillingInvoices';
import { AzureBillingCards } from './AzureBillingCards';
import { AzureBillingInformation } from './AzureBillingInformation';
import { store } from '../../services/redux/store';

export const AzureBillingContent = (props) => {
  const content = store.getState()[reduxState.AZURE_BILLING_INVOICES];

  const currencySymbol = getSymbolFromCurrency(content.billingInvoice.currency);

  return (
    <>
      <AzureBillingCards content={content} currencySymbol={currencySymbol} />
      <Grid columns={2}>
        <Grid.Column floated="left" width={6}>
          <AzureBillingInformation
            content={content}
            currencySymbol={currencySymbol}
          />
        </Grid.Column>
        <Grid.Column floated="right" width={10}>
          <AzureBillingChart content={content} />
        </Grid.Column>
      </Grid>
      <AzureBillingInvoices content={content} currencySymbol={currencySymbol} />
    </>
  );
};
