import React, { useState, type ReactNode } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  type TextInputProps,
  type ViewStyle,
  type TextStyle,
  Text
} from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

import {
  borderGrey,
  lightGrey,
  lightRed,
  primaryTextColor,
  red,
  secondaryTextColor
} from '../constants';

type InputProps = TextInputProps & {
  coverStyle?: ViewStyle;
  inputStyle?: ViewStyle & TextStyle;
  style?: ViewStyle;
  label?: string;
  LeftComponent?: ReactNode;
  RightComponent?: ReactNode;
  error?: string | null;
};

export const Input = ({
  RightComponent,
  LeftComponent,
  label,
  error,
  coverStyle,
  inputStyle,
  style,
  secureTextEntry,
  editable = true,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(!secureTextEntry);

  const toggleSetShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <View style={[styles.container, coverStyle]}>
      {label && <Text style={styles.labelText}>{label}</Text>}
      <View
        style={[
          styles.content,
          !!error && { borderColor: red },
          !!LeftComponent && { paddingLeft: 10 },
          (!!RightComponent || secureTextEntry) && { paddingRight: 10 },
          !editable && { backgroundColor: borderGrey },
          style
        ]}
      >
        {LeftComponent && LeftComponent}
        <TextInput
          style={[styles.input, inputStyle]}
          placeholderTextColor={lightGrey}
          secureTextEntry={!showPassword}
          editable={editable}
          {...props}
        />
        {secureTextEntry ? (
          <TouchableOpacity onPress={toggleSetShowPassword}>
            <Icon
              name={!showPassword ? 'visibility' : 'visibility-off'}
              size={18}
              color={secondaryTextColor}
            />
          </TouchableOpacity>
        ) : (
          RightComponent && RightComponent
        )}
      </View>
      {!!error && (
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  labelText: {
    marginBottom: 5
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: borderGrey,
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    height: 50
  },
  input: {
    fontFamily: 'NeueMontreal-Regular',
    color: primaryTextColor,
    flex: 1,
    paddingHorizontal: 10
  },
  error: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: lightRed,
    paddingVertical: 7,
    paddingHorizontal: 10
  },
  errorText: {
    color: red
  }
});
