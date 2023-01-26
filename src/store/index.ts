import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  PERSIST,
  PAUSE,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import { churrasSlice } from "./churras";

const rootReducer = combineReducers({
  churras: churrasSlice.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PERSIST, PURGE, REGISTER, REHYDRATE, PAUSE],
    },
  }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
