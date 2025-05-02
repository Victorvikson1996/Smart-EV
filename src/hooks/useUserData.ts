import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../api';
import { useAuth } from '../api';
import { Coordinates, Vehicle } from '../types';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export const useUserData = () => {
  const { user } = useAuth();
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      // Fetch user location
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          const storedLocation = await AsyncStorage.getItem('lastLocation');
          if (storedLocation) {
            const { latitude, longitude } = JSON.parse(storedLocation);
            setUserLocation({ latitude, longitude });
          } else {
            setUserLocation({ latitude: 37.774929, longitude: -122.419416 });
          }
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High
        });
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });
        await AsyncStorage.setItem(
          'lastLocation',
          JSON.stringify({ latitude, longitude })
        );
      } catch (error) {
        Alert.alert('Error', 'Unable to retrieve your location.');
      }

      // Fetch user vehicle
      if (user) {
        const { data, error } = await supabase
          .from('cars')
          .select('brand_id, model_id, charger_type, battery_capacity_kwh')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) {
          console.error('Error fetching vehicle:', error);
          return;
        }

        if (data && data.length > 0) {
          setVehicle({
            brandId: data[0].brand_id,
            modelId: data[0].model_id,
            chargerType: data[0].charger_type,
            batteryCapacityKwh: data[0].battery_capacity_kwh
          });
        }
      }
    };

    fetchUserData();
  }, [user]);

  return { userLocation, vehicle };
};
