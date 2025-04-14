import React from 'react';
import { Platform, StyleSheet, View, type ViewStyle } from 'react-native';

interface FooterProps {
  style?: ViewStyle;
  children: React.ReactNode;
  alignItems?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline'
    | undefined;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  flex?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
}

interface AndroidFooterProps {
  height?: number;
}

export const Footer = ({
  children,
  style,
  alignItems = undefined,
  justifyContent = 'flex-end',
  flex = 1,
  paddingHorizontal,
  paddingVertical
}: FooterProps): JSX.Element | null => {
  return (
    <View
      style={[
        styles.container,
        style,
        {
          alignItems,
          flex,
          justifyContent,
          paddingHorizontal,
          paddingVertical
        }
      ]}
    >
      {children}
    </View>
  );
};

export const AndroidFooterPadding = ({ height = 16 }: AndroidFooterProps) => {
  if (Platform.OS === 'ios') return null;

  return <View style={{ height }} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  }
});
