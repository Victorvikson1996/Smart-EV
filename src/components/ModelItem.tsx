import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import { CarModel } from '../types';
import { appgreen } from '../constants';

export type ModelItemProps = {
  model: CarModel;
  onPress: () => void;
};

export const ModelItem = ({ model, onPress }: ModelItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.view}>
        <Image source={{ uri: model?.image }} style={styles.image} />
        <View style={styles.textView}>
          <Text style={styles.name}>{model?.name}</Text>
          <Text style={styles.chargeInfo}>
            Typical Charge Speed: {model?.typicalChargeSpeedKw} kW
          </Text>
          <Text style={styles.chargeInfo}>
            Battery Capacity: {model?.batteryCapacityKwh} kWh
          </Text>
          <Text style={styles.chargeInfo}>
            Max Charge Speed: {model?.chargeSpeedKw} kW
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff'
    // borderRadius: 8,
    // borderWidth: 0.5,
    // borderColor: appgreen,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,j
    // elevation: 2
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 8
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textView: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  chargeInfo: {
    fontSize: 14,
    color: 'grey'
  }
});
