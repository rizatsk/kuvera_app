import CustomText from '@/components/custom-text';
import CardGoldAntamPrice from '@/components/page/home/price-antam/cardGoldAntamPrice';
import SkeletonPriceAntam from '@/components/page/home/price-antam/skeleton';
import { AsyncGetGoldPrice } from '@/states/gold-antam-price/action';
import { ListGoldProps } from '@/states/gold-antam-price/type';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { RefreshControl, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

export default function PriceGoldPage() {
    const [listGold, setListGold] = useState<ListGoldProps[]>([]);
    const [skeletonLoading, setSkeletonLoading] = useState(true);

    useEffect(() => {
        getListGold();
    }, []);

    const dispatch = useDispatch();
    
    function getListGold() {
        dispatch(
            AsyncGetGoldPrice({
                setListGold,
                setSkeletonLoading
            }) as any
        )
    }

    return (
        <SafeAreaView
            edges={['bottom']}
            style={{ paddingVertical: 10, backgroundColor: 'white' }}
        >
            <SectionList
                sections={listGold}
                refreshControl={<RefreshControl refreshing={skeletonLoading} onRefresh={getListGold} />}
                keyExtractor={(item, index) => item.berat + index}
                renderSectionHeader={({ section }) =>
                    section.type === "ANTAM" ?
                        <Image
                            source={require(`@/assets/images/icon/ANTAM.png`)}
                            style={{ height: 40, width: 'auto' }}
                            contentFit='contain'
                        /> :
                        <Image
                            source={require(`@/assets/images/icon/G24.png`)}
                            style={{ height: 27, width: 'auto' }}
                            contentFit='contain'
                        />
                }
                contentContainerStyle={{ gap: 15, paddingHorizontal: 15 }}
                renderItem={({ item }) =>
                    <CardGoldAntamPrice
                        key={item.berat}
                        weight={item.berat}
                        price_buy={item.harga_jual}
                        price_buyback={item.harga_buyback}
                    />
                }
                ListEmptyComponent={
                    skeletonLoading ?
                        <>
                            {Array.from({ length: 15 }).map((_, i) => (
                                <SkeletonPriceAntam key={i} />
                            ))}
                        </> :
                        <CustomText>Tidak ada data</CustomText>
                }
            />
        </SafeAreaView>
    )
}
