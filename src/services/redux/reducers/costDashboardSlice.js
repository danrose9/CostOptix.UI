import { createSlice, current } from '@reduxjs/toolkit';
import { fetchBillingAccountCosts, fetchTransientBillingAccountCosts } from '../thunks/costDashboardThunk';
import { combineSortSliceArray, upsert } from '../../../utils/arrayHelper';

const initialState = {
  billingAccounts: [],
  mostExpensive: { isLoading: true, data: [] },
  monthToDateCost: { isLoading: true, data: [] },
  monthlySpend: { isLoading: true, data: [] },
  fastestGrowing: { isLoading: true, data: [] },
  updatedCount: 0,
  count: 0,
  isComplete: false,
  lastUpdated: null,
  currency: null,
  isLoading: true,
  status: null,
  error: null,
};

const returnId = (accountId) => {
  /*
  this regex will return the trailing id from a billingAccountId
  "..9-05-31/billingProfiles/KODF-MKVG-BG7-PGB" => "KODF-MKVG-BG7-PGB"
  "c_2019-05-31/billingProfiles/60dffedd-d0cd-40c5-a2bf-783383d52ba6" => "60dffedd-d0cd-40c5-a2bf-783383d52ba6"
*/

  const regex = /[^/]+$/g;
  var Id = accountId.match(regex)?.toString();
  return Id;
};

const findBillingAccountIndex = (billingAccounts, billingAccountId) => {
  /* this function will return the array index number for the billing account */

  const index = billingAccounts.findIndex((element) => {
    return element.id === billingAccountId;
  });

  return index;
};

const costDashboardSlice = createSlice({
  name: 'costDashboard',
  initialState: initialState,
  reset(state) {
    state = initialState;
  },
  reducers: {
    addBillingAccount(state, action) {
      state.count = state.count + 1;
      var id = '';

      if (action.payload.status === 'Transient') {
        id = returnId(action.payload.accountId);
      } else {
        id = action.payload.id;
      }

      // action for non-transient
      state.billingAccounts.push({
        id: id,
        isLoading: true,
        isError: false,
        error: '',
        status: '',
      });

      // action for transient accounts
    },
    updateMonthToDateCost(state, action) {
      const payload = action.payload;

      const payloadProvider = payload.provider;

      let payloadCost;

      if (payload.isCurrencyConflict) {
        payloadCost = payload.monthToDateCostConverted;
      } else {
        payloadCost = payload.monthToDateCost;
      }

      const provider = state.monthToDateCost.data.find((item) => item.name === payloadProvider);

      if (provider) {
        provider.cost = provider.cost + payloadCost;
      } else if (payloadProvider !== 0) {
        state.monthToDateCost.data.push({
          name: payloadProvider,
          cost: payloadCost,
        });
      }

      state.monthToDateCost.isLoading = false;
    },
    updateMostExpensiveInstance(state, action) {
      let orderBy = 'amount30day';

      if (action.payload.isCurrencyConflict) {
        orderBy = 'amount30dayConverted';
      }

      state.mostExpensive.data = combineSortSliceArray(
        state.mostExpensive,
        action.payload,
        'mostExpensive',
        'amount30Day',
        10
      );

      state.mostExpensive.isLoading = false;
    },
    updateFastestGrowingInstance(state, action) {
      state.fastestGrowing.data = combineSortSliceArray(
        state.fastestGrowing,
        action.payload,
        'fastestGrowing',
        'growth30Day',
        10
      );

      state.fastestGrowing.isLoading = false;
    },
    updateMonthlySpend(state, action) {
      const newState = upsert(state.monthlySpend.data, action.payload, action.payload.isCurrencyConflict);

      state.monthlySpend.data = newState.sort(function (a, b) {
        return new Date(a.name) - new Date(b.name);
      });

      state.monthlySpend.isLoading = false;
    },
    resetCostDashboard() {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBillingAccountCosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBillingAccountCosts.fulfilled, (state, action) => {
        console.log('fetchBillingAccountCosts.fulfilled', action);
        const billingAccountIndex = findBillingAccountIndex(state.billingAccounts, action.payload.id);

        state.currency = action.payload.currency;

        state.status = 'success';
        state.updatedCount = state.updatedCount + 1;

        state.billingAccounts[billingAccountIndex] = action.payload;
        state.billingAccounts[billingAccountIndex].isLoading = false;
        state.billingAccounts[billingAccountIndex].isError = false;
        state.billingAccounts[billingAccountIndex].status = 'non-transient';

        if (state.updatedCount === state.count) {
          state.isComplete = true;
        }

        state.lastUpdated = new Date().toLocaleString();
      })
      .addCase(fetchBillingAccountCosts.rejected, (state, action) => {
        const billingAccountIndex = findBillingAccountIndex(state.billingAccounts, action.meta.arg);

        state.billingAccounts[billingAccountIndex].isLoading = false;
        state.billingAccounts[billingAccountIndex].isError = true;
        state.billingAccounts[billingAccountIndex].error = action.error.message;

        state.status = 'partial';
        state.updatedCount = state.updatedCount + 1;

        if (state.updatedCount === state.count) {
          state.isComplete = true;
          state.monthlySpend.isLoading = false;
          state.mostExpensive.isLoading = false;
          state.monthToDateCost.isLoading = false;
          state.fastestGrowing.isLoading = false;
          state.refreshData = false;
        }
      })
      .addCase(fetchTransientBillingAccountCosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransientBillingAccountCosts.fulfilled, (state, action) => {
        console.log('fetchTransientBillingAccountCosts.fulfilled', action);
        const Id = returnId(action.payload.billingAccountId);

        const billingAccountIndex = findBillingAccountIndex(state.billingAccounts, Id);

        state.updatedCount = state.updatedCount + 1;

        state.billingAccounts[billingAccountIndex] = action.payload;
        state.billingAccounts[billingAccountIndex].isLoading = false;
        state.billingAccounts[billingAccountIndex].isError = false;
        state.billingAccounts[billingAccountIndex].status = 'transient';
      })
      .addCase(fetchTransientBillingAccountCosts.rejected, (state, action) => {
        console.log('fetchTransientBillingAccountCosts.rejected', action);
        state.updatedCount = state.updatedCount + 1;
      });
  },
});

export const {
  updateMonthToDateCost,
  updateMostExpensiveInstance,
  updateFastestGrowingInstance,
  updateMonthlySpend,
  resetCostDashboard,
  addBillingAccount,
} = costDashboardSlice.actions;

export default costDashboardSlice.reducer;
