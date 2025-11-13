import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

const Map = ({ pets = [], height, initialRegion }) => {
  // La Paz, Bolivia coordinates
  const defaultRegion = {
    latitude: -16.5,
    longitude: -68.15,
    latitudeDelta: 0.01,
    longitudeDelta: 0.015,
  };

  // Use provided initialRegion or default
  const mapRegion = initialRegion || defaultRegion;

  // Generate mock coordinates for pets if not provided
  const getPetCoordinates = (pet, index) => {
    if (pet.latitude && pet.longitude) {
      return { latitude: pet.latitude, longitude: pet.longitude };
    }
    // Generate coordinates around La Paz area
    const offset = index * 0.01;
    return {
      latitude: -16.5 + offset,
      longitude: -68.15 + offset,
    };
  };

  return (
    <View style={[styles.container, { height }]}>
      <MapView
        key={
          initialRegion
            ? `${initialRegion.latitude}-${initialRegion.longitude}`
            : 'default'
        }
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={mapRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
      >
        {pets.map((pet, index) => {
          const coordinates = getPetCoordinates(pet, index);
          return (
            <Marker
              key={pet.id || index}
              coordinate={coordinates}
              title={`${pet.petName} (${pet.zone?.split(',')[0] || 'Perdido'})`}
            >
              <View style={styles.markerContainer}>
                <MaterialIcons name="pets" size={24} color={colors.orange} />
                <MaterialIcons
                  name="schedule"
                  size={12}
                  color={colors.orange}
                  style={styles.clockIcon}
                />
              </View>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
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
});

export default Map;
