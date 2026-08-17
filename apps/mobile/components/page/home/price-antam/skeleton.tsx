import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function SkeletonPriceAntam() {
    return (
        <SkeletonPlaceholder>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <View style={{ width: 40, height: 40, borderRadius: 10000 }} />
                    <View>
                        <View style={{ height: 15, width: 100 }} />
                        <View style={{ flexDirection: 'row', gap: 4, marginTop: 4 }}>
                            <View style={{ height: 11, width: 20 }} />
                            <View style={{ height: 14, width: 100, marginTop: 4 }} />
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ height: 11, width: 24 }} />
                    <View style={{ height: 15, marginTop: 4, width: 100 }} />
                </View>
            </View>
        </SkeletonPlaceholder>
    )
}
