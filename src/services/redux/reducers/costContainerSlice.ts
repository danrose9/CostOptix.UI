import { createSlice } from '@reduxjs/toolkit';
import { fetchCostContainers, deleteCostContainerById, addCostContainer } from '../thunks/costContainerThunk';

const initialState = {
  containers: [],
  isLoading: true,
  status: '',
  error: '',
} as {
  containers: any[];
  isLoading: boolean;
  status: string;
  error: string | undefined;
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
        state.status = 'pending';
        state.isLoading = true;
      })
      .addCase(fetchCostContainers.fulfilled, (state, action) => {
        state.containers = action.payload;
        state.isLoading = false;
        state.status = 'fulfilled';
      })
      .addCase(fetchCostContainers.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'rejected';
        state.error = action.error.message;
      });
    builder
      .addCase(addCostContainer.pending, (state) => {
        console.log('addCostContainer.pending');
      })
      .addCase(addCostContainer.fulfilled, (state, action) => {
        console.log('addCostContainer.fulfilled');
      })
      .addCase(addCostContainer.rejected, (state, action) => {
        console.log('addCostContainer.rejected');
      });
    builder.addCase(deleteCostContainerById.fulfilled, (state, action) => {
      const { id } = action.payload;
      state.containers = state.containers.filter((container) => container.id !== id);
      console.log('deleteCostContainer.fulfilled', id);
    });
  },
});

export const {} = costContainerSlice.actions;

export default costContainerSlice.reducer;
