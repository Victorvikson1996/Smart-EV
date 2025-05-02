import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { Coordinates } from '../types';

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    const getLocation = async () => {
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
          Alert.alert(
            'Permission Denied',
            'Location access is required to find charging stations.'
          );
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
        console.error('Error getting location:', error);
        Alert.alert('Error', 'Unable to retrieve your location.');
      }
    };
    getLocation();
  }, []);

  return userLocation;
};
