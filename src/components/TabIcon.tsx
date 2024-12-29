import React from 'react';
import {
  Entypo,
  Fontisto,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome6,
  FontAwesome5,
  Octicons
} from '@expo/vector-icons';

interface TabIconProps {
  routeName: string;
  focused: boolean;
  color: string;
  size: number;
}

export const _iconMap: {
  [key: string]: { iconSet: React.ComponentType<any>; iconName: string };
} = {
  Home: { iconSet: Entypo, iconName: 'home' },
  Transactions: { iconSet: Fontisto, iconName: 'arrow-swap' },
  Budget: { iconSet: FontAwesome6, iconName: 'chart-simple' },
  Card: { iconSet: MaterialCommunityIcons, iconName: 'cards' },
  Settings: { iconSet: AntDesign, iconName: 'setting' }
  // Add more route names and corresponding icon sets and icon names here
};

export const iconMap: {
  [key: string]: { iconSet: React.ComponentType<any>; iconName: string };
} = {
  Map: { iconSet: FontAwesome5, iconName: 'map-marked-alt' },
  Successions: { iconSet: Octicons, iconName: 'zap' },
  Reservation: { iconSet: FontAwesome5, iconName: 'gas-pump' },
  Profile: { iconSet: AntDesign, iconName: 'profile' }

  // Add more route names and corresponding icon sets and icon names here
};

export const TabIcon: React.FC<TabIconProps> = ({
  routeName,
  focused,
  color,
  size
}) => {
  const iconInfo = iconMap[routeName];

  if (!iconInfo) {
    // Handle missing icon set or icon name for the route
    return null; // or return a default icon or placeholder
  }

  const { iconSet: IconSet, iconName } = iconInfo;

  return <IconSet name={iconName} size={size} color={color} />;
};
