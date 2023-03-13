import { createAsyncThunk } from '@reduxjs/toolkit';
import { PROVIDERS, BILLING_ACCOUNTS } from '../../api/apiEndpoints';
import fetchInstance from '../../api/fetchInstance';
import { AddBillingAccountType } from 'cloud-billingaccounts-types';

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
    return await fetchInstance(PROVIDERS + `/${providerId}/BillingAccounts/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return args;
      })
      .catch((e) => rejectWithValue(e.response.data));
  }
);

export const disableBillingAccount = createAsyncThunk(
  'Profile/DisableBillingAccount',
  async (args: { providerId: string; id: string }, { rejectWithValue }) => {
    const { providerId, id } = args;
    return await fetchInstance(PROVIDERS + `/${providerId}/BillingAccounts/${id}/DisableCollection`, { method: 'POST' })
      .then((response) => response.json())
      .catch((e) => rejectWithValue(e.response.data));
  }
);

export const enableBillingAccount = createAsyncThunk(
  'Profile/EnableBillingAccount',
  async (args: { providerId: string; id: string }, { rejectWithValue }) => {
    const { providerId, id } = args;
    return await fetchInstance(PROVIDERS + `/${providerId}/BillingAccounts/${id}/EnableCollection`, { method: 'POST' })
      .then((response) => response.json())
      .catch((e) => rejectWithValue(e.response.data));
  }
);

export const addBillingAccount = createAsyncThunk(
  'Profile/AddBillingAccount',
  async (args: AddBillingAccountType, { rejectWithValue }) => {
    // const { providerId, id } = args;
    // return await fetchInstance(PROVIDERS + `/${providerId}/BillingAccounts/${id}/EnableCollection`, { method: 'POST' })
    //   .then((response) => response.json())
    //   .catch((e) => rejectWithValue(e.response.data));
  }
);
