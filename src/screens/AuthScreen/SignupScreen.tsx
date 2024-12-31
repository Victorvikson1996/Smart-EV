import {
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Alert,
  Text
} from 'react-native';
import React, { useRef, useState } from 'react';
import { AuthNavigationProp } from '../../Navigation/types';
import {
  BackHeader,
  Button,
  ContentWrapper,
  Input,
  SuccessModalHandle
} from '../../components';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../../lib/Schemas';
import { apppurple, secondaryTextColor, appgreen } from '../../constants';
import { FlagFranceIcon } from '../../assets/icons';
import SuccessModal from '../../components/SuccessModal';

type SignupScreenProps = {
  navigation: AuthNavigationProp<'Login'>;
};

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  });

  const [loading, setLoading] = useState(false);
  const ref = useRef<SuccessModalHandle>(null);
  const [isChecked, setChecked] = useState(false);

  const signUpUser = async (
    Email: string,
    Password: string,
    FirstName: string,
    LastName: string,
    Phone: string
  ) => {
    navigation.navigate('Login');
  };

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    try {
      await signUpUser(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        data.phone
      );
      Alert.alert('Success', 'Please verify your email');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentWrapper style={styles.container}>
      <BackHeader showProgress progressValueBlue={1} progressValueGrey={2} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={styles.title}>Let’s Get you Started</Text>
            {/* <Text style={styles.subtitle}>
              Kickstart your experience by providing your details
            </Text> */}
            <View style={styles.inputRow}>
              <View style={styles.inputCol}>
                <Controller
                  control={control}
                  name='firstName'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label='First Name'
                      placeholder='Enter your first name'
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.firstName?.message}
                    />
                  )}
                />
              </View>
              <View style={styles.inputCol}>
                <Controller
                  control={control}
                  name='lastName'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label='Last Name'
                      placeholder='Enter your last name'
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.lastName?.message}
                    />
                  )}
                />
              </View>
            </View>
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label='Email'
                  placeholder='Enter your email address'
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
              name='phone'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label='Phone Number'
                  placeholder='Enter your phone number'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.phone?.message}
                  keyboardType='phone-pad'
                  LeftComponent={
                    <View style={styles.phone}>
                      <FlagFranceIcon />
                      <Text style={styles.phoneText}>+33</Text>
                    </View>
                  }
                />
              )}
            />
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

            <Controller
              control={control}
              name='confirmPassword'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label='Confirm Password'
                  placeholder='Re-enter your password'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.confirmPassword?.message}
                  secureTextEntry
                />
              )}
            />

            {/* <View style={styles.checkboxContainer}>
              <Checkbox
                selected={isChecked}
                onSelect={() => setChecked((prev) => !prev)}
              />
              <Text>
                I hereby agree to the{' '}
                <Text style={{ color: appgreen }}>Terms and Condition</Text> of
                Savyn
              </Text>
            </View> */}
          </View>
        </ScrollView>
      </View>
      <View style={{ paddingHorizontal: 20, marginBottom: 50 }}>
        <Button text='Continue' onPress={handleSubmit(onSubmit)} />
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Text style={{ marginTop: 10 }}>
            Already have an account?{' '}
            <Text style={{ fontFamily: '700' }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <SuccessModal
        onPress={() => {
          navigation.navigate('Login');
        }}
        ref={ref}
        title='Registration Successful'
        btnText='Continue'
        subtitle=''
        btnColor={apppurple}
      />
    </ContentWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingHorizontal: 20
  },
  title: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 23,
    fontFamily: 'NeueMontreal-Bold',
    marginVertical: 10
  },
  subtitle: {
    marginVertical: 10
  },
  phone: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 20,
    paddingRight: 5,
    borderRightColor: secondaryTextColor,
    borderRightWidth: 1
  },
  phoneText: {
    marginLeft: 5
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10
  },
  inputCol: {
    flex: 1,
    marginRight: 10
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
