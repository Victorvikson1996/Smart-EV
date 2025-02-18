import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Alert,
  ScrollView,
  Text
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../../lib/Schemas';

import {
  ContentWrapper,
  Button,
  Input,
  BackHeader,
  Loader
} from '../../components';

import { AuthNavigationProp } from '../../Navigation/types';
import SuccessModal, { SuccessModalHandle } from '../../components/Success';
import { useAuth } from '../../api';

interface ForgortPasswordFormData {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}

type ForgortPassword = {
  navigation: AuthNavigationProp<'Login'>;
};

export const ForgortPassword = ({ navigation }: ForgortPassword) => {
  const { resetPassword } = useAuth();

  // const loginUser = async (emailOrPhone: string, password: string) => {
  //   navigation.navigate('AddCar');
  // };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgortPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema)
  });
  const [loading, setLoading] = useState(false);
  const ref = useRef<SuccessModalHandle>(null);

  const onSubmit = async (data: ForgortPasswordFormData) => {
    if (data.newPassword !== data.confirmNewPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(
        data.email,
        data.newPassword,
        data.confirmNewPassword
      );
      Alert.alert(
        'Password Reset Successful',
        'Your password has been updated.'
      );
      navigation.navigate('AddCar');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error Resesting Password', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentWrapper style={styles.container}>
      <BackHeader showProgress progressValueBlue={2} progressValueGrey={1} />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 23,
                fontFamily: 'NeueMontreal-Bold'
              }}
            >
              Reset Password
            </Text>
            {/* <Text style={{ marginVertical: 10 }}>
              Please sign in to continue
            </Text> */}
            <View style={{ marginVertical: 20 }}>
              <Controller
                control={control}
                name='email'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label='Phone number or Email'
                    placeholder='Enter your phone number or email'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.email?.message}
                    keyboardType='email-address'
                    autoCapitalize='none'
                  />
                )}
              />

              <Controller
                control={control}
                name='newPassword'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label='New Password'
                    placeholder='Enter new password'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.newPassword?.message}
                    secureTextEntry
                  />
                )}
              />

              <Controller
                control={control}
                name='confirmNewPassword'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label='Confirm New Password'
                    placeholder='Confirm new password'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.confirmNewPassword?.message}
                    secureTextEntry
                  />
                )}
              />
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <Button text='Reset Password' onPress={handleSubmit(onSubmit)} />
            </View>
          </View>

          <TouchableOpacity
            style={{ alignItems: 'center', marginTop: 20 }}
            onPress={() => {
              navigation.navigate('Signup');
            }}
          >
            <Text>
              Don't have an account?{' '}
              <Text style={{ fontWeight: '700' }}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <SuccessModal
        ref={ref}
        title='Login Status'
        btnText='Continue'
        onPress={() => {
          navigation.navigate('AddCar');
        }}
      />
    </ContentWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30
  }
});
