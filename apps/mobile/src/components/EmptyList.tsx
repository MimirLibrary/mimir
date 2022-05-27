import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from './AppText';
import { TextVariant } from '../config/textVariants';
import { Color, shadowStyles, ShadowVariant } from '../config/designTokens';
import { EmptyListIcon } from './icons/EmptyListIcon';

export const EmptyList = () => {
  return (
    <View style={[styles.container, shadowStyles.shadowXL]}>
      <EmptyListIcon />
      <AppText
        variant={TextVariant.H3}
        style={[styles.text, styles.title]}
        text={'Shelf for your books and other items'}
      />
      <AppText
        variant={TextVariant.BODY_L}
        style={[styles.text, styles.subTitle]}
        text={'Go to the search section and choose the one that suits you'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 75,
    backgroundColor: Color.WHITE,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  title: {
    marginTop: 32,
  },
  subTitle: {
    marginTop: 16,
  },
});
