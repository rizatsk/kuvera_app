import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
import { formatRupiah } from '@/helper/format-rupiah'
import { formatDateTimeVerbose } from '@/helper/formate-date-time'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SuccessScreen() {
    const params = useLocalSearchParams();
    const stringSuccess = params.type === 'incoming' ? 'Income' : 'Spent';

    const handleButtonBack = () => {
        const path = params.type === 'incoming' ? 'income' : 'spending';
        router.replace({
            pathname: `/(private)/add-transaction/form-add-${path}`
        });
    }

    const handleButtonAllTransaction = () => {
        router.dismissAll();
        router.replace({
            pathname: '/(private)/(tabs)/transaction'
        })
    }


    return (
        <SafeAreaView
            edges={['top']}
            style={{ flex: 1, backgroundColor: "white" }}
        >
            <View style={{ marginHorizontal: 20, paddingHorizontal: 5 }}>
                {/* Header */}
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('@/assets/images/spending.png')}
                        style={{ width: 100, height: 100 }}
                        contentFit="fill" />
                    <CustomText style={{ fontWeight: 600, fontSize: 18, marginVertical: 10 }}>Save {stringSuccess}</CustomText>
                </View>
                {/* Detail */}
                <View style={{ marginTop: 10 }}>
                    <View style={styles.containerListData}>
                        <CustomText>Category :</CustomText>
                        <CustomText style={styles.dataText}>{params.category_name}</CustomText>
                    </View>
                    <View style={styles.containerListData}>
                        <CustomText>Money spent :</CustomText>
                        <CustomText style={styles.dataText}>{formatRupiah(params.money_spent as string)}</CustomText>
                    </View>
                    <View style={styles.containerListData}>
                        <CustomText>Notes :</CustomText>
                        <CustomText style={styles.dataText}>{params.notes}</CustomText>
                    </View>
                    <View style={styles.containerListData}>
                        <CustomText>Time :</CustomText>
                        <CustomText style={styles.dataText}>{formatDateTimeVerbose(params.created_dt as string)}</CustomText>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 35, gap: 10 }}>
                        <CustomText>ID Transaction</CustomText>
                        <CustomText style={{ fontSize: 15, fontWeight: 600 }}>{params.id}</CustomText>
                    </View>
                </View>

                {/* Button */}
                <TouchableOpacity style={styles.buttonBack} activeOpacity={0.6} onPress={handleButtonBack}>
                    <CustomText style={{ fontSize: 15, fontWeight: 600, color: Colors.tealKuvera }}>Back Add {stringSuccess}</CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStayLogOut} activeOpacity={0.6} onPress={handleButtonAllTransaction}>
                    <CustomText style={{ fontSize: 15, fontWeight: 600, color: "white" }}>All Transactions</CustomText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    containerListData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        flexWrap: 'wrap',
        gap: 10,
    },
    dataText: {
        fontSize: 15,
        fontWeight: 600,
        width: '65%',
        textAlign: 'right',
        textTransform: 'capitalize',
    },
    buttonBack: {
        backgroundColor: 'white',
        borderColor: Colors.tealKuvera,
        borderWidth: 2,
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 5,
        paddingVertical: 8,
    },
    buttonStayLogOut: {
        backgroundColor: Colors.tealKuvera,
        borderColor: Colors.greyBackground2,
        borderWidth: 2,
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 5,
        paddingVertical: 8,
    },
})
