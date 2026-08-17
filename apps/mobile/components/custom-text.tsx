import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

type NumericFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000;

const FONT_MAPPING = {
  100: 'Nunito-ExtraLight',
  200: 'Nunito-Light',
  300: 'Nunito-Reguler',
  400: 'Nunito-Medium',
  500: 'Nunito-SemiBold',
  600: 'Nunito-Bold',
  700: 'Nunito-ExtraBold',
  800: 'Nunito-Black',
  900: 'Nunito-Black',
  1000: 'Nunito-Black',
} as const;

const getFontFamilyByWeight = (weight: NumericFontWeight): string => {
  return FONT_MAPPING[weight] || 'Nunito-Reguler';
};

interface CustomTextProps extends TextProps {
  style?: TextStyle;
  children: React.ReactNode;
}

export default function CustomText({
  style,
  children,
  ...rest
}: CustomTextProps): React.JSX.Element {
  const fontFamilyName = getFontFamilyByWeight(style?.fontWeight as NumericFontWeight);

  return (
    <Text
      style={[
        style,
        {
          fontFamily: fontFamilyName,
        }
      ]}
    >
      {children}
    </Text>
  );
};
