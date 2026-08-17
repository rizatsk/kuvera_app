import CustomText from '@/components/custom-text';
import { modalStyles } from '@/components/input/radio-input/style';
import ModalKuvera from '@/components/modal-bottom';
import { Colors } from '@/constants/theme';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function NoHaveTransaction() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const selectOptions = [
        { key: 'Income', value: 'incoming' },
        { key: 'Spent', value: 'spending' }
    ];

    function handleSubmit(option: { key: string, value: string }) {
        if (option.value === 'incoming') {
            router.push({ pathname: '/(private)/add-transaction/form-add-income' })
        } else {
            router.push({ pathname: '/(private)/add-transaction/form-add-spending' })
        }
        setIsModalVisible(false);
    }

    return (
        <>
            <View style={{ flex: 1, alignItems: 'center', marginHorizontal: 20 }}>
                <Image source={require('@/assets/images/no-data.png')}
                    style={{ width: 170, height: 170 }}
                    contentFit="contain" />
                <View>
                    <CustomText style={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }}>No transactions recorded yet.</CustomText>
                    <CustomText style={{ textAlign: 'center' }}>Add an expense to start tracking your finances</CustomText>
                </View>
                <TouchableOpacity style={styles.buttonStayLogOut} activeOpacity={0.6} onPress={() => setIsModalVisible(true)}>
                    <CustomText style={{ fontSize: 16, fontWeight: 600, color: "white" }}>+ Add Transaction</CustomText>
                </TouchableOpacity>
            </View>
            <ModalKuvera
                title={'Select Type Transaction'}
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
                            <Feather name="chevron-right" size={24} color="black" />
                        </TouchableOpacity>
                    ))}
                </View>
            </ModalKuvera>
        </>
    )
}

const styles = StyleSheet.create({
    buttonStayLogOut: {
        width: '100%',
        backgroundColor: Colors.tealKuvera,
        borderColor: Colors.tealKuvera,
        borderWidth: 2,
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 5,
        paddingVertical: 7,
    },
})