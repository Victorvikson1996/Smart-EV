import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MainTabNavigationProp } from '../../Navigation/types';
import { supabase, useAuth } from '../../api';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { appgreen, EV_CAR_BRANDS } from '../../constants';
import * as Location from 'expo-location';

import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useQuery } from '@tanstack/react-query';
import { ChargingStation, Route, Vehicle } from '../../types';
import { AxiosError } from 'axios';
import { ContentWrapper, StationCard } from '../../components';

const googleApiKey = Constants.expoConfig?.extra?.googleApiKey || '';

const { width, height } = Dimensions.get('window');

const fetchChargingStations = async (
  latitude: number,
  longitude: number,
  vehicle: Vehicle | null
): Promise<ChargingStation[]> => {
  if (!vehicle) {
    return [];
  }
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
      new URLSearchParams({
        location: `${latitude},${longitude}`,
        radius: '5000',
        keyword: 'electric vehicle charging station',
        key: googleApiKey
      }).toString()
  );

  if (!response.ok) {
    throw new Error('Failed to fetch charging stations');
  }

  const data = await response.json();
  const places = data.results;

  let stations: ChargingStation[] = places.map((place: any) => ({
    id: place.place_id,
    name: place.name,
    latitude: place.geometry.location.lat,
    longitude: place.geometry.location.lng,
    price: 'Unknown',
    // Placeholder charger types (since API may not provide this)
    chargerTypes: ['CCS', 'CHAdeMO', 'Type 2'] // Adjust based on real data
  }));

  // Filter by charger type if vehicle is provided
  if (vehicle) {
    const brand = EV_CAR_BRANDS.find((b) => b.id === vehicle.brandId);
    const model = brand?.models.find((m) => m.id === vehicle.modelId);
    const compatibleChargerTypes = model?.chargerTypes.map(
      (c: any) => c.name
    ) || [vehicle.chargerType];

    stations = stations.filter((station) =>
      station.chargerTypes?.some((type) =>
        compatibleChargerTypes.includes(type)
      )
    );
  }

  return stations;

  // const compatibleStations: ChargingStation[] = places
  //   .map((place: any) => {
  //     const brand = EV_CAR_BRANDS.find((b) => b.id === vehicle.brandId);
  //     const model = brand?.models.find((m) => m.id === vehicle.modelId);
  //     const chargerTypes = model?.chargerTypes.map((c: any) => c.name) || [];

  //     return {
  //       id: place.place_id,
  //       name: place.name,
  //       latitude: place.geometry.location.lat,
  //       longitude: place.geometry.location.lng,
  //       price: 'Unknown',
  //       chargerTypes
  //     };
  //   })
  //   .filter((station: ChargingStation) =>
  //     station.chargerTypes.includes(vehicle.chargerType)
  //   );

  // return compatibleStations;
};

const useChargingStations = (
  latitude: number | null,
  longitude: number | null,
  vehicle: Vehicle | null
) => {
  return useQuery<ChargingStation[], AxiosError>({
    queryKey: [
      'chargingStations',
      latitude,
      longitude,
      vehicle?.brandId,
      vehicle?.modelId
    ],
    queryFn: () => fetchChargingStations(latitude!, longitude!, vehicle),
    enabled: !!latitude && !!longitude,
    throwOnError: true
    // onError: (error: AxiosError) => {
    //   console.error('Error fetching stations:', error);
    //   Alert.alert('Error', 'Failed to load charging stations.');
    // }
  });
};

const fetchRoute = async (
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number }
) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?` +
      new URLSearchParams({
        origin: `${origin.latitude},${origin.longitude}`,
        destination: `${destination.latitude},${destination.longitude}`,
        key: googleApiKey
      }).toString()
  );

  if (!response.ok) {
    throw new Error('Failed to fetch route');
  }

  return response.json();
};

type MapScreenProps = {
  navigation: MainTabNavigationProp<'Map'>;
};

export const MapScreen = ({ navigation }: MapScreenProps) => {
  const { user } = useAuth();

  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [selectedStation, setSelectedStation] =
    useState<ChargingStation | null>(null);
  const [route, setRoute] = useState<Route | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  const { data: stations = [], isLoading } = useChargingStations(
    userLocation?.latitude ?? null,
    userLocation?.longitude ?? null,
    vehicle
  );

  const snapPoints = ['20%', '50%'];

  // Fetch user's selected vehicle
  useEffect(() => {
    const fetchVehicle = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('brand_id, model_id, charger_type, battery_capacity_kwh')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) throw error;
        if (data && data.length > 0) {
          const selectedVehicle = data[0];
          setVehicle({
            brandId: selectedVehicle.brand_id,
            modelId: selectedVehicle.model_id,
            chargerType: selectedVehicle.charger_type,
            batteryCapacityKwh: selectedVehicle.battery_capacity_kwh
          });
        }
      } catch (error) {
        console.error('Error fetching vehicle:', error);
        Alert.alert('Error', 'Please add a vehicle in your profile.');
      }
    };
    fetchVehicle();
  }, [user]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Denied',
            'Location access is required to find charging stations.'
          );
          // Fallback to AsyncStorage
          const storedLocation = await AsyncStorage.getItem('lastLocation');
          if (storedLocation) {
            const { latitude, longitude } = JSON.parse(storedLocation);
            setUserLocation({ latitude, longitude });
          }
          return;
        }

        // Get current position
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High
        });
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });

        // Save to AsyncStorage
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

  const handleSearch = async (data: any, details: any) => {
    if (!userLocation) {
      Alert.alert('Error', 'Location or vehicle not set.');
      return;
    }
    const destination = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng
    };
    await planRoute(userLocation, destination);
  };

  const planRoute = async (
    origin: { latitude: number; longitude: number },
    destination: { latitude: number; longitude: number }
  ) => {
    if (!vehicle) {
      Alert.alert('Error', 'Please add a vehicle to plan a route.');
      return;
    }
    try {
      const data = await fetchRoute(origin, destination);
      const routeData = data.routes[0];
      const coordinates = routeData.legs[0].steps.map((step: any) => ({
        latitude: step.start_location.lat,
        longitude: step.start_location.lng
      }));
      const distance = routeData.legs[0].distance.text;
      const duration = routeData.legs[0].duration.text;

      const distanceKm = parseFloat(distance.split(' ')[0]);
      const rangeKm = vehicle.batteryCapacityKwh * 4;
      let chargingStops: ChargingStation[] = [];
      if (distanceKm > rangeKm * 0.8) {
        const midpoint = coordinates[Math.floor(coordinates.length / 2)];
        const midStations = await fetchChargingStations(
          midpoint.latitude,
          midpoint.longitude,
          vehicle
        );
        chargingStops = midStations.slice(0, 1);
      }

      setRoute({ coordinates, distance, duration, chargingStops });
      mapRef.current?.fitToCoordinates(
        [
          { latitude: origin.latitude, longitude: origin.longitude },
          { latitude: destination.latitude, longitude: destination.longitude },
          ...chargingStops.map((s) => ({
            latitude: s.latitude,
            longitude: s.longitude
          }))
        ],
        { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 } }
      );
    } catch (error) {
      console.error('Error planning route:', error);
      Alert.alert('Error', 'Failed to plan route.');
    }
  };

  // Handle marker press
  const handleMarkerPress = useCallback((station: ChargingStation) => {
    setSelectedStation(station);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  // Handle view details
  const handleViewDetails = useCallback(
    (stationId: string) => {
      // navigation.navigate('SectionScreen', { stationId });
    },
    [navigation]
  );

  // Handle close bottom sheet
  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <ContentWrapper style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Loading stations...</Text>
        </View>
      )}
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={
          userLocation
            ? {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
              }
            : undefined
        }
        showsUserLocation
        // customMapStyle={uberMapStyle}
      >
        {stations.map((station) => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude
            }}
            onPress={() => handleMarkerPress(station)}
          >
            <Icon name='ev-station' size={30} color={appgreen} />
          </Marker>
        ))}
        {route && (
          <Polyline
            coordinates={route.coordinates}
            strokeColor='#00F'
            strokeWidth={3}
          />
        )}
      </MapView>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder='Search for destination'
          onPress={handleSearch}
          query={{
            key: googleApiKey,
            language: 'en'
          }}
          styles={{
            container: { flex: 0 },
            textInput: styles.searchInput
          }}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={styles.bottomSheetBackground}
      >
        <BottomSheetView>
          <StationCard
            station={selectedStation}
            onViewDetails={handleViewDetails}
            onClose={handleClose}
          />
        </BottomSheetView>
      </BottomSheet>
    </ContentWrapper>
  );
};

export const uberMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#616161' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#c9c9c9' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#e0f7fa' }]
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: width,
    height: height
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10
  },
  searchInput: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    fontSize: 16
  },
  bottomSheetBackground: {
    backgroundColor: '#FFF'
  },
  bottomSheetContent: {
    padding: 20,
    flex: 1
  },
  stationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  stationPrice: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15
  },
  detailsButton: {
    backgroundColor: '#00F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  detailsButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center'
  },
  loadingText: {
    color: '#FFF',
    fontSize: 18
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  }
});
