import { addTransaction, deleteTransaction, getTransactionGroupByCategory, getTransactions, getTransactionsByCategory, updateTransactionById } from "@/service/transaction/api";
import { TransactionGroupByCategoryType } from "@/service/transaction/type";
import { ActionReducer } from "../action";
import { setLoading } from "../visible-loading/action";
import { AsyncAddTransactionParam, AsyncDeleteTransactionParam, AsyncGetTransactionByCategoryParam, AsyncGetTransactionsByCategoryParam, AsyncGetTransactionsParam, AsyncUpdateTransactionParam } from "./type";

function setSumerizeTransactionByCategory(isLoading: boolean, data: TransactionGroupByCategoryType[]) {
    return {
        type: ActionReducer.SET_SUM_TRANSACTION_BY_CATEGORY,
        payload: {
            isLoading: isLoading,
            transactions: data
        }
    }
}

export function addSumerizeTransactionByCategoryCreator(category: TransactionGroupByCategoryType) {
    return {
        type: ActionReducer.ADD_SUM_TRANSACTION_BY_CATEGORY,
        payload: {
            category: category
        }
    }
}

export function asyncAddTransaction({
    param, successHandler, goToPageSuccess,
}: AsyncAddTransactionParam) {
    return async (dispatch: any) => {
        dispatch(setLoading(true));
        try {
            const result = await addTransaction({
                category_id: param.category_id,
                created_dt: param.created_dt,
                money_spent: param.money_spent,
                notes: param.notes,
                type: param.type
            });
            successHandler();
            goToPageSuccess({
                id: result.id,
                category_id: param.category_id,
                category_name: param.category_name,
                created_dt: param.created_dt,
                money_spent: param.money_spent,
                notes: param.notes,
                type: param.type,
            })
        } catch (error) {
            console.log("Error asyncAddTransaction", error)
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export function asyncGetTransactionByCategory({
    start_date, end_date, type
}: AsyncGetTransactionByCategoryParam) {
    return async (dispatch: any) => {
        let result: TransactionGroupByCategoryType[] = [];
        dispatch(setSumerizeTransactionByCategory(true, result))
        try {
            const response = await getTransactionGroupByCategory({
                start_date,
                end_date,
                type
            });

            result = response;
        } catch (error) {
            console.log("Error asyncGetTransactionByCategory", error)
        } finally {
            dispatch(setSumerizeTransactionByCategory(false, result))
        }
    }
}

export function asyncGetTransactions({
    param, setIsLoading, successHandler
}: AsyncGetTransactionsParam) {
    return async (dispatch: any) => {
        setIsLoading(true);
        try {
            const response = await getTransactions({
                type: param.type,
                limit: param.limit,
                start_date: param.start_date,
                end_date: param.end_date
            });

            successHandler(response);
        } catch (error) {
            console.log("Error asyncGetTransactions", error)
        } finally {
            setIsLoading(false);
        }
    }
}

export function asyncGetTransactionsByCategory({
    param, setIsLoading, successHandler
}: AsyncGetTransactionsByCategoryParam) {
    return async (dispatch: any) => {
        setIsLoading(true);
        try {
            console.log("Data param send transaction by category", param)
            const response = await getTransactionsByCategory(param);

            successHandler(response);
        } catch (error) {
            console.log("Error asyncGetTransactionsByCategory", error)
        } finally {
            setIsLoading(false);
        }
    }
}

export function asyncDeleteTransaction({
    idTransaction, successHandler
}: AsyncDeleteTransactionParam) {
     return async (dispatch: any) => {
        dispatch(setLoading(true));
        try {
            await deleteTransaction(idTransaction);

            successHandler();
        } catch (error) {
            console.log("Error asyncDeleteTransaction", error)
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export function asyncUpdateTransaction({
    param, successHandler, goToPageSuccess
}: AsyncUpdateTransactionParam){
     return async (dispatch: any) => {
        dispatch(setLoading(true));
        try {
            const result = await updateTransactionById(param);

            successHandler();
            goToPageSuccess({
                id: param.id_transaction,
                category_id: param.category_id,
                category_name: param.category_name,
                created_dt: param.created_dt,
                money_spent: param.money_spent,
                notes: param.notes,
                type: param.type,
            });
        } catch (error) {
            console.log("Error asyncUpdateTransaction", error)
        } finally {
            dispatch(setLoading(false));
        }
    }
}