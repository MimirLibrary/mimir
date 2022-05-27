import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { Color } from '../config/designTokens';
import { TextVariant, textVariantStyles } from '../config/textVariants';

export interface AppTextProps {
  variant: TextVariant;
  color?: Color;
  text?: string;
  style?: StyleProp<TextStyle>;
}

export const AppText: React.FC<AppTextProps> = ({
  children,
  variant,
  style,
  text,
  color = Color.ACCENT_BLACK_100,
}) => {
  return (
    <Text style={[textVariantStyles[variant], { color }, style]}>
      {children ?? text}
    </Text>
  );
};
