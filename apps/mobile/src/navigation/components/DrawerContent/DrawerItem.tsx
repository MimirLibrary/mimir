import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Color} from '../../../config/designTokens';
import {AppText} from '../../../components/AppText';
import {TextVariant} from '../../../config/textVariants';
import {Fonts} from '../../../assets/fonts';

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
}: DrawerItemProps) => JSX.Element = ({title, action, active, icon}) => (
  <View style={[styles.drawer, active && styles.activeDrawer]}>
    {active && <View style={styles.drawerActiveIndicator} />}
    <TouchableOpacity style={styles.drawerContentContainer} onPress={action}>
      {icon(active ? Color.ACCENT_BLUE_100 : Color.ACCENT_BLACK_100)}
      <AppText
        text={title}
        variant={TextVariant.H3}
        style={active ? styles.activeDrawerLabel : styles.drawerLabel}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  drawerActiveIndicator: {
    position: 'absolute',
    height: '100%',
    width: 4,
    backgroundColor: Color.ACCENT_BLUE_100,
  },
  drawer: {
    flexDirection: 'row',
    backgroundColor: Color.WHITE,
    borderRadius: 0,
    marginHorizontal: 0,
  },
  drawerLabel: {
    marginLeft: 16,
    fontWeight: '400',
  },
  activeDrawer: {
    backgroundColor: Color.ACCENT_BLUE_50,
  },
  activeDrawerLabel: {
    marginLeft: 16,
    fontFamily: Fonts.MontserratSemiBold,
    color: Color.ACCENT_BLUE_100,
  },
  drawerContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 24,
    paddingLeft: 16,
  },
});
