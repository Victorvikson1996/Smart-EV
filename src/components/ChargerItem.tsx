import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type ChargerTypeItemProps = {
  chargerType: {
    id: string;
    name: string;
    image: string;
  };
};

export const ChargerTypeItem = ({ chargerType }: ChargerTypeItemProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: chargerType.image }} style={styles.image} />
      <Text style={styles.name}>{chargerType.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  name: {
    fontSize: 18
  }
});
