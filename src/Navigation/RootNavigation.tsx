import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigation } from './TabNavigation';
import { AuthNavigation } from './AuthNavigation';
import { HomeNavigation } from './HomeNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../api';

const Stack = createStackNavigator();

const headerOptions = { headerShown: false };

export const RootNavigation = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={headerOptions}>
        <Stack.Screen name='Auth' component={AuthNavigation} />
        <Stack.Screen name='Tab' component={TabNavigation} />
        <Stack.Screen name='Home' component={HomeNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
