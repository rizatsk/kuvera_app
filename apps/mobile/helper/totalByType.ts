import { GetTransactionType } from "@/service/transaction/type";

const totalByType = (transactions: GetTransactionType[]) => {
    let totalOut = 0,
        totalIn = 0;

    transactions.map((transaction) => {
        if (transaction.type === 'incoming') totalIn += transaction.money_spent;
        if (transaction.type === 'outgoing') totalOut += transaction.money_spent;
    });

    return {
        totalOut,
        totalIn
    }
};

export default totalByType;
