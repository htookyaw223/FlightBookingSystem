import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { mainApi } from "../api/mainApi";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  [mainApi.reducerPath]: mainApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["persistedAuth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: false,
      serializableCheck: false,
    }).concat(mainApi.middleware),
});
const persistor = persistStore(store);

export { store, persistor };
