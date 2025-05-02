// api.ts

import axios from 'axios';

const BASE_URL = 'https://api.ev-database.org/v1/';
const API_KEY = 'YOUR_API_KEY';

// Define the types for the EV data
interface ChargerType {
  id: string;
  name: string;
  image: string;
}

interface EVModel {
  id: string;
  name: string;
  image: string;
  chargerTypes: ChargerType[];
  batteryCapacityKwh: number;
}

interface CarBrand {
  id: string;
  name: string;
  image: string;
  models: EVModel[];
}

// Function to fetch EV data
export const fetchEVData = async (): Promise<CarBrand[]> => {
  try {
    const response = await axios.get(`${BASE_URL}vehicles`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });

    // Process and return the data in the desired format
    const data = response.data.map((brand: CarBrand) => ({
      id: brand.id,
      name: brand.name,
      image: brand.image,
      models: brand.models.map((model: EVModel) => ({
        id: model.id,
        name: model.name,
        image: model.image,
        chargerTypes: model.chargerTypes.map((charger: ChargerType) => ({
          id: charger.id,
          name: charger.name,
          image: charger.image
        })),
        batteryCapacityKwh: model.batteryCapacityKwh
      }))
    }));

    return data;
  } catch (error) {
    console.error('Error fetching EV data:', error);
    throw error;
  }
};
