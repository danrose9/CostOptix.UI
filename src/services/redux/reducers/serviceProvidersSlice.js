import { createSlice } from '@reduxjs/toolkit';

import {
  fetchServiceProviders,
  fetchBillingAccounts,
  disableBillingAccount,
  enableBillingAccount,
} from '../thunks/serviceProvidersThunk';

const initialState = {
  isCurrencyConflict: false,
  providers: [],
  billingAccounts: [],
  status: null,
  isLoading: true,
  isAvailable: false,
  error: null,
};

const serviceProviderSlice = createSlice({
  name: 'serviceProviders',
  initialState: initialState,

  reducers: {
    updateBillingAccountLoading(state, action) {
      const { id } = action.payload;

      const billingAccount = state.billingAccounts.find((item) => item.id === id);

      if (billingAccount) {
        billingAccount.isLoading = false;
      }
    },
    resetIsBillingAccountsAvailable(state) {
      state.isAvailable = false;
    },
    resetServiceProviders() {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceProviders.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
        state.error = null;
        state.isAvailable = false;
      })
      .addCase(fetchServiceProviders.fulfilled, (state, action) => {
        state.status = 'success';
        state.isLoading = false;
        state.providers = action.payload;
        state.error = null;
        state.isAvailable = false;
      })
      .addCase(fetchServiceProviders.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
        state.isAvailable = false;
      });
    // fetch Billing Accounts
    builder
      .addCase(fetchBillingAccounts.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
        state.error = null;
        state.isAvailable = false;
      })
      .addCase(fetchBillingAccounts.fulfilled, (state, action) => {
        state.status = 'success';
        state.isLoading = false;
        state.billingAccounts = action.payload.billingAccounts;
        state.error = null;
        state.isAvailable = true;
        state.isCurrencyConflict = action.payload.isCurrencyConflict;
      })
      .addCase(fetchBillingAccounts.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
        state.isAvailable = false;
      });
    // Disable Billing Accounts
    builder
      .addCase(disableBillingAccount.pending, (state) => {})
      .addCase(disableBillingAccount.fulfilled, (state, action) => {
        const { id } = action.payload;

        const billingAccount = state.billingAccounts.find((item) => item.id === id);

        if (billingAccount) {
          billingAccount.status = 'Disabled';
        }
      })
      .addCase(disableBillingAccount.rejected, (state, action) => {});
    // Enable Billing Accounts
    builder
      .addCase(enableBillingAccount.pending, (state) => {})
      .addCase(enableBillingAccount.fulfilled, (state, action) => {
        const { id } = action.payload;

        const billingAccount = state.billingAccounts.find((item) => item.id === id);

        if (billingAccount) {
          billingAccount.status = 'Connected';
        }
      })
      .addCase(enableBillingAccount.rejected, (state, action) => {});
  },
});

export const { updateBillingAccountLoading, resetIsBillingAccountsAvailable, resetServiceProviders } =
  serviceProviderSlice.actions;

export default serviceProviderSlice.reducer;
