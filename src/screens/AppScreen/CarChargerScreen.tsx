import { View, Text, StyleSheet, Image, FlatList, Alert } from 'react-native';
import React, { useState, useRef, useCallback } from 'react';
import { AuthNavigationProp, AuthStackParamList } from '../../Navigation/types';
import { EV_CAR_BRANDS, lightGrey } from '../../constants';
import {
  BackHeader,
  Button,
  ChargerTypeItem,
  ContentWrapper
} from '../../components';
import { supabase } from '../../api';
import { ChargerType } from '../../types';
import { useAuth } from '../../api';
import { RouteProp } from '@react-navigation/native';

export type CarChargerScreenProps = {
  route: {
    params: {
      modelId: string;
      brandId: string;
    };
  };
  navigation: AuthNavigationProp<'CarCharger'>;
};

export const CarChargerScreen = ({
  navigation,
  route
}: CarChargerScreenProps) => {
  const { modelId, brandId } = route.params;

  const brand = EV_CAR_BRANDS.find((brand) => brand?.id === brandId);

  const model = EV_CAR_BRANDS.find(
    (brand) => brand.id === brandId
  )?.models.find((model) => model.id === modelId);

  if (!brand || !model) {
    return (
      <ContentWrapper
        style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
      >
        <Text onPress={() => navigation.goBack()} style={{ color: lightGrey }}>
          Brand not found
        </Text>
      </ContentWrapper>
    );
  }

  const chargeSpeed = model?.chargeSpeedKw;
  const typicalChargeSpeed = model?.typicalChargeSpeedKw;
  const batteryCapacity = model?.batteryCapacityKwh;

  // const chargeSpeed = EV_CAR_BRANDS.find(
  //   (brands) => brands.id === brandId
  // )?.models.find((models) => models.id === modelId)?.chargeSpeedKw;

  // const typicalChargeSpeed = EV_CAR_BRANDS.find(
  //   (brands) => brands.id === brandId
  // )?.models.find((models) => models.id === modelId)?.typicalChargeSpeedKw;
  // const batteryCapacity = EV_CAR_BRANDS.find(
  //   (brands) => brands.id === brandId
  // )?.models.find((models) => models.id === modelId)?.batteryCapacityKwh;

  const [selectedChargerType, setSelectedChargerType] =
    useState<ChargerType | null>(null);
  console.log('Selected Charger Type:', selectedChargerType);

  const { user } = useAuth();

  const handleSelectCharger = useCallback((charger: ChargerType) => {
    setSelectedChargerType(charger);
  }, []);

  const handleAddVehicle = async () => {
    if (!selectedChargerType) {
      Alert.alert('Error', 'Please select a charger type.');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'You must be logged in to add a vehicle.');
      return;
    }

    try {
      const carData = {
        user_id: user.id,
        brand_id: brand.id,
        brand_name: brand.name,
        model_id: model.id,
        model_name: model.name,
        battery_capacity_kwh: batteryCapacity,
        charge_speed_kw: chargeSpeed,
        typical_charge_speed_kw: typicalChargeSpeed,
        charger_type: selectedChargerType.name
      };

      const { error } = await supabase.from('cars').insert([carData]);

      if (error) {
        throw error;
      }

      Alert.alert(
        'Vehicle Added!',
        `Your ${brand.name} ${model.name} with ${selectedChargerType.name} has been added to Smartev.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('CarChargerSuccess')
          }
        ]
      );
    } catch (error) {
      console.error('Error adding vehicle:', error);
      Alert.alert('Error', 'Failed to add vehicle. Please try again.');
    }
  };

  return (
    <ContentWrapper style={styles.container}>
      <BackHeader title={model.name} showBack={true} />
      <View style={styles.content}>
        <Image source={{ uri: model.image }} style={styles.modelImage} />
        <Text style={styles.chargerTypesTitle}>Charger Types</Text>
        <FlatList
          data={model.chargerTypes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChargerTypeItem
              isSelected={selectedChargerType?.id === item.id}
              chargerType={item}
              onPress={() => handleSelectCharger(item)}
              // testID={`charger-type-${item.id}`}
            />
          )}
          contentContainerStyle={styles.list}
          extraData={selectedChargerType}
        />
      </View>
      <View style={styles.AddButton}>
        <Button text='Add Vehicle' onPress={handleAddVehicle} />
      </View>
    </ContentWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingHorizontal: 20
  },
  modelImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20
  },
  chargerTypesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  list: {
    paddingVertical: 10
  },
  AddButton: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    padding: 20
  }
});
