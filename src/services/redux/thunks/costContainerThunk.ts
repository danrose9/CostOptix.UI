import { createAsyncThunk } from '@reduxjs/toolkit';
import { COST_CONTAINERS, TRANSIENT_BILLING_ACCOUNT_COSTS } from '../../api/apiEndpoints';
import fetchInstance from '../../api/fetchInstance';

export const fetchCostContainers = createAsyncThunk('CostContainer', async (args, { rejectWithValue }) => {
  return await fetchInstance(COST_CONTAINERS)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
});
