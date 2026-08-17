import CustomText from '@/components/custom-text'
import { GetTransactionType } from '@/service/transaction/type'
import { useAppSelector } from '@/states'
import { asyncGetTransactions } from '@/states/transaction/action'
import { Image } from 'expo-image'
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useDispatch } from 'react-redux'
import CardRecent from './cardRecent'
import SkeletonCardRecent from './skeleton'


export default function ListCardRecent() {
    const homeRefresh = useAppSelector((states) => states.homeRefresh);
    const dispatch = useDispatch();

    const [listRecentTransactions, setListRecentTransactions] = useState<GetTransactionType[]>([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getRecentTransactions()
    }, [])

    useEffect(() => {
        // Jalankan saat homeRefresh true
        if (homeRefresh) {
            getRecentTransactions()
        }
    }, [homeRefresh])

    function getRecentTransactions() {
        dispatch(
            asyncGetTransactions({
                param: {
                    limit: 10,
                    type: 'outgoing',
                },
                setIsLoading,
                successHandler: (result) => {
                    setListRecentTransactions(result);
                }
            }) as any
        );
    }

    const NotHaveTransaction = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', marginHorizontal: 20, marginBottom: 10 }}>
                <Image source={require('@/assets/images/no-data.png')}
                    style={{ width: 150, height: 150 }}
                    contentFit="contain" />
                <View>
                    <CustomText style={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }}>No transactions recorded yet.</CustomText>
                    <CustomText style={{ textAlign: 'center' }}>Add an expense to start tracking your finances</CustomText>
                </View>
            </View>
        )
    }

    return (
        <View style={{ paddingHorizontal: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
                <CustomText style={{ fontWeight: 600, fontSize: 16 }}>Expen Recent</CustomText>
            </View>
            <FlatList<GetTransactionType | undefined>
                scrollEnabled={false}
                data={isLoading ? Array.from({ length: 10 }) : listRecentTransactions}
                keyExtractor={(item, index) =>
                    isLoading ? index.toString() : item!.id
                }
                contentContainerStyle={{ gap: 10 }}
                renderItem={({ item, index }) =>
                    isLoading ?
                        <SkeletonCardRecent /> :
                        (
                            <CardRecent
                                key={item!.id}
                                index={index}
                                id={item!.id}
                                type={item!.type}
                                category_id={item!.category_id}
                                category_name={item!.category_name}
                                title={item!.notes}
                                date={item!.created_dt}
                                icon={item!.category_name}
                                amount={item!.money_spent}
                            />
                        )
                }
                ListEmptyComponent={<NotHaveTransaction />}
            />
        </View>
    )
}
