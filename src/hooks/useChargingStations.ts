import { useQuery } from '@tanstack/react-query';
import { fetchChargingStations } from '../api/chargingStations';
import { ChargingStation, Vehicle } from '../types';

export const useChargingStations = (
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

// import { useQuery } from '@tanstack/react-query';
// import { fetchChargingStations } from '../api/chargingStations';
// import { ChargingStation, Vehicle } from '../types';

// export const useChargingStations = (
//   latitude: number | null,
//   longitude: number | null,
//   vehicle: Vehicle | null
// ) => {
//   return useQuery<ChargingStation[], Error>({
//     queryKey: [
//       'chargingStations',
//       latitude ?? 'unknown-latitude',
//       longitude ?? 'unknown-longitude',
//       vehicle?.brandId ?? 'unknown-brand',
//       vehicle?.modelId ?? 'unknown-model'
//     ],
//     queryFn: () => {
//       if (latitude === null || longitude === null) {
//         throw new Error('Latitude and longitude must be provided');
//       }
//       return fetchChargingStations(latitude, longitude, vehicle);
//     },
//     enabled: !!latitude && !!longitude
//   });
// };
