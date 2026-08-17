import { CategorySpendType } from "@/service/category-spend/type";
import * as Yup from "yup";

export type ValuesFormAddSpendingType = {
    category: CategorySpendType,
    date: string,
    spend: string,
    notes: string,
}

export const AddSpendingSchema = Yup.object().shape({
  category: Yup.object({id: Yup.string().required('Select category')}).required('Select category'),
  date: Yup.string()
    .required("Date cannot be empty"),
  spend: Yup.string()
    .required("Spending cannot be empty"),
  notes: Yup.string().required("Notes cannot be empty"),
});