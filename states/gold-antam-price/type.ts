import { Dispatch, SetStateAction } from "react"

export type GetAntamGoldPriceProps = {
    setListGoldAntam: Dispatch<SetStateAction<GoldAntam[]>>
    setSkeletonLoading: Dispatch<SetStateAction<boolean>>
}

export type GetGoldPriceProps = {
    setListGold: Dispatch<SetStateAction<ListGoldProps[]>>
    setSkeletonLoading: Dispatch<SetStateAction<boolean>>
}

export type ListGoldProps = {
    type: string,
    data: GoldAntam[]
}


export type GoldAntam = {
    berat: string
    harga_buyback: string
    harga_jual: string
}
