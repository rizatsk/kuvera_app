import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function SkeletonCardTransaction() {
    return (
        <SkeletonPlaceholder>
            <View style={styles.dataTransactionContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                    {/* Icon */}
                    <View style={{ width: 38, height: 38, borderRadius: 1000 }} />
                    {/* Title */}
                    <View>
                        <View style={{ width: 70, height: 15, borderRadius: 4 }} />
                        <View style={{ width: 100, height: 12, borderRadius: 4, marginTop: 4 }} />
                    </View>
                </View>
                {/* Money */}
                <View style={{ width: 100, height: 15, borderRadius: 4 }} />
            </View>
        </SkeletonPlaceholder>
    )
}

const styles = StyleSheet.create({
    dataTransactionContainer: {
        backgroundColor: "white",
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});