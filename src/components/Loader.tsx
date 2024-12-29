import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle
} from 'react-native';
import { apppurple } from '../constants';

type LoaderProps = {
  size?: 'small' | 'large';
  color?: string;
  backgroundColor?: string;
  inline?: boolean;
  style?: ViewStyle | ViewStyle[];
};

export const Loader = ({
  size = 'large',
  color = apppurple,
  backgroundColor = '#fff',
  inline = false,
  style
}: LoaderProps) => {
  return (
    <View
      style={[
        styles.container,
        !inline && { flex: 1 },
        { backgroundColor },
        style
      ]}
    >
      <ActivityIndicator size={size} animating color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
