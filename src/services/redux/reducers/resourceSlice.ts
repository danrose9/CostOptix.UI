import { createSlice } from '@reduxjs/toolkit';
import { SEARCH_RESOURCES, FETCH_RESOURCES } from '../thunks/resourceThunk';
import { IResource } from 'src/types/resource-types';

const initialState = {
  searchResults: [],
  view: {
    isLoading: true,
    isAvailable: false,
    error: null,
    data: {} as IResource,
  },
  count: 0,
  searchValue: '',
  status: null,
  error: null,
  isLoading: true,
  isAvailable: false,
} as {
  searchResults: any[];
  view: {
    isLoading: boolean;
    isAvailable: boolean;
    error: any;
    data: IResource;
  };
  count: number;
  searchValue: string;
  status: string | null;
  error: string | null | undefined;
  isLoading: boolean;
  isAvailable: boolean;
};

const resourceSlice = createSlice({
  name: 'resource',
  initialState: initialState,
  reducers: {
    RESET() {
      return { ...initialState };
    },
    CLEAN_QUERY() {
      return { ...initialState };
    },
    SEARCH_CLICK: (state, action) => {
      state.searchValue = action.payload;
    },
    RESET_ISAVAILABLE: (state, action) => {
      state.view.isAvailable = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SEARCH_RESOURCES.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
        state.isAvailable = false;
        state.error = null;
      })
      .addCase(SEARCH_RESOURCES.fulfilled, (state, action) => {
        state.status = 'success';
        state.isLoading = false;
        state.isAvailable = true;
        state.error = null;
        if (typeof action.payload === 'object' && action.payload !== undefined) {
          state.searchResults = (action.payload as any).value;
          state.count = action.payload['@odata.count'];
        }
      })
      .addCase(SEARCH_RESOURCES.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
        state.isAvailable = false;
      });
    builder
      .addCase(FETCH_RESOURCES.pending, (state) => {
        state.view.isLoading = true;
        state.view.isAvailable = false;
        state.view.error = null;
      })
      .addCase(FETCH_RESOURCES.fulfilled, (state, action) => {
        state.view.data = action.payload;
        state.view.isLoading = false;
        state.view.isAvailable = true;
        state.view.error = null;
      })
      .addCase(FETCH_RESOURCES.rejected, (state, action) => {
        state.view.isLoading = false;
        state.view.isAvailable = false;
        state.view.error = action.error.message;
      });
  },
});

export const { RESET, CLEAN_QUERY, SEARCH_CLICK, RESET_ISAVAILABLE } = resourceSlice.actions;
export default resourceSlice.reducer;
