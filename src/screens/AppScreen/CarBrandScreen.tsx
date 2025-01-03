import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import React, { useState } from 'react';
import { AuthNavigationProp } from '../../Navigation/types';
import { BackHeader, ContentWrapper, Input } from '../../components';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { EV_CAR_BRANDS, lightGrey } from '../../constants';
import { CarBrand } from '../../types';
import { CarBrandItem } from '../../components';

type CarBrandScreenProps = {
  navigation: AuthNavigationProp<'CarBrand'>;
};

export const CarBrandScreen = ({ navigation }: CarBrandScreenProps) => {
  const [brand, setBrand] = useState<string>('');

  const filteredBrands = EV_CAR_BRANDS.filter((item) =>
    item.name.toLowerCase().includes(brand.toLowerCase())
  );

  const navigateToBrandDetails = (brand: CarBrand) => {
    navigation.navigate('CarBrandDetails', {
      brandId: brand.id,
      models: brand.models.map((model) => model.name)
    });
  };

  return (
    <ContentWrapper style={styles.container}>
      <BackHeader
        title='Brand'
        showBack={true}
        RightComponent={
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('CarBrandDetails', {
                brandId: '',
                models: []
              })
            }
          >
            <Text>Skip</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.content}>
        <View>
          <Input
            placeholder='Search car brand'
            value={brand}
            onChangeText={setBrand}
            LeftComponent={
              <FontAwesome name='search' size={24} color={lightGrey} />
            }
          />
        </View>

        <FlatList
          persistentScrollbar={true}
          data={filteredBrands}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CarBrandItem brand={item} navigation={navigation} />
          )}
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
  brandItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  brandImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  brandName: {
    fontSize: 18
  },
  list: {
    paddingVertical: 10
  }
});
