import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCostContainers,
  deleteCostContainerById,
  addCostContainer,
  fetchCostContainersResources,
} from '../thunks/costContainerThunk';
import { ICostContainer } from '../../../types/container-types';
import { IResource } from '../../../types/resource-types';

const initialState = {
  containers: [],
  resources: {
    count: 0,
    data: [],
  },
  isLoading: true,
  isResourcesLoading: true,
  status: '',
  error: '',
} as unknown as {
  containers: ICostContainer[];
  resources: { count: number; data: IResource[] };
  isLoading: boolean;
  isResourcesLoading: boolean;
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
    RESET_RESOURCES(state) {
      if (!state.resources) {
        state.resources = { data: [], count: 0 };
      } else {
        state.resources.data = [];
        state.resources.count = 0;
      }
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
      .addCase(fetchCostContainersResources.pending, (state) => {
        state.status = 'pending';
        state.isResourcesLoading = true;
      })
      .addCase(fetchCostContainersResources.fulfilled, (state, action) => {
        state.resources.data = action.payload.value;
        state.resources.count = action.payload['@odata.count'];
        state.isResourcesLoading = false;
        state.status = 'fulfilled';
      })
      .addCase(fetchCostContainersResources.rejected, (state, action) => {
        state.isResourcesLoading = false;
        state.status = 'rejected';
        state.error = action.error.message;
      });
    builder
      .addCase(addCostContainer.pending, (state) => {})
      .addCase(addCostContainer.fulfilled, (state, action) => {
        state.containers = [...state.containers, action.payload];
      })
      .addCase(addCostContainer.rejected, (state, action) => {
        console.log('addCostContainer.rejected', action.error.message);
      });
    builder.addCase(deleteCostContainerById.fulfilled, (state, action) => {
      const { id } = action.payload;
      state.containers = state.containers.filter((container) => container.id !== id);
    });
  },
});

export const { RESET_RESOURCES } = costContainerSlice.actions;

export default costContainerSlice.reducer;
