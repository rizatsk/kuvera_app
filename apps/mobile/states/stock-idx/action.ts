import { ApiStockIdx } from "@/service/stock-idx/api";
import { AsyncGetStockIDXPriceType } from "./type";

export function asyncGetStockIDXPrice({ 
    setDataStockIDX, setSkeletonLoading, setDataStockIDXSearch
}: AsyncGetStockIDXPriceType) {
    return async (dispatch: any) => {
        try {
            setSkeletonLoading(true)
            const dataStockIDX = await ApiStockIdx();
            setDataStockIDXSearch(dataStockIDX)
            setDataStockIDX(dataStockIDX)
        } catch (error) {
            console.log("Error get ApiGetStockIDXPrice", error)
        } finally {
            setSkeletonLoading(false)
        }
    }
}