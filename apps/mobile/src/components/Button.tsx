import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Color} from '../config/designTokens';
import {AppText} from './AppText';
import {TextVariant} from '../config/textVariants';
import {Fonts} from '../assets/fonts';

interface ButtonProps {
  text: string;
  variant?: ButtonVariant;
  onPress: () => void;
  style?: ViewStyle;
  icon?: JSX.Element;
}

export enum ButtonVariant {
  BLUE = 'blue',
  GRAY_INVERTED = 'blueInverted',
}

export const Button: FC<ButtonProps> = ({
  text,
  variant = ButtonVariant.BLUE,
  onPress,
  style,
  icon,
}) => {
  return (
    <View style={[styles.container, stylesMap[variant].button, style]}>
      <TouchableOpacity onPress={onPress} style={styles.touchWrapper}>
        <View style={styles.content}>
          {icon && <View style={styles.iconWrapper}>{icon}</View>}
          <AppText
            variant={TextVariant.H3}
            fontFamily={Fonts.MontserratBold}
            color={Color.WHITE}
            style={[styles.text, stylesMap[variant].text]}
            text={text}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const stylesMap = {
  [ButtonVariant.BLUE]: {
    text: {color: Color.WHITE},
    button: {
      backgroundColor: Color.ACCENT_BLUE_100,
      borderColor: Color.ACCENT_BLUE_100,
    },
  },
  [ButtonVariant.GRAY_INVERTED]: {
    text: {color: Color.ACCENT_GRAY_50},
    button: {
      backgroundColor: Color.TERRITARY,
      borderColor: Color.ACCENT_GRAY_50,
    },
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.ACCENT_BLUE_100,
    borderRadius: 30,
    borderWidth: 2,
  },
  touchWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  text: {},
  iconWrapper: {marginRight: 8},
  content: {flexDirection: 'row', alignItems: 'center'},
});
