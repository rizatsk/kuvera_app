import { CategorySpendType } from "@/service/category-spend/type";
import { ActionReducer } from "../action";
import { ActionCategoriesSpendReducer } from "./type";

function categoriesSpendReducer(
  initial = [] as CategorySpendType[] | [],
  action = {} as ActionCategoriesSpendReducer,
) {
  switch (action.type) {
    case ActionReducer.SET_CATEGORIES_SPEND:
      return action.payload.categories_spend;
    case ActionReducer.ADD_CATEGORIES_SPEND:
      const newCategory = [...initial, action.payload.category_spend];
      return newCategory;
    case ActionReducer.DELETE_CATEGORY_SPEND:
      const newCategoriesAfterDelete = initial.filter((category) => category.id !== action.payload.category_id);
      return newCategoriesAfterDelete;
    case ActionReducer.UPDATE_CATEGORY_SPEND:
      return initial.map((category) =>
        category.id === action.payload.category_id
          ? {
            ...category,
            name: action.payload.category_name
          }
          : category
      );
    default:
      return initial;
  }
}

export default categoriesSpendReducer;
