import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistReducer,
  persistStore,
} from "redux-persist";

import cartReducer from "./slices/cartSlice";
import favoritesReducer from "./slices/favoritesSlice";
import ordersReducer from "./slices/ordersSlice";
import profileReducer from "./slices/profileSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer,
  orders: ordersReducer,
  profile: profileReducer,
});

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch = typeof store.dispatch;