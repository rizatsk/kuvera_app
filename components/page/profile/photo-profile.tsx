import CustomText from '@/components/custom-text'
import { modalStyles } from '@/components/input/radio-input/style'
import ModalKuvera from '@/components/modal-bottom'
import { Colors } from '@/constants/theme'
import manipulateImageToWebP from '@/helper/manipulateImage'
import { useAppSelector } from '@/states'
import { asyncUpdateProfileUser } from '@/states/auth-user/action'
import { AuthUserType } from '@/states/auth-user/type'
import { Feather, Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import ImageCropPicker from "react-native-image-crop-picker"
import { useDispatch } from 'react-redux'

export default function PhotoProfile() {
    const authUser: AuthUserType = useAppSelector((states) => states.authUser);
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const selectOptions = [
        { key: 'open-camera', value: 'Open Kamera' },
        { key: 'open-galery', value: 'Open Galery' },
    ];

    useEffect(() => {
        const retrivePending = async () => {
            await ImagePicker.getPendingResultAsync();
        };

        retrivePending();
    }, [])

    const handleSubmit = async (option: { key: string, value: string }) => {
        if (option.key === 'open-galery') {
            await pickImage();
        } else {
            await pickCameraImage();
        }

        setIsModalVisible(false);
    }

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'Permission to access the media library is required.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
            base64: false,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            const resultCrop = await ImageCropPicker.openCropper({
                path: asset.uri,
                mediaType: 'photo',
                cropperCircleOverlay: true,
                cropping: true,
                showCropGuidelines: false,
                width: 300,
                height: 300,
            });
            const manipulatedImage = await manipulateImageToWebP(resultCrop.path);

            dispatch(
                asyncUpdateProfileUser({
                    param: {
                        photo_profile: {
                            name: asset.fileName as string,
                            uri: manipulatedImage.uri,
                            type: asset.mimeType as string
                        },
                    },
                    successHandler: () => {
                        ToastAndroid.show('Success update photo profile', 500)
                    }
                }) as any
            )
        }
    }

    const pickCameraImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const permissionCameraResult = await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted || !permissionCameraResult.granted) {
            Alert.alert('Permission required', 'Permission to access the media library and camera is required.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            const resultCrop = await ImageCropPicker.openCropper({
                path: asset.uri,
                mediaType: 'photo',
                cropperCircleOverlay: true,
                cropping: true,
                showCropGuidelines: false,
                width: 300,
                height: 300,
            });
            const manipulatedImage = await manipulateImageToWebP(resultCrop.path);

            dispatch(
                asyncUpdateProfileUser({
                    param: {
                        photo_profile: {
                            name: asset.fileName as string,
                            uri: manipulatedImage.uri,
                            type: asset.mimeType as string
                        },
                    },
                    successHandler: () => {
                        ToastAndroid.show('Success update photo profile', 500)
                    }
                }) as any
            )
        }
    }



    return (
        <>
            <View style={{ marginHorizontal: 18, marginTop: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => setIsModalVisible(true)}
                        activeOpacity={0.6}
                        style={styles.containerAvatar} >
                        <Image
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
                title={'Change Photo Profile'}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            >
                <View style={modalStyles.optionsContainer}>
                    {selectOptions.map((option) => (
                        <TouchableOpacity
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