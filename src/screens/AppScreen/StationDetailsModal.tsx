import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Linking,
  Platform,
  ActivityIndicator
} from 'react-native';
import { AppNavigationProp } from '../../Navigation/types';
import { RouteProp } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { AppStackParamList } from '../../Navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appgreen, whiteText } from '../../constants';
import { supabase } from '../../api';
import { useAuth } from '../../api';
import { EV_CAR_BRANDS } from '../../constants';
import Constants from 'expo-constants';

type StationDetailsModalProps = {
  navigation: AppNavigationProp<'StationDetailsModal'>;
  route: RouteProp<AppStackParamList, 'StationDetailsModal'>;
};

type Vehicle = {
  brandId: string;
  modelId: string;
  chargerType: string;
  batteryCapacityKwh: number;
};

export const StationDetailsModal = ({
  navigation,
  route
}: StationDetailsModalProps) => {
  const { station } = route.params;
  const { user } = useAuth();
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [distance, setDistance] = useState<string>('Unknown');
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chargingStops, setChargingStops] = useState<
    { latitude: number; longitude: number; name: string }[]
  >([]);

  // Fetch user location and vehicle
  useEffect(() => {
    const getUserData = async () => {
      // Get user location
      const storedLocation = await AsyncStorage.getItem('lastLocation');
      if (storedLocation) {
        const { latitude, longitude } = JSON.parse(storedLocation);
        setUserLocation({ latitude, longitude });

        const calculatedDistance = calculateDistance(
          latitude,
          longitude,
          station.latitude,
          station.longitude
        );
        setDistance(`${calculatedDistance.toFixed(1)} km`);

        // Estimate charging stops based on distance and vehicle range
        if (
          vehicle &&
          calculatedDistance > vehicle.batteryCapacityKwh * 4 * 0.8
        ) {
          const stops = await fetchChargingStops(
            latitude,
            longitude,
            station.latitude,
            station.longitude
          );
          setChargingStops(stops);
        }
      }

      // Get user vehicle
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
    getUserData();
  }, [station.latitude, station.longitude, user, vehicle?.batteryCapacityKwh]);

  // Haversine formula to calculate distance
  const calculateDistance = (
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
    return R * c;
  };

  // Fetch charging stops along the route
  const fetchChargingStops = async (
    startLat: number,
    startLon: number,
    endLat: number,
    endLon: number
  ) => {
    const googleApiKey = Constants.expoConfig?.extra?.googleApiKey || '';
    try {
      // Approximate midpoint for simplicity
      const midLat = (startLat + endLat) / 2;
      const midLon = (startLon + endLon) / 2;

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
          new URLSearchParams({
            location: `${midLat},${midLon}`,
            radius: '10000',
            keyword: 'electric vehicle charging station',
            key: googleApiKey
          }).toString()
      );

      if (!response.ok) {
        throw new Error('Failed to fetch charging stations');
      }

      const data = await response.json();
      return data.results.slice(0, 1).map((place: any) => ({
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        name: place.name
      }));
    } catch (error) {
      console.error('Error fetching charging stops:', error);
      return [];
    }
  };

  // Check charger compatibility
  const isChargerCompatible = () => {
    if (!vehicle || !station.chargerTypes) return 'Unknown';
    const brand = EV_CAR_BRANDS.find((b) => b.id === vehicle.brandId);
    const model = brand?.models.find((m) => m.id === vehicle.modelId);
    const compatibleTypes = model?.chargerTypes.map((c: any) => c.name) || [
      vehicle.chargerType
    ];
    return station.chargerTypes.some((type) => compatibleTypes.includes(type))
      ? 'Compatible'
      : 'Incompatible';
  };

  // Open Google Maps with EV charging stops
  const openGoogleMaps = useCallback(async () => {
    if (!userLocation) {
      Alert.alert('Error', 'User location not available.');
      return;
    }

    setIsLoading(true);
    try {
      let googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${station.latitude},${station.longitude}&travelmode=driving`;
      if (chargingStops.length > 0) {
        const waypoints = chargingStops
          .map((stop) => `${stop.latitude},${stop.longitude}`)
          .join('|');
        googleMapsUrl += `&waypoints=${waypoints}`;
      }

      const supported = await Linking.canOpenURL(googleMapsUrl);
      if (supported) {
        await Linking.openURL(googleMapsUrl);
      } else {
        Alert.alert(
          'Error',
          'Google Maps is not installed. Opening in browser.'
        );
        await Linking.openURL(
          `https://www.google.com/maps/dir/${userLocation.latitude},${
            userLocation.longitude
          }/${station.latitude},${station.longitude}${
            chargingStops.length > 0
              ? `/+${chargingStops
                  .map((stop) => `${stop.latitude},${stop.longitude}`)
                  .join('/')}`
              : ''
          }`
        );
      }
    } catch (error) {
      console.error('Error opening Google Maps:', error);
      Alert.alert('Error', 'Failed to open Google Maps.');
    } finally {
      setIsLoading(false);
      setIsMapModalVisible(false);
    }
  }, [userLocation, station.latitude, station.longitude, chargingStops]);

  // Open Apple Maps (no waypoints support, suggest stops in modal)
  const openAppleMaps = useCallback(async () => {
    if (!userLocation) {
      Alert.alert('Error', 'User location not available.');
      return;
    }

    setIsLoading(true);
    try {
      const appleMapsUrl = `maps://?saddr=${userLocation.latitude},${userLocation.longitude}&daddr=${station.latitude},${station.longitude}&dirflg=d`;

      const supported = await Linking.canOpenURL(appleMapsUrl);
      if (supported) {
        await Linking.openURL(appleMapsUrl);
      } else {
        Alert.alert(
          'Error',
          'Apple Maps is not installed. Please use Google Maps or install Apple Maps.'
        );
      }
    } catch (error) {
      console.error('Error opening Apple Maps:', error);
      Alert.alert('Error', 'Failed to open Apple Maps.');
    } finally {
      setIsLoading(false);
      setIsMapModalVisible(false);
    }
  }, [userLocation, station.latitude, station.longitude]);

  // Handle in-app route planning
  const handleInAppRoute = useCallback(() => {
    navigation.navigate('Map', {
      screen: 'Map',
      params: {
        destination: {
          latitude: station.latitude,
          longitude: station.longitude,
          chargingStops
        }
      }
    });
    setIsMapModalVisible(false);
  }, [navigation, station.latitude, station.longitude, chargingStops]);

  // Show map selection modal
  const handlePlanRoute = useCallback(() => {
    setIsMapModalVisible(true);
  }, []);

  const handleBookNow = useCallback(() => {
    alert('Booking functionality to be implemented!');
  }, []);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          accessible
          accessibilityLabel='Close modal'
        >
          <Icon name='close' size={24} color='#000' />
        </TouchableOpacity>
        <Text style={styles.stationName}>{station.name}</Text>
        <Text style={styles.stationAddress}>
          {station?.address || 'Address not available'}
        </Text>
        <FontAwesome5
          name='charging-station'
          style={styles.stationImage}
          size={50}
          color={appgreen}
        />
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Connection Type & Power</Text>
          <View style={styles.infoRow}>
            <Icon name='bolt' size={20} color={appgreen} />
            <Text style={styles.infoText}>
              Rapid: {station.chargerTypes?.join(', ') || 'Unknown'}
            </Text>
            <Text style={styles.infoText}>⚡ {station.power || '7 kW'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Compatibility:</Text>
            <Text
              style={[
                styles.infoValue,
                isChargerCompatible() === 'Compatible'
                  ? styles.compatible
                  : styles.incompatible
              ]}
            >
              {isChargerCompatible()}
            </Text>
          </View>
        </View>
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Connectors</Text>
              <Text style={styles.infoValue}>
                {station.connectorCount || 'Unknown'}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Distance</Text>
              <Text style={styles.infoValue}>{distance}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Availability</Text>
              <Text style={styles.infoValue}>
                {station.availability || 'Open 24 hrs'}
              </Text>
            </View>
          </View>
        </View>
        {chargingStops.length > 0 && (
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Recommended Charging Stops</Text>
            {chargingStops.map((stop, index) => (
              <Text key={index} style={styles.infoText}>
                • {stop.name} (
                {calculateDistance(
                  userLocation?.latitude || 0,
                  userLocation?.longitude || 0,
                  stop.latitude,
                  stop.longitude
                ).toFixed(1)}{' '}
                km from start)
              </Text>
            ))}
          </View>
        )}
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>{station.price || 'Unknown'}</Text>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleBookNow}
            accessible
            accessibilityLabel='Book charging slot'
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.planRouteButton}
          onPress={handlePlanRoute}
          accessible
          accessibilityLabel='Plan route to this station'
        >
          <Text style={styles.planRouteButtonText}>
            Plan Route to This Station
          </Text>
        </TouchableOpacity>
      </View>

      {/* Map Selection Modal */}
      <Modal
        visible={isMapModalVisible}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setIsMapModalVisible(false)}
      >
        <View style={styles.mapModalContainer}>
          <View style={styles.mapModalContent}>
            <Text style={styles.mapModalTitle}>Choose Navigation Option</Text>
            {isLoading ? (
              <ActivityIndicator size='large' color={appgreen} />
            ) : (
              <>
                <TouchableOpacity
                  style={styles.mapOptionButton}
                  onPress={handleInAppRoute}
                  accessible
                  accessibilityLabel='Plan route in app'
                >
                  <Icon
                    name='map'
                    size={24}
                    color={whiteText}
                    style={styles.mapOptionIcon}
                  />
                  <Text style={styles.mapOptionText}>
                    In-App Route (Recommended)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.mapOptionButton}
                  onPress={openGoogleMaps}
                  accessible
                  accessibilityLabel='Open Google Maps'
                >
                  <FontAwesome5
                    name='google'
                    size={20}
                    color={whiteText}
                    style={styles.mapOptionIcon}
                  />
                  <Text style={styles.mapOptionText}>Google Maps</Text>
                </TouchableOpacity>
                {Platform.OS === 'ios' && (
                  <TouchableOpacity
                    style={styles.mapOptionButton}
                    onPress={openAppleMaps}
                    accessible
                    accessibilityLabel='Open Apple Maps'
                  >
                    <FontAwesome5
                      name='apple'
                      size={20}
                      color={whiteText}
                      style={styles.mapOptionIcon}
                    />
                    <Text style={styles.mapOptionText}>Apple Maps</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setIsMapModalVisible(false)}
                  accessible
                  accessibilityLabel='Cancel'
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%'
  },
  closeButton: {
    alignSelf: 'flex-end'
  },
  stationName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  stationAddress: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15
  },
  stationImage: {
    borderRadius: 10,
    marginBottom: 15,
    marginRight: 20,
    alignSelf: 'flex-end'
  },
  infoSection: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 8
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  infoItem: {
    alignItems: 'center',
    flex: 1
  },
  infoLabel: {
    fontSize: 14,
    color: '#666'
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333'
  },
  compatible: {
    color: appgreen
  },
  incompatible: {
    color: '#D32F2F'
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  bookButton: {
    backgroundColor: appgreen,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25
  },
  bookButtonText: {
    color: whiteText,
    fontSize: 16,
    fontWeight: 'bold'
  },
  planRouteButton: {
    backgroundColor: appgreen,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  planRouteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: whiteText
  },
  mapModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapModalContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    alignItems: 'center'
  },
  mapModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  mapOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appgreen,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10
  },
  mapOptionIcon: {
    marginRight: 10
  },
  mapOptionText: {
    fontSize: 16,
    color: whiteText,
    fontWeight: '600'
  },
  cancelButton: {
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold'
  }
});

// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   Alert,
//   Linking
// } from 'react-native';
// import { AppNavigationProp } from '../../Navigation/types';
// import { RouteProp } from '@react-navigation/native';
// import Icon from '@expo/vector-icons/MaterialIcons';
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
// import { AppStackParamList } from '../../Navigation/types';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { appgreen, whiteText } from '../../constants';

// type StationDetailsModalProps = {
//   navigation: AppNavigationProp<'StationDetailsModal'>;
//   route: RouteProp<AppStackParamList, 'StationDetailsModal'>;
// };

// export const StationDetailsModal = ({
//   navigation,
//   route
// }: StationDetailsModalProps) => {
//   const { station } = route.params;
//   const [userLocation, setUserLocation] = useState<{
//     latitude: number;
//     longitude: number;
//   } | null>(null);
//   const [distance, setDistance] = useState<string>('Unknown');
//   const [isMapModalVisible, setIsMapModalVisible] = useState(false);

//   // Fetch user location from AsyncStorage
//   useEffect(() => {
//     const getUserLocation = async () => {
//       const storedLocation = await AsyncStorage.getItem('lastLocation');
//       if (storedLocation) {
//         const { latitude, longitude } = JSON.parse(storedLocation);
//         setUserLocation({ latitude, longitude });

//         // Calculate distance
//         const calculatedDistance = calculateDistance(
//           latitude,
//           longitude,
//           station.latitude,
//           station.longitude
//         );
//         setDistance(`${calculatedDistance.toFixed(1)} km`);
//       }
//     };
//     getUserLocation();
//   }, [station.latitude, station.longitude]);

//   // Haversine formula to calculate distance
//   const calculateDistance = (
//     lat1: number,
//     lon1: number,
//     lat2: number,
//     lon2: number
//   ) => {
//     const R = 6371; // Earth's radius in km
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * (Math.PI / 180)) *
//         Math.cos(lat2 * (Math.PI / 180)) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   // Open Google Maps
//   const openGoogleMaps = useCallback(async () => {
//     if (!userLocation) {
//       Alert.alert('Error', 'User location not available.');
//       return;
//     }

//     const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${station.latitude},${station.longitude}&travelmode=driving`;

//     try {
//       const supported = await Linking.canOpenURL(googleMapsUrl);
//       if (supported) {
//         await Linking.openURL(googleMapsUrl);
//       } else {
//         Alert.alert(
//           'Error',
//           'Google Maps is not installed. Opening in browser.'
//         );
//         await Linking.openURL(
//           `https://www.google.com/maps/dir/${userLocation.latitude},${userLocation.longitude}/${station.latitude},${station.longitude}`
//         );
//       }
//     } catch (error) {
//       console.error('Error opening Google Maps:', error);
//       Alert.alert('Error', 'Failed to open Google Maps.');
//     }
//   }, [userLocation, station.latitude, station.longitude]);

//   // Open Apple Maps
//   const openAppleMaps = useCallback(async () => {
//     if (!userLocation) {
//       Alert.alert('Error', 'User location not available.');
//       return;
//     }

//     const appleMapsUrl = `maps://?saddr=${userLocation.latitude},${userLocation.longitude}&daddr=${station.latitude},${station.longitude}&dirflg=d`;

//     try {
//       const supported = await Linking.canOpenURL(appleMapsUrl);
//       if (supported) {
//         await Linking.openURL(appleMapsUrl);
//       } else {
//         Alert.alert(
//           'Error',
//           'Apple Maps is not installed. Please use Google Maps or install Apple Maps.'
//         );
//       }
//     } catch (error) {
//       console.error('Error opening Apple Maps:', error);
//       Alert.alert('Error', 'Failed to open Apple Maps.');
//     }
//   }, [userLocation, station.latitude, station.longitude]);

//   // Handle in-app route planning
//   // const handleInAppRoute = useCallback(() => {
//   //   navigation.navigate('Map', {
//   //     screen: 'Map',
//   //     params: {
//   //       destination: {
//   //         latitude: station.latitude,
//   //         longitude: station.longitude
//   //       }
//   //     }
//   //   });
//   //   setIsMapModalVisible(false);
//   // }, [navigation, station.latitude, station.longitude]);

//   // Show map selection modal
//   const handlePlanRoute = useCallback(() => {
//     setIsMapModalVisible(true);
//   }, []);

//   const handleBookNow = useCallback(() => {
//     alert('Booking functionality to be implemented!');
//   }, []);

//   return (
//     <View style={styles.modalContainer}>
//       <View style={styles.modalContent}>
//         <TouchableOpacity
//           style={styles.closeButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Icon name='close' size={24} color='#000' />
//         </TouchableOpacity>
//         <Text style={styles.stationName}>{station.name}</Text>
//         <Text style={styles.stationAddress}>
//           {station?.address || 'Address not available'}
//         </Text>
//         <FontAwesome5
//           name='charging-station'
//           style={styles.stationImage}
//           size={50}
//           color={appgreen}
//         />
//         <View style={styles.infoSection}>
//           <Text style={styles.sectionTitle}>Connection type & power</Text>
//           <View style={styles.infoRow}>
//             <Icon name='bolt' size={20} color='#00C853' />
//             <Text style={styles.infoText}>
//               Rapid: {station.chargerTypes?.join(', ') || 'Unknown'}
//             </Text>
//             <Text style={styles.infoText}>⚡ {station.power || '7 kW'}</Text>
//           </View>
//         </View>
//         <View style={styles.infoSection}>
//           <View style={styles.infoRow}>
//             <View style={styles.infoItem}>
//               <Text style={styles.infoLabel}>Connector</Text>
//               <Text style={styles.infoValue}>
//                 {station.connectorCount || 'Unknown'}
//               </Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Text style={styles.infoLabel}>Distance</Text>
//               <Text style={styles.infoValue}>{distance}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Text style={styles.infoLabel}>Availability</Text>
//               <Text style={styles.infoValue}>
//                 {station.availability || 'Open 24 hrs'}
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.priceRow}>
//           <Text style={styles.priceText}>{station.price || 'Unknown'}</Text>
//           <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
//             <Text style={styles.bookButtonText}>Book Now</Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity
//           style={styles.planRouteButton}
//           onPress={handlePlanRoute}
//         >
//           <Text style={styles.planRouteButtonText}>
//             Plan route to this location
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Map Selection Modal */}
//       <Modal
//         visible={isMapModalVisible}
//         transparent={true}
//         animationType='slide'
//         onRequestClose={() => setIsMapModalVisible(false)}
//       >
//         <View style={styles.mapModalContainer}>
//           <View style={styles.mapModalContent}>
//             <Text style={styles.mapModalTitle}>Choose Navigation App</Text>
//             {/* <TouchableOpacity
//               style={styles.mapOptionButton}
//               onPress={handleInAppRoute}
//             >
//               <Text style={styles.mapOptionText}>In-App (Google Maps)</Text>
//             </TouchableOpacity> */}
//             <TouchableOpacity
//               style={styles.mapOptionButton}
//               onPress={openGoogleMaps}
//             >
//               <Text style={styles.mapOptionText}>Google Maps</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.mapOptionButton}
//               onPress={openAppleMaps}
//             >
//               <Text style={styles.mapOptionText}>Apple Maps</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => setIsMapModalVisible(false)}
//             >
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end'
//   },
//   modalContent: {
//     backgroundColor: '#FFF',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     maxHeight: '80%'
//   },
//   closeButton: {
//     alignSelf: 'flex-end'
//   },
//   stationName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 5
//   },
//   stationAddress: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 15
//   },
//   stationImage: {
//     borderRadius: 10,
//     marginBottom: 15,
//     marginRight: 20,
//     alignSelf: 'flex-end'
//   },
//   infoSection: {
//     marginBottom: 20
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   },
//   infoItem: {
//     alignItems: 'center'
//   },
//   infoLabel: {
//     fontSize: 14,
//     color: '#666'
//   },
//   infoValue: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 5
//   },
//   infoText: {
//     fontSize: 16,
//     marginLeft: 5
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20
//   },
//   priceText: {
//     fontSize: 18,
//     fontWeight: 'bold'
//   },
//   bookButton: {
//     backgroundColor: '#00C853',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 25
//   },
//   bookButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   planRouteButton: {
//     backgroundColor: appgreen,
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center'
//   },
//   planRouteButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: whiteText
//   },
//   mapModalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   mapModalContent: {
//     backgroundColor: '#FFF',
//     borderRadius: 10,
//     padding: 20,
//     width: '80%',
//     alignItems: 'center'
//   },
//   mapModalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20
//   },
//   mapOptionButton: {
//     backgroundColor: appgreen,
//     padding: 15,
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 10
//   },
//   mapOptionText: {
//     fontSize: 16,
//     color: whiteText,
//     fontWeight: 'bold'
//   },
//   cancelButton: {
//     padding: 15,
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//     marginTop: 10
//   },
//   cancelButtonText: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: 'bold'
//   }
// });
