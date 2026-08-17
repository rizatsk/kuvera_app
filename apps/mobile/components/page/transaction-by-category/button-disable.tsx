import CustomText from '@/components/custom-text';
import { modalStyles } from '@/components/input/radio-input/style';
import ModalKuvera from '@/components/modal-bottom';
import { Colors } from '@/constants/theme';
import { asyncUpdateStatusCategorySpend } from '@/states/categories-spend/action';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

type ButtonDisableOrEnableCategoryProps = {
    id_category: string
    status: string
    category_name: string
}


export default function ButtonDisableOrEnableCategory({ id_category, status, category_name }: ButtonDisableOrEnableCategoryProps) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();

    const handleButton = () => {
        setIsModalVisible(true);
    }

    const handleButtonUpdateStatusCategory = () => {
        dispatch(
            asyncUpdateStatusCategorySpend({
                param: {
                    category_id: id_category,
                    status: status === 'true' ? false : true,
                    category_name: category_name
                },
                handleSuccess: () => {
                    setIsModalVisible(false);
                    router.dismiss()
                    router.replace({
                        pathname: '/(private)/category/all-category'
                    });
                }
            }) as any
        )
    };

    const strStatus = status === 'false' ? 'Enable' : 'Disable';

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.6}
                style={modalStyles.optionItem}
                onPress={() => handleButton()}
            >
                <CustomText style={modalStyles.optionLabel}>{strStatus} category</CustomText>
            </TouchableOpacity>
            <ModalKuvera
                title={`${strStatus} Category`}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            >
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    {status === 'true' ? (
                        <Image
                            style={{ height: 80, width: 80 }}
                            contentFit='fill'
                            source={require("@/assets/images/icon/disable-data.png")} />
                    ) : (
                        <Image
                            style={{ height: 80, width: 80 }}
                            contentFit='fill'
                            source={require("@/assets/images/icon/enable-data.png")} />
                    )}
                </View>
                <CustomText style={{ textAlign: 'center', fontSize: 17, fontWeight: 600, marginTop: 20 }}>Confirmation {strStatus}</CustomText>
                <CustomText style={{ textAlign: 'center', fontSize: 16, marginTop: 10 }}>Activated category will become available again when creating a new transaction.</CustomText>
                <TouchableOpacity style={styles.buttonBack} activeOpacity={0.6} onPress={() => setIsModalVisible(false)}>
                    <CustomText style={{ fontSize: 16, fontWeight: 600, color: Colors.tealKuvera }}>Close</CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStayLogOut} activeOpacity={0.6} onPress={handleButtonUpdateStatusCategory}>
                    <CustomText style={{ fontSize: 16, fontWeight: 600, color: "white" }}>Yes {strStatus}</CustomText>
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