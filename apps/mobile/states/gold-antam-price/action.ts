import Variable from "@/constants/variable";
import { ApiGoldAntamPrice, ApiGoldPrice } from "@/service/gold-price/api";
import { GetAntamGoldPriceProps, GetGoldPriceProps } from "./type";

export function AsyncGetAntamGoldPrice({
    setListGoldAntam, setSkeletonLoading
}: GetAntamGoldPriceProps) {
    return async(dispatch: any) => {
        try {
            setSkeletonLoading(true);
            const result = await ApiGoldAntamPrice();
            setListGoldAntam(result.filter((gold) => Variable.LIST_GRAM_ANTAM.includes(gold.berat)))
        } catch(error: any) {
            console.log("Error get ApiGoldAntamPrice", error)
        } finally {
            setSkeletonLoading(false);
        }
    }
}

export function AsyncGetGoldPrice({
    setListGold, setSkeletonLoading
}: GetGoldPriceProps) {
    return async(dispatch: any) => {
        try {
            setSkeletonLoading(true);
            const result = await ApiGoldPrice();

            setListGold(result)
        } catch(error: any) {
            console.log("Error get ApiGoldAntamPrice", error)
        } finally {
            setSkeletonLoading(false);
        }
    }
}