import CustomText from "@/components/custom-text";
import { Colors } from "@/constants/theme";
import { useAppSelector } from "@/states";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function CardAddCategory() {
    const isLogin = useAppSelector((states) => states.isLogin);

    const handleAddCategory = () => {
        if (isLogin) {
            router.push({
                pathname: '/(page)/category/add-category',
            })
        } else {
            router.navigate({
                pathname: '/(page)/login',
                params: {
                    backToHome: 'false'
                }
            });
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleAddCategory}
            style={styles.listFooterComponent}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5, justifyContent: 'center', flex: 1 }}>
                <MaterialIcons name="add-circle" size={26} color={Colors.tealKuvera} />
                <CustomText style={{ color: Colors.tealDarkKuvera, fontSize: 14, fontWeight: 600 }}>Add Category</CustomText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listFooterComponent: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 8,
        paddingVertical: 4,
        borderRadius: 10,
        borderColor: Colors.tealKuvera,
        borderWidth: 2,
        width: '48%',
        height: 60,
        borderStyle: 'dashed',
        backgroundColor: Colors.tealKuvera + 30
    },
})
