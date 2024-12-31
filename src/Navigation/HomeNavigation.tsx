import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StationSearch, ShowSearchResult } from '../screens/StationSearch';
import { CarChargerScreen } from '../screens/AppScreen';
import {
  CharginPrice,
  PlugingandCharge,
  PaymentDetailScreen,
  PaymentInputScreen,
  PaymentMathodScreen,
  PaymentSucess
} from '../screens/Pluging';

const Stack = createNativeStackNavigator();

const headerOptions = { headerShown: false };
const modalHeaderOptions = {
  headerShown: false,
  presentation: 'modal'
};

export const HomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='StationSearch'
        component={StationSearch}
        options={headerOptions}
      />
      <Stack.Screen name='ShowSearchResult' component={ShowSearchResult} />
      <Stack.Screen
        name='CarChargerScreen'
        component={CarChargerScreen}
        options={headerOptions}
      />
      <Stack.Screen name='CharginPrice' component={CharginPrice} />
      <Stack.Screen name='PlugingandCharge' component={PlugingandCharge} />
      <Stack.Screen
        name='PaymentDetailScreen'
        component={PaymentDetailScreen}
      />
      <Stack.Screen name='PaymentInputScreen' component={PaymentInputScreen} />
      <Stack.Screen
        name='PaymentMathodScreen'
        component={PaymentMathodScreen}
      />
      <Stack.Screen name='PaymentSucess' component={PaymentSucess} />
    </Stack.Navigator>
  );
};
