import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { AuthNavigationProp } from '../../Navigation/types';
import { BackHeader, Button, ContentWrapper } from '../../components';

type AddCarScreenProps = {
  navigation: AuthNavigationProp<'AddCar'>;
};

export const AddCar = ({ navigation }: AddCarScreenProps) => {
  return (
    <ContentWrapper style={styles.container}>
      <BackHeader
        title='Add Car'
        showBack={false}
        RightComponent={
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('CarBrand')}
          >
            <Text>Skip</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.content}>
        <View>
          <Text style={{ fontSize: 16, marginBottom: 20, color: 'grey' }}>
            Connect your car to see the state of your charger, enable more
            charger settings and more filter options{' '}
          </Text>
        </View>
        <Button
          text='Add Car'
          onPress={() => navigation.navigate('CarBrand')}
        />
      </View>
    </ContentWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingHorizontal: 20
  }
});
