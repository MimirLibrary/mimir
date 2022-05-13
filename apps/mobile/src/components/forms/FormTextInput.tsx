import React, {useRef} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  ViewStyle,
} from 'react-native';
import {Color} from '../../config/designTokens';
import {textVariantStyles} from '../../config/textVariants';

export interface IFormInputProps {
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  placeholder: string;
  placeholderTextColor?: Color;
  icon?: JSX.Element;
  error?: string;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  value: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export function FormTextInput({
  style,
  placeholderTextColor = Color.ACCENT_BLACK_100,
  placeholder,
  onChangeText,
  onBlur,
  value,
  secureTextEntry,
  autoCapitalize,
}: IFormInputProps) {
  const ref = useRef<TextInput>(null);

  return (
      <TextInput
        ref={ref}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        style={[styles.container,styles.input, textVariantStyles.bodyL, style]}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow:2,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Color.WHITE,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Color.ACCENT_GRAY_25,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    color: Color.ACCENT_BLACK_100,
  },
  error: {
    marginTop: 8,
  },
});
