import CustomText from '@/components/custom-text';
import CardTransaction from '@/components/page/transactions/card-transaction/card-transaction';
import NoHaveTransaction from '@/components/page/transactions/card-transaction/no-have-transaction';
import SkeletonCardTransaction from '@/components/page/transactions/card-transaction/skeleton';
import ModalDateTransactions from '@/components/page/transactions/date-transaction/modal-date-transaction';
import { DateTrx } from '@/components/page/transactions/date-transaction/type';
import { Colors } from '@/constants/theme';
import capitalize from '@/helper/capitalize';
import { formatRupiah } from '@/helper/format-rupiah';
import totalByType from '@/helper/totalByType';
import { TransactionsByCategory } from '@/service/transaction/type';
import { asyncGetTransactionsByCategory } from '@/states/transaction/action';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

export default function TransactionByCategory() {
    const { dateTrx: dateTrxParam, category_id, category_name } = useLocalSearchParams();
    const navigation = useNavigation()

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<TransactionsByCategory[]>([]);
    const [totalSaldo, setTotalSaldo] = useState({
        in: 0,
        out: 0
    });

    // Select Date
    const dateTrxParent = JSON.parse(dateTrxParam as any) as DateTrx;
    const [dateTrx, setDateTrx] = useState<DateTrx>(dateTrxParent);

    useEffect(() => {
        navigation.setOptions({
            title: `Category ${capitalize(category_name as string)}`,
        });
    }, [category_id, dateTrxParam]);

    const onSelectDate = (dataDateTrx: DateTrx) => {
        setDateTrx(dataDateTrx);
    };

    useEffect(() => {
        getTransactionByCategory();
    }, [dateTrx.keyString])

    useEffect(() => {
        if (!isLoading) {
            if (transactions.length > 0) {
                let total = 0;
                const { totalIn, totalOut } = totalByType(transactions)
                setTotalSaldo({
                    in: totalIn,
                    out: totalOut
                })
            } else {
                setTotalSaldo({
                    in: 0,
                    out: 0
                })
            }
        }
    }, [transactions])

    const getTransactionByCategory = () => {
        dispatch(
            asyncGetTransactionsByCategory({
                param: {
                    category_id: category_id as string,
                    start_date: new Date(dateTrx.start),
                    end_date: new Date(dateTrx.end as string),
                },
                setIsLoading,
                successHandler: (response: TransactionsByCategory[]) => {
                    setTransactions(response)
                }
            }) as any
        )
    };

    return (
        <SafeAreaView
            edges={['bottom']}
            style={{ flex: 1, backgroundColor: "white" }}
        >
            <View style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
                    <ModalDateTransactions
                        titleStyle={{ fontWeight: 600, fontSize: 15 }}
                        label="Select Date"
                        value={dateTrx}
                        onSelectDate={onSelectDate}
                    />
                </View>
                <View style={styles.monthTrxContainer}>
                    <CustomText style={{ fontWeight: 500, fontSize: 15 }}>Total :</CustomText>
                    <View>
                        <CustomText style={styles.textSaldo}>Saldo in: {formatRupiah(totalSaldo.in)}</CustomText>
                        <CustomText style={styles.textSaldo}>Saldo out: {formatRupiah(totalSaldo.out)}</CustomText>
                    </View>
                </View>
                <FlatList<TransactionsByCategory | undefined>
                    refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getTransactionByCategory} />}
                    data={isLoading ? Array.from({ length: 10 }) : transactions}
                    keyExtractor={(item, index) =>
                        isLoading ? index.toString() : item!.id
                    }
                    contentContainerStyle={{ flex: 1, gap: 2, paddingBottom: 20, marginHorizontal: 15 }}
                    renderItem={({ item, index }) =>
                        isLoading ?
                            <SkeletonCardTransaction /> :
                            (
                                <CardTransaction
                                    key={item!.id}
                                    index={index}
                                    id={item!.id}
                                    category_id={item!.category_id}
                                    category_name={category_name as string}
                                    notes={item!.notes}
                                    amount={item!.money_spent}
                                    created_dt={item!.created_dt}
                                    type={item!.type}
                                />
                            )
                    }
                    ListEmptyComponent={<NoHaveTransaction />}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    listFooterComponent: {
        paddingLeft: 5,
        paddingRight: 8,
        paddingVertical: 4,
        borderRadius: 10,
        borderColor: Colors.tealKuvera,
        borderWidth: 2,
        width: '48%',
        height: 60,
        borderStyle: 'dashed',
        backgroundColor: Colors.tealKuvera + 30
    },
    monthTrxContainer: {
        backgroundColor: Colors.white[200],
        paddingHorizontal: 20,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textSaldo: {
        fontSize: 13,
        fontWeight: 500
    },
})