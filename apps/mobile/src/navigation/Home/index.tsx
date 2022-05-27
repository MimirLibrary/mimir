import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { SearchScreen } from '../../screens/SearchScreen/SearchScreen';
import React from 'react';
import { MyTabBar } from '../SearchStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationRouteNames } from '../routes';
import { HomeScreen } from '../../screens/HomeScreen';
import { CameraScreen } from '../../screens/CameraScreen';

const Stack = createNativeStackNavigator();

export const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NavigationRouteNames.Home} component={HomeScreen} />
      <Stack.Screen
        name={NavigationRouteNames.Camera}
        component={CameraScreen}
      />
    </Stack.Navigator>
  );
};
