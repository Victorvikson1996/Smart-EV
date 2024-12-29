import React, { type ReactNode } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  type TextStyle,
  type ViewStyle,
  Text
} from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

import { borderGrey, primaryTextColor } from '../constants';

type ListItemProps = {
  title: string;
  subtitle?: string;
  hasIcon?: boolean;
  icon?: ReactNode;
  iconBackgroundColor?: string;
  onPress?: () => void;
  hasBorder?: boolean;
  hasRight?: boolean;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onSwitchValueChange?: (value: boolean) => void;
  RightComponent?: ReactNode;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  style?: ViewStyle;
};

export const ListItem = ({
  title,
  subtitle,
  hasIcon = true,
  icon,
  iconBackgroundColor,
  onPress,
  hasBorder = false,
  hasRight = true,
  hasSwitch = false,
  switchValue = false,
  onSwitchValueChange,
  RightComponent,
  style,
  titleStyle,
  subtitleStyle
}: ListItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, hasBorder && styles.withBorder, style]}
      onPress={onPress}
      disabled={hasSwitch}
    >
      {hasIcon && (
        <View
          style={[styles.iconCover, { backgroundColor: iconBackgroundColor }]}
        >
          {icon}
        </View>
      )}
      <View style={styles.content}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
        )}
      </View>
      {hasRight
        ? RightComponent ??
          (hasSwitch ? (
            <Switch value={switchValue} onValueChange={onSwitchValueChange} />
          ) : (
            <Icon name='chevron-right' size={22} color={primaryTextColor} />
          ))
        : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    width: '100%'
  },
  withBorder: {
    borderBottomColor: borderGrey,
    borderBottomWidth: 1
  },
  iconCover: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16
  },
  subtitle: {
    // marginTop: 5
  }
});
