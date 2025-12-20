import { OptionStackScreen } from "@/components/option-stack-screen";
import { useAppSelector } from "@/states";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

export default function PrivateLayout() {
    const isPreload = useAppSelector((states) => states.preload);
    const authUser = useAppSelector((states) => states.authUser);

    useEffect(() => {
        if (!authUser && !isPreload) {
            router.replace("/(non-private)/login")
        }
    }, [authUser, isPreload])

    return (
        <>
            {authUser && (
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="add-transaction/form-add-spending"
                        options={{
                            title: "Add Spending",
                            ...OptionStackScreen,
                        }}
                    />
                    <Stack.Screen
                        name="add-transaction/form-add-income"
                        options={{
                            title: "Add Income",
                            ...OptionStackScreen,
                        }}
                    />
                    <Stack.Screen
                        name="success/index"
                        options={{
                            title: "Success",
                            ...OptionStackScreen,
                        }}
                    />
                    <Stack.Screen
                        name="category/all-category"
                        options={{
                            title: "Expen Category",
                            ...OptionStackScreen,
                        }}
                    />
                    <Stack.Screen
                        name="category/add-category"
                        options={{
                            title: "Add Category",
                            ...OptionStackScreen,
                        }}
                    />
                    <Stack.Screen
                        name="category/edit-category"
                        options={{
                            title: "Update Category",
                            ...OptionStackScreen,
                        }}
                    />
                    <Stack.Screen
                        name="category/transaction-by-category"
                        options={{
                            title: "Transaction Category",
                            ...OptionStackScreen,
                        }}
                    />
                    <Stack.Screen
                        name="detail-transaction/index"
                        options={{
                            title: "Detail Transaction",
                            ...OptionStackScreen,
                        }}
                    />
                    <Stack.Screen
                        name="edit/edit-data-transaction"
                        options={{
                            title: "Edit Spending",
                            ...OptionStackScreen,
                        }}
                    />
                    <Stack.Screen
                        name="privacy-polic/index"
                        options={{
                            title: "Privacy Polic",
                            ...OptionStackScreen,
                        }}
                    />
                    <Stack.Screen
                        name="terms-of-service/index"
                        options={{
                            title: "Terms of Service",
                            ...OptionStackScreen,
                        }}
                    />
                    <Stack.Screen
                        name="update-profile/index"
                        options={{
                            title: "Update Profile",
                            ...OptionStackScreen,
                        }}
                    />
                    <Stack.Screen
                        name="stock-idx/detail"
                        options={{
                            title: "Detail Stock IDX",
                            ...OptionStackScreen,
                        }}
                    />
                </Stack>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});