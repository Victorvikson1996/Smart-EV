import Constants from 'expo-constants';
import { ChargingStation, Coordinates, Vehicle } from '../types';
import { EV_CAR_BRANDS } from '../constants';

const googleApiKey = Constants.expoConfig?.extra?.googleApiKey || '';

const SUPPORTED_NETWORKS = [
  'Fastned',
  'Monta',
  'Electra',
  'Allego',
  'Izivia',
  'EDF',
  'Total'
];

export const fetchChargingStations = async (
  latitude: number,
  longitude: number,
  vehicle: Vehicle | null
): Promise<ChargingStation[]> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
      new URLSearchParams({
        location: `${latitude},${longitude}`,
        radius: '10000',
        keyword: 'electric vehicle charging station',
        key: googleApiKey
      }).toString()
  );

  if (!response.ok) {
    throw new Error('Failed to fetch charging stations');
  }

  const data = await response.json();
  let stations: ChargingStation[] = data.results.map((place: any) => ({
    id: place.place_id,
    name: place.name,
    latitude: place.geometry.location.lat,
    longitude: place.geometry.location.lng,
    price: 'Unknown',
    chargerTypes: ['CCS', 'CHAdeMO', 'Type 2'],
    address: place.vicinity || 'Unknown Address',
    connectorCount: 7,
    power: '7 kW',
    availability: 'Open 24 hrs',
    network:
      SUPPORTED_NETWORKS.find((network) =>
        place.name.toLowerCase().includes(network.toLowerCase())
      ) || 'Other'
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

export const fetchChargingStops = async (
  start: Coordinates,
  end: Coordinates,
  vehicle: Vehicle | null
): Promise<ChargingStation[]> => {
  const midLat = (start.latitude + end.latitude) / 2;
  const midLon = (start.longitude + end.longitude) / 2;

  const stations = await fetchChargingStations(midLat, midLon, vehicle);
  return stations.slice(0, 2);
};
