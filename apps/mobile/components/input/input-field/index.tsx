import CustomText from '@/components/custom-text';
import { Colors } from '@/constants/theme';
import { formatRupiah } from '@/helper/format-rupiah';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, GestureResponderEvent, LayoutChangeEvent, Pressable, View } from 'react-native';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';
import { ComputedStyleProps } from './style';

interface InputFieldProps extends MaskInputProps {
    children?: React.ReactNode
    value: string | undefined
    computedStyle: ComputedStyleProps
    focused: boolean
    label: string
    errorMessage: string | undefined
    isInput?: boolean
    handleOnFocus: () => void
    handleOnBlur?: () => void
    showSoftInputOnFocus?: boolean
    handleOnTouchStart?: (e: GestureResponderEvent) => void
    handleOnchangeText?: (masked: string, unmasked: string, obfuscated: string) => void
    counter?: number
    inputType?: 'text' | 'money',
}

export default function InputFieldKuvera({
    children,
    value,
    computedStyle,
    focused,
    label,
    errorMessage,
    handleOnFocus,
    isInput = false,
    handleOnBlur,
    showSoftInputOnFocus = true,
    handleOnTouchStart,
    handleOnchangeText,
    counter = 0,
    inputType = 'text',
    ...rest
}: InputFieldProps) {
    const [labelWidth, setLabelWidth] = useState(0);

    const animation = useRef(new Animated.Value(0));
    const scale = animation.current.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });
    const translateY = animation.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -30],
    });
    const translateX = animation.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0, labelWidth * -0.1],
    });

    const animate = (toValue: 0 | 1) =>
        Animated.spring(animation.current, {
            useNativeDriver: true,
            toValue,
        }).start();

    useEffect(() => {
        if (focused || !!value) {
            animate(1);
        } else {
            animate(0);
        }
    }, [value, focused]);

    const getLabelWidth = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setLabelWidth(width + 24);
    };

    const computedValue = useMemo(() => {
        if (inputType === 'money') return formatRupiah(value || '');

        return value;
    }, [value]);
    // End For Input Field

    return (
        <View style={computedStyle.fieldWrapper}>
            <View style={computedStyle.fieldContainer}>
                {label && (
                    <Animated.View
                        style={[
                            computedStyle.labelContainer,
                            {
                                transform: [{ scale }, { translateY }, { translateX }],
                            },
                        ]}
                        onLayout={getLabelWidth}
                        pointerEvents="none"
                    >
                        <CustomText style={computedStyle.label}>
                            {label}
                        </CustomText>
                    </Animated.View>
                )}
                {isInput ? (
                    <View style={computedStyle.inputWrapper}>
                        <MaskInput
                            value={computedValue}
                            style={[computedStyle.textField]}
                            onFocus={handleOnFocus}
                            onBlur={handleOnBlur}
                            placeholderTextColor={
                                focused ? Colors.black[500] : 'transparent'
                            }
                            showSoftInputOnFocus={showSoftInputOnFocus}
                            onTouchStart={handleOnTouchStart}
                            onChangeText={handleOnchangeText}
                            {...rest}
                        />
                        {counter > 0 && (
                            <CustomText style={computedStyle.counter}>
                                {`${computedValue?.length}/${counter}`}
                            </CustomText>
                        )}
                    </View>
                ) : (
                    <Pressable onPress={() => handleOnFocus()} style={computedStyle.inputWrapper} >
                        <CustomText style={computedStyle.textField}>{computedValue}</CustomText>
                    </Pressable>
                )}
            </View>
            {errorMessage && (
                <CustomText style={computedStyle.messageHelper}>
                    {errorMessage}
                </CustomText>
            )}
            {children}
        </View>
    )
}
