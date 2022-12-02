import React, { useState, useContext } from 'react';

import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';

import { PageTitle } from '../../components/PageTitle';
import { Grid, Divider } from 'semantic-ui-react';
import * as Widget from './index';
import { PageContent } from '../__styles__/DefaultPageStyles';

import { ApplicationContext } from '../../app/ApplicationContext';
import getSymbolFromCurrency from 'currency-symbol-map';

export const CostDashboard = () => {
  const application = useContext(ApplicationContext);

  const billingAccountCurrency = useSelector(
    (state) => state[reduxState.COST_DASHBOARD].currency
  );

  const [isCurrencyConflict, setIsCurrencyConflict] = useState(false);
  const [currency, setCurrency] = useState(null);
  const [currencySymbol, setCurrencySymbol] = useState(null);

  const isCurrencyConflictCallback = (isConflict) => {
    const currencySymbol = () => {
      setIsCurrencyConflict(isConflict);
      if (isConflict) {
        setCurrency(application.settings.preferredCurrency);
      } else {
        setCurrency(billingAccountCurrency);
      }
      return getSymbolFromCurrency(currency);
    };
    setCurrencySymbol(currencySymbol);
  };

  return (
    <PageContent>
      <PageTitle title="Cost Dashboard" />
      <Divider />
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <Widget.CostDashboardChart currency={currencySymbol} />
          </Grid.Column>
          <Grid.Column width={4}>
            <Widget.CostDasboardEstimates
              isCurrencyConflict={isCurrencyConflict}
              currency={currencySymbol}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns="equal">
          <Grid.Column>
            <Widget.MostExpensiveInstance
              isCurrencyConflict={isCurrencyConflict}
            />
          </Grid.Column>
          <Grid.Column>
            <Widget.FastestGrowingInstance />
          </Grid.Column>
          <Grid.Column width={6}>
            <Widget.BillingAccounts
              isCurrencyConflictCallback={isCurrencyConflictCallback}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </PageContent>
  );
};

export default CostDashboard;
