import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import {
  DEFAULT_MAP_REGION,
  DEFAULT_MAP_LOCATION,
} from '../../utils/constants';

// Check if a coordinate is within the visible map bounds
const isCoordinateInMapBounds = (latitude, longitude, mapRegion) => {
  const northBound = mapRegion.latitude + mapRegion.latitudeDelta / 2;
  const southBound = mapRegion.latitude - mapRegion.latitudeDelta / 2;
  const eastBound = mapRegion.longitude + mapRegion.longitudeDelta / 2;
  const westBound = mapRegion.longitude - mapRegion.longitudeDelta / 2;

  return (
    latitude >= southBound &&
    latitude <= northBound &&
    longitude >= westBound &&
    longitude <= eastBound
  );
};

const Map = ({
  pets = [],
  height,
  initialRegion,
  onAddPetPress,
  onPetPress,
}) => {
  const [currentRegion, setCurrentRegion] = useState(
    initialRegion || DEFAULT_MAP_REGION
  );

  // Filter pets that are within the current visible map bounds
  const visiblePets = pets.filter(pet => {
    if (!pet.latitude || !pet.longitude) return false;
    return isCoordinateInMapBounds(pet.latitude, pet.longitude, currentRegion);
  });

  // Generate mock coordinates for pets if not provided
  const getPetCoordinates = (pet, index) => {
    if (pet.latitude && pet.longitude) {
      return { latitude: pet.latitude, longitude: pet.longitude };
    }
    // Generate coordinates around default area
    const offset = index * 0.01;
    return {
      latitude: DEFAULT_MAP_LOCATION.latitude + offset,
      longitude: DEFAULT_MAP_LOCATION.longitude + offset,
    };
  };

  const handleRegionChangeComplete = region => {
    setCurrentRegion(region);
  };

  const handleMarkerPress = pet => {
    if (onPetPress) {
      onPetPress(pet);
    }
  };

  return (
    <View style={[styles.container, { height }]}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion || DEFAULT_MAP_REGION}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
      >
        {visiblePets.map((pet, index) => {
          const coordinates = getPetCoordinates(pet, index);
          return (
            <Marker
              key={pet.id || index}
              coordinate={coordinates}
              title={`${pet.petName} (${pet.zone?.split(',')[0] || 'Perdido'})`}
              onPress={() => handleMarkerPress(pet)}
            >
              <View style={styles.markerContainer}>
                <MaterialIcons name="pets" size={24} color={colors.primary} />
                <MaterialIcons
                  name="schedule"
                  size={12}
                  color={colors.primary}
                  style={styles.clockIcon}
                />
              </View>
            </Marker>
          );
        })}
      </MapView>
      {onAddPetPress && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={onAddPetPress}
          activeOpacity={0.8}
        >
          <MaterialIcons name="add" size={32} color={colors.surface} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  clockIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.secondaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Map;
