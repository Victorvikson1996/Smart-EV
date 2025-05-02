import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import MapView, {
  Callout,
  Marker,
  Polyline,
  PROVIDER_DEFAULT
} from 'react-native-maps';
import { MainTabNavigationProp } from '../../Navigation/types';
import { RouteProp } from '@react-navigation/native';
import { MainTabParamList } from '../../Navigation/types';
import { supabase } from '../../api';
import { useAuth } from '../../api';
import { appgreen, EV_CAR_BRANDS, red, whiteText } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ChargingStation } from '../../types';
import { Input } from '../../components'; // Adjust path to your Input component
// Adjust path to your Input component

type MapScreenProps = {
  navigation: MainTabNavigationProp<'Map'>;
  route: RouteProp<MainTabParamList, 'Map'>;
};

type Route = {
  coordinates: { latitude: number; longitude: number }[];
  distance: string;
  duration: string;
  chargingStops: { latitude: number; longitude: number; name: string }[];
};

type Vehicle = {
  brandId: string;
  modelId: string;
  chargerType: string;
  batteryCapacityKwh: number;
};

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Destination = {
  latitude: number;
  longitude: number;
  chargingStops?: { latitude: number; longitude: number; name: string }[];
};

type PlaceSuggestion = {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
};

type RecentSearch = {
  place_id: string;
  description: string;
  latitude: number;
  longitude: number;
};

type DirectionsApiResponse = {
  status:
    | 'OK'
    | 'NOT_FOUND'
    | 'ZERO_RESULTS'
    | 'REQUEST_DENIED'
    | 'INVALID_REQUEST'
    | 'OVER_QUERY_LIMIT'
    | 'UNKNOWN_ERROR';
  routes: {
    legs: {
      steps: {
        start_location: Coordinates;
      }[];
      distance: {
        text: string;
      };
      duration: {
        text: string;
      };
    }[];
  }[];
};

const { width, height } = Dimensions.get('window');
const googleApiKey = Constants.expoConfig?.extra?.googleApiKey || '';

const fetchChargingStations = async (
  latitude: number,
  longitude: number,
  vehicle: Vehicle | null
): Promise<ChargingStation[]> => {
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
    chargerTypes: ['CCS', 'CHAdeMO', 'Type 2'],
    address: place.vicinity || 'Unknown Address',
    connectorCount: 7,
    power: '7 kW',
    availability: 'Open 24 hrs'
  }));

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
};

const useChargingStations = (
  latitude: number | null,
  longitude: number | null,
  vehicle: Vehicle | null
) => {
  return useQuery<ChargingStation[], Error>({
    queryKey: [
      'chargingStations',
      latitude ?? 'unknown-latitude',
      longitude ?? 'unknown-longitude',
      vehicle?.brandId ?? 'unknown-brand',
      vehicle?.modelId ?? 'unknown-model'
    ],
    queryFn: () => {
      if (latitude === null || longitude === null) {
        throw new Error('Latitude and longitude must be provided');
      }
      return fetchChargingStations(latitude, longitude, vehicle);
    },
    enabled: !!latitude && !!longitude
  });
};

const fetchRoute = async (
  origin: Coordinates,
  destination: Coordinates,
  chargingStops: { latitude: number; longitude: number; name: string }[] = []
): Promise<DirectionsApiResponse> => {
  try {
    const waypoints = chargingStops
      .map((stop) => `${stop.latitude},${stop.longitude}`)
      .join('|');
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?` +
        new URLSearchParams({
          origin: `${origin.latitude},${origin.longitude}`,
          destination: `${destination.latitude},${destination.longitude}`,
          waypoints: waypoints || '',
          key: googleApiKey
        }).toString()
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: DirectionsApiResponse = await response.json();
    console.log('Directions API response:', JSON.stringify(data));

    if (data.status !== 'OK') {
      const errorMessage =
        {
          NOT_FOUND: 'No route found between the specified locations.',
          ZERO_RESULTS:
            'No valid route available. Try a different destination.',
          REQUEST_DENIED: 'API key is invalid or not authorized.',
          INVALID_REQUEST: 'Invalid request parameters.',
          OVER_QUERY_LIMIT: 'API quota exceeded.',
          UNKNOWN_ERROR: 'An unknown error occurred. Please try again.'
        }[data.status] || `API error: ${data.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('Fetch route error:', error);
    throw error;
  }
};

const fetchPlaceSuggestions = async (
  input: string
): Promise<PlaceSuggestion[]> => {
  if (!input.trim()) return [];
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?` +
        new URLSearchParams({
          input,
          key: googleApiKey,
          language: 'en'
        }).toString()
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    if (data.status !== 'OK') {
      throw new Error(
        data.error_message || 'Failed to fetch place suggestions'
      );
    }

    return data.predictions;
  } catch (error) {
    console.error('Error fetching place suggestions:', error);
    return [];
  }
};

const fetchPlaceDetails = async (
  placeId: string
): Promise<Coordinates | null> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?` +
        new URLSearchParams({
          place_id: placeId,
          fields: 'geometry',
          key: googleApiKey
        }).toString()
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    if (data.status !== 'OK') {
      throw new Error(data.error_message || 'Failed to fetch place details');
    }

    const location = data.result.geometry.location;
    return {
      latitude: location.lat,
      longitude: location.lng
    };
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
};

export const MapScreen: React.FC<MapScreenProps> = ({ navigation, route }) => {
  const { user } = useAuth();
  const mapRef = useRef<MapView>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [mapCenter, setMapCenter] = useState<Coordinates | null>(null);
  const [routeData, setRouteData] = useState<Route | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const { data: stations = [], isLoading } = useChargingStations(
    mapCenter?.latitude ?? userLocation?.latitude ?? null,
    mapCenter?.longitude ?? userLocation?.longitude ?? null,
    vehicle
  );

  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const stored = await AsyncStorage.getItem('recentSearches');
        if (stored) {
          setRecentSearches(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    };
    loadRecentSearches();
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const results = await fetchPlaceSuggestions(searchQuery);
      setSuggestions(results);
    };
    const debounce = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchSuggestions();
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

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
      }
    };
    fetchVehicle();
  }, [user]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Denied',
            'Location access is required to find charging stations.'
          );
          const storedLocation = await AsyncStorage.getItem('lastLocation');
          if (storedLocation) {
            const { latitude, longitude } = JSON.parse(storedLocation);
            setUserLocation({ latitude, longitude });
            setMapCenter({ latitude, longitude });
          } else {
            setUserLocation({ latitude: 37.774929, longitude: -122.419416 });
            setMapCenter({ latitude: 37.774929, longitude: -122.419416 });
          }
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High
        });
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });
        setMapCenter({ latitude, longitude });

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

  useEffect(() => {
    const destination = route.params?.destination;
    if (destination && userLocation) {
      setMapCenter({
        latitude: destination.latitude,
        longitude: destination.longitude
      });
      mapRef.current?.animateToRegion({
        latitude: destination.latitude,
        longitude: destination.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      });
      planRoute(
        userLocation,
        {
          latitude: destination.latitude,
          longitude: destination.longitude
        },
        (destination as Destination).chargingStops || []
      );
    }
  }, [route.params?.destination, userLocation]);

  // const handleSearch = async (item: PlaceSuggestion | RecentSearch) => {
  //   let coordinates: Coordinates;
  //   let description: string;

  //   if ('structured_formatting' in item) {
  //     const placeId = item.place_id;
  //     const coords = await fetchPlaceDetails(placeId);
  //     if (!coords) {
  //       Alert.alert('Error', 'Unable to fetch location details.');
  //       return;
  //     }
  //     coordinates = coords;
  //     description = item.description;
  //   } else {
  //     coordinates = {
  //       latitude: item.latitude,
  //       longitude: item.longitude
  //     };
  //     description = item.description;
  //   }

  //   const destination = coordinates;
  //   setMapCenter(destination);
  //   mapRef.current?.animateToRegion({
  //     latitude: destination.latitude,
  //     longitude: destination.longitude,
  //     latitudeDelta: 0.1,
  //     longitudeDelta: 0.1
  //   });

  //   if (userLocation) {
  //     await planRoute(
  //       userLocation,
  //       {
  //         latitude: destination.latitude,
  //         longitude: destination.longitude
  //       },
  //       (destination as Destination).chargingStops || []
  //     );
  //   }

  //   const newSearch: RecentSearch = {
  //     place_id: item.place_id,
  //     description,
  //     latitude: destination.latitude,
  //     longitude: destination.longitude
  //   };
  //   const updatedSearches = [
  //     newSearch,
  //     ...recentSearches.filter((search) => search.place_id !== item.place_id)
  //   ].slice(0, 5);
  //   setRecentSearches(updatedSearches);
  //   try {
  //     await AsyncStorage.setItem(
  //       'recentSearches',
  //       JSON.stringify(updatedSearches)
  //     );
  //   } catch (error) {
  //     console.error('Error saving recent searches:', error);
  //   }

  //   setSearchQuery('');
  //   setSuggestions([]);
  //   Keyboard.dismiss();
  // };

  const handleSearch = async (item: PlaceSuggestion | RecentSearch) => {
    let coordinates: Coordinates;
    let description: string;

    if ('structured_formatting' in item) {
      const placeId = item.place_id;
      const coords = await fetchPlaceDetails(placeId);
      if (!coords) {
        Alert.alert('Error', 'Unable to fetch location details.');
        return;
      }
      coordinates = coords;
      description = item.description;
    } else {
      coordinates = {
        latitude: item.latitude,
        longitude: item.longitude
      };
      description = item.description;
    }

    const destination = coordinates;
    setMapCenter(destination);
    mapRef.current?.animateToRegion({
      latitude: destination.latitude,
      longitude: destination.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    });

    let chargingStops: { latitude: number; longitude: number; name: string }[] =
      [];
    if (userLocation) {
      const distanceKm = getDistance(
        userLocation.latitude,
        userLocation.longitude,
        destination.latitude,
        destination.longitude
      );
      if (vehicle && distanceKm > vehicle.batteryCapacityKwh * 4 * 0.8) {
        const midpoint = {
          latitude: (userLocation.latitude + destination.latitude) / 2,
          longitude: (userLocation.longitude + destination.longitude) / 2
        };
        const midStations = await fetchChargingStations(
          midpoint.latitude,
          midpoint.longitude,
          vehicle
        );
        chargingStops = midStations.slice(0, 1).map((station) => ({
          latitude: station.latitude,
          longitude: station.longitude,
          name: station.name
        }));
      }

      await planRoute(userLocation, destination, chargingStops);
    }

    const newSearch: RecentSearch = {
      place_id: item.place_id,
      description,
      latitude: destination.latitude,
      longitude: destination.longitude
    };
    const updatedSearches = [
      newSearch,
      ...recentSearches.filter((search) => search.place_id !== item.place_id)
    ].slice(0, 5);
    setRecentSearches(updatedSearches);
    try {
      await AsyncStorage.setItem(
        'recentSearches',
        JSON.stringify(updatedSearches)
      );
    } catch (error) {
      console.error('Error saving recent searches:', error);
    }

    setSearchQuery('');
    setSuggestions([]);
    Keyboard.dismiss();
  };

  // const planRoute = async (
  //   origin: Coordinates,
  //   destination: Coordinates | Destination,
  //   chargingStops: { latitude: number; longitude: number; name: string }[] = []
  // ) => {
  //   if (!userLocation) {
  //     Alert.alert('Error', 'User location not set.');
  //     return;
  //   }

  //   try {
  //     const distanceKm = getDistance(
  //       origin.latitude,
  //       origin.longitude,
  //       destination.latitude,
  //       destination.longitude
  //     );
  //     if (distanceKm > 1000) {
  //       Alert.alert(
  //         'Long Distance',
  //         'The destination is too far for a driving route. Try a closer location.'
  //       );
  //       return;
  //     }

  //     const data = await fetchRoute(origin, destination, chargingStops);

  //     if (!data.routes || data.routes.length === 0) {
  //       Alert.alert(
  //         'No Route Found',
  //         'Unable to find a driving route. Please try a different destination.'
  //       );
  //       return;
  //     }

  //     const routeData = data.routes[0];
  //     if (!routeData.legs || routeData.legs.length === 0) {
  //       Alert.alert('Error', 'Invalid route data received from the server.');
  //       return;
  //     }

  //     const coordinates = routeData.legs[0].steps.map((step) => ({
  //       latitude: step.start_location.latitude,
  //       longitude: step.start_location.longitude
  //     }));
  //     const distance = routeData.legs[0].distance.text;
  //     const duration = routeData.legs[0].duration.text;

  //     let additionalStops: {
  //       latitude: number;
  //       longitude: number;
  //       name: string;
  //     }[] = chargingStops;
  //     if (vehicle && !chargingStops.length) {
  //       const distanceKm = parseFloat(distance.split(' ')[0]);
  //       const rangeKm = vehicle.batteryCapacityKwh * 4;
  //       if (distanceKm > rangeKm * 0.8) {
  //         const midpoint = coordinates[Math.floor(coordinates.length / 2)];
  //         const midStations = await fetchChargingStations(
  //           midpoint.latitude,
  //           midpoint.longitude,
  //           vehicle
  //         );
  //         additionalStops = midStations.slice(0, 1).map((station) => ({
  //           latitude: station.latitude,
  //           longitude: station.longitude,
  //           name: station.name
  //         }));
  //       }
  //     }

  //     setRouteData({
  //       coordinates,
  //       distance,
  //       duration,
  //       chargingStops: additionalStops
  //     });

  //     mapRef.current?.fitToCoordinates(
  //       [
  //         { latitude: origin.latitude, longitude: origin.longitude },
  //         { latitude: destination.latitude, longitude: destination.longitude },
  //         ...stations.map((s) => ({
  //           latitude: s.latitude,
  //           longitude: s.longitude
  //         })),
  //         ...additionalStops.map((s) => ({
  //           latitude: s.latitude,
  //           longitude: s.longitude
  //         }))
  //       ],
  //       { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 } }
  //     );
  //   } catch (error: any) {
  //     console.error('Error planning route:', error.message);
  //     Alert.alert(
  //       'Error',
  //       error.message || 'Failed to plan route. Please try again.'
  //     );
  //   }
  // };

  const planRoute = async (
    origin: Coordinates,
    destination: Coordinates | Destination,
    chargingStops: { latitude: number; longitude: number; name: string }[] = []
  ) => {
    if (!userLocation) {
      Alert.alert('Error', 'User location not set.');
      return;
    }

    try {
      const distanceKm = getDistance(
        origin.latitude,
        origin.longitude,
        destination.latitude,
        destination.longitude
      );
      if (distanceKm > 1000) {
        Alert.alert(
          'Long Distance',
          'The destination is too far for a driving route. Try a closer location.'
        );
        return;
      }

      const data = await fetchRoute(origin, destination, chargingStops);

      if (!data.routes || data.routes.length === 0) {
        Alert.alert(
          'No Route Found',
          'Unable to find a driving route. Please try a different destination.'
        );
        return;
      }

      const routeData = data.routes[0];
      if (!routeData.legs || routeData.legs.length === 0) {
        Alert.alert('Error', 'Invalid route data received from the server.');
        return;
      }

      const coordinates = routeData.legs[0].steps.map((step) => ({
        latitude: step.start_location.latitude, // Corrected to 'lat'
        longitude: step.start_location.longitude // Corrected to 'lng'
      }));
      const distance = routeData.legs[0].distance.text;
      const duration = routeData.legs[0].duration.text;

      // Use provided chargingStops or calculate new ones if none provided
      let finalChargingStops = chargingStops;
      if (vehicle && !chargingStops.length) {
        const distanceKm = parseFloat(distance.split(' ')[0]);
        const rangeKm = vehicle.batteryCapacityKwh * 4;
        if (distanceKm > rangeKm * 0.8) {
          const midpoint = coordinates[Math.floor(coordinates.length / 2)];
          const midStations = await fetchChargingStations(
            midpoint.latitude,
            midpoint.longitude,
            vehicle
          );
          finalChargingStops = midStations.slice(0, 1).map((station) => ({
            latitude: station.latitude,
            longitude: station.longitude,
            name: station.name
          }));
        }
      }

      setRouteData({
        coordinates,
        distance,
        duration,
        chargingStops: finalChargingStops
      });

      mapRef.current?.fitToCoordinates(
        [
          { latitude: origin.latitude, longitude: origin.longitude },
          { latitude: destination.latitude, longitude: destination.longitude },
          ...stations.map((s) => ({
            latitude: s.latitude,
            longitude: s.longitude
          })),
          ...finalChargingStops.map((s) => ({
            latitude: s.latitude,
            longitude: s.longitude
          }))
        ],
        { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 } }
      );
    } catch (error: any) {
      console.error('Error planning route:', error.message);
      Alert.alert(
        'Error',
        error.message || 'Failed to plan route. Please try again.'
      );
    }
  };

  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const handleMarkerPress = useCallback(
    (station: ChargingStation) => {
      navigation.navigate('StationDetailsModal', { station });
    },
    [navigation]
  );

  const clearRoute = () => {
    setRouteData(null);
    setMapCenter(userLocation);
    mapRef.current?.animateToRegion({
      latitude: userLocation?.latitude ?? 37.774929,
      longitude: userLocation?.longitude ?? -122.419416,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    });
  };

  const renderSuggestion = ({
    item
  }: {
    item: PlaceSuggestion | RecentSearch;
  }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSearch(item)}
    >
      <Icon
        name={'structured_formatting' in item ? 'place' : 'history'}
        size={20}
        color='#666'
        style={styles.suggestionIcon}
      />
      <View>
        <Text style={styles.suggestionMainText}>
          {'structured_formatting' in item
            ? item.structured_formatting.main_text
            : item.description}
        </Text>
        {'structured_formatting' in item && (
          <Text style={styles.suggestionSecondaryText}>
            {item.structured_formatting.secondary_text}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const dataToDisplay =
    searchQuery.trim() || !isInputFocused ? suggestions : recentSearches;

  return (
    <View style={styles.container}>
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
          mapCenter
            ? {
                latitude: mapCenter.latitude,
                longitude: mapCenter.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
              }
            : undefined
        }
        showsUserLocation
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
            <Callout>
              <Text>{station.name}</Text>
            </Callout>
          </Marker>
        ))}
        {routeData?.chargingStops.map((stop, index) => (
          <Marker
            key={`stop-${index}`}
            coordinate={{
              latitude: stop.latitude,
              longitude: stop.longitude
            }}
            pinColor='#FFD700' // Yellow for charging stops
          >
            <Callout>
              <Text>Charging Stop: {stop.name}</Text>
            </Callout>
          </Marker>
        ))}
        {routeData && (
          <Polyline
            coordinates={routeData.coordinates}
            strokeColor='#FFD700'
            strokeWidth={3}
          />
        )}
      </MapView>
      <View style={styles.searchContainer}>
        <Input
          placeholder='Search for destination'
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
          LeftComponent={<Icon name='search' size={20} color='#888' />}
          style={styles.searchInputContainer}
          inputStyle={styles.searchInput}
        />
        {(isInputFocused || searchQuery.trim()) && (
          <FlatList
            data={dataToDisplay}
            renderItem={renderSuggestion}
            keyExtractor={(item) => item.place_id}
            style={styles.suggestionList}
            keyboardShouldPersistTaps='handled'
            ListEmptyComponent={
              <Text style={styles.noResultsText}>
                {searchQuery.trim() ? 'No results found' : 'No recent searches'}
              </Text>
            }
          />
        )}
      </View>
      {routeData && (
        <TouchableOpacity style={styles.clearButton} onPress={clearRoute}>
          <Text style={styles.clearButtonText}>Clear Route</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width,
    height
  },
  searchContainer: {
    position: 'absolute',
    top: 100,
    left: 10,
    right: 10
  },
  searchInputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  searchInput: {
    fontSize: 16
  },
  suggestionList: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginTop: 5,
    maxHeight: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  suggestionIcon: {
    marginRight: 10
  },
  suggestionMainText: {
    fontSize: 16,
    color: '#333'
  },
  suggestionSecondaryText: {
    fontSize: 14,
    color: '#666'
  },
  noResultsText: {
    padding: 10,
    textAlign: 'center',
    color: '#666'
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
  },
  loadingText: {
    color: '#FFF',
    fontSize: 18
  },
  clearButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: appgreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25
  },
  clearButtonText: {
    color: whiteText,
    fontSize: 16,
    fontWeight: 'bold'
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: 'yellow'
  }
});
