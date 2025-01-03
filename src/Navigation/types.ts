import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Otp: undefined;
  AddCar: undefined;
  CarBrand: undefined;
  CarBrandDetails: { brandId: string; models: string[] };

  CarCharger: undefined;
  AddCarName: undefined;
  AddCarSuccess: undefined;
};

export type MainTabParamList = {
  Map: undefined;
  Sessions: undefined;
  Reservation: undefined;
  Profile: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  ChargingStationDetails: { stationId: string };
  ChargingProgress: { sessionId: string };
  Payment: { amount: number };
  AddCar: undefined;
  CarBrand: undefined;
  CarCharger: undefined;
  CarBrandDetails: { brand: string };
  CarChargerDetails: { charger: string };
  CarChargerSuccess: undefined;
  Map: undefined;
  Reservation: undefined;
  Section: undefined;
  Settings: undefined;
  Profile: undefined;
  Notification: undefined;
  PaymentDetails: undefined;
  PaymentInput: undefined;
  PaymentSuccess: undefined;
  CharginPrice: undefined;
  PlugandCharge: undefined;
  PaymentMethod: undefined;
  ShowSession: undefined;
  StationSearch: undefined;
};

export type AuthNavigationProp<ScreenName extends keyof AuthStackParamList> =
  NativeStackNavigationProp<AuthStackParamList, ScreenName>;

export type MainTabNavigationProp<ScreenName extends keyof MainTabParamList> =
  BottomTabNavigationProp<MainTabParamList, ScreenName>;

export type AppNavigationProp<ScreenName extends keyof AppStackParamList> =
  NativeStackNavigationProp<AppStackParamList, ScreenName>;
