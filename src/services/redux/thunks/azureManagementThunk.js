import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AZURE_AGREEMENT_TYPE,
  AZURE_SUBSCRIPTIONS,
} from '../../api/apiEndpoints';
import fetchInstance from '../../api/fetchInstance';

export const fetchAgreementType = createAsyncThunk(
  'AzureManagement/AgreementType',
  async (organizationId, { rejectWithValue }) => {
    return await fetchInstance(AZURE_AGREEMENT_TYPE)
      .then((response) => response.json())
      .then((data) => data.agreementType)
      .catch((e) => rejectWithValue(e.response.data));
  }
);

export const fetchSubscriptions = createAsyncThunk(
  'AzureManagement/Subscriptions',
  async (organizationId, { rejectWithValue }) => {
    return await fetchInstance(AZURE_SUBSCRIPTIONS)
      .then((response) => response.json())
      .then((data) => data)
      .catch((e) => rejectWithValue(e.response.data));
  }
);

export const fetchInvoices = createAsyncThunk(
  'AzureManagement/Invoices',
  async (azureSubscriptionId, { rejectWithValue }) => {
    return await fetchInstance(
      AZURE_SUBSCRIPTIONS + '/' + azureSubscriptionId + '/Invoices'
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((e) => rejectWithValue(e.response.data));
  }
);
