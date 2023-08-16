import { createAsyncThunk } from '@reduxjs/toolkit';
import { COST_CONTAINERS, TRANSIENT_BILLING_ACCOUNT_COSTS } from '../../api/apiEndpoints';
import fetchInstance from '../../api/fetchInstance';

export const fetchCostContainers = createAsyncThunk('CostContainer/List', async (args, { rejectWithValue }) => {
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

export const deleteCostContainerById = createAsyncThunk(
  'CostContainer/DeleteById',
  async (args: { id: string }, { rejectWithValue }) => {
    const { id } = args;
    return await fetchInstance(`${COST_CONTAINERS}/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return args;
      })
      .catch((e) => rejectWithValue(e.response.data));
  }
);

export interface IAddCostContainerArgs {
  name: string;
  description: string;
  owner: string;
  query?: any;
}

export const addCostContainer = createAsyncThunk(
  'CostContainer/Add',
  async (args: IAddCostContainerArgs, { rejectWithValue }) => {
    console.log('addCostContainer', args);
    return await fetchInstance(COST_CONTAINERS, { method: 'POST', body: JSON.stringify({ ...args }) })
      .then((response) => response.json())
      .catch((e) => rejectWithValue(e.response.data));
  }
);
