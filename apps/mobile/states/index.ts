import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import authUserReducer from "./auth-user/reducer";
import categoriesSpendReducer from "./categories-spend/reducer";
import homeRefreshReducer from "./home-refresh/reducer";
import { sumTransactionByCategory } from "./transaction/reducer";
import isLoadingReducer from "./visible-loading/reducer";
import isLoginReducer from "./is-login/reducer";
import { TypeStoreRedux } from "./type";

export const store = configureStore({
  reducer: {
    isLogin: isLoginReducer,
    authUser: authUserReducer,
    visibleLoading: isLoadingReducer,
    homeRefresh: homeRefreshReducer,
    categoriesSpend: categoriesSpendReducer,
    sumTransactionByCategory: sumTransactionByCategory,
  } as TypeStoreRedux
});


export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;