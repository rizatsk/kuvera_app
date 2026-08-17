import FormEditTransaction from '@/components/page/edit-transaction/form-edit-spending';
import { TypeTransaction } from '@/states/transaction/type';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';

export default function EditDataTransaction() {
    const { id, category_id, category_name, notes, money_spent, created_dt, type } = useLocalSearchParams();
    const navigation = useNavigation()
    useEffect(() => {
        const strType = type === 'incoming' ? 'Income' : 'Expen';
        navigation.setOptions({
            title: `Edit ${strType}`,
        });
    }, [type]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 20 }}>
            <FormEditTransaction
                params={{
                    id: id as string,
                    category_id: category_id as string,
                    category_name: category_name as string,
                    notes: notes as string,
                    money_spent: money_spent as string,
                    created_dt: created_dt as string,
                    type: type as TypeTransaction
                }}
            />
        </View>
    )
}
