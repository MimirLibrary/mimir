import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ButtonIcon } from './ButtonIcon';
import { MenuIcon } from './icons/MenuIcon';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { FormTextInput } from './forms/FormTextInput';
import { Color, shadowVariants } from '../config/designTokens';
import { textVariants } from '../config/textVariants';
import { FilterIcon } from './icons/FilterIcon';

interface HeaderProps {
  navigation: DrawerNavigationHelpers;
  style?: StyleProp<ViewStyle>;
  openModal: () => void;
}

export const Header: FC<HeaderProps> = ({ navigation, style, openModal }) => {
  return (
    <View style={[styles.container, style]}>
      <ButtonIcon icon={<MenuIcon />} onPress={navigation.openDrawer} />
      <FormTextInput
        placeholderTextColor={Color.ACCENT_GRAY_50}
        onChangeText={() => {}}
        onBlur={() => {}}
        value={''}
        placeholder={'Search'}
        style={styles.searchContainer}
      />
      <ButtonIcon icon={<FilterIcon />} onPress={openModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Color.WHITE,
    overflow: 'hidden',
    padding: 14,
    ...shadowVariants.shadowXL,
  },
  searchContainer: { flexGrow: 1, marginHorizontal: 16, paddingVertical: 8 },
  searchInput: textVariants.bodyL,
});
