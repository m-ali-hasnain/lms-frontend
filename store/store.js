import storage from 'reduxjs-toolkit-persist/lib/storage';
import authReducer from '@/features/auth/authSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist';

// Defining Root Reducer: It contains all of our app state's features
const rootReducer = combineReducers({
  auth: authReducer,
});

/*
  This will be the persisted Reducer, it will detect change in state
  and persists it again
*/
const _persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
  },
  rootReducer
);

// Defining Store Now
const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Finally defining and exporting persistor
export const persistor = persistStore(store);
// exporting store
export default store;