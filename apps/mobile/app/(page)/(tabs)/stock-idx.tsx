import CustomText from '@/components/custom-text';
import ListCardStockIdx from '@/components/page/stock-idx/card-stock-idx';
import SearchStock from '@/components/page/stock-idx/search-stock';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StockIdxScreen() {
  const [searchStock, setSearchStock] = useState("all");

  return (
    <SafeAreaView
      edges={['top']}
      style={{ backgroundColor: 'white', flex: 1 }}
    >
      <View style={{ paddingHorizontal: 18, paddingVertical: 10 }}>
        <CustomText
          style={{ fontWeight: 600, fontSize: 18, textAlign: "center" }}
        >
          Stock IDX
        </CustomText>
      </View>
      <SearchStock onSearch={setSearchStock} />
      <ListCardStockIdx keyword={searchStock} />
    </SafeAreaView>
  );
}
