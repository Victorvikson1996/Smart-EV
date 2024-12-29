import { View, Text, Platform } from 'react-native';
import React from 'react';
import { TabNavigationState } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabIcon } from '../components';
import {
  MapScreen,
  Reservation,
  SectionScreen,
  ProfileScrreen
} from '../screens/AppScreen';
import { greenB, lightGrey } from '../constants';

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,

        tabBarIcon: ({ focused, color, size }) => (
          <TabIcon
            routeName={route.name}
            focused={focused}
            color={color}
            size={size}
          />
        ),
        tabBarActiveTintColor: greenB,
        tabBarInactiveTintColor: lightGrey,
        headerShown: false,

        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          // elevation: 5,
          height: Platform.OS === 'ios' ? 100 : 100,
          paddingTop: 10
        }
      })}
    >
      <Tab.Screen name='Map' component={MapScreen} />
      <Tab.Screen name='Successions' component={SectionScreen} />
      <Tab.Screen name='Reservation' component={Reservation} />
      <Tab.Screen name='Profile' component={ProfileScrreen} />
    </Tab.Navigator>
  );
};
