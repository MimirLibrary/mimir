import React from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { Color } from '../config/designTokens';

export interface AvatarProps {
  avatar?: string | null;
  containerStyle?: ViewStyle;
  emptyStyle?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  avatar,
  containerStyle,
  emptyStyle,
}) => {
  const _borderRadius =
    containerStyle?.width && typeof containerStyle?.width === 'number'
      ? containerStyle?.width / 2
      : styles.container.width / 2;

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        { borderRadius: _borderRadius },
      ]}
    >
      {avatar ? (
        <Image
          style={styles.img}
          resizeMode="cover"
          source={{
            uri: avatar,
          }}
        />
      ) : (
        <View style={[styles.img, styles.emptyImg, emptyStyle]} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  emptyImg: {
    backgroundColor: Color.ACCENT_GRAY_50,
  },
});
