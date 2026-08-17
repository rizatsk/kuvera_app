import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function SkeletonStockIDX() {
    return (
        <SkeletonPlaceholder>
            <View style={styles.dataTransactionContainer}>
                <View style={{ gap: 5, flex: 1 }}>
                    {/* Title */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <View style={{ height: 40, width: 40, borderRadius: 999 }} />
                            <View>
                                <View style={{ height: 22, width: 70, borderRadius: 4 }} />
                                <View style={{ height: 15, width: 120, borderRadius: 4, marginTop: 4 }} />
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <View style={{ height: 16, width: 50, borderRadius: 4 }} />
                            <View style={{ height: 14, width: 80, borderRadius: 4, marginTop: 4 }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 5, justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ height: 14, width: 45, borderRadius: 4 }} />
                            <View style={{ height: 16, width: 60, borderRadius: 4, marginTop: 4 }} />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ height: 14, width: 45, borderRadius: 4 }} />
                            <View style={{ height: 16, width: 60, borderRadius: 4, marginTop: 4 }} />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ height: 14, width: 45, borderRadius: 4 }} />
                            <View style={{ height: 16, width: 60, borderRadius: 4, marginTop: 4 }} />
                        </View>
                    </View>
                </View>
            </View>
        </SkeletonPlaceholder>
    )
}

const styles = StyleSheet.create({
    dataTransactionContainer: {
        backgroundColor: "white",
        paddingVertical: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});