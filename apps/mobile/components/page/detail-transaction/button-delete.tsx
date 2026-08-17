import CustomText from '@/components/custom-text';
import ModalKuvera from '@/components/modal-bottom';
import { Colors } from '@/constants/theme';
import { asyncDeleteTransaction } from '@/states/transaction/action';
import { Entypo } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

type ButtonDeleteTransactionProps = {
    id: string;
}

export default function ButtonDeleteTransaction({ id }: ButtonDeleteTransactionProps) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteButton = () => {
        setIsModalVisible(false);
        dispatch(asyncDeleteTransaction({
            idTransaction: id,
            successHandler: () => {
                router.push({
                    pathname: '/(private)/(tabs)/transaction',
                });
                ToastAndroid.show('Success delete transaction', 500)
            }
        }) as any);
    };

    return (
        <>
            <TouchableOpacity style={styles.buttonDelete} activeOpacity={0.6} onPress={() => setIsModalVisible(true)}>
                <Entypo name="trash" size={20} color={Colors.tealKuvera} />
                <CustomText style={{ fontSize: 15, fontWeight: 600, color: Colors.tealKuvera }}>Delete Data</CustomText>
            </TouchableOpacity>
            <ModalKuvera
                title="Delete"
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            >
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Image
                        style={{ height: 110, width: 110 }}
                        contentFit='fill'
                        source={require("@/assets/images/icon/delete-data.png")} />
                </View>
                <CustomText style={{ textAlign: 'center', fontSize: 17, fontWeight: 600, marginTop: 20 }}>Confirmation deleted</CustomText>
                <CustomText style={{ textAlign: 'center', fontSize: 16, marginTop: 10 }}>This transaction will be removed from your reports</CustomText>
                <TouchableOpacity style={styles.buttonBack} activeOpacity={0.6} onPress={() => setIsModalVisible(false)}>
                    <CustomText style={{ fontSize: 16, fontWeight: 600, color: Colors.tealKuvera }}>Close</CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStayLogOut} activeOpacity={0.6} onPress={handleDeleteButton}>
                    <CustomText style={{ fontSize: 16, fontWeight: 600, color: "white" }}>Yes Delete</CustomText>
                </TouchableOpacity>
            </ModalKuvera>
        </>
    )
}

const styles = StyleSheet.create({
    buttonDelete: {
        backgroundColor: 'white',
        borderColor: Colors.tealKuvera,
        borderWidth: 2,
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 5,
        paddingVertical: 8,
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center'
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