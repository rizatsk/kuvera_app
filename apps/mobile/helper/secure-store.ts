import * as SecureStore from 'expo-secure-store';

export async function getItem(key: string) {
    return await SecureStore.getItemAsync(key);
}

export async function setItem(key: string, value: string) {
    return await SecureStore.setItemAsync(key, value)
}

export async function deleteItem(key: string) {
    return await SecureStore.deleteItemAsync(key)
}