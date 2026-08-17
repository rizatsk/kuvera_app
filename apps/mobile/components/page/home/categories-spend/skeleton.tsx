import { Colors } from '@/constants/theme';
import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function SkeletonCardCategoryOutput() {
    return (
        <SkeletonPlaceholder>
            <View style={{ paddingLeft: 5, paddingRight: 8, paddingVertical: 4, borderRadius: 10, borderColor: Colors.grey[100], borderWidth: 2 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <View style={{ width: 50, height: 50, borderRadius: 10 }} />
                    <View>
                        <View style={{ width: 70, height: 14, borderRadius: 4 }} />
                        <View style={{ width: 80, height: 13, borderRadius: 4, marginTop: 4 }} />
                    </View>
                </View>
            </View>
        </SkeletonPlaceholder>
    )
}
