import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
type OptionStackScreenType = {
    headerShown?: boolean,
    headerTitleAlign?: 'left' | 'center',
    headerTitleStyle?: {
        fontSize: number,
    },
    headerLeft?: () => React.JSX.Element
}

export function BackNavigation({ backToHome }: { backToHome: boolean }) {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => backToHome ? router.replace('/(page)/(tabs)') : router.back()}
            style={{
                paddingLeft: 1,
                marginRight: 20,
                paddingVertical: 5,
                ...(Platform.OS === 'ios' && {
                    left: 8,
                })
            }}
        >
            <FontAwesome5
                name="chevron-left"
                size={24}
                color="black"
            />
        </TouchableOpacity>
    );
}


export const OptionStackScreen = (backToHome: boolean = false): OptionStackScreenType => ({
    // headerShown: true,
    headerTitleAlign: 'left',
    headerTitleStyle: {
        fontSize: 17,
    },
    headerLeft: () => <BackNavigation backToHome={backToHome} />
})
