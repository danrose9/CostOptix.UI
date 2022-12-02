import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage/session';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { rootReducer } from './rootReducer';
import monitorReducersEnhancer from './enhancers/monitorReducer';
import loggerMiddleware from './enhancers/logger';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          'Profile/incrementLoginCount/fulfilled',
        ],
      },
    }).concat(loggerMiddleware),
  enhancers: [monitorReducersEnhancer],
});

let persistor = persistStore(store);

export { store, persistor };

// export type AppDispatch = typeof store.dispatch
