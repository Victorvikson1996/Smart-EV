import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import { MainTabNavigationProp } from '../../Navigation/types';

const { width, height } = Dimensions.get('window');

type MapScreenProps = {
  navigation: MainTabNavigationProp<'Map'>;
};

export const MapScreen = ({ navigation }: MapScreenProps) => {
  return (
    <View>
      <Text>MapScreen</Text>
    </View>
  );
};
