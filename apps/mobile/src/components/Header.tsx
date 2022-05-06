import React, {FC} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {ButtonIcon} from './ButtonIcon';
import {MenuIcon} from './icons/MenuIcon';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import {FormTextInput} from './forms/FormTextInput';
import {SearchIcon} from './icons/SearchIcon';
import {Color} from '../config/designTokens';

interface HeaderProps {
  navigation: DrawerNavigationHelpers;
  style?: StyleProp<ViewStyle>;
}

export const Header: FC<HeaderProps> = ({navigation, style}) => {
  return (
    <View style={[styles.container, style]}>
      <ButtonIcon icon={<MenuIcon />} onPress={navigation.openDrawer} />
      <FormTextInput
        placeholderTextColor={Color.ACCENT_GRAY_50}
        onChangeText={() => {}}
        onBlur={() => {}}
        value={''}
        placeholder={'Search'}
        icon={<SearchIcon style={{width: 24}} color={Color.ACCENT_GRAY_50} />}
        containerStyle={styles.searchContainer}
        style={styles.searchInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  searchContainer: {flexGrow: 1, marginLeft: 32, paddingVertical: 8},
  searchInput: {marginLeft: 8},
});
