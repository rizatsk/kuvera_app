import CustomText from '@/components/custom-text';
import { Colors } from '@/constants/theme';
import { formatRupiah } from '@/helper/format-rupiah';
import totalByType from '@/helper/totalByType';
import { GetTransactionType } from '@/service/transaction/type';
import { asyncGetTransactions } from '@/states/transaction/action';
import { TypeTransaction } from '@/states/transaction/type';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import CardTransaction from './card-transaction';
import NoHaveTransaction from './no-have-transaction';
import SkeletonCardTransaction from './skeleton';

type ListCardTransactionsParam = {
  type: TypeTransaction
  start_date: Date
  end_date: Date
}

export default function ListCardTransactions(param: ListCardTransactionsParam) {
  const dispatch = useDispatch();

  const [totalSaldo, setTotalSaldo] = useState({
    in: 0,
    out: 0
  });
  const [listRecentTransactions, setListRecentTransactions] = useState<GetTransactionType[]>([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRecentTransactions()
  }, [param.type, param.start_date])

  useEffect(() => {
    if (listRecentTransactions.length > 0) {
      const { totalIn, totalOut } = totalByType(listRecentTransactions)
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
  }, [listRecentTransactions])

  function getRecentTransactions() {
    dispatch(
      asyncGetTransactions({
        param: {
          type: param.type,
          start_date: param.start_date,
          end_date: param.end_date,
        },
        setIsLoading,
        successHandler: (result) => {
          setListRecentTransactions(result);
        }
      }) as any
    );
  };

  return (
    <>
      <View style={styles.monthTrxContainer}>
        <CustomText style={{ fontWeight: 500, fontSize: 15 }}>Total</CustomText>
        <View>
          <CustomText style={styles.textSaldo}>Saldo in: {formatRupiah(totalSaldo.in)}</CustomText>
          <CustomText style={styles.textSaldo}>Saldo out: {formatRupiah(totalSaldo.out)}</CustomText>
        </View>
      </View>
      <FlatList<GetTransactionType | undefined>
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getRecentTransactions} />}
        data={isLoading ? Array.from({ length: 10 }) : listRecentTransactions}
        keyExtractor={(item, index) =>
          isLoading ? index.toString() : item!.id
        }
        contentContainerStyle={{ gap: 2, marginHorizontal: 18 }}
        renderItem={({ item, index }) =>
          isLoading ?
            <SkeletonCardTransaction /> :
            (
              <CardTransaction
                key={item!.id}
                index={index}
                id={item!.id}
                category_id={item!.category_id}
                category_name={item!.category_name}
                notes={item!.notes}
                amount={item!.money_spent}
                created_dt={item!.created_dt}
                type={item!.type}
              />
            )
        }
        ListEmptyComponent={<NoHaveTransaction />}
      />
    </>
  )
}

const styles = StyleSheet.create({
  monthTrxContainer: {
    backgroundColor: Colors.white[200],
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textSaldo: {
    fontSize: 12,
  },
});