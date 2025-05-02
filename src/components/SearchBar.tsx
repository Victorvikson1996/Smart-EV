import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Input } from './Inputs';
import { PlaceSuggestion, RecentSearch } from '../types';
import { fetchPlaceSuggestions, fetchPlaceDetails } from '../api/googleMaps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appgreen } from '../constants';

type SearchBarProps = {
  onSearch: (
    start: { latitude: number; longitude: number },
    destination: { latitude: number; longitude: number }
  ) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [startQuery, setStartQuery] = useState('');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [startSuggestions, setStartSuggestions] = useState<PlaceSuggestion[]>(
    []
  );
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    PlaceSuggestion[]
  >([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [focusedInput, setFocusedInput] = useState<
    'start' | 'destination' | null
  >(null);

  useEffect(() => {
    const loadRecentSearches = async () => {
      const stored = await AsyncStorage.getItem('recentSearches');
      if (stored) setRecentSearches(JSON.parse(stored));
    };
    loadRecentSearches();
  }, []);

  useEffect(() => {
    const fetchSuggestions = async (
      query: string,
      setter: (s: PlaceSuggestion[]) => void
    ) => {
      const results = await fetchPlaceSuggestions(query);
      setter(results);
    };
    const debounce = setTimeout(() => {
      if (focusedInput === 'start' && startQuery.trim()) {
        fetchSuggestions(startQuery, setStartSuggestions);
      } else if (focusedInput === 'destination' && destinationQuery.trim()) {
        fetchSuggestions(destinationQuery, setDestinationSuggestions);
      } else {
        setStartSuggestions([]);
        setDestinationSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(debounce);
  }, [startQuery, destinationQuery, focusedInput]);

  const handleSearch = async (
    item: PlaceSuggestion | RecentSearch,
    type: 'start' | 'destination'
  ) => {
    let coordinates: { latitude: number; longitude: number };
    let description: string;

    if ('structured_formatting' in item) {
      const coords = await fetchPlaceDetails(item.place_id);
      if (!coords) return;
      coordinates = coords;
      description = item.description;
    } else {
      coordinates = { latitude: item.latitude, longitude: item.longitude };
      description = item.description;
    }

    const newSearch: RecentSearch = {
      place_id: item.place_id,
      description,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    };
    const updatedSearches = [
      newSearch,
      ...recentSearches.filter((s) => s.place_id !== item.place_id)
    ].slice(0, 5);
    setRecentSearches(updatedSearches);
    await AsyncStorage.setItem(
      'recentSearches',
      JSON.stringify(updatedSearches)
    );

    if (type === 'start') {
      setStartQuery(description);
      setStartSuggestions([]);
    } else {
      setDestinationQuery(description);
      setDestinationSuggestions([]);
    }

    if (startQuery && destinationQuery) {
      const startCoords = await fetchPlaceDetails(
        recentSearches.find((s) => s.description === startQuery)?.place_id || ''
      );
      const destCoords = coordinates;
      if (startCoords && destCoords) {
        onSearch(startCoords, destCoords);
      }
    }

    Keyboard.dismiss();
  };

  const renderSuggestion = ({
    item
  }: {
    item: PlaceSuggestion | RecentSearch;
  }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSearch(item, focusedInput || 'destination')}
    >
      <Icon
        name={'structured_formatting' in item ? 'place' : 'history'}
        size={20}
        color='#666'
      />
      <View>
        <Text style={styles.suggestionText}>
          {'structured_formatting' in item
            ? item.structured_formatting.main_text
            : item.description}
        </Text>
        {'structured_formatting' in item && (
          <Text style={styles.secondaryText}>
            {item.structured_formatting.secondary_text}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Input
        placeholder='Starting Point'
        value={startQuery}
        onChangeText={setStartQuery}
        onFocus={() => setFocusedInput('start')}
        LeftComponent={<Icon name='location-on' size={20} color='#888' />}
        style={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Input
        placeholder='Destination'
        value={destinationQuery}
        onChangeText={setDestinationQuery}
        onFocus={() => setFocusedInput('destination')}
        LeftComponent={<Icon name='search' size={20} color='#888' />}
        style={styles.inputContainer}
        inputStyle={styles.input}
      />
      {(focusedInput === 'start' || startQuery.trim()) && (
        <FlatList
          data={startQuery.trim() ? startSuggestions : recentSearches}
          renderItem={renderSuggestion}
          keyExtractor={(item) => item.place_id}
          style={styles.suggestionList}
          keyboardShouldPersistTaps='handled'
        />
      )}
      {(focusedInput === 'destination' || destinationQuery.trim()) && (
        <FlatList
          data={
            destinationQuery.trim() ? destinationSuggestions : recentSearches
          }
          renderItem={renderSuggestion}
          keyExtractor={(item) => item.place_id}
          style={styles.suggestionList}
          keyboardShouldPersistTaps='handled'
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10
  },
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2
  },
  input: {
    fontSize: 16
  },
  suggestionList: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    maxHeight: 200,
    elevation: 5
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  suggestionText: {
    fontSize: 16,
    color: '#333'
  },
  secondaryText: {
    fontSize: 14,
    color: '#666'
  }
});
