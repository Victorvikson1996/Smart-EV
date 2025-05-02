import Constants from 'expo-constants';
import {
  Coordinates,
  DirectionsApiResponse,
  PlaceSuggestion,
  RecentSearch
} from '../types';

const googleApiKey = Constants.expoConfig?.extra?.googleApiKey || '';

export const fetchPlaceSuggestions = async (
  input: string
): Promise<PlaceSuggestion[]> => {
  if (!input.trim()) return [];
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
    throw new Error(data.error_message || 'Failed to fetch place suggestions');
  }

  return data.predictions;
};

export const fetchPlaceDetails = async (
  placeId: string
): Promise<Coordinates | null> => {
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
};

export const fetchRoute = async (
  origin: Coordinates,
  destination: Coordinates,
  chargingStops: Coordinates[] = []
): Promise<DirectionsApiResponse> => {
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
  if (data.status !== 'OK') {
    const errorMessage =
      {
        NOT_FOUND: 'No route found between the specified locations.',
        ZERO_RESULTS: 'No valid route available. Try a different destination.',
        REQUEST_DENIED: 'API key is invalid or not authorized.',
        INVALID_REQUEST: 'Invalid request parameters.',
        OVER_QUERY_LIMIT: 'API quota exceeded.',
        UNKNOWN_ERROR: 'An unknown error occurred. Please try again.'
      }[data.status] || `API error: ${data.status}`;
    throw new Error(errorMessage);
  }

  return data;
};

// import Constants from 'expo-constants';
// import { Coordinates, PlaceSuggestion, DirectionsApiResponse } from '../types';

// const googleApiKey = Constants.expoConfig?.extra?.googleApiKey || '';

// export const fetchPlaceSuggestions = async (
//   input: string
// ): Promise<PlaceSuggestion[]> => {
//   if (!input.trim()) return [];
//   try {
//     const response = await fetch(
//       `https://maps.googleapis.com/maps/api/place/autocomplete/json?` +
//         new URLSearchParams({
//           input,
//           key: googleApiKey,
//           language: 'en'
//         }).toString()
//     );

//     if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
//     const data = await response.json();
//     if (data.status !== 'OK') {
//       throw new Error(
//         data.error_message || 'Failed to fetch place suggestions'
//       );
//     }
//     return data.predictions;
//   } catch (error) {
//     console.error('Error fetching place suggestions:', error);
//     return [];
//   }
// };

// export const fetchPlaceDetails = async (
//   placeId: string
// ): Promise<Coordinates | null> => {
//   try {
//     const response = await fetch(
//       `https://maps.googleapis.com/maps/api/place/details/json?` +
//         new URLSearchParams({
//           place_id: placeId,
//           fields: 'geometry',
//           key: googleApiKey
//         }).toString()
//     );

//     if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
//     const data = await response.json();
//     if (data.status !== 'OK') {
//       throw new Error(data.error_message || 'Failed to fetch place details');
//     }
//     const location = data.result.geometry.location;
//     return { latitude: location.lat, longitude: location.lng };
//   } catch (error) {
//     console.error('Error fetching place details:', error);
//     return null;
//   }
// };

// export const fetchRoute = async (
//   origin: Coordinates,
//   destination: Coordinates,
//   chargingStops: { latitude: number; longitude: number; name: string }[] = []
// ): Promise<DirectionsApiResponse> => {
//   try {
//     const waypoints = chargingStops
//       .map((stop) => `${stop.latitude},${stop.longitude}`)
//       .join('|');
//     const response = await fetch(
//       `https://maps.googleapis.com/maps/api/directions/json?` +
//         new URLSearchParams({
//           origin: `${origin.latitude},${origin.longitude}`,
//           destination: `${destination.latitude},${destination.longitude}`,
//           waypoints: waypoints || '',
//           key: googleApiKey
//         }).toString()
//     );

//     if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
//     const data: DirectionsApiResponse = await response.json();
//     if (data.status !== 'OK') {
//       throw new Error(`API error: ${data.status}`);
//     }
//     return data;
//   } catch (error) {
//     console.error('Fetch route error:', error);
//     throw error;
//   }
// };
