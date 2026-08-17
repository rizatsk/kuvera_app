import CustomText from "@/components/custom-text";
import { TextInput } from "@/components/input/text-input/text-input";
import { Colors } from "@/constants/theme";
import { formatRupiah } from "@/helper/format-rupiah";
import { useAppSelector } from "@/states";
import { asyncAddCategorySpend } from "@/states/categories-spend/action";
import { InitialSumTransactionByCategoryType } from "@/states/transaction/type";
import { Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

export default function AddCategory() {
    const dispatch = useDispatch();
    const { transactions }: InitialSumTransactionByCategoryType = useAppSelector((states) => states.sumTransactionByCategory);

    const [title, setTitle] = useState('Wallet');
    const [error, setError] = useState('');

    const colorCard = Colors.tealDarkKuvera;

    function handleAddCategoryButton() {
        if (title.length < 1) {
            setError('Category is cannot empty');
            return;
        };

        if (title.length < 5) {
            setError('Category minimal 5 character');
            return;
        }

        const isSameCategory = transactions.filter((trx) => trx.category_name.toLowerCase() === title.toLowerCase());
        if (isSameCategory.length > 0) {
            setError('Category is already available');
            return;
        }

        dispatch(asyncAddCategorySpend({
            name_category: title,
            handleSuccess: () => {
                router.replace({
                    pathname: '/(private)/category/all-category'
                });
                ToastAndroid.show('Success add category', 500)
            }
        }) as any)
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ paddingVertical: 30, flexDirection: 'row', justifyContent: 'center', backgroundColor: colorCard + 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <View style={{ backgroundColor: colorCard + 30, width: 67, height: 55, justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                        <Fontisto name="credit-card" size={30} color={colorCard} />
                    </View>
                    <View>
                        <CustomText style={{ fontWeight: 600, fontSize: 20, textTransform: 'capitalize', color: colorCard }}>{title}</CustomText>
                        <CustomText style={{ fontWeight: "700", fontSize: 17, color: colorCard }}>{formatRupiah(0)}</CustomText>
                    </View>
                </View>
            </View>

            <View style={{ marginTop: 20, marginHorizontal: 15 }}>
                <TextInput
                    counter={20}
                    label='Category Name'
                    value={title}
                    accessible={true}
                    onChangeText={setTitle}
                    errorMessage={error}
                />
                <TouchableOpacity activeOpacity={0.6} style={style.button_lanjut} onPress={handleAddCategoryButton}>
                    <CustomText style={{ fontWeight: 600, color: "white", fontSize: 16 }}>Add Category</CustomText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    button_lanjut: {
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: Colors.tealLightKuvera,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    }
})