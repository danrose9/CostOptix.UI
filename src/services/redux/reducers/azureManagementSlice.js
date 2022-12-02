import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAgreementType,
  fetchSubscriptions,
  fetchInvoices,
} from '../thunks/azureManagementThunk';

// interface ISubscriptions {

// }
// interface IAzueManagementState {
//   agreementType: string | null
//   subscriptions: ISubscriptions
//   invoices: any
//   status?: string | null
// }

const initialState = {
  agreementType: null,
  subscriptions: [],
  invoices: [],
  status: null,
};

const azureManagementSlice = createSlice({
  name: 'azureManagement',
  initialState: initialState,
  reset(state) {
    state = initialState;
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgreementType.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAgreementType.fulfilled, (state, action) => {
        state.status = 'success';
        state.agreementType = action.payload;
        state.error = null;
      })
      .addCase(fetchAgreementType.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    // fetchSubscriptions
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.status = 'success';
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    // fetchInvoices
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = 'success';
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default azureManagementSlice.reducer;
