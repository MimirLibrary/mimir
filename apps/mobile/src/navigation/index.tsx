import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerContent } from './components/DrawerContent';
import { NavigationRouteNames, DRAWER_ROUTES } from './routes';
import { SearchScreen } from '../screens/SearchScreen/SearchScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const { width } = Dimensions.get('screen');
const DRAWER_WIDTH = width * 0.8;

const Drawer = createDrawerNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={NavigationRouteNames.Home}
        drawerContent={DrawerContent}
        // useLegacyImplementation={true}
        screenOptions={{
          drawerStyle: { width: DRAWER_WIDTH },
          headerShown: false,
        }}
      >
        {DRAWER_ROUTES.map(({ name, Component }) => (
          <Drawer.Screen
            name={name}
            key={name}
            options={{ unmountOnBlur: true }}
            component={Component}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
