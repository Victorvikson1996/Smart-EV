import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ChargerType } from '../types';
import { appgreen } from '../constants';

export type ChargerTypeItemProps = {
  chargerType: ChargerType;
  isSelected?: boolean;
  onPress?: () => void;
};

export const ChargerTypeItem = ({
  chargerType,
  isSelected,
  onPress
}: ChargerTypeItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
    >
      <Image source={{ uri: chargerType.image }} style={styles.image} />
      <Text style={[styles.name, isSelected && styles.selectedText]}>
        {chargerType.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderRadius: 8
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  name: {
    fontSize: 18
  },
  selectedContainer: {
    backgroundColor: `${appgreen}20`,
    borderWidth: 1,
    borderColor: appgreen
  },
  selectedText: {
    fontWeight: 'bold',
    color: appgreen
  }
});
