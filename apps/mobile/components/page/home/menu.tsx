import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export default function HomeMenu() {
    const router = useRouter();

    const AddSpendingHandling = () => {
        router.push({
            pathname: "/(private)/add-transaction/form-add-spending"
        })
    }
    
    function AddIncomeHandling() {
        router.push({
            pathname: '/(private)/add-transaction/form-add-income'
        })
    }

    function AddCategoryHandling() {
        router.push({
            pathname: '/(private)/category/add-category'
        })
    }

    return (
        <View style={style.HomeMenu}>
            <TouchableOpacity activeOpacity={0.6} style={{ alignItems: 'center' }} onPress={() => AddSpendingHandling()}>
                <View style={style.squareIcon}>
                    <View style={{ position: "absolute", top: 5, left: 10 }}>
                        <FontAwesome name="plus-circle" size={16} color={Colors.tealKuvera} />
                    </View>
                    <Feather name="shopping-bag" size={24} color={Colors.tealKuvera} />
                </View>
                <CustomText style={style.title}>Spending</CustomText>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={{ alignItems: 'center' }} onPress={AddIncomeHandling}>
                <View style={style.squareIcon}>
                    <View style={{ position: "absolute", top: 5, left: 4 }}>
                        <FontAwesome name="plus-circle" size={16} color={Colors.tealKuvera} />
                    </View>
                    <Ionicons name="wallet-outline" size={28} color={Colors.tealKuvera} />
                </View>
                <CustomText style={style.title}>Income</CustomText>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={{ alignItems: 'center' }} onPress={AddCategoryHandling}>
                <View style={style.squareIcon}>
                    <View style={{ position: "absolute", top: 5, left: 5 }}>
                        <FontAwesome name="plus-circle" size={16} color={Colors.tealKuvera} />
                    </View>
                    <FontAwesome6 name="credit-card" size={24} color={Colors.tealKuvera} />
                </View>
                <CustomText style={style.title}>Category</CustomText>
            </TouchableOpacity>
        </View>
    )
};

const style = StyleSheet.create({
    HomeMenu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center', 
        marginTop: 20, 
        gap: 35, 
        paddingVertical: 10
    },
    title: {
        fontWeight: 600, 
        color: "white", 
        fontSize: 13
    },
    squareIcon: {
        width: 50, height: 50, 
        backgroundColor: "white",
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: "static"
    }
})
