import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

const Map = ({ pets = [], height, initialRegion, onAddPetPress }) => {
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
        showsMyLocationButton={false}
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
