import CustomText from "@/components/custom-text";
import ListCardTransactions from "@/components/page/transactions/card-transaction/list-card-transaction";
import ModalDateTransactions from "@/components/page/transactions/date-transaction/modal-date-transaction";
import { DateTrx } from "@/components/page/transactions/date-transaction/type";
import ModalTypeTransaction from "@/components/page/transactions/type-transaction/modal-type-transaction";
import { Colors } from "@/constants/theme";
import { TypeTransaction } from "@/states/transaction/type";
import moment from "moment";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionScreen() {
  const [dateTrx, setDateTrx] = useState<DateTrx>({ 
    start: moment().subtract(30, 'days').format('YYYY-MM-DD') + ' 00:00:00', 
    end: moment().format('YYYY-MM-DD') + ' 23:59:59', 
    keyString: '30lastday' 
  })
  const onSelectDate = (dataDateTrx: DateTrx) => {
    setDateTrx(dataDateTrx);
  };

  const [typeTransaction, setTypeTransaction] = useState({ key: 'all', value: 'All Transaction' });
  const selectOptionsTypeTransaction = [
    { key: 'all', value: 'All Transaction' },
    { key: 'incoming', value: 'Incoming Balance' },
    { key: 'outgoing', value: 'Outgoing Balance' }
  ];
  const onSelectTypeTransaction = ({ key, value }: { key: string, value: string }) => {
    setTypeTransaction({ key, value })
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={{ backgroundColor: 'white', flex: 1 }}
    >
      <View style={{ paddingHorizontal: 18, paddingVertical: 10 }}>
        <CustomText
          style={{ fontWeight: 600, fontSize: 18, textAlign: "center" }}
        >
          Transactions
        </CustomText>
      </View>
      <View style={styles.datePickerContainer}>
        <ModalDateTransactions
          titleStyle={{ color: "blac", fontWeight: 400, fontSize: 14 }}
          label="Select Date"
          value={dateTrx}
          onSelectDate={onSelectDate}
        />
        <View style={{ width: 2, height: "100%", backgroundColor: Colors.grey[50], }} />
        <ModalTypeTransaction
          value={typeTransaction}
          label="Type Transaction"
          selectOptions={selectOptionsTypeTransaction}
          onSelect={onSelectTypeTransaction}
        />
      </View>
      <ListCardTransactions
        type={typeTransaction.key as TypeTransaction}
        start_date={new Date(dateTrx.start)}
        end_date={new Date(dateTrx.end as string)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.grey[50]
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
    fontSize: 12,
  },
  dataTransactionContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
