import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

type OptionStackScreenType = {
    headerShown: boolean,
    headerTitleAlign: 'center',
    headerTitleStyle: {
        fontSize: number,
    },
    headerLeft: () => React.JSX.Element
}

function BackNavigation({ backToHome = false }: { backToHome?: boolean }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 5, paddingVertical: 5 }}
        >
            <FontAwesome5 name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
    );
}


export const OptionStackScreen: OptionStackScreenType = {
    headerShown: true,
    headerTitleAlign: 'center',
    headerTitleStyle: {
        fontSize: 17,
    },
    headerLeft: () => <BackNavigation />
}
