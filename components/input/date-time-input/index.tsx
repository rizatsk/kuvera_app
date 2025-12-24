import CustomText from '@/components/custom-text';
import ModalKuvera from '@/components/modal-bottom';
import { formatDateTimeVerbose } from '@/helper/formate-date-time';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import InputFieldKuvera from '../input-field';
import { getStyle } from '../input-field/style';
import { modalStyles } from './style';
import { CalenderInputProps } from './type';

const DateTimeInput: React.FunctionComponent<CalenderInputProps> = (props) => {
    const {
        value,
        label,
        errorMessage,
        helperMessage,
        isError,
        onSelectDate,
        ...rest
    } = props;

    const initialDate = new Date();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [focused, setFocused] = useState(false);
    const [date, setDate] = useState(initialDate);
    const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');
    const [mode, setMode] = useState<'date' | 'time'>('date');

    // For Input Field
    const computedStyle = getStyle(props, focused);

    // For Modal
    const handleOnFocus = () => {
        setIsModalVisible(true);
    };

    const handleSubmit = (valueDate = date) => {
        onSelectDate?.(`${valueDate}`);
        onClose();
    };

    const onClose = () => {
        setIsModalVisible(false);
        setFocused(false);
    }
    // End For Modal

    // For date time picker
    useEffect(() => {
        if (Platform.OS === 'android') {
            setMode('date');
        }
    }, []);

    useEffect(() => {
        if (value) setDate(new Date(value))
    }, [value])


    const onChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android' && event.type === 'dismissed') {
            setShowPicker(false)
            return;
        }

        const currentDate = selectedDate || date;
        setDate(currentDate);

        if (Platform.OS === 'android') {
            setShowPicker(false);
            if (mode === 'date') {
                setMode('time');
                setShowPicker(true);
            }
        }
    };

    const formattedDate = date.toLocaleDateString(undefined, {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString(undefined, {
        hour: '2-digit', minute: '2-digit'
    });

    const showAndroidPicker = (currentMode: 'date' | 'time') => {
        setMode(currentMode);
        setShowPicker(true);
    };

    const renderPicker = () => {
        return <>
            {showPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    maximumDate={new Date()}
                    onChange={onChange}
                    locale="id-ID"
                />
            )}
        </>
    };

    const renderModalContent = () => (
        <>
            <View style={modalStyles.tabContainer}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => Platform.OS === 'android' ? showAndroidPicker('date') : setMode('date')}
                    style={[modalStyles.tab, mode === 'date' && modalStyles.activeTab]}
                >
                    <Text style={mode === 'date' && modalStyles.activeText}>{formattedDate}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => Platform.OS === 'android' ? showAndroidPicker('time') : setMode('time')}
                    style={[modalStyles.tab, mode === 'time' && modalStyles.activeTab]}
                >
                    <Text style={mode === 'time' && modalStyles.activeText}>{formattedTime}</Text>
                </TouchableOpacity>
            </View>

            {renderPicker()}
        </>
    );
    // End for date time picker

    return (
        <InputFieldKuvera 
            value={value && formatDateTimeVerbose(value)}
            label={label}
            focused={focused}
            computedStyle={computedStyle}
            errorMessage={errorMessage}
            handleOnFocus={handleOnFocus}
        >
            <ModalKuvera
                title={label}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                setFocused={setFocused}>
                {/* Daftar Opsi Radio */}
                <View style={modalStyles.container}>
                    {renderModalContent()}
                </View>

                <TouchableOpacity activeOpacity={0.6} style={modalStyles.buttonSave} onPress={() => handleSubmit()}>
                    <CustomText style={{ color: "white", fontSize: 15, fontWeight: '500' }}>Select Date</CustomText>
                </TouchableOpacity>
            </ModalKuvera>
        </InputFieldKuvera>
    )
}

export default DateTimeInput;
