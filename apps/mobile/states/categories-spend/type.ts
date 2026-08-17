
import { CategorySpendType } from "@/service/category-spend/type";
import { Dispatch, SetStateAction } from "react";
import { ActionReducerType } from "../action";

export type AsyncGetCategorySpendParams = {
    setIsLoading: Dispatch<SetStateAction<boolean>> | Dispatch<boolean>
}

export type ActionCategoriesSpendReducer = {
  type: ActionReducerType;
  payload: {
    categories_spend: CategorySpendType[] | []
    category_spend: CategorySpendType
    category_id: string
    category_name: string
  };
}

export type AsyncAddCategorySpendParam = {
  name_category: string
  handleSuccess: () => void
}

export type AsyncUpdateStatusCategorySpendParam = {
  param: {
    category_id: string
    status: boolean
    category_name: string
  },
  handleSuccess: () => void
}

export type AsyncUpdateNameCategorySpendParam = {
  param: {
    category_id: string
    category_name: string
  },
  handleSuccess: () => void
}
