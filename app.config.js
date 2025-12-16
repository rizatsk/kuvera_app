export default {
    "expo": {
        "name": "Kuvera",
        "slug": "Kuvera",
        "version": "1.2.2",
        "orientation": "portrait",
        "icon": "./assets/images/foreground-icon.png",
        "scheme": "kuveraapp",
        "userInterfaceStyle": "automatic",
        "newArchEnabled": true,
        "ios": {
            "buildNumber": "1",
            "bundleIdentifier": "com.rjshubkuvera",
            "supportsTablet": true,
            "googleServicesFile": "./GoogleService-Info.plist",
            "infoPlist": {
                "ITSAppUsesNonExemptEncryption": false,
                "NSPhotoLibraryUsageDescription": "Kuvera needs access to your photos to upload receipt images and manage your expense records.",
                "NSCameraUsageDescription": "Kuvera needs access to your camera to capture receipt photos for expense tracking.",
                "NSMicrophoneUsageDescription": "Kuvera uses the microphone only when recording audio is required."
            }
        },
        "android": {
            "versionCode": 1,
            "package": "com.rjshubkuvera",
            "adaptiveIcon": {
                "backgroundColor": "#ffffff",
                "foregroundImage": "./assets/images/foreground-icon.png",
            },
            "edgeToEdgeEnabled": true,
            "predictiveBackGestureEnabled": false,
            "googleServicesFile": "./google-services.json",
            "buildType": "apk"
        },
        "plugins": [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    "image": "./assets/images/kuvera-vertical.png",
                    "imageWidth": 160,
                    "resizeMode": "contain",
                    "backgroundColor": "#ffffff",
                    "dark": {
                        "backgroundColor": "#000000"
                    }
                }
            ],
            [
                "expo-secure-store",
                {
                    "configureAndroidBackup": true,
                    "faceIDPermission": "Allow Kuvera to access your Face ID biometric data."
                }
            ],
            ["@react-native-google-signin/google-signin"],
            [
                "expo-image-picker",
                {
                    "cameraPermission": "Allow Kuvera to access your camera",
                    "photosPermission": "Allow Kuvera to access your microphone",
                    "microphonePermission": "Allow Kuvera to access your microphone",
                }
            ],
        ],
        "experiments": {
            "typedRoutes": true,
            "reactCompiler": true
        },
        "extra": {
            "eas": {
                "projectId": "c8680eee-ff98-455b-b989-46b2cf9d6118"
            }
        }
    }
};
