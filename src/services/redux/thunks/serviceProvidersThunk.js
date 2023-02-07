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

export const deleteBillingAccount = createAsyncThunk(
  'Profile/DeleteBillingAccount',
  async (args: { providerId: string; id: string }, { rejectWithValue }) => {
    const { providerId, id } = args;
    const url = '/' + providerId + '/BillingAccounts/' + id;
    console.log('delete', url);
    //   return await fetchInstance(PROVIDERS + url, { method: 'DELETE' })
    //     .then((response) => response)
    //     .catch((e) => rejectWithValue(e.response.data));
  }
);

export const disableBillingAccount = createAsyncThunk(
  'Profile/DisableBillingAccount',
  async (args: { providerId: string; id: string }, { rejectWithValue }) => {
    const { providerId, id } = args;
    const url = '/' + providerId + '/BillingAccounts/' + id;
    console.log('disable', url);
    //   return await fetchInstance(PROVIDERS + url, { method: 'POST' })
    //     .then((response) => response)
    //     .catch((e) => rejectWithValue(e.response.data));
  }
);

export const enableBillingAccount = createAsyncThunk(
  'Profile/EnableBillingAccount',
  async (args: { providerId: string; id: string }, { rejectWithValue }) => {
    const { providerId, id } = args;
    const url = '/' + providerId + '/BillingAccounts/' + id;
    console.log('enable', url);
    //   return await fetchInstance(PROVIDERS + url, { method: 'POST' })
    //     .then((response) => response)
    //     .catch((e) => rejectWithValue(e.response.data));
  }
);
