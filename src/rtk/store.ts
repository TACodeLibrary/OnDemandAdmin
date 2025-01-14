import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { adminAPI } from './api';
import storage from "redux-persist/lib/storage";
import authReducer from './features/authSlice';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
  auth: persistReducer({ key: "auth", storage }, authReducer),
  [adminAPI.reducerPath]: adminAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(adminAPI.middleware),
});

setupListeners(store.dispatch);

export const persister = persistStore(store);

// Define RootState type based on the store's state
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type based on the store's dispatch
export type AppDispatch = typeof store.dispatch;
