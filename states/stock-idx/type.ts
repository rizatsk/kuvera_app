import { Dispatch, SetStateAction } from "react"

export type DataStocksProps = {
    stockCode: string
    stockName: string
    logoId: string
    price: number
    change: number
    dividen: number
    analyst: string
}

export type AsyncGetStockIDXPriceType = {
    setDataStockIDX: Dispatch<SetStateAction<DataStocksProps[]>>
    setDataStockIDXSearch: Dispatch<SetStateAction<DataStocksProps[]>>
    setSkeletonLoading: Dispatch<SetStateAction<boolean>>
}
