import CustomText from '@/components/custom-text';
import CardCategoryOutput from '@/components/page/home/categories-spend/cardCategorySpend';
import SkeletonCardCategoryOutput from '@/components/page/home/categories-spend/skeleton';
import ModalDateTransactions from '@/components/page/transactions/date-transaction/modal-date-transaction';
import { DateTrx } from '@/components/page/transactions/date-transaction/type';
import { Colors } from '@/constants/theme';
import { formatRupiah } from '@/helper/format-rupiah';
import { TransactionGroupByCategoryType } from '@/service/transaction/type';
import { useAppSelector } from '@/states';
import { asyncGetTransactionByCategory } from '@/states/transaction/action';
import { InitialSumTransactionByCategoryType } from '@/states/transaction/type';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function AllCategory() {
    const dispatch = useDispatch();
    const { isLoading, transactions }: InitialSumTransactionByCategoryType = useAppSelector((states) => states.sumTransactionByCategory);
    const [totalSaldo, setTotalSaldo] = useState(0);

    // Select Date
    const [dateTrx, setDateTrx] = useState<DateTrx>({
        start: moment().format('YYYY-MM') + '-01 00:00:00',
        end: moment().format('YYYY-MM-DD') + ' 23:59:59',
        keyString: 'ThisMonth'
    })
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
                transactions.map((trx) => {
                    total += trx.total_money_spent
                });
                setTotalSaldo(total);
            } else {
                setTotalSaldo(0)
            }
        }
    }, [transactions])

    const getTransactionByCategory = () => {
        dispatch(
            asyncGetTransactionByCategory({
                start_date: new Date(dateTrx.start),
                end_date: new Date(dateTrx.end as string),
                type: 'outgoing',
            }) as any
        )
    };

    const handleAddCategory = () => {
        router.push({
            pathname: '/(private)/category/add-category',
        })
    }

    return (
        <View
            style={{ flex: 1, backgroundColor: "white" }}
        >
            <View style={{ marginHorizontal: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 15 }}>
                    <ModalDateTransactions
                        titleStyle={{ fontWeight: 600, fontSize: 15 }}
                        label="Select Date"
                        value={dateTrx}
                        onSelectDate={onSelectDate}
                    />
                </View>
                <View style={styles.monthTrxContainer}>
                    <CustomText style={{ fontWeight: 500, fontSize: 15 }}>Total </CustomText>
                    <View>
                        <CustomText style={styles.textSaldo}>Expend: {formatRupiah(totalSaldo)}</CustomText>
                    </View>
                </View>
                <FlatList<TransactionGroupByCategoryType | undefined>
                    scrollEnabled={true}
                    data={isLoading ? Array.from({ length: 6 }) : transactions}
                    keyExtractor={(item, index) =>
                        isLoading ? index.toString() : item!.category_id
                    }
                    contentContainerStyle={{ gap: 10, marginTop: 20 }}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) =>
                        isLoading ? (
                            <View style={{ width: '48%' }} >
                                <SkeletonCardCategoryOutput />
                            </View>
                        ) :
                            (
                                <View style={{ width: '48%' }} key={item!.category_id}>
                                    <CardCategoryOutput
                                        dateTrx={dateTrx}
                                        id={item!.category_id}
                                        account_id={item!.account_id}
                                        title={item!.category_name}
                                        money={`${item!.total_money_spent}`}
                                        icon={item!.category_name}
                                        color={Colors.tealLightKuvera}
                                        status={item!.category_status}
                                    />
                                </View>
                            )
                    }
                    ListFooterComponent={(
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={handleAddCategory}
                            style={styles.listFooterComponent}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 5, justifyContent: 'center', flex: 1 }}>
                                <MaterialIcons name="add-circle" size={26} color={Colors.tealKuvera} />
                                <CustomText style={{ color: Colors.tealDarkKuvera, fontSize: 14, fontWeight: 600 }}>Add Category</CustomText>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
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