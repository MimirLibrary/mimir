import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

export interface IButtonIconProps {
  icon: JSX.Element;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export function ButtonIcon({icon, style, onPress}: IButtonIconProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.65}
      style={[styles.buttonIcon, style]}>
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
