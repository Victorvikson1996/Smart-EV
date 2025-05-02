export type ChargingStation = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  price: string;
  chargerTypes: string[];
  address: string;
  connectorCount: number;
  power: string;
  availability: string;
  network: string;
};

export type Route = {
  coordinates: { latitude: number; longitude: number }[];
  distance: string;
  duration: string;
  // chargingStops: ChargingStation[];
  chargingStops: { latitude: number; longitude: number; name: string }[];
};

export type Vehicle = {
  brandId: string;
  modelId: string;
  chargerType: string;
  batteryCapacityKwh: number;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type PlaceSuggestion = {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
};

export type RecentSearch = {
  place_id: string;
  description: string;
  latitude: number;
  longitude: number;
};

export type DirectionsApiResponse = {
  status: string;
  routes: {
    legs: {
      steps: { start_location: Coordinates }[];
      distance: { text: string };
      duration: { text: string };
    }[];
  }[];
};
