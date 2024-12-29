import React from 'react';
import { StyleSheet, TouchableOpacity, type ViewStyle } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { primaryBlue, lightGrey } from '../constants';

interface CheckboxProps {
  selected: boolean;
  onSelect: () => void;
  color?: string;
  style?: ViewStyle | ViewStyle[];
}

export const Checkbox = ({
  selected,
  onSelect,
  color = primaryBlue,
  style
}: CheckboxProps) => (
  <TouchableOpacity
    style={[
      styles.checkbox,
      selected && { borderColor: color, backgroundColor: color },
      style
    ]}
    onPress={onSelect}
  >
    {selected && <Icon color='#fff' size={18} name='check' />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkbox: {
    height: 20,
    width: 20,
    borderColor: lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
  }
});
