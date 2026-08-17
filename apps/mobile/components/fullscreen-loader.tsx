import { Colors } from '@/constants/theme';
import { useAppSelector } from '@/states';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useRef } from 'react';
import {
    Animated, BackHandler,
    Easing,
    Modal,
    StyleSheet,
    View
} from 'react-native';


const FullScreenLoader: React.FC = () => {
    const visibleLoading = useAppSelector((states) => states.visibleLoading);
    
       // Animasi rotate
    const spinAnim = useRef(new Animated.Value(0)).current;

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const startSpinAnimation = () => {
        spinAnim.setValue(0); // Reset the value to 0 before starting a new loop
        Animated.timing(spinAnim, {
            toValue: 1,
            duration: 800, // Duration of one full rotation in milliseconds
            easing: Easing.linear, // Linear easing for a constant speed
            useNativeDriver: true, // Use native driver for performance
        }).start(() => startSpinAnimation()); // Loop the animation
    };

    React.useEffect(() => {
        if (visibleLoading) {
            const backAction = () => {
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );

            startSpinAnimation()
            return () => backHandler.remove();
        } else {
            spinAnim.stopAnimation();
        }
    }, [visibleLoading]);


    if (!visibleLoading) {
        return null;
    }

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visibleLoading}
        >
            <View style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}>
                <Animated.View style={{ transform: [{ rotate: spin }] }} >
                <AntDesign name="loading" size={34} color={Colors.tealKuvera} />
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    message: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
    }
});

export default FullScreenLoader;