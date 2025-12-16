import { Colors } from '@/constants/theme';
import { TransactionGroupByCategoryType } from '@/service/transaction/type';
import { useAppSelector } from '@/states';
import { asyncGetTransactionByCategory } from '@/states/transaction/action';
import { InitialSumTransactionByCategoryType } from '@/states/transaction/type';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import CardCategoryOutput from './cardCategorySpend';
import SkeletonCardCategoryOutput from './skeleton';

export default function ListCategoriesSpend() {
    const homeRefresh = useAppSelector((states) => states.homeRefresh);
    const [categoriesTrx, setCategoriesTrx] = useState<TransactionGroupByCategoryType[]>([]);
    const { isLoading, transactions }: InitialSumTransactionByCategoryType = useAppSelector((states) => states.sumTransactionByCategory);
    const dispatch = useDispatch();
    const dateTrx = {
        start: moment().format('YYYY-MM') + '-01 00:00:00',
        end: moment().format('YYYY-MM-DD') + ' 23:59:59',
        keyString: 'ThisMonth'
    }

    useEffect(() => {
        getTransactionByCategory();
    }, []);

    useEffect(() => {
        // Jalankan saat homeRefresh true
        if (homeRefresh) {
            getTransactionByCategory()
        }
    }, [homeRefresh])

    useEffect(() => {
        if (transactions.length > 0 && !isLoading) {
            const trxActive = transactions.filter((trx) => trx.category_status === true)
            setCategoriesTrx(trxActive)
        }
    }, [transactions])

    const getTransactionByCategory = () => {
        dispatch(
            asyncGetTransactionByCategory({
                start_date: new Date(dateTrx.start),
                end_date: new Date(dateTrx.end),
                type: 'outgoing',
            }) as any
        )
    };

    return (
        <FlatList<TransactionGroupByCategoryType | undefined>
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={isLoading ? Array.from({ length: 4 }) : categoriesTrx}
            keyExtractor={(item, index) =>
                isLoading ? index.toString() : item!.category_id
            }
            contentContainerStyle={{ gap: 10 }}
            renderItem={({ item }) =>
                isLoading ? (
                    <SkeletonCardCategoryOutput />
                ) :
                    (
                        <CardCategoryOutput
                            dateTrx={dateTrx}
                            key={item!.category_id}
                            account_id={item!.account_id}
                            id={item!.category_id}
                            title={item!.category_name}
                            money={`${item!.total_money_spent}`}
                            icon={item!.category_name}
                            color={Colors.tealLightKuvera}
                            status={item!.category_status}
                        />
                    )
            }
        />
    )
}
