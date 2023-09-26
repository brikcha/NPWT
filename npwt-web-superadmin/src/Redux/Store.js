import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./reducers";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage"; //Storage Engine
import { persistReducer, persistStore } from 'redux-persist';
const persistConfig = {
    key: "root",
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, rootReducers);
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
  });
  export const persistor = persistStore(store)