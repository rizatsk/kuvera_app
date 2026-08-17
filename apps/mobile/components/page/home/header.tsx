
import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
import getGreeting from '@/helper/greeting'
import { useAppSelector } from '@/states'
import { AuthUserType } from '@/states/auth-user/type'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export default function HeaderHome() {
  const authUser: AuthUserType = useAppSelector((states) => states.authUser);
  const greeting = getGreeting('en');

  const handlePhotoProfile = () => {
    router.push({
      pathname: '/(private)/(tabs)/profile'
    })
  };

  return (
      <View style={styles.Header}>
        {/* User */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, width: "85%" }}>
          <TouchableOpacity 
            onPress={handlePhotoProfile}
            activeOpacity={0.6}
            style={{ backgroundColor: Colors.tealKuvera, height: 55, width: 55, alignItems: 'center', borderRadius: 10000, overflow: 'hidden' }} >
            <Image
              style={{ height: 55, width: 55 }}
              contentFit='contain'
              source={authUser.photo_profile_url} />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <CustomText style={{ fontWeight: 500, fontSize: 13, color: Colors.tealKuvera }}>{greeting}</CustomText>
            <CustomText
              numberOfLines={1}
              ellipsizeMode='tail'
              style={{ fontWeight: 600, fontSize: 17, color: Colors.tealKuvera, flexShrink: 1, textTransform: 'capitalize' }}>
              {authUser.name}
            </CustomText>
          </View>
        </View>
        <View style={{marginRight: 10}}>
          <Ionicons name="notifications-outline" size={22} color={Colors.tealKuvera} />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "white",
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginHorizontal: 12,
    borderRadius: 30,
    overflow: 'hidden'
  }
})