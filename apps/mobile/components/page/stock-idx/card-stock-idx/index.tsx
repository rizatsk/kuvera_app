import CustomText from '@/components/custom-text';
import { Colors } from '@/constants/theme';
import closeOrBidIHSG from '@/helper/closeOrBidIHSG';
import { asyncGetStockIDXPrice } from '@/states/stock-idx/action';
import { DataStocksProps } from '@/states/stock-idx/type';
import { Entypo } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import IsNotFoundStockIDX from './is-not-found';
import SkeletonStockIDX from './skeleton';

type CardStockIdxProps = {
    code: string
    nameCompany: string
    logoId: string
    price: number,
    change: number
    dividen: number
    analyst: string
}

type ListCardStockIdxProps = {
    keyword: string
}

export default function ListCardStockIdx({ keyword }: ListCardStockIdxProps) {
    const dispatch = useDispatch();
    const [dataStockIDX, setDataStockIDX] = useState<DataStocksProps[]>([]);
    const [dataStockIDXSearch, setDataStockIDXSearch] = useState<DataStocksProps[]>([]);
    const [skeletonLoading, setSkeletonLoading] = useState(true)
    const [refresh, setRefresh] = useState(false);
    const API_FETCH_INTERVAL = 60000;

    useFocusEffect(
        useCallback(() => {
            // 1. Panggil data segera saat layar fokus
            getDataStockIDX();

            // 2. Set up interval untuk periodic hit API
            const intervalId = setInterval(() => {
                const bidOrClose = closeOrBidIHSG();
                if (bidOrClose === 'Bid') getDataStockIDXPeriod();
            }, API_FETCH_INTERVAL);

            // 3. Cleanup function: bersihkan interval saat layar BLUR (tidak fokus)
            return () => {
                console.log('Interval dibersihkan. Layar tidak fokus.');
                clearInterval(intervalId);
            };
        }, [])
    )

    useEffect(() => {
        if (dataStockIDX.length > 0) {
            switch (keyword) {
                case 'all':
                    setDataStockIDXSearch(dataStockIDX)
                    break;
                default:
                    const lowerQuery = keyword.toLowerCase();
                    const searchDataIDX = dataStockIDX.filter(
                        (item) =>
                            item.stockCode.toLowerCase().includes(lowerQuery) ||
                            item.stockName.toLowerCase().includes(lowerQuery)
                    );
                    setDataStockIDXSearch(searchDataIDX)
                    break;

            }
        }
    }, [keyword, dataStockIDX])

    const fetchRefreshing = () => {
        setRefresh(true)
        getDataStockIDX()
        setRefresh(false)
    }

    function getDataStockIDX() {
        dispatch(
            asyncGetStockIDXPrice({
                setDataStockIDX,
                setDataStockIDXSearch,
                setSkeletonLoading
            }) as any
        )
    }

    function getDataStockIDXPeriod() {
        dispatch(
            asyncGetStockIDXPrice({
                setDataStockIDX,
                setDataStockIDXSearch,
                setSkeletonLoading: () => { }
            }) as any
        )
    }

    return (
        <FlatList<DataStocksProps | undefined>
            refreshControl={<RefreshControl refreshing={refresh} onRefresh={fetchRefreshing} />}
            scrollEnabled={true}
            data={skeletonLoading ? Array.from({ length: 13 }) : dataStockIDXSearch}
            keyExtractor={(item, index) =>
                skeletonLoading ? index.toString() : item!.stockCode.toString()
            }
            contentContainerStyle={{ gap: 20, paddingVertical: 15 }}
            ListEmptyComponent={<IsNotFoundStockIDX />}
            renderItem={({ item }) =>
                skeletonLoading ?
                    <SkeletonStockIDX /> :
                    (
                        <CardStockIdx
                            code={item!.stockCode}
                            nameCompany={item!.stockName}
                            price={item!.price}
                            logoId={item!.logoId}
                            dividen={item!.dividen}
                            change={item!.change}
                            analyst={item!.analyst}
                        />
                    )
            }
        />
    )
}

function CardStockIdx({ code, nameCompany, price, logoId, change, dividen, analyst }: CardStockIdxProps) {
    const statusColor = change < 0 ? Colors.red[500] : Colors.moneyGreenKuvera;
    const upOrDown = change < 0 ? "triangle-down" : "triangle-up";
    const colorAnalyst = analyst == 'Netral' ? Colors.grey[500] : Colors.tealDarkKuvera;

    const detailButtonHandler = (stockCode: string) => {
        router.push({
            pathname: '/(private)/stock-idx/detail',
            params: {
                stockCode
            }
        })
    }

    return (
        <TouchableOpacity 
            onPress={() => detailButtonHandler(code)}
            activeOpacity={0.6}
            style={styles.dataTransactionContainer} >
            <View style={{ gap: 5, flex: 1 }}>
                {/* Title */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image source={`https://s3-symbol-logo.tradingview.com/${logoId}.svg`}
                            style={{ width: 35, height: 35, borderRadius: 999, overflow: 'hidden' }}
                            contentFit="fill" />
                        <View>
                            <CustomText style={{ fontSize: 16, fontWeight: 600 }}>{code}</CustomText>
                            <CustomText style={{ fontSize: 12 }}>{nameCompany}</CustomText>
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                        <CustomText style={{fontSize: 12}}>Analyst</CustomText>
                        <CustomText style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: colorAnalyst,
                        }}>{analyst}</CustomText>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 5, justifyContent: 'space-between', backgroundColor: Colors.tealLightKuvera + 20 }}>
                    <View style={{ alignItems: 'center' }}>
                        <CustomText>Price</CustomText>
                        <CustomText style={styles.price}>Rp {price}</CustomText>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <CustomText>Change</CustomText>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2,
                        }}>
                            <Entypo name={upOrDown} size={18} color={statusColor} />
                            <CustomText style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: statusColor
                            }}>{change}%</CustomText>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <CustomText>Dividen</CustomText>
                        <CustomText style={{
                            fontSize: 13,
                            fontWeight: 600,
                        }}>{dividen}%</CustomText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    dataTransactionContainer: {
        backgroundColor: "white",
        paddingVertical: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 13,
        fontWeight: 600,
    },
});
