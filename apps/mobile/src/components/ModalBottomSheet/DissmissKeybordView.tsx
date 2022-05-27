import React, { FC } from 'react';
import { Keyboard, Pressable } from 'react-native';
import { styles } from './styles';

export const DismissKeyboardView: FC = (props) => {
  const { children } = props;

  return (
    <Pressable
      style={styles.container}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      {children}
    </Pressable>
  );
};
