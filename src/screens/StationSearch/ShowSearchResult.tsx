import { View, Text } from 'react-native';
import React from 'react';
import { useAuth } from '../../api';

export const ShowSearchResult = () => {
  const { user } = useAuth();

  return (
    <View>
      <Text>ShowSearchResult</Text>
    </View>
  );
};
