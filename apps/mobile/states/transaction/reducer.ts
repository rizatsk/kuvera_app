import { ActionReducer } from "../action";
import { ActionSumTransactionByCategoryReducer, InitialSumTransactionByCategoryType } from "./type";

export function sumTransactionByCategory(
  initial = {
    isLoading: false,
    transactions: []
  } as InitialSumTransactionByCategoryType,
  action = {} as ActionSumTransactionByCategoryReducer,
) {
  switch (action.type) {
    case ActionReducer.SET_SUM_TRANSACTION_BY_CATEGORY:
      return {
        isLoading: action.payload.isLoading,
        transactions: action.payload.transactions,
      };
    case ActionReducer.ADD_SUM_TRANSACTION_BY_CATEGORY:
      return {
        isLoading: false,
        transactions: [...initial.transactions, action.payload.category],
      };
    default:
      return {
        isLoading: initial.isLoading,
        transactions: initial.transactions,
      };;
  }
}