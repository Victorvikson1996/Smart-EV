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
import { loginSchema } from '../../lib/Schemas';

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

interface LoginFormData {
  emailOrPhone: string;
  password: string;
}

type LoginScreenProps = {
  navigation: AuthNavigationProp<'Login'>;
};

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { loginUser } = useAuth();

  const _loginUser = async (emailOrPhone: string, password: string) => {
    navigation.navigate('AddCar');
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });
  const [loading, setLoading] = useState(false);
  const ref = useRef<SuccessModalHandle>(null);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      // await loginUser(data.emailOrPhone, data.password);
      await _loginUser(data.emailOrPhone, data.password);
      Alert.alert('Login Successful');
      navigation.navigate('AddCar');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Login Failed', 'Something went wrong');
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
              Login
            </Text>
            {/* <Text style={{ marginVertical: 10 }}>
              Please sign in to continue
            </Text> */}
            <View style={{ marginVertical: 20 }}>
              <Controller
                control={control}
                name='emailOrPhone'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label='Phone number or Email'
                    placeholder='Enter your phone number or email'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.emailOrPhone?.message}
                    keyboardType='email-address'
                    autoCapitalize='none'
                  />
                )}
              />
            </View>
            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label='Password'
                  placeholder='Enter your password'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.password?.message}
                  secureTextEntry
                />
              )}
            />
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <Button text='Login' onPress={handleSubmit(onSubmit)} />
          </View>
          <TouchableOpacity
            style={{ alignItems: 'center', marginTop: 20 }}
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}
          >
            <Text>
              Forgotten your?{' '}
              <Text style={{ fontWeight: '700' }}>Resset Password</Text>
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
