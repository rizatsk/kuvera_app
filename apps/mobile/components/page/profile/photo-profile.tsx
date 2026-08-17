import CustomText from '@/components/custom-text'
import { modalStyles } from '@/components/input/radio-input/style'
import ModalKuvera from '@/components/modal-bottom'
import { Colors } from '@/constants/theme'
import pickCameraImage from '@/helper/get-pictures/pick-camera-image'
import pickImage from '@/helper/get-pictures/pick-image'
import { useAppSelector } from '@/states'
import { asyncUpdateProfileUser } from '@/states/auth-user/action'
import { AuthUserType } from '@/states/auth-user/type'
import { Feather, Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useState } from 'react'
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'

export default function PhotoProfile() {
    const authUser: AuthUserType = useAppSelector((states) => states.authUser);
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const selectOptions = [
        { key: 'open-camera', value: 'Open Camera' },
        { key: 'open-galery', value: 'Open Galery' },
    ];

    useEffect(() => {
        const retrivePending = async () => {
            await ImagePicker.getPendingResultAsync();
        };

        retrivePending();
    }, [])

    const handleSubmit = async (option: { key: string, value: string }) => {
        let resultImage = null;
        if (option.key === 'open-galery') {
            resultImage = await pickImage();
        } else {
            resultImage = await pickCameraImage();
        }

        if (resultImage) {
            console.log('Result image', resultImage);    
            dispatch(
                asyncUpdateProfileUser({
                    param: {
                        photo_profile: {
                            name: resultImage?.fileName as string,
                            uri: resultImage?.uri,
                            type: resultImage?.mimeType as string
                        },
                    },
                    successHandler: () => {
                        ToastAndroid.show('Success update photo profile', 500)
                    }
                }) as any
            )
        }

        setIsModalVisible(false);
    }

    return (
        <>
            <View style={{ marginHorizontal: 18, marginTop: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                    <TouchableOpacity
                        testID='change-photo-button'
                        onPress={() => setIsModalVisible(true)}
                        activeOpacity={0.6}
                        style={styles.containerAvatar} >
                        <Image
                            testID='profile-photo'
                            style={{ height: 65, width: 65, borderRadius: 1000, overflow: 'hidden' }}
                            contentFit='contain'
                            source={authUser.photo_profile_url} />
                        <View style={styles.containerEdit}>
                            <Feather name="edit-3" size={20} color="grey" />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <CustomText style={{ fontWeight: 600, fontSize: 19, textTransform: 'capitalize' }}>{authUser.name}</CustomText>
                        <CustomText style={{ fontSize: 16, fontWeight: 500 }}>{authUser.email}</CustomText>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <View style={styles.iconNotif}>
                        <Ionicons name="notifications" size={22} color={Colors.tealKuvera} />
                    </View>
                </View>
            </View>
            <ModalKuvera
                testID='modal-change-profile-photo'
                title={'Change Photo Profile'}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            >
                <View style={modalStyles.optionsContainer}>
                    {selectOptions.map((option) => (
                        <TouchableOpacity
                            testID={`button-${option.key}`}
                            activeOpacity={0.6}
                            key={option.key}
                            style={modalStyles.optionItem}
                            onPress={() => handleSubmit(option)}
                        >
                            <CustomText style={modalStyles.optionLabel}>{option.value}</CustomText>
                        </TouchableOpacity>
                    ))}
                </View>
            </ModalKuvera>
        </>
    )
}


const styles = StyleSheet.create({
    iconNotif: {
        backgroundColor: Colors.whiteTransaparent,
        borderRadius: 10,
        width: 32, height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.tealKuvera
    },
    containerAvatar: {
        backgroundColor: "white",
        height: 70,
        width: 70,
        alignItems: 'center',
        borderRadius: 10000,
        borderColor: Colors.tealKuvera,
        borderWidth: 3,
    },
    containerEdit: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 25,
        height: 25,
        borderWidth: 4,
        borderColor: Colors.greyBackground,
        backgroundColor: Colors.greyBackground2,
        borderRadius: 10000,
        justifyContent: 'center',
        alignItems: 'center'
    }
})