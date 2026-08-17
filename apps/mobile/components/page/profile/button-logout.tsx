import CustomText from '@/components/custom-text';
import ModalKuvera from '@/components/modal-bottom';
import { Colors } from '@/constants/theme';
import { asyncUnsetAuth } from '@/states/auth-user/action';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function ButtonLogout() {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogout = async () => {
    dispatch(asyncUnsetAuth() as any)
  }
  return (
    <>
      <TouchableOpacity style={styles.buttonLogout} activeOpacity={0.6} onPress={() => setIsModalVisible(true)}>
        <CustomText style={{ fontSize: 16, fontWeight: 600, color: Colors.tealKuvera }}>Log out</CustomText>
      </TouchableOpacity>
      <ModalKuvera
        title="Log Out"
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      >
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Image
            style={{ height: 110, width: 110 }}
            contentFit='fill'
            source={require("@/assets/images/icon/log out.webp")} />
        </View>
        <CustomText style={{ textAlign: 'center', fontSize: 17, fontWeight: 600, marginTop: 20 }}>Are you sure want to log out ?</CustomText>
        <CustomText style={{ textAlign: 'center', fontSize: 16, marginTop: 10 }}>You'll need to log in again to track your spending, and you can access your account whenever you want.</CustomText>
        <TouchableOpacity style={styles.buttonBack} activeOpacity={0.6} onPress={() => setIsModalVisible(false)}>
          <CustomText style={{ fontSize: 16, fontWeight: 600, color: Colors.tealKuvera }}>Close</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStayLogOut} activeOpacity={0.6} onPress={handleLogout}>
          <CustomText style={{ fontSize: 16, fontWeight: 600, color: "white" }}>Log Out of Kuvera</CustomText>
        </TouchableOpacity>
      </ModalKuvera>
    </>
  )
}

const styles = StyleSheet.create({
  buttonLogout: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: Colors.tealKuvera,
    borderWidth: 2,
    alignItems: 'center',
    marginHorizontal: 14,
    marginTop: 40,
    borderRadius: 5,
    paddingVertical: 8,
  },
  buttonBack: {
    backgroundColor: 'white',
    borderColor: Colors.tealKuvera,
    borderWidth: 2,
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 5,
    paddingVertical: 10,
  },
  buttonStayLogOut: {
    backgroundColor: Colors.tealKuvera,
    borderColor: Colors.greyBackground2,
    borderWidth: 2,
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 5,
    paddingVertical: 10,
  },
})
