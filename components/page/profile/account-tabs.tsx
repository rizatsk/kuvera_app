import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export default function AccountTabsCard() {
    const handleEditProfile = () => {
        router.push({
            pathname: '/(private)/update-profile',
        })
    }

    return (
        <View style={{ marginHorizontal: 18, marginTop: 35 }}>
            <CustomText style={{ fontSize: 16, fontWeight: 600 }}>Account</CustomText>
            <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
                <TouchableOpacity
                    onPress={handleEditProfile}
                    activeOpacity={0.6}
                    style={styles.cardContainer}>
                    <View style={styles.cardIcon}>
                        <FontAwesome6 name="user" size={20} color="black" />
                        <CustomText style={styles.title}>Edit Profile</CustomText>
                    </View>
                    <FontAwesome6 name="angle-right" size={20} color="black" />
                </TouchableOpacity>
                {/* <View style={styles.cardContainer}>
                    <View style={styles.cardIcon}>
                        <FontAwesome name="language" size={20} color="black" />
                        <CustomText style={styles.title}>Language</CustomText>
                    </View>
                    <FontAwesome6 name="angle-right" size={20} color="black" />
                </View> */}
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
