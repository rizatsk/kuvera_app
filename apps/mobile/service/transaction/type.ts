import { TypeTransaction } from "@/states/transaction/type"

export type ApiAddTransactionParam = {
    category_id: string,
    created_dt: string,
    money_spent: number,
    notes: string,
    type: TypeTransaction,
}

export type ApiGetTransactionGroupByCategoryParam = {
    start_date: Date,
    end_date: Date,
    type: TypeTransaction
}

export type TransactionGroupByCategoryType = {
    category_id: string,
    category_name: string,
    total_money_spent: number
    category_status: boolean
    account_id: string
}

export type GetTransactionsParam = {
    type: TypeTransaction,
    limit?: number,
    start_date?: Date
    end_date?: Date
}

export type GetTransactionsByCategoryParam = {
    category_id: string,
    start_date: Date
    end_date: Date
}

export type GetTransactionType = {
    id: string,
    category_id: string,
    category_name: string,
    money_spent: number,
    notes: string,
    type: TypeTransaction,
    created_dt: string,
}

export type TransactionsByCategory = {
    id: string,
    category_id: string,
    category_name: string,
    money_spent: number,
    notes: string,
    type: TypeTransaction,
    created_dt: string,
}

export type UpdateTransactionByIdParam = {
    id_transaction: string,
    category_id: string,
    category_name: string,
    money_spent: number,
    notes: string,
    type: TypeTransaction,
    created_dt: string,
}