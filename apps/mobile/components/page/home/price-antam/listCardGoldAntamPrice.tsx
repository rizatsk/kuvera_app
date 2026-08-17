import CustomText from '@/components/custom-text'
import { useAppSelector } from '@/states'
import { AsyncGetAntamGoldPrice } from '@/states/gold-antam-price/action'
import { GoldAntam } from '@/states/gold-antam-price/type'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useDispatch } from 'react-redux'
import CardGoldAntamPrice from './cardGoldAntamPrice'
import SkeletonPriceAntam from './skeleton'

export default function ListCardGoldAntamPrice() {
    const homeRefresh = useAppSelector((states) => states.homeRefresh);
    const dispatch = useDispatch();
    const [skeletonLoading, setSkeletonLoading] = useState(true);
    const [listGoldAntam, setListGoldAntam] = useState<GoldAntam[]>([]);

    useEffect(() => {
        getAntamGoldPrice()
    }, [])

    useEffect(() => {
        // Jalankan saat homeRefresh true
        if (homeRefresh) {
            getAntamGoldPrice()
        }
    }, [homeRefresh])

    function getAntamGoldPrice() {
        dispatch(
            AsyncGetAntamGoldPrice({ setListGoldAntam, setSkeletonLoading }) as any
        );
    }

    return (
        <FlatList<GoldAntam | undefined>
            scrollEnabled={false}
            data={skeletonLoading ? Array.from({ length: 6 }) : listGoldAntam}
            keyExtractor={(item, index) =>
                skeletonLoading ? index.toString() : item!.berat
            }
            contentContainerStyle={{ gap: 15 }}
            renderItem={({ item }) =>
                skeletonLoading ?
                    <SkeletonPriceAntam /> :
                    (
                        <CardGoldAntamPrice
                            weight={item!.berat}
                            price_buy={item!.harga_jual}
                            price_buyback={item!.harga_buyback}
                        />
                    )
            }
            ListEmptyComponent={<CustomText style={{textAlign: 'center', marginVertical: 20}}>Price gold Antam is not available</CustomText>}
        />
    )
}
