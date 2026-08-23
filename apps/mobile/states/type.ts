import { CategorySpendType } from "@/service/category-spend/type";
import { TransactionGroupByCategoryType } from "@/service/transaction/type";
import { AuthUserType } from "./auth-user/type";

export type TypeStoreRedux = {
    isLogin: () => boolean,
    authUser: () => AuthUserType;
    visibleLoading: () => boolean;
    homeRefresh: () => boolean,
    categoriesSpend: () => CategorySpendType[] | [],
    sumTransactionByCategory: () => {
        isLoading: boolean;
        transactions: TransactionGroupByCategoryType[]
    },
}