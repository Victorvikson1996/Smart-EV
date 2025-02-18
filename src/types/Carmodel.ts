// export interface ChargerType {
//   id: string;
//   name: string;
//   image: string;
// }

// export interface CarModel {
//   id: string;
//   name: string;
//   image: string;
//   chargerTypes: ChargerType[];
// }

// export interface CarBrand {
//   id: string;
//   name: string;
//   image: string;
//   models: CarModel[];
// }

// types.ts

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
  batteryCapacityKwh: number; // Battery capacity in kWh
  chargeSpeedKw: number; // Maximum charge speed in kW
  typicalChargeSpeedKw: number; // Typical charge speed in kW
}

export interface CarBrand {
  id: string;
  name: string;
  image: string;
  models: CarModel[];
}
