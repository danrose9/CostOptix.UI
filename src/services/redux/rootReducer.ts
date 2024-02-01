import { combineReducers } from 'redux';
import { reduxState } from './reduxState';

import {
  serviceProviderReducer,
  userProfileReducer,
  azureManagementReducer,
  costContainerReducer,
  costDashboardReducer,
  applicationReducer,
  resourceReducer,
} from './reducers/index';

export const AsyncThunkStatus = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

const appReducer = combineReducers({
  [reduxState.USER_PROFILE]: userProfileReducer,
  [reduxState.AZURE_MANAGEMENT]: azureManagementReducer,
  [reduxState.SERVICE_PROVIDERS]: serviceProviderReducer,
  [reduxState.COST_DASHBOARD]: costDashboardReducer,
  [reduxState.RESOURCES]: resourceReducer,
  [reduxState.APPLICATION]: applicationReducer,
  [reduxState.COST_CONTAINERS]: costContainerReducer,
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export type IRootState = ReturnType<typeof rootReducer>;
