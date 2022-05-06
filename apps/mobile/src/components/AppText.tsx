import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {Color} from '../config/designTokens';
import {textVariants, TextVariant} from '../config/textVariants';
import {Fonts} from '../assets/fonts';

export interface AppTextProps {
  variant: TextVariant;
  color?: Color;
  text?: string;
  style?: StyleProp<TextStyle>;
  fontFamily?: Fonts;
}

export const AppText: React.FC<AppTextProps> = ({
  children,
  variant,
  style,
  text,
  color = Color.ACCENT_BLACK_100,
  fontFamily = Fonts.MontserratRegular,
}) => {
  return (
    <Text style={[{...textVariants[variant], fontFamily, color}, style]}>
      {children ?? text}
    </Text>
  );
};
