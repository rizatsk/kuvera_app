import * as ImageManipulator from 'expo-image-manipulator';

export default async function manipulateImageToWebP(uri: string): Promise<ImageManipulator.ImageResult> {
    const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [
            { resize: { width: 300 } }
        ],
        {
            compress: 0.7,
            format: ImageManipulator.SaveFormat.WEBP
        }
    );

    return manipResult;
}