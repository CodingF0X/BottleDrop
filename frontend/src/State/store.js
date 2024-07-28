import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import itemsReducer from "./itemsSlice";
import warehouseReducer from "./State_Warehouse/warehouseSlice";
import authReducer from "./State_Auth/authSlice";
import barReducer from './State_Bar/barSlice'

const persistConfig = {
  key: "root",
  version: 1,
  storage,
//   whitelist: ["auth"], // Specify which reducers to persist
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    items: itemsReducer,
    warehouse: warehouseReducer,
    bars: barReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
