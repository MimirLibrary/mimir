import React, { FC } from 'react';
import { UpArrowIcon } from './icons/UpArrowIcon';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Color } from '../config/designTokens';
import Animated from 'react-native-reanimated';

interface IFabButton {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const FabButton: FC<IFabButton> = ({ onPress, style }) => {
  return (
    <Animated.View style={[styles.container, style]}>
      <Pressable style={styles.pressableContainer} onPress={onPress}>
        <View style={styles.background} />
        <View style={styles.content}>
          <UpArrowIcon />
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  background: {
    width: 48,
    height: 48,
    borderRadius: 24,
    opacity: 0.1,
    backgroundColor: Color.ACCENT_BLUE_100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'absolute',
  },
  pressableContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
