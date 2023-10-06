import { createSlice } from '@reduxjs/toolkit';
import { SEARCH_RESOURCES, fetchResourceView } from '../thunks/resourceThunk';

const initialState = {
  searchResults: [],
  view: {
    isLoading: true,
    isAvailable: false,
    error: null,
    data: [],
  },
  count: 0,
  searchValue: '',
  status: null,
  error: null,
  isLoading: true,
  isAvailable: false,
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
        state.searchResults = action.payload.value;
        state.error = null;
        state.count = action.payload['@odata.count'];
      })
      .addCase(SEARCH_RESOURCES.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
        state.isAvailable = false;
      });
    builder
      .addCase(fetchResourceView.pending, (state) => {
        state.view.isLoading = true;
        state.view.isAvailable = false;
        state.view.error = null;
      })
      .addCase(fetchResourceView.fulfilled, (state, action) => {
        state.view.data = action.payload;
        state.view.isLoading = false;
        state.view.isAvailable = true;
        state.view.error = null;
      })
      .addCase(fetchResourceView.rejected, (state, action) => {
        state.view.isLoading = false;
        state.view.isAvailable = false;
        state.view.error = action.error.message;
      });
  },
});

export const { RESET, CLEAN_QUERY, SEARCH_CLICK, RESET_ISAVAILABLE } = resourceSlice.actions;
export default resourceSlice.reducer;
