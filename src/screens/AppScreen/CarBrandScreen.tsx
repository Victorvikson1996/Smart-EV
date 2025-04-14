import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  ActivityIndicator
} from 'react-native';
import React, { useState, useRef } from 'react';
import { AuthNavigationProp } from '../../Navigation/types';
import { BackHeader, ContentWrapper, Input, Loader } from '../../components';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  appgreen,
  borderGrey,
  borderGrey2,
  EV_CAR_BRANDS,
  lightGrey
} from '../../constants';
import { CarBrand } from '../../types';
import { CarBrandItem } from '../../components';

type CarBrandScreenProps = {
  navigation: AuthNavigationProp<'CarBrand'>;
};

export const CarBrandScreen = ({ navigation }: CarBrandScreenProps) => {
  const [brand, setBrand] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const filteredBrands = EV_CAR_BRANDS.filter((item) =>
    item.name.toLowerCase().includes(brand.toLowerCase())
  );

  const inputOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const inputTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolate: 'clamp'
  });

  // const navigateToBrandDetails = (brand: CarBrand) => {
  //   navigation.navigate('CarBrandDetails', {
  //     brandId: brand.id,
  //     models: brand.models.map((model) => model.name)
  //   });
  // };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ContentWrapper style={styles.container}>
      <View style={styles.headerContainer}>
        <BackHeader
          title='Brand'
          showBack={true}
          RightComponent={
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Tab')}
            >
              <Text>Skip</Text>
            </TouchableOpacity>
          }
        />
      </View>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.searchContainer,
            {
              opacity: inputOpacity,
              transform: [{ translateY: inputTranslateY }]
            }
          ]}
        >
          <Input
            placeholder='Search Vehicle'
            value={brand}
            onChangeText={setBrand}
            LeftComponent={
              <FontAwesome name='search' size={24} color={lightGrey} />
            }
          />
        </Animated.View>

        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          persistentScrollbar={true}
          data={filteredBrands}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CarBrandItem brand={item} navigation={navigation} />
          )}
          contentContainerStyle={styles.list}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          style={styles.flatList}
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
    flex: 1,
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
  },
  flatList: {
    flex: 1
  },

  searchContainer: {
    marginBottom: 10
  },

  headerContainer: {
    // Ensure the header container has appropriate padding/margin
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff' // Ensure background color matches the header
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
