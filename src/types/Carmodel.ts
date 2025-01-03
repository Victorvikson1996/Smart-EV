export interface ChargerType {
  id: string;
  name: string;
  image: string;
}

export interface CarModel {
  id: string;
  name: string;
  image: string;
  chargerTypes: ChargerType[];
}

export interface CarBrand {
  id: string;
  name: string;
  image: string;
  models: CarModel[];
}
