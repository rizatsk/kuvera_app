import CustomText from '@/components/custom-text';
import ListCardRecent from '@/components/page/home/card-recent.tsx/listCardRecent';
import ListCategoriesSpend from '@/components/page/home/categories-spend/listCategoriesSpend';
import HeaderHome from '@/components/page/home/header';
import ListCardGoldAntamPrice from '@/components/page/home/price-antam/listCardGoldAntamPrice';
import InvestAccountValue from '@/components/page/home/spent-account-value';
import { useAppSelector } from '@/states';
import { actionHomeRefresh } from '@/states/home-refresh/action';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

export default function HomeScreen() {
  const homeRefresh = useAppSelector((states) => states.homeRefresh);
  const dispatch = useDispatch();

  const fetchRefreshing = () => {
    dispatch(
      actionHomeRefresh() as any
    )
  }

  const handleAllCategory = () => {
    router.push({
      pathname: '/(private)/category/all-category'
    })
  };

  const handleAllPriceGold = () => {
    router.push({
      pathname: '/(private)/price-gold'
    })
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        flex: 1,
      }}
    >
      <HeaderHome />
      <ScrollView
        style={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={homeRefresh} onRefresh={fetchRefreshing} />}
      >
        {/* Invest Account value */}
        <InvestAccountValue />
        {/* Category Output */}
        <View style={{ flex: 1, marginTop: 10, marginHorizontal: 10, backgroundColor: "white", borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
            <CustomText style={{ fontWeight: 600, fontSize: 16 }}>Expen Category</CustomText>
            <Entypo name="chevron-right" size={24} color="black" onPress={handleAllCategory}/>
          </View>
          <ListCategoriesSpend />
        </View>

        {/* Price gold antam */}
        <View style={{ flex: 1, marginTop: 10, backgroundColor: "white", borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10 }}>
          <View style={{ paddingHorizontal: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
              <CustomText style={{ fontWeight: 600, fontSize: 16 }}>Price Antam Today</CustomText>
              <Entypo name="chevron-right" size={24} color="black" onPress={handleAllPriceGold}/>
            </View>
            <ListCardGoldAntamPrice />
          </View>
        </View>

        {/* Recent */}
        <View style={{ flex: 1, marginTop: 10, backgroundColor: "white", borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10 }}>
          <ListCardRecent />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}