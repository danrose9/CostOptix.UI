import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { reduxState } from '../../../services/redux/reduxState';
import PageWrapper from '../PageWrapper';
import { Grid, Divider } from 'semantic-ui-react';
import * as Widget from './index';
import { ApplicationContext } from '../../../app/ApplicationContext';
import getSymbolFromCurrency from 'currency-symbol-map';
import { IRootState } from '../../../services/redux/rootReducer';

export const CostDashboard = () => {
  const application = useContext(ApplicationContext);

  const billingAccountCurrency = useSelector((state: IRootState) => state[reduxState.COST_DASHBOARD].currency);

  const [isCurrencyConflict, setIsCurrencyConflict] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>('');
  const [currencySymbol, setCurrencySymbol] = useState<string | undefined>('');

  const isCurrencyConflictCallback = (isConflict: boolean) => {
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
    <>
      <PageWrapper title="Cost Dashboard">
        <Divider />
        <Grid>
          <Grid.Row>
            <Grid.Column width={12} product-tour="tour-start">
              <Widget.CostDashboardChart currency={currencySymbol} />
            </Grid.Column>
            <Grid.Column width={4}>
              <Widget.CostDasboardEstimates isCurrencyConflict={isCurrencyConflict} currency={currencySymbol} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column product-tour="most-expensive">
              <Widget.MostExpensiveInstance isCurrencyConflict={isCurrencyConflict} />
            </Grid.Column>
            <Grid.Column>
              <Widget.FastestGrowingInstance />
            </Grid.Column>
            <Grid.Column width={5} product-tour="active-providers">
              <Widget.BillingAccounts isCurrencyConflictCallback={isCurrencyConflictCallback} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </PageWrapper>
    </>
  );
};

export default CostDashboard;
