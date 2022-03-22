/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Start } from '../screens/Start';
import { CameraView } from '../screens/CameraView';

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Camera" component={CameraView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
