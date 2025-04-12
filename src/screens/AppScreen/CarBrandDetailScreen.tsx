import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import React from 'react';
import { AuthNavigationProp } from '../../Navigation/types';
import { BackHeader, ContentWrapper } from '../../components';
import { EV_CAR_BRANDS, lightGrey } from '../../constants';
import { ModelItem } from '../../components';

type CarBrandDetailScreenProps = {
  route: {
    params: {
      brandId: string;
      modelId: string;
    };
  };

  navigation: AuthNavigationProp<'CarBrandDetails'>;
};

export const CarBrandDetailScreen = ({
  route,
  navigation
}: CarBrandDetailScreenProps) => {
  const { brandId, modelId } = route.params;

  const brand = EV_CAR_BRANDS.find((item) => item.id === brandId);

  if (!brand) {
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
      <BackHeader
        title={brand?.name || 'Brand'}
        showBack={true}
        RightComponent={
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Text>Skip</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.content}>
        <View style={styles.modelText}>
          <Text style={styles.text}>Model</Text>
          <Text style={{ marginTop: 10, fontSize: 16, color: 'grey' }}>
            Choose the actaul model. We use the battery size and kW effect to
            give you accurate charging estimate{' '}
          </Text>
          <View style={styles.content}>
            <FlatList
              data={brand.models}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ModelItem
                  model={item}
                  onPress={() =>
                    navigation.navigate('CarCharger', {
                      modelId: item.id,
                      brandId: brandId
                    })
                  }
                />
              )}
              contentContainerStyle={styles.list}
            />
          </View>
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
  },

  list: {
    paddingVertical: 20
  }
});
