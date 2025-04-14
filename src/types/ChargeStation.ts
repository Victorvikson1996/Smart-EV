export type ChargingStation = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  price?: string;
  chargerTypes: string[];
};

export type Route = {
  coordinates: { latitude: number; longitude: number }[];
  distance: string;
  duration: string;
  chargingStops: ChargingStation[];
};
