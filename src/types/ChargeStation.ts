export type ChargingStation = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  price?: string;
  chargerTypes?: string[];
  address?: string;
  connectorCount?: number;
  power?: string;
  availability?: string;
};

export type Route = {
  coordinates: { latitude: number; longitude: number }[];
  distance: string;
  duration: string;
  chargingStops: ChargingStation[];
};

export type Vehicle = {
  brandId: string;
  modelId: string;
  chargerType: string;
  batteryCapacityKwh: number;
};
