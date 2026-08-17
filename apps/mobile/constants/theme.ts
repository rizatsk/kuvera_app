/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0b62e3ff';
const tintColorDark = '#fff';
const blueKuvera = "#0088ff";
const tealKuvera = "#48B3AF";
const tealLightKuvera = "#0dd4ce";
const tealDarkKuvera = "#4da3a0";
const greenKuvera = "#29d602";
const moneyGreenKuvera = "#6ec20e";
const yellowKuvera = "#f8cb04";
const orangeKuvera = "#f87e04";
const greyBackground = "#efeff0";
const greyBackground2 = "#c6ecea";
const tealKuvera2 = "#016B61";
const whiteTransaparent = "#ffffffa1"
const goldCOlor = "#ffbf00"

export const Colors = {
  blueKuvera,
  tealKuvera,
  yellowKuvera,
  greenKuvera,
  greyBackground,
  greyBackground2,
  tealKuvera2,
  whiteTransaparent,
  tealDarkKuvera,
  orangeKuvera,
  moneyGreenKuvera,
  tealLightKuvera,
  goldCOlor,
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tealKuvera,
    icon: blueKuvera,
    tabIconDefault: blueKuvera,
    tabIconSelected: tealKuvera,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  red: {
    900: '#C6000A',
    800: '#D40F1B',
    700: '#E11C23',
    600: '#F32A28',
    500: '#FF3627',
    400: '#FC4B47',
    300: '#F26F6D',
    200: '#F99896',
    100: '#FFCCD1',
    50: '#FFEBEE',
  },
  black: {
    900: '#112639',
    800: '#243A50',
    700: '#334C66',
    600: '#425F7C',
    500: '#4F6D8D',
    400: '#6882A0',
    300: '#8098B3',
    200: '#A1B5CD',
    100: '#C1D3E7',
    50: '#E3EDFF',
  },
  grey: {
    900: '#2F373F',
    800: '#414C57',
    700: '#505F6D',
    600: '#617384',
    500: '#6E8395',
    400: '#8495A5',
    300: '#9AA9B6',
    200: '#B7C1CB',
    100: '#D3DAE0',
    50: '#EEF0F2',
  },
  white: {
    900: '#3C3C3C',
    800: '#606060',
    700: '#818181',
    600: '#979797',
    500: '#C2C2C2',
    400: '#DEDEDE',
    300: '#F0F0F0',
    200: '#F5F5F5',
    100: '#FAFAFA',
    50: '#FFFFFF',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
