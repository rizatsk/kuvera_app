import CustomText from '@/components/custom-text'
import { Image } from 'expo-image'
import React from 'react'
import { View } from 'react-native'

export default function IsNotFoundStockIDX() {
    return (
        <View style={{ alignItems: 'center', marginHorizontal: 18 }}>
            <Image
                style={{ height: 160, width: 160 }}
                contentFit='contain'
                source={require("@/assets/images/404-error.png")} />
            <CustomText style={{ textAlign: 'center', fontWeight: 500, marginTop: 10 }}>Stock you are looking for is not available in IDX data.
                Make sure the spelling is correct</CustomText>
        </View>
    )
}
