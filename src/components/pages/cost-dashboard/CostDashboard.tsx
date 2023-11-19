import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { reduxState } from '../../../services/redux/reduxState';
import PageLayout from '../PageLayout';
import { Grid, Divider } from 'semantic-ui-react';
import * as Widget from './index';
import { ApplicationContext } from '../../../app/ApplicationContext';
import getSymbolFromCurrency from 'currency-symbol-map';
import { IRootState } from '../../../services/redux/rootReducer';
import Tour from 'src/components/productTour/Tour';
import { useLocation } from 'react-router-dom';

export const CostDashboard = () => {
  const application = useContext(ApplicationContext);
  const location = useLocation();
  const { startTour } = location.state || {};

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
      <Tour shouldStart={startTour} />
      <PageLayout title="Cost Dashboard">
        <Divider />
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <div className="tour-start">
                <Widget.CostDashboardChart currency={currencySymbol} />
              </div>
            </Grid.Column>
            <Grid.Column width={4}>
              <Widget.CostDasboardEstimates isCurrencyConflict={isCurrencyConflict} currency={currencySymbol} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns="equal">
            <Grid.Column>
              <Widget.MostExpensiveInstance isCurrencyConflict={isCurrencyConflict} />
            </Grid.Column>
            <Grid.Column>
              <Widget.FastestGrowingInstance />
            </Grid.Column>
            <Grid.Column width={5}>
              <Widget.BillingAccounts isCurrencyConflictCallback={isCurrencyConflictCallback} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </PageLayout>
    </>
  );
};

export default CostDashboard;
