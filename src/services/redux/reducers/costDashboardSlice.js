import { createSlice } from '@reduxjs/toolkit';
import { fetchBillingAccountCosts } from '../thunks/costDashboardThunk';
import { combineSortSliceArray, upsert } from '../../../utils/arrayHelper';

// interface CostDashboardState {
//   billingAccounts: any
//   mostExpensive: any
//   monthToDateCost: any
//   monthlySpend: any
//   fastestGrowing: any
//   updatedCount: number
//   count: number
//   isComplete: boolean
//   lastUpdated?: string | null
//   currency?: number | null
//   fetchStatus?: string | null
//   isLoading: boolean
//   status?: string | null
//   error?: string | null
// }

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
  fetchStatus: null,
  isLoading: true,
  status: null,
  error: null,
};

const costDashboardSlice = createSlice({
  name: 'costDashboard',
  initialState: initialState,
  reset(state) {
    state = initialState;
  },
  reducers: {
    addBillingAccount(state, action) {
      state.billingAccounts.push({
        id: action.payload,
        isLoading: true,
        isError: false,
      });
    },
    updateMonthToDateCost(state, action) {
      const payload = action.payload;

      const payloadProvider = payload.response.provider;

      let payloadCost;

      if (payload.isCurrencyConflict) {
        payloadCost = payload.response.monthToDateCostConverted;
      } else {
        payloadCost = payload.response.monthToDateCost;
      }

      const provider = state.monthToDateCost.data.find(
        (item) => item.name === payloadProvider
      );

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
        action.payload.response,
        'mostExpensive',
        orderBy,
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
      const newState = upsert(
        state.monthlySpend.data,
        action.payload.response,
        action.payload.isCurrencyConflict
      );

      state.monthlySpend.data = newState.sort(function (a, b) {
        return new Date(a.name) - new Date(b.name);
      });

      state.monthlySpend.isLoading = false;
    },
    updateFetchStatus(state, action) {
      state.fetchStatus = action.payload;
    },
    updateBillingAccountCount(state, action) {
      state.count = action.payload;

      if (action.payload === 0) {
        state.fastestGrowing.isLoading = false;
        state.monthlySpend.isLoading = false;
        state.mostExpensive.isLoading = false;
        state.monthToDateCost.isLoading = false;
        state.fetchStatus = null;
        state.isComplete = true;
      }
    },
    resetCostDashboard(state) {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBillingAccountCosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.fetchStatus = `Found ${state.count} billing accounts, fetching data ..`;
      })
      .addCase(fetchBillingAccountCosts.fulfilled, (state, action) => {
        const billingAccountIndex = state.billingAccounts.findIndex(
          (element) => {
            return element.id === action.payload.id;
          }
        );

        state.currency = action.payload.currency;

        state.status = 'success';
        state.updatedCount = state.updatedCount + 1;
        state.fetchStatus = `Updating dashboard .. ${state.updatedCount} of ${state.count}`;
        state.billingAccounts[billingAccountIndex] = action.payload;
        state.billingAccounts[billingAccountIndex].isLoading = false;
        state.billingAccounts[billingAccountIndex].isError = false;

        if (state.updatedCount === state.count) {
          state.isComplete = true;
        }

        state.lastUpdated = new Date().toLocaleString();
      })
      .addCase(fetchBillingAccountCosts.rejected, (state, action) => {
        const billingAccountIndex = state.billingAccounts.findIndex(
          (element) => {
            return element.id === action.meta.arg;
          }
        );

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
        }
      });
  },
});

export const {
  updateMonthToDateCost,
  updateMostExpensiveInstance,
  updateFastestGrowingInstance,
  updateMonthlySpend,
  updateFetchStatus,
  resetCostDashboard,
  updateBillingAccountCount,
  addBillingAccount,
} = costDashboardSlice.actions;

export default costDashboardSlice.reducer;
