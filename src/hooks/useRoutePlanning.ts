import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { fetchRoute } from '../api';
import { fetchChargingStops } from '../api/chargingStations';
import { ChargingStation, Coordinates, Route, Vehicle } from '../types';

export const useRoutePlanning = () => {
  const [routeData, setRouteData] = useState<Route | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const planRoute = useCallback(
    async (
      origin: Coordinates,
      destination: Coordinates,
      vehicle: Vehicle | null,
      mapRef: React.RefObject<any>,
      stations: ChargingStation[]
    ) => {
      setIsLoading(true);
      try {
        const distanceKm = calculateDistance(
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

        let chargingStops: ChargingStation[] = [];
        if (vehicle && distanceKm > vehicle.batteryCapacityKwh * 4 * 0.8) {
          chargingStops = await fetchChargingStops(
            origin,
            destination,
            vehicle
          );
        }

        const data = await fetchRoute(
          origin,
          destination,
          chargingStops.map((stop) => ({
            latitude: stop.latitude,
            longitude: stop.longitude
          }))
        );

        if (!data.routes?.length || !data.routes[0].legs?.length) {
          Alert.alert('Error', 'Unable to find a driving route.');
          return;
        }

        const routeInfo = data.routes[0];
        const coordinates = routeInfo.legs[0].steps.map((step) => ({
          latitude: step.start_location.latitude,
          longitude: step.start_location.longitude
        }));
        const distance = routeInfo.legs[0].distance.text;
        const duration = routeInfo.legs[0].duration.text;

        setRouteData({
          coordinates,
          distance,
          duration,
          chargingStops: chargingStops.map((stop) => ({
            latitude: stop.latitude,
            longitude: stop.longitude,
            name: stop.name
          }))
        });

        mapRef.current?.fitToCoordinates(
          [
            { latitude: origin.latitude, longitude: origin.longitude },
            {
              latitude: destination.latitude,
              longitude: destination.longitude
            },
            ...stations.map((s) => ({
              latitude: s.latitude,
              longitude: s.longitude
            })),
            ...chargingStops.map((s) => ({
              latitude: s.latitude,
              longitude: s.longitude
            }))
          ],
          { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 } }
        );
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Failed to plan route.');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearRoute = useCallback(() => {
    setRouteData(null);
  }, []);

  return { routeData, planRoute, clearRoute, isLoading };
};

// import { useCallback, useState } from 'react';
// import { Alert } from 'react-native';
// import { fetchRoute } from '../api/googleMaps';
// import { fetchChargingStopsAlongRoute } from '../api/chargingStations';
// import { Coordinates, Route, Vehicle, ChargingStation } from '../types';

// export const useRoutePlanning = () => {
//   const [routeData, setRouteData] = useState<Route | null>(null);

//   const planRoute = useCallback(
//     async (
//       origin: Coordinates,
//       destination: Coordinates,
//       vehicle: Vehicle | null,
//       mapRef: React.MutableRefObject<any>
//     ) => {
//       try {
//         const distanceKm = getDistance(
//           origin.latitude,
//           origin.longitude,
//           destination.latitude,
//           destination.longitude
//         );
//         if (distanceKm > 1000) {
//           Alert.alert(
//             'Long Distance',
//             'The destination is too far for a driving route.'
//           );
//           return;
//         }

//         let chargingStops: ChargingStation[] = [];
//         if (vehicle) {
//           const rangeKm = vehicle.batteryCapacityKwh * 4;
//           if (distanceKm > rangeKm * 0.8) {
//             chargingStops = await fetchChargingStopsAlongRoute(
//               origin,
//               destination,
//               vehicle
//             );
//           }
//         }

//         const stopCoords = chargingStops.map((stop) => ({
//           latitude: stop.latitude,
//           longitude: stop.longitude,
//           name: stop.name
//         }));
//         const data = await fetchRoute(origin, destination, stopCoords);

//         if (!data.routes?.length) {
//           Alert.alert('No Route Found', 'Unable to find a driving route.');
//           return;
//         }

//         const route = data.routes[0];
//         const coordinates = route.legs[0].steps.map((step) => ({
//           latitude: step.start_location.latitude,
//           longitude: step.start_location.longitude
//         }));
//         const distance = route.legs[0].distance.text;
//         const duration = route.legs[0].duration.text;

//         setRouteData({
//           coordinates,
//           distance,
//           duration,
//           chargingStops: stopCoords
//         });

//         mapRef.current?.fitToCoordinates(
//           [
//             origin,
//             destination,
//             ...chargingStops.map((s) => ({
//               latitude: s.latitude,
//               longitude: s.longitude
//             }))
//           ],
//           { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 } }
//         );
//       } catch (error: any) {
//         Alert.alert('Error', error.message || 'Failed to plan route.');
//       }
//     },
//     []
//   );

//   const clearRoute = useCallback(() => {
//     setRouteData(null);
//   }, []);

//   return { routeData, planRoute, clearRoute };
// };

// const getDistance = (
//   lat1: number,
//   lon1: number,
//   lat2: number,
//   lon2: number
// ) => {
//   const R = 6371; // Earth's radius in km
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) *
//       Math.cos(lat2 * (Math.PI / 180)) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };
