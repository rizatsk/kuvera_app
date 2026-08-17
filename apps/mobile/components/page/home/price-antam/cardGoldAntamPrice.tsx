import CustomText from "@/components/custom-text"
import { Colors } from "@/constants/theme"
import { Image } from "expo-image"
import { StyleSheet, View } from "react-native"

type ListCardGoldAntamPriceProps = {
    weight: string
    price_buy: string
    price_buyback: string
}

export default function CardGoldAntamPrice({ weight, price_buy, price_buyback }: ListCardGoldAntamPriceProps) {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <View style={styles.containerIcon}>
                    <Image
                        source={require(`@/assets/images/icon/gold.png`)}
                        style={{ height: 35, width: 35 }}
                        contentFit='contain'
                    />
                </View>
                <View>
                    <CustomText style={{ fontWeight: 500, fontSize: 15 }}>{weight} gram</CustomText>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <CustomText style={{ fontSize: 11 }}>Buy:</CustomText>
                        <CustomText style={{ fontWeight: 500, paddingRight: 8 }}>Rp. {price_buy}</CustomText>
                    </View>
                </View>
            </View>
            <View>
                <CustomText style={{ fontSize: 11 }}>Buy Back:</CustomText>
                <CustomText style={{ fontWeight: 500, paddingRight: 8, fontSize: 15, color: Colors.moneyGreenKuvera }}>Rp. {price_buyback}</CustomText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerIcon: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
        backgroundColor: Colors.goldCOlor + 40,
        // borderColor: Colors.goldCOlor,
        // borderWidth: 2,
    }
})