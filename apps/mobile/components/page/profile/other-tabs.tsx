import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Octicons from '@expo/vector-icons/Octicons'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export default function OtherTabs() {
    const handlePrivacyPolic = () => {
        router.push({
            pathname: '/(private)/privacy-polic'
        })
    };

    const handleTermsOfService = () => {
        router.push({
            pathname: '/(private)/terms-of-service'
        })
    }

    return (
        <View style={{ marginHorizontal: 18, marginTop: 25 }}>
            <CustomText style={{ fontSize: 16, fontWeight: 600 }}>Other</CustomText>
            <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={handleTermsOfService}
                    style={styles.cardContainer}>
                    <View style={styles.cardIcon}>
                        <Octicons name="checklist" size={20} color="black" />
                        <CustomText style={styles.title}>Terms of service</CustomText>
                    </View>
                    <FontAwesome6 name="angle-right" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={handlePrivacyPolic}
                    style={styles.cardContainer}>
                    <View style={styles.cardIcon}>
                        <MaterialIcons name="local-police" size={20} color="black" />
                        <CustomText style={styles.title}>Privacy polic</CustomText>
                    </View>
                    <FontAwesome6 name="angle-right" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingVertical: 20, 
        borderBottomColor: Colors.grey[400], 
        borderBottomWidth: 0.5
    },
    cardIcon: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 20 
    },
    title: { 
        fontSize: 16, 
        fontWeight: 400 
    }
})
