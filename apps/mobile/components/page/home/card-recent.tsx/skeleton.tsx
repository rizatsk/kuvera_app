import React from 'react'
import { View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

export default function SkeletonCardRecent() {
    return (
        <SkeletonPlaceholder>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5, alignItems: 'center' }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <View style={{ width: 40, height: 40, borderRadius: 1000 }} />
                    <View>
                        <View style={{ width: 70, height: 15, borderRadius: 2 }} />
                        <View style={{ width: 150, height: 12, borderRadius: 2, marginTop: 4 }} />
                    </View>
                </View>
                <View style={{ width: 100, height: 16, borderRadius: 2 }} />
            </View>
        </SkeletonPlaceholder>
    )
}
