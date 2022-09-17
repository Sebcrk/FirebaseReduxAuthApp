import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth-slice";
import counterReducer from "./counter-slice";
import guestInfoReducer from "./guestInfo-slice"
const persistConfig = {
  key: "auth",
  version: 1,
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: persistedAuthReducer,
    guestInfo: guestInfoReducer
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      storage.remove("auth");
    });
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export const persistor = persistStore(store);
