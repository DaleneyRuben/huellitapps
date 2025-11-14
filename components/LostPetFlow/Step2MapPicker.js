import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { colors } from '../../theme';
import Map from '../Map';

// Import MapView and Marker for native platforms
let MapView, PROVIDER_GOOGLE, Marker;
if (Platform.OS !== 'web') {
  const MapModule = require('react-native-maps');
  MapView = MapModule.default;
  PROVIDER_GOOGLE = MapModule.PROVIDER_GOOGLE;
  Marker = MapModule.Marker;
}

const Step2MapPicker = ({ formData, onFormDataChange, petType }) => {
  const [selectedLocation, setSelectedLocation] = useState(
    formData.latitude && formData.longitude
      ? {
          latitude: formData.latitude,
          longitude: formData.longitude,
        }
      : null
  );
  const [address, setAddress] = useState(null);
  const [loadingAddress, setLoadingAddress] = useState(false);

  const petTypeText = petType === 'cat' ? 'Gatito' : 'Perrito';

  // Reverse geocode coordinates to get address
  const reverseGeocode = async (
    latitude,
    longitude,
    currentFormData = formData
  ) => {
    if (Platform.OS === 'web') {
      // For web, we could use a geocoding API, but for now just return coordinates
      return `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
    }

    try {
      setLoadingAddress(true);
      const reverseGeocodeAsync = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocodeAsync && reverseGeocodeAsync.length > 0) {
        const location = reverseGeocodeAsync[0];
        // Build address string from available fields
        const addressParts = [];

        if (location.street) addressParts.push(location.street);
        if (location.streetNumber) addressParts.push(location.streetNumber);
        if (location.district || location.subregion) {
          addressParts.push(location.district || location.subregion);
        }
        if (location.city || location.region) {
          addressParts.push(location.city || location.region);
        }
        if (location.country) addressParts.push(location.country);

        const fullAddress =
          addressParts.length > 0
            ? addressParts.join(', ')
            : location.name ||
              `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;

        setAddress(fullAddress);
        // Save address to formData so it can be stored with the pet
        onFormDataChange({
          ...currentFormData,
          location: fullAddress,
        });
        return fullAddress;
      } else {
        const fallback = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
        setAddress(fallback);
        onFormDataChange({
          ...currentFormData,
          location: fallback,
        });
        return fallback;
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      const fallback = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
      setAddress(fallback);
      onFormDataChange({
        ...currentFormData,
        location: fallback,
      });
      return fallback;
    } finally {
      setLoadingAddress(false);
    }
  };

  // Load address when location is selected or when component mounts with existing location
  useEffect(() => {
    if (selectedLocation) {
      reverseGeocode(
        selectedLocation.latitude,
        selectedLocation.longitude,
        formData
      );
    } else if (formData.latitude && formData.longitude && !selectedLocation) {
      // If formData has coordinates but selectedLocation is not set, set it and geocode
      const location = {
        latitude: formData.latitude,
        longitude: formData.longitude,
      };
      setSelectedLocation(location);
      reverseGeocode(formData.latitude, formData.longitude, formData);
    }
  }, [selectedLocation, formData.latitude, formData.longitude]);

  // La Paz, Bolivia default coordinates
  const defaultRegion = {
    latitude: -16.5,
    longitude: -68.15,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const handleMapPress = event => {
    if (Platform.OS === 'web') {
      Alert.alert(
        'Mapa no disponible',
        'La selección de ubicación en el mapa está disponible solo en la aplicación móvil.'
      );
      return;
    }

    const coordinate = event.nativeEvent?.coordinate || event.nativeEvent;
    if (!coordinate || !coordinate.latitude || !coordinate.longitude) {
      return;
    }

    const { latitude, longitude } = coordinate;
    const newLocation = { latitude, longitude };
    setSelectedLocation(newLocation);
    setAddress(null); // Clear previous address
    const updatedFormData = {
      ...formData,
      latitude,
      longitude,
    };
    onFormDataChange(updatedFormData);
    // Reverse geocode the new location with updated formData
    reverseGeocode(latitude, longitude, updatedFormData);
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <QuestionText>¿Dónde se perdió tu {petTypeText}?</QuestionText>
        <Instructions>
          Toca el mapa para marcar la ubicación donde se perdió tu {petTypeText}
        </Instructions>

        <MapContainer>
          {Platform.OS === 'web' ? (
            <Map height={300} initialRegion={defaultRegion} />
          ) : (
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={defaultRegion}
              onPress={handleMapPress}
              showsUserLocation={true}
              showsMyLocationButton={false}
              showsCompass={true}
              showsScale={true}
            >
              {selectedLocation && (
                <Marker coordinate={selectedLocation}>
                  <MarkerContainer>
                    <MaterialIcons
                      name="place"
                      size={40}
                      color={colors.primary}
                    />
                  </MarkerContainer>
                </Marker>
              )}
            </MapView>
          )}
        </MapContainer>

        {selectedLocation && (
          <LocationInfo>
            <LocationIcon>
              <MaterialIcons
                name="check-circle"
                size={24}
                color={colors.primary}
              />
            </LocationIcon>
            <LocationTextContainer>
              <LocationText>Ubicación seleccionada</LocationText>
              {loadingAddress ? (
                <LoadingContainer>
                  <ActivityIndicator size="small" color={colors.primary} />
                  <LoadingText>Obteniendo dirección...</LoadingText>
                </LoadingContainer>
              ) : (
                <LocationAddress>
                  {address ||
                    `${selectedLocation.latitude.toFixed(4)}, ${selectedLocation.longitude.toFixed(4)}`}
                </LocationAddress>
              )}
            </LocationTextContainer>
          </LocationInfo>
        )}
      </ScrollView>
    </Container>
  );
};

const styles = {
  map: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
};

const Container = styled.View`
  flex: 1;
  padding: 0;
`;

const QuestionText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.secondaryLight};
  margin-bottom: 8px;
`;

const Instructions = styled.Text`
  font-size: 14px;
  color: ${colors.textSecondary};
  margin-bottom: 16px;
  line-height: 20px;
`;

const MapContainer = styled.View`
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const LocationInfo = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.primaryLight};
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 16px;
`;

const LocationIcon = styled.View`
  margin-right: 12px;
`;

const LocationTextContainer = styled.View`
  flex: 1;
`;

const LocationText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 4px;
`;

const LocationAddress = styled.Text`
  font-size: 13px;
  color: ${colors.textSecondary};
  line-height: 18px;
`;

const LoadingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

const LoadingText = styled.Text`
  font-size: 12px;
  color: ${colors.textSecondary};
  margin-left: 8px;
`;

const UseCurrentLocationButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${colors.surface};
  border-radius: 12px;
  padding: 12px 16px;
  border-width: 1px;
  border-color: ${colors.border};
`;

const UseCurrentLocationText = styled.Text`
  font-size: 14px;
  color: ${colors.primary};
  font-weight: 500;
  margin-left: 8px;
`;

const MarkerContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export default Step2MapPicker;
