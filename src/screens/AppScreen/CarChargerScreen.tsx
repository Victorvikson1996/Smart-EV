import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import React from 'react';
import { AuthNavigationProp } from '../../Navigation/types';
import { EV_CAR_BRANDS, lightGrey } from '../../constants';
import { BackHeader, ChargerTypeItem, ContentWrapper } from '../../components';

type CarChargerScreenProps = {
  route: {
    params: {
      modelId: string;
      brandId: string;
    };
  };
  navigation: AuthNavigationProp<'CarCharger'>;
};

export const CarChargerScreen = ({
  navigation,
  route
}: CarChargerScreenProps) => {
  const { modelId, brandId } = route.params;

  const brand = EV_CAR_BRANDS.find((brand) => brand.id === brandId);
  // const model = brand?.models.find((model) => model.id === modelId);
  // console.log('model', model);

  const model = EV_CAR_BRANDS.find(
    (brand) => brand.id === brandId
  )?.models.find((model) => model.id === modelId);

  if (brand) {
    return (
      <ContentWrapper
        style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
      >
        <Text onPress={() => navigation.goBack()} style={{ color: lightGrey }}>
          Brand not found
        </Text>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper style={styles.container}>
      <BackHeader title={model?.name} showBack={true} />
      <View style={styles.content}>
        <Image source={{ uri: model?.image }} style={styles.modelImage} />

        <Text style={styles.chargerTypesTitle}>Charger Types</Text>
        <FlatList
          data={model?.chargerTypes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChargerTypeItem chargerType={item} />}
          contentContainerStyle={styles.list}
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
  },
  modelImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20
  },
  chargerTypesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  list: {
    paddingVertical: 10
  }
});
