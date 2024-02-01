import { createAsyncThunk } from '@reduxjs/toolkit';
import { BILLING_ACCOUNT_COSTS, TRANSIENT_BILLING_ACCOUNT_COSTS } from '../../api/apiEndpoints';
import fetchInstance from '../../api/fetchInstance';
import {
  updateMonthToDateCost,
  updateMostExpensiveInstance,
  updateFastestGrowingInstance,
  updateMonthlySpend,
} from '../reducers/costDashboardSlice';
import { IRootState } from '../rootReducer';

export const fetchBillingAccountCosts = createAsyncThunk(
  'billingAccount/Costs',
  async (billingAccountId: string, thunkAPI) => {
    return await fetchInstance(`Costs/${billingAccountId}/${BILLING_ACCOUNT_COSTS}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        const isCurrencyConflict = (thunkAPI.getState() as IRootState).serviceProvider.isCurrencyConflict;

        const costDashboardData = { ...data, isCurrencyConflict: isCurrencyConflict };

        thunkAPI.dispatch(updateMonthToDateCost(costDashboardData));
        thunkAPI.dispatch(updateMostExpensiveInstance(costDashboardData));
        thunkAPI.dispatch(updateFastestGrowingInstance(costDashboardData));
        thunkAPI.dispatch(updateMonthlySpend(costDashboardData));

        return data;
      });
  }
);

export const fetchTransientBillingAccountCosts = createAsyncThunk(
  'transientBillingAccount/Costs',
  async (billingAccountId: string, thunkAPI) => {
    return await fetchInstance(`Costs/${TRANSIENT_BILLING_ACCOUNT_COSTS}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ billingAccountId: billingAccountId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        thunkAPI.dispatch(updateMonthToDateCost(data));
        thunkAPI.dispatch(updateMostExpensiveInstance(data));
        thunkAPI.dispatch(updateFastestGrowingInstance(data));
        thunkAPI.dispatch(updateMonthlySpend(data));

        return data;
      });
  }
);
