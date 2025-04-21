import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigation } from './TabNavigation';
import { AuthNavigation } from './AuthNavigation';
import { HomeNavigation } from './HomeNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../api';
import { ChargingStation } from '../types';
import { MapScreen, StationDetailsModal } from '../screens/AppScreen';

const Stack = createStackNavigator();

const headerOptions = { headerShown: false };

export const RootNavigation = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={headerOptions}>
        {user ? (
          <>
            <Stack.Screen name='Tab' component={TabNavigation} />
            <Stack.Screen name='Home' component={HomeNavigation} />
            <Stack.Screen
              name='StationDetailsModal'
              component={StationDetailsModal}
              options={{
                presentation: 'modal',
                headerShown: false,
                cardStyle: { backgroundColor: 'transparent' }
              }}
            />
          </>
        ) : (
          <Stack.Screen name='Auth' component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
