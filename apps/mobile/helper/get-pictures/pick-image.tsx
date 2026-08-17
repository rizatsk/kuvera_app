import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import ImageCropPicker from "react-native-image-crop-picker";
import manipulateImageToWebP from "../manipulateImage";

type ResultPickImageType = {
    uri: string;
    width: number;
    height: number;
    base64?: string;
    fileName?: string | null | undefined;
    mimeType?: string;
}

const pickImage = async (): Promise<ResultPickImageType | null> => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
        Alert.alert('Permission required', 'Permission to access the media library is required.');
        return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
        base64: false,
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

        return {
            ...manipulatedImage,
            fileName: asset.fileName,
            mimeType: asset.mimeType
        }
    } else {
        return null;
    }
};

export default pickImage;