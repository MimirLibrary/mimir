import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Color } from '../../../config/designTokens';
import { AppText } from '../../../components/AppText';
import { TextVariant } from '../../../config/textVariants';
import { Fonts } from '../../../assets/fonts';

interface DrawerItemProps {
  title: string;
  action: () => void;
  active: boolean;
  icon: (color: Color) => JSX.Element;
}

export const DrawerItem: ({
  title,
  action,
  active,
}: DrawerItemProps) => JSX.Element = ({ title, action, active, icon }) => (
  <View style={[styles.drawer, active && styles.activeDrawer]}>
    {/*{active && <View style={styles.drawerActiveIndicator} />}*/}
    <TouchableOpacity style={styles.drawerContentContainer} onPress={action}>
      {icon(active ? Color.WHITE : Color.ACCENT_BLACK_100)}
      <AppText
        text={title}
        variant={TextVariant.H3}
        style={active ? styles.activeDrawerLabel : styles.drawerLabel}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  drawer: {
    flexDirection: 'row',
    backgroundColor: Color.WHITE,
    borderRadius: 0,
    marginHorizontal: 16,
  },
  activeDrawer: {
    backgroundColor: Color.ACCENT_BLUE_100,
    borderRadius: 1000,
  },
  drawerLabel: {
    marginLeft: 16,
    fontFamily: Fonts.MontserratLight,
  },
  activeDrawerLabel: {
    marginLeft: 16,
    fontFamily: Fonts.MontserratSemiBold,
    color: Color.WHITE,
  },
  drawerContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
    paddingLeft: 32,
  },
});
