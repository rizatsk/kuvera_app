import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import authUserReducer from "./auth-user/reducer";
import categoriesSpendReducer from "./categories-spend/reducer";
import homeRefreshReducer from "./home-refresh/reducer";
import isPreloadReducer from "./preload/reducer";
import { sumTransactionByCategory } from "./transaction/reducer";
import isLoadingReducer from "./visible-loading/reducer";

export const store = configureStore({
  reducer: {
    preload: isPreloadReducer,
    authUser: authUserReducer,
    visibleLoading: isLoadingReducer,
    homeRefresh: homeRefreshReducer,
    categoriesSpend: categoriesSpendReducer,
    sumTransactionByCategory: sumTransactionByCategory,
  } as any
});


export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;