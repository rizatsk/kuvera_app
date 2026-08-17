import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
import { formatRupiah } from '@/helper/format-rupiah'
import { formatDateTimeVerbose } from '@/helper/formate-date-time'
import { Entypo, FontAwesome5, Fontisto, Ionicons } from '@expo/vector-icons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

type CardRecentType = {
    index: number
    icon: string
    id: string
    category_id: string
    category_name: string
    title: string
    date: string
    amount: number
    type: string
}

export default function CardRecent({
    index, id, category_id, title, date, amount, category_name, type
}: CardRecentType) {
    const IconComponent = () => {
        const colorCard = "white"
        switch (category_name) {
            case 'internet':
                return <MaterialCommunityIcons name="cable-data" size={25} color={colorCard} />
            case 'service':
                return <FontAwesome5 name={'tools'} size={24} color={colorCard} />
            case 'monthly':
                return <Entypo name="wallet" size={24} color={colorCard} />
            case 'food and drink':
                return <Ionicons name="fast-food-sharp" size={24} color={colorCard} />
            default:
                return <Fontisto name="credit-card" size={16} color={colorCard} />
        }
    };

    const handleButton = () => {
        router.push({
            pathname: '/(private)/detail-transaction',
            params: {
                id: id,
                category_id: category_id,
                category_name: category_name,
                notes: title,
                money_spent: amount,
                created_dt: date,
                type: type
            }
        })
    }

    const bgColorIcon = index % 2 == 1 ? Colors.orangeKuvera : Colors.tealLightKuvera;

    return (
        <TouchableOpacity
            onPress={handleButton}
            activeOpacity={0.6}
            style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5, alignItems: 'center' }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <View style={[styles.containerIcon, { backgroundColor: bgColorIcon }]}>
                    <IconComponent />
                </View>
                <View>
                    <CustomText style={{ fontWeight: 500, fontSize: 14, textTransform: 'capitalize' }}>{title}</CustomText>
                    <CustomText style={{ fontSize: 12 }}>{formatDateTimeVerbose(date)}</CustomText>
                </View>
            </View>
            <CustomText style={{ fontWeight: 500, paddingRight: 8 }}>{formatRupiah(amount)}</CustomText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerIcon: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10000,
        backgroundColor: Colors.orangeKuvera,
    }
})