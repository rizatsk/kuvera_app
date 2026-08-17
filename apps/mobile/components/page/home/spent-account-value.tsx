
import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
import { formatRupiah } from '@/helper/format-rupiah'
import { getThisMonth } from '@/helper/month'
import { TransactionGroupByCategoryType } from '@/service/transaction/api'
import { useAppSelector } from '@/states'
import { InitialSumTransactionByCategoryType } from '@/states/transaction/type'
import React from 'react'
import { View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import HomeMenu from './menu'

export default function InvestAccountValue() {
    const {isLoading, transactions}: InitialSumTransactionByCategoryType = useAppSelector((states) => states.sumTransactionByCategory);

    const thisMonth = getThisMonth();

    const SkeletonTotal = () => {
        return (
            <SkeletonPlaceholder>
                <View style={{ width: 170, height: 25, borderRadius: 4, marginTop: 11 }} />
            </SkeletonPlaceholder>
        )
    };
    
    const getTotalSpending = (
        transactions: TransactionGroupByCategoryType[],
    ): number => {
        let total = 0;
        transactions.map((trx) => {
            total += Number(trx.total_money_spent)
        });

        return total;
    };

    const totalSpending = getTotalSpending(transactions);

    return (
        <View style={{ alignItems: "center", flex: 1, flexDirection: "column", marginHorizontal: 10, paddingVertical: 10, backgroundColor: Colors.tealLightKuvera, borderRadius: 10, overflow: 'hidden' }}>
            <View style={{ backgroundColor: Colors.tealKuvera, width: 110, paddingLeft: 8, borderRadius: 10, position: 'absolute', top: 9, right: -10 }}>
                <CustomText style={{ color: 'white', fontWeight: 500, fontSize: 15 }}>{thisMonth}</CustomText>
            </View>
            <CustomText style={{ fontWeight: 600, color: 'white' }}>Your spent account value is</CustomText>
            <View style={{ marginVertical: 14, width: "80%", height: 0.8, backgroundColor: Colors.grey[50], }} />
            { isLoading ? <SkeletonTotal /> : (
                <CustomText style={{ fontWeight: '600', fontSize: 25, color: 'white' }}>{formatRupiah(totalSpending)}</CustomText>
            )}
            <HomeMenu />
        </View>
    )
}
