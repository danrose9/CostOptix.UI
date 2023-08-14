import { createSlice } from '@reduxjs/toolkit';
import { fetchCostContainers } from '../thunks/costContainerThunk';
import { combineSortSliceArray, upsert } from '../../../utils/arrayHelper';

const initialState = {
  containers: [],
  isLoading: true,
  status: null,
  error: null,
};

const costContainerSlice = createSlice({
  name: 'costContainers',
  initialState: initialState,

  reducers: {
    RESET() {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCostContainers.pending, (state) => {
        console.log('fetchBillingAccountCosts.pending');
      })
      .addCase(fetchCostContainers.fulfilled, (state, action) => {
        console.log('fetchBillingAccountCosts.fulfilled', action);
        state.containers = action.payload;
        // state.isLoading = false;
      })
      .addCase(fetchCostContainers.rejected, (state, action) => {
        console.log('fetchBillingAccountCosts.rejected', action);
      });
  },
});

export const {} = costContainerSlice.actions;

export default costContainerSlice.reducer;
