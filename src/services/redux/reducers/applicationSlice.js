import { createSlice } from '@reduxjs/toolkit';

const applicationVersion = process.env.REACT_APP_VERSION;

const initialState = {
  settings: {
    preferredCurrency: 'USD',
  },
  version: applicationVersion,
  status: null,
  error: null,
  isLoading: true,
};

const applicationSlice = createSlice({
  name: 'resource',
  initialState: initialState,
  reducers: {
    RESET() {
      return { ...initialState };
    },
  },
});

export const { RESET } = applicationSlice.actions;
export default applicationSlice.reducer;
