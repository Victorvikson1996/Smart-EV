import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { AuthNavigationProp } from '../../Navigation/types';
import { BackHeader, ContentWrapper } from '../../components';

type CarBrandDetailScreenProps = {
  route: {
    params: {
      name: string;
      brandId: string;
      models: string[];
    };
  };

  navigation: AuthNavigationProp<'CarBrandDetails'>;
};

export const CarBrandDetailScreen = ({
  route,
  navigation
}: CarBrandDetailScreenProps) => {
  const { models } = route.params;

  return (
    <ContentWrapper style={styles.container}>
      <BackHeader
        title={models[0]}
        showBack={true}
        RightComponent={
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('CarCharger')}
          >
            <Text>Skip</Text>
          </TouchableOpacity>
        }
      />

      <View style={styles.content}>
        <View style={styles.modelText}>
          <Text style={styles.text}>Model</Text>
          <Text style={{ marginTop: 10, fontSize: 16, color: 'grey' }}>
            Chose the actaul model. We use the battery size and kW effect to
            give you accurate charging estimate{' '}
          </Text>
        </View>
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
  },
  modelText: {},
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
