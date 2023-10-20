import { createSlice } from '@reduxjs/toolkit';
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

const finalState = (state) => {
  state.isComplete = true;
  state.monthlySpend.isLoading = false;
  state.mostExpensive.isLoading = false;
  state.monthToDateCost.isLoading = false;
  state.fastestGrowing.isLoading = false;
  state.refreshData = false;
};

const costDashboardSlice = createSlice({
  name: 'costDashboard',
  initialState: initialState,
  reset(state) {
    state = initialState;
  },
  reducers: {
    addBillingAccount(state, action) {
      const { provider, accountName, accountId, status } = action.payload;
      state.count = state.count + 1;
      var id = '';

      if (status === 'Transient') {
        id = returnId(accountId);
      } else {
        id = action.payload.id;
      }

      // action for non-transient
      state.billingAccounts.push({
        id: id,
        provider: provider,
        accountName: accountName,
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
      var orderBy = 'amount30day';

      if (action.payload.isCurrencyConflict) {
        orderBy = 'amount30dayConverted';
      }

      state.mostExpensive.data = combineSortSliceArray(
        state.mostExpensive,
        action.payload,
        'mostExpensive',
        'amount30Day',
        5
      );

      state.mostExpensive.isLoading = false;
    },
    updateFastestGrowingInstance(state, action) {
      state.fastestGrowing.data = combineSortSliceArray(
        state.fastestGrowing,
        action.payload,
        'fastestGrowing',
        'growth30Day',
        5
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
    resetCostDashboard(state, action) {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBillingAccountCosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBillingAccountCosts.fulfilled, (state, action) => {
        const billingAccountIndex = findBillingAccountIndex(state.billingAccounts, action.payload.id);

        state.currency = action.payload.currency;

        state.status = 'success';
        state.updatedCount = state.updatedCount + 1;

        state.billingAccounts[billingAccountIndex] = action.payload;
        state.billingAccounts[billingAccountIndex].isLoading = false;
        state.billingAccounts[billingAccountIndex].isError = false;
        state.billingAccounts[billingAccountIndex].status = 'non-transient';

        if (state.updatedCount === state.count) {
          finalState(state);
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
          finalState(state);
        }
      })
      .addCase(fetchTransientBillingAccountCosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransientBillingAccountCosts.fulfilled, (state, action) => {
        const id = returnId(action.payload.billingAccountId);
        const {
          billingAccountId,
          convertedCurrency,
          currency,
          monthToDateCost,
          monthToDateCostConverted,
          monthlySpend,
          mostExpensive,
          provider,
        } = action.payload;

        const billingAccountIndex = findBillingAccountIndex(state.billingAccounts, id);

        state.updatedCount = state.updatedCount + 1;

        // state.billingAccounts[billingAccountIndex] = action.payload;

        // temporay as accountName not returned for transient connections and so it's overwritten
        state.billingAccounts[billingAccountIndex].id = id;
        state.billingAccounts[billingAccountIndex].billingAccountId = billingAccountId;
        state.billingAccounts[billingAccountIndex].convertedCurrency = convertedCurrency;
        state.billingAccounts[billingAccountIndex].monthToDateCost = monthToDateCost;
        state.billingAccounts[billingAccountIndex].monthToDateCostConverted = monthToDateCostConverted;
        state.billingAccounts[billingAccountIndex].monthlySpend = monthlySpend;
        state.billingAccounts[billingAccountIndex].mostExpensive = mostExpensive;
        state.billingAccounts[billingAccountIndex].currency = currency;
        state.billingAccounts[billingAccountIndex].provider = provider;

        state.billingAccounts[billingAccountIndex].isLoading = false;
        state.billingAccounts[billingAccountIndex].isError = false;
        state.billingAccounts[billingAccountIndex].status = 'transient';

        if (state.updatedCount === state.count) {
          finalState(state);
        }
      })
      .addCase(fetchTransientBillingAccountCosts.rejected, (state, action) => {});
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
