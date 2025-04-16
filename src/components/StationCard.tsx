import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { ChargingStation, Vehicle } from '../types';

type StationCardProps = {
  station: ChargingStation | null;
  onViewDetails: (stationId: string) => void;
  onClose: () => void;
};

const { width, height } = Dimensions.get('window');

export const StationCard: React.FC<StationCardProps> = ({
  station,
  onViewDetails,
  onClose
}) => {
  return (
    <View style={styles.bottomSheetContent}>
      {station ? (
        <>
          <Text style={styles.stationName}>{station.name}</Text>
          <Text style={styles.stationPrice}>Price: {station.price}</Text>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => {
              onClose();
              onViewDetails(station.id);
            }}
          >
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.placeholderText}>
          Select a station to view details
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width,
    height
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10
  },
  searchInput: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    fontSize: 16
  },
  bottomSheetBackground: {
    backgroundColor: '#FFF'
  },
  bottomSheetContent: {
    padding: 20,
    flex: 1
  },
  stationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  stationPrice: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15
  },
  detailsButton: {
    backgroundColor: '#00F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  detailsButtonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold'
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center'
  }
});
