
import { GetTransactionsParam, GetTransactionType, TransactionGroupByCategoryType, TransactionsByCategory, UpdateTransactionByIdParam } from "@/service/transaction/type";
import { Dispatch, SetStateAction } from "react";
import { ActionReducerType } from "../action";

export type AsyncAddTransactionParam = {
    param: AddTransactionParams
    successHandler: () => void,
    goToPageSuccess: (values: ResultAddTransaction) => void,
}

export type TypeTransaction = 'incoming' | 'outgoing' | 'all';

export type AddTransactionParams = {
    category_id: string,
    category_name: string,
    created_dt: string,
    money_spent: number,
    notes: string,
    type: TypeTransaction,
}

export type ResultAddTransaction = {
    id: string,
    category_name: string,
    category_id: string,
    created_dt: string,
    money_spent: number,
    notes: string,
    type: TypeTransaction
}

export type AsyncGetTransactionByCategoryParam = {
    start_date: Date,
    end_date: Date,
    type: TypeTransaction,
};

export type ActionSumTransactionByCategoryReducer = {
  type: ActionReducerType;
  payload: InitialSumTransactionByCategoryType;
}

export type InitialSumTransactionByCategoryType = {
  isLoading: boolean,
  transactions: TransactionGroupByCategoryType[],
  category?: TransactionGroupByCategoryType
}

export type AsyncGetTransactionsParam = {
  param: GetTransactionsParam,
  setIsLoading: Dispatch<SetStateAction<boolean>>
  successHandler: (result: GetTransactionType[]) => void,
}

type ParamGetTransactionsByCategory = {
  category_id: string
  start_date: Date,
  end_date: Date
}

export type AsyncGetTransactionsByCategoryParam = {
  param: ParamGetTransactionsByCategory,
  setIsLoading: Dispatch<SetStateAction<boolean>>
  successHandler: (result: TransactionsByCategory[]) => void,
}

export type AsyncDeleteTransactionParam = {
  idTransaction: string,
  successHandler: () => void,
}

export type AsyncUpdateTransactionParam = {
  param: UpdateTransactionByIdParam,
  successHandler: () => void,
  goToPageSuccess: (values: ResultAddTransaction) => void,
}