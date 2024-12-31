import { View, Text } from 'react-native';
import React from 'react';
import { SignupScreen, LoginScreen, OtpScreen } from '../screens/AuthScreen';
import {
  AddCar,
  CarBrandScreen,
  CarChargerScreen,
  CarBrandDetailScreen,
  CarChargerSuccess
} from '../screens/AppScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { OnBoard } from '../screens/Onboarding';
import { type NativeStackNavigationOptions } from '@react-navigation/native-stack';

const AuthStack = createStackNavigator();

const headerOptions = { headerShown: false };
const modalHeaderOptions: NativeStackNavigationOptions = {
  headerShown: false,
  presentation: 'modal'
};

export const AuthNavigation = () => {
  return (
    <AuthStack.Navigator screenOptions={headerOptions}>
      <AuthStack.Screen name='Splash' component={OnBoard} />
      <AuthStack.Screen name='Login' component={LoginScreen} />
      <AuthStack.Screen name='Signup' component={SignupScreen} />
      <AuthStack.Screen name='Otp' component={OtpScreen} />
      <AuthStack.Screen name='AddCar' component={AddCar} />
      <AuthStack.Screen name='CarBrand' component={CarBrandScreen} />
      <AuthStack.Screen name='CarCharger' component={CarChargerScreen} />
      <AuthStack.Screen
        name='CarBrandDetail'
        component={CarBrandDetailScreen}
      />
      <AuthStack.Screen
        name='CarChargerSuccess'
        component={CarChargerSuccess}
      />
    </AuthStack.Navigator>
  );
};
