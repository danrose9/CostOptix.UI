import { createAsyncThunk } from '@reduxjs/toolkit';
import { PROVIDERS, BILLING_ACCOUNTS } from '../../api/apiEndpoints';
import fetchInstance from '../../api/fetchInstance';

export const fetchServiceProviders = createAsyncThunk(
  'Providers/Providers',
  async (organizationId, { rejectWithValue }) => {
    return await fetchInstance(PROVIDERS)
      .then((response) => response.json())
      .catch((e) => rejectWithValue(e.response.data));
  }
);

export const fetchBillingAccounts = createAsyncThunk(
  'Providers/BillingAccounts',
  async (organizationId, { rejectWithValue }) => {
    return await fetchInstance(BILLING_ACCOUNTS)
      .then((response) => response.json())
      .catch((e) => rejectWithValue(e.response.data));
  }
);
