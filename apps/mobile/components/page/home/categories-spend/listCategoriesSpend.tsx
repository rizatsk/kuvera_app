import CardAddCategory from '@/app/(page)/category/card-add-category';
import { Colors } from '@/constants/theme';
import { TransactionGroupByCategoryType } from '@/service/transaction/type';
import { useAppSelector } from '@/states';
import { asyncGetTransactionByCategory } from '@/states/transaction/action';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import CardCategoryOutput from './cardCategorySpend';
import SkeletonCardCategoryOutput from './skeleton';

export default function ListCategoriesSpend() {
    const isLogin = useAppSelector((states) => states.isLogin);
    const homeRefresh = useAppSelector((states) => states.homeRefresh);
    const { isLoading, transactions } = useAppSelector((states) => states.sumTransactionByCategory);

    const [categoriesTrx, setCategoriesTrx] = useState<TransactionGroupByCategoryType[]>([]);
    const dispatch = useDispatch();
    const dateTrx = {
        start: moment().format('YYYY-MM') + '-01 00:00:00',
        end: moment().format('YYYY-MM-DD') + ' 23:59:59',
        keyString: 'ThisMonth'
    }

    useEffect(() => {
        getTransactionByCategory();
    }, [isLogin]);

    useEffect(() => {
        if (homeRefresh) {
            getTransactionByCategory();
        }
    }, [homeRefresh]);

    useEffect(() => {
        if (transactions.length > 0 && !isLoading && isLogin) {
            const trxActive = transactions.filter((trx) => trx.category_status === true)
            setCategoriesTrx(trxActive)
        } else if (!isLogin) {
            setCategoriesTrx([]);
        }
    }, [transactions, isLogin])

    const getTransactionByCategory = () => {
        if (isLogin)
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
            ListEmptyComponent={<CardAddCategory />}
        />
    )
}
