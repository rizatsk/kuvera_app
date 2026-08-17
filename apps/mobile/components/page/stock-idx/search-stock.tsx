import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type SearchBarProps = {
    onSearch: Dispatch<SetStateAction<string>>;
    delay?: number;
};

export default function SearchStock({ onSearch, delay = 500 }: SearchBarProps) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!query.trim()) {
                onSearch('all')
            } else {
                onSearch(query.trim());
            }
            }, delay);

        return () => clearTimeout(timeout);
    }, [query]);

    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color="#666" style={styles.icon} />
            <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search stock..."
                placeholderTextColor="#999"
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.grey[100],
        borderRadius: 12,
        borderWidth: 1,
        marginHorizontal: 12,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 15,
    },
});
