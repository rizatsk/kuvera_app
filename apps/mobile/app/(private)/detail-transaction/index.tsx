import CustomText from '@/components/custom-text';
import ButtonDeleteTransaction from '@/components/page/detail-transaction/button-delete';
import { Colors } from '@/constants/theme';
import { formatRupiah } from '@/helper/format-rupiah';
import { formatDateTimeVerbose } from '@/helper/formate-date-time';
import { Entypo, Feather, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function DetailTransaction() {
    const { id, category_id, category_name, notes, money_spent, created_dt, type } = useLocalSearchParams();

    const colorCard = Colors.tealLightKuvera;
    const IconComponent = () => {
        switch (category_name) {
            case 'internet':
                return <MaterialCommunityIcons name="cable-data" size={80} color={colorCard} />
            case 'service':
                return <FontAwesome5 name={'tools'} size={65} color={colorCard} />
            case 'monthly':
                return <Entypo name="wallet" size={80} color={colorCard} />
            case 'food and drink':
                return <Ionicons name="fast-food-sharp" size={80} color={colorCard} />
            default:
                return <Fontisto name="credit-card" size={50} color={colorCard} />
        }
    };

    const strType = type === 'incoming' ? 'Incoming Balance' : 'Outgoing Balance';

    const handleButtonDetail = () => {
        router.push({
            pathname: '/(private)/edit/edit-data-transaction',
            params: {
                id, category_id, category_name, notes, money_spent, created_dt, type
            }
        })
    }

    return (
        <View
            style={{ flex: 1, backgroundColor: "white" }}
        >
            <View>
                {/* Header */}
                <View style={{ backgroundColor: Colors.tealLightKuvera + 20, paddingVertical: 10 }}>

                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <IconComponent />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 20, gap: 10 }}>
                        <CustomText>ID Transaction</CustomText>
                        <CustomText style={{ fontSize: 15, fontWeight: 600 }}>{id}</CustomText>
                    </View>
                </View>
                {/* Detail */}
                <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                    <View style={styles.containerListData}>
                        <CustomText>Type :</CustomText>
                        <CustomText style={styles.dataText}>{strType}</CustomText>
                    </View>
                    <View style={styles.containerListData}>
                        <CustomText>Notes :</CustomText>
                        <CustomText style={styles.dataText}>{notes}</CustomText>
                    </View>
                    <View style={styles.containerListData}>
                        <CustomText>Money spent :</CustomText>
                        <CustomText style={styles.dataText}>{formatRupiah(money_spent as string)}</CustomText>
                    </View>
                    <View style={styles.containerListData}>
                        <CustomText>Category :</CustomText>
                        <CustomText style={styles.dataText}>{category_name}</CustomText>
                    </View>
                    <View style={styles.containerListData}>
                        <CustomText>Time :</CustomText>
                        <CustomText style={styles.dataText}>{formatDateTimeVerbose(created_dt as string)}</CustomText>
                    </View>
                </View>

                {/* Button */}
                <View style={{ paddingHorizontal: 20 }}>
                    <TouchableOpacity style={styles.buttonEdit} activeOpacity={0.6} onPress={handleButtonDetail} >
                        <Feather name="edit" size={20} color="white" />
                        <CustomText style={{ fontSize: 15, fontWeight: 600, color: "white" }}>Edit Data</CustomText>
                    </TouchableOpacity>
                    <ButtonDeleteTransaction id={id as string} />
                </View>
            </View>
        </View>
    );
}

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
    buttonEdit: {
        backgroundColor: Colors.tealKuvera,
        borderColor: Colors.greyBackground2,
        borderWidth: 2,
        alignItems: 'center',
        marginTop: 35,
        borderRadius: 5,
        paddingVertical: 8,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center'
    },
})
