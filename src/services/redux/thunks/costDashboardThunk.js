import { createAsyncThunk } from '@reduxjs/toolkit';
import { BILLING_ACCOUNT_COSTS } from '../../api/apiEndpoints';
import fetchInstance from '../../api/fetchInstance';

export const fetchBillingAccountCosts = createAsyncThunk(
  'billingAccount/Costs',
  async (billingAccountId, { rejectWithValue }) => {
    return await fetchInstance(
      'Costs/' + billingAccountId + '/' + BILLING_ACCOUNT_COSTS
    )
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);

        return response.json();
      })
      .catch((e) => rejectWithValue(e.response.data));
  }
);
