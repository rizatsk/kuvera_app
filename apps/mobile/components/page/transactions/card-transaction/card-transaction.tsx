import CustomText from '@/components/custom-text';
import { Colors } from '@/constants/theme';
import { formatRupiah } from '@/helper/format-rupiah';
import { formatDateTimeVerbose } from '@/helper/formate-date-time';
import { TypeTransaction } from '@/states/transaction/type';
import { Entypo, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type CardTransactionParam = {
    index: number
    id: string
    amount: number
    notes: string
    type: TypeTransaction
    created_dt: string
    category_id: string
    category_name: string
}

export default function CardTransaction(param: CardTransactionParam) {
    const IconComponent = () => {
        if (param.type === 'incoming') {
            return (
                <View style={[styles.containerIcon, { backgroundColor: Colors.tealLightKuvera }]}>
                    <Image
                        style={{ height: 24, width: 24 }}
                        contentFit='contain'
                        source={require("@/assets/images/icon/money-bag-plus.png")} />
                </View>
            )
        } else {
            const colorCard = "white"
            switch (param.category_name) {
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
        }
    }

    const handleButton = () => {
        router.push({
            pathname: '/(private)/detail-transaction',
            params: {
                id: param.id,
                category_id: param.category_id,
                category_name: param.category_name,
                notes: param.notes,
                money_spent: param.amount,
                created_dt: param.created_dt,
                type: param.type
            }
        })
    }

    const bgColorIcon = param.index % 2 == 1 ? Colors.orangeKuvera : Colors.tealLightKuvera;

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleButton}
            style={styles.dataTransactionContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                {/* Icon */}
                <View style={[styles.containerIcon, { backgroundColor: bgColorIcon }]}>
                    <IconComponent />
                </View>
                {/* Title */}
                <View>
                    <CustomText style={{ fontSize: 14, fontWeight: 500, textTransform: 'capitalize' }}>{param.notes}</CustomText>
                    <CustomText style={{ fontSize: 12 }}>{formatDateTimeVerbose(param.created_dt)}</CustomText>
                </View>
            </View>
            {/* Money */}
            {param.type === 'incoming' ? (
                <CustomText style={{ fontWeight: 600, color: Colors.greenKuvera }}>+{formatRupiah(param.amount)}</CustomText>
            ) : (
                <CustomText style={{ fontWeight: 600 }}>-{formatRupiah(param.amount)}</CustomText>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerIcon: {
        borderRadius: 1000,
        width: 38,
        height: 38,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dataTransactionContainer: {
        backgroundColor: "white",
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});