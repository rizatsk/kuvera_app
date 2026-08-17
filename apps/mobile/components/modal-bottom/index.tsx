import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Modal, TouchableOpacity, View } from 'react-native';
import CustomText from '../custom-text';
import { modalStyles } from './style';

// Animasi for Modal
const { height } = Dimensions.get('window');

// Tentukan posisi awal (di luar layar)
const START_POSITION = height;
const END_POSITION = 0;

type ModelKuveraProps = {
    testID?: string
    title: string
    isModalVisible: boolean
    setIsModalVisible: (visible: boolean) => void
    setFocused?: (focused: boolean) => void,
    children: React.ReactNode;
}

export default function ModalKuvera({
    testID = 'modal-kuvera', title, isModalVisible, setIsModalVisible, setFocused = () => {}, children
}: ModelKuveraProps) {
    const slideAnim = useRef(new Animated.Value(START_POSITION));

    useEffect(() => {
        if (isModalVisible) {
            Animated.timing(slideAnim.current, {
                toValue: END_POSITION,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim.current, {
                toValue: START_POSITION,
                duration: 300,
                useNativeDriver: true,
            }).start();
            slideAnim.current.setValue(START_POSITION)
        };

    }, [isModalVisible])

    const animatedStyle = {
        transform: [{
            translateY: slideAnim.current
        }],
    };

    const onClose = () => {
        setIsModalVisible(false);
        setFocused(false);
    }
    // End For Modal

    return (
        <Modal
            testID={testID}
            animationType="none"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={modalStyles.backdrop}
                activeOpacity={0.6}
                onPress={onClose}
            >
                <Animated.View
                    style={[modalStyles.modalContent, animatedStyle]}
                    onStartShouldSetResponder={() => true}
                >
                    {/* Header */}
                    <View style={modalStyles.header}>
                        <CustomText style={modalStyles.title}>{title}</CustomText>
                        <TouchableOpacity activeOpacity={0.6} onPress={onClose} style={modalStyles.closeButton}>
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    {children}
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    )
}
