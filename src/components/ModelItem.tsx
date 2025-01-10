import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { lightGrey } from '../constants';

type ModelItemProps = {
  model: {
    id: string;
    name: string;
    image: string;
  };
  onPress: () => void;
};

export const ModelItem = ({ model, onPress }: ModelItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: model.image }} style={styles.image} />
      <Text style={styles.name}>{model.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
