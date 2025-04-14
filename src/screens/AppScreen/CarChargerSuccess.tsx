import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { AuthNavigationProp } from '../../Navigation/types';
import { ContentWrapper, Button } from '../../components';
import { primaryTextColor } from '../../constants';
import Lottie from 'lottie-react-native';

export type CarChargerSuccessProps = {
  navigation: AuthNavigationProp<'CarChargerSuccess'>;
};

export const CarChargerSuccess = ({ navigation }: CarChargerSuccessProps) => {
  return (
    <ContentWrapper style={styles.container}>
      <View style={styles.headerContainer}>
        <Lottie
          source={require('../../assets/animation/confetti.json')}
          autoPlay
        />
        <View style={styles.textContainer}>
          <Text style={styles.createText}>Success</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            alignContent: 'center',
            marginTop: 50
          }}
        >
          <Image
            style={{
              height: 100,
              width: 100
            }}
            source={require('../../assets/images/success.png')}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.knowyou}>
            Congratulations on successfully creating your account.
          </Text>
          <Text style={styles.korensi}>Enjoy Smart EV</Text>
        </View>
      </View>
      <View style={styles.AddButton}>
        <Button text='Close' onPress={() => navigation.navigate('Tab')} />
      </View>
    </ContentWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textContainer: {
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 20
  },
  createText: {
    fontSize: 22
  },

  korensi: {
    fontSize: 20,
    marginTop: 20
  },
  headerContainer: {
    paddingHorizontal: 20,
    flex: 1
  },

  knowyou: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '300',
    textAlign: 'center',
    color: primaryTextColor,
    lineHeight: 20
  },
  AddButton: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    padding: 20
  }
});
