import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import FullScreenLoader from '@/components/fullscreen-loader';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect } from 'react';
import ReduxProvider from './provider';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    'Nunito-ExtraLight': require('@/assets/fonts/nunito/Nunito-ExtraLight.ttf'),
    'Nunito-Light': require('@/assets/fonts/nunito/Nunito-Light.ttf'),
    'Nunito-Reguler': require('@/assets/fonts/nunito/Nunito-Regular.ttf'),
    'Nunito-Medium': require('@/assets/fonts/nunito/Nunito-Medium.ttf'),
    'Nunito-SemiBold': require('@/assets/fonts/nunito/Nunito-SemiBold.ttf'),
    'Nunito-Bold': require('@/assets/fonts/nunito/Nunito-Bold.ttf'),
    'Nunito-ExtraBold': require('@/assets/fonts/nunito/Nunito-ExtraBold.ttf'),
    'Nunito-Black': require('@/assets/fonts/nunito/Nunito-Black.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ReduxProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(non-private)" />
          <Stack.Screen name="(private)" />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <FullScreenLoader />
      </ReduxProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
