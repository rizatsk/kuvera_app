import CustomText from '@/components/custom-text';
import { TextInput } from '@/components/input/text-input/text-input';
import { Colors } from '@/constants/theme';
import { useAppSelector } from '@/states';
import { asyncUpdateProfileUser } from '@/states/auth-user/action';
import { AuthUserType } from '@/states/auth-user/type';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function UpdateProfilePage() {
    const authUser: AuthUserType = useAppSelector((states) => states.authUser);
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    useEffect(() => {
        setName(authUser.name)
    }, [authUser.name])

    const handleSubmit = () => {
        dispatch(
            asyncUpdateProfileUser({
                param: {
                    name: name,
                },
                successHandler: () => {
                    router.back();
                    ToastAndroid.show('Success update profile', 500)
                }
            }) as any
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 20 }}>
            <CustomText>Please update your profile information so we can provide a
                more personalized and seamless experience. Once you save the changes.
            </CustomText>
            <View style={{ marginTop: 20 }}>
                <TextInput
                    label='Full Name'
                    value={name}
                    accessible={true}
                    onChangeText={setName}
                    errorMessage={""}
                />
                <TouchableOpacity activeOpacity={0.6} style={style.button_lanjut} onPress={handleSubmit}>
                    <CustomText style={{ fontWeight: 600, color: "white", fontSize: 16 }}>Save Profile</CustomText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    button_lanjut: {
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: Colors.tealKuvera,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    }
});