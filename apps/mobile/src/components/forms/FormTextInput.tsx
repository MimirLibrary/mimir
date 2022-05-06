import React, {useCallback, useRef} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {Color} from '../../config/designTokens';
import {Fonts} from '../../assets/fonts';
import {TextVariant, textVariants} from '../../config/textVariants';
// import ErrorText from './ErrorText';

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
  error,
  placeholderTextColor = Color.ACCENT_BLACK_100,
  placeholder,
  icon,
  containerStyle,
  onChangeText,
  onBlur,
  value,
  secureTextEntry,
  autoCapitalize,
}: IFormInputProps) {
  const ref = useRef<TextInput>(null);

  const pressHandler = useCallback(() => {
    ref.current?.focus();
  }, []);

  return (
    <Pressable
      onPress={pressHandler}
      style={[styles.container, containerStyle]}>
      {icon && icon}
      <TextInput
        ref={ref}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        style={[styles.input, style]}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />

      {/*{error && <ErrorText style={styles.error}>{error}</ErrorText>}*/}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
    fontFamily: Fonts.MontserratLight,
    ...textVariants.bodyL,
    color: Color.ACCENT_BLACK_100,
  },
  error: {
    marginTop: 8,
  },
});
