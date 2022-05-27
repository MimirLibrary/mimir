import { HomeScreen } from '../screens/HomeScreen';
import { NotificationsScreen } from '../screens/NotificationScreen';
import { Color } from '../config/designTokens';
import { HomeIcon } from '../components/icons/HomeIcon';
import React from 'react';
import { NotificationIcon } from '../components/icons/NotificationIcon';
import { DonateIcon } from '../components/icons/DonateIcon';
import { SettingsIcon } from '../components/icons/SettingsIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { BookBookmarkIcon } from '../components/icons/BookBookmarkIcon';
import { DonateHeartIcon } from '../components/icons/DonateHeartIcon';
import { StyleSheet } from 'react-native';
import { DonateScreen } from '../screens/DonateScreen';
import { SearchStack } from './SearchStack';
import { HomeStack } from './Home';

export const NavigationRouteNames = Object.freeze({
  Home: 'HomeScreen',
  HomeStack: 'Home',
  Donate: 'Donate to the library',
  DonateHistory: 'History of Donate',
  Search: 'Search',
  ClaimHistory: 'History of claim',
  Settings: 'Settings',
  Notifications: 'Notification',
  Camera: 'Camera',
});

export const DRAWER_ROUTES = [
  {
    name: NavigationRouteNames.HomeStack,
    Component: HomeStack,
    icon: (color: Color) => <HomeIcon color={color} style={styles.icon} />,
    // options: ROUTE_DEFAULT_OPTION,
  },
  {
    name: NavigationRouteNames.Donate,
    Component: DonateScreen,
    icon: (color: Color) => <DonateIcon color={color} style={styles.icon} />,
  },
  {
    name: NavigationRouteNames.Search,
    Component: SearchStack,
    icon: (color: Color) => <SearchIcon color={color} style={styles.icon} />,
  },
  {
    name: NavigationRouteNames.ClaimHistory,
    Component: HomeScreen,
    icon: (color: Color) => (
      <BookBookmarkIcon color={color} style={styles.icon} />
    ),
  },
  {
    name: NavigationRouteNames.DonateHistory,
    Component: HomeScreen,
    icon: (color: Color) => (
      <DonateHeartIcon color={color} style={styles.icon} />
    ),
  },
  {
    name: NavigationRouteNames.Settings,
    Component: HomeScreen,
    icon: (color: Color) => <SettingsIcon color={color} style={styles.icon} />,
  },
  {
    name: NavigationRouteNames.Notifications,
    Component: NotificationsScreen,
    icon: (color: Color) => (
      <NotificationIcon color={color} style={styles.icon} />
    ),
  },
];

const styles = StyleSheet.create({
  icon: { width: 24 },
});
