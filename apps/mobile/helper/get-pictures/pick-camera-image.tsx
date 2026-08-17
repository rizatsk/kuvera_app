 import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import ImageCropPicker from "react-native-image-crop-picker";
import manipulateImageToWebP from "../manipulateImage";

type ResultPickCameraImageType = {
    uri: string;
    width: number;
    height: number;
    base64?: string;
    fileName?: string | null | undefined;
    mimeType?: string;
}

const pickCameraImage = async (): Promise<ResultPickCameraImageType | null> => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const permissionCameraResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted || !permissionCameraResult.granted) {
        Alert.alert('Permission required', 'Permission to access the media library and camera is required.');
        return null;
    }

    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 1,
    });

    if (!result.canceled) {
        const asset = result.assets[0];
        const resultCrop = await ImageCropPicker.openCropper({
            path: asset.uri,
            mediaType: 'photo',
            cropperCircleOverlay: true,
            cropping: true,
            showCropGuidelines: false,
            width: 300,
            height: 300,
        });
        const manipulatedImage = await manipulateImageToWebP(resultCrop.path);

        return manipulatedImage;
    } else {
        return null;
    }
}

export default pickCameraImage;