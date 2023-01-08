import { combineReducers } from 'redux';
import { reduxState } from './reduxState';

import userProfileReducer from './reducers/userProfileSlice';
import azureManagementReducer from './reducers/azureManagementSlice';
import serviceProviderReducer from './reducers/serviceProvidersSlice';
import costDashboardReducer from './reducers/costDashboardSlice';
import resourceReducer from './reducers/resourceSlice';
import applicationReducer from './reducers/applicationSlice';

const appReducer = combineReducers({
  [reduxState.USER_PROFILE]: userProfileReducer,
  [reduxState.AZURE_MANAGEMENT]: azureManagementReducer,
  [reduxState.SERVICE_PROVIDERS]: serviceProviderReducer,
  [reduxState.COST_DASHBOARD]: costDashboardReducer,
  [reduxState.RESOURCES]: resourceReducer,
  [reduxState.APPLICATION]: applicationReducer,
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export type IRootState = ReturnType<typeof rootReducer>;
