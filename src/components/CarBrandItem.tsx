import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { CarBrand } from '../types';
import { AuthNavigationProp } from '../Navigation/types';

export type CarBrandItemProps = {
  brand: CarBrand;
  navigation: AuthNavigationProp<'CarBrand'>;
};

export const CarBrandItem = ({ brand, navigation }: CarBrandItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('CarBrandDetails', {
          brandId: brand.id,
          models: brand.models.map((model) => model.name)
        })
      }
    >
      <Image source={{ uri: brand.image }} style={styles.image} />
      <Text style={styles.name}>{brand.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
