import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
// import * as Location from 'expo-location'; // Old: Used for getting user location
import { colors } from '../../theme';
import Map from '../../components/Map';
import LostPetCarousel from '../../components/LostPetCarousel';
import PetDetailModal from '../../components/PetDetailModal';
import { loadLostPets, convertPetToDisplayFormat } from '../../utils/storage';
import {
  DEFAULT_MAP_LOCATION,
  DEFAULT_MAP_REGION,
} from '../../utils/constants';

// Calculate distance between two coordinates using Haversine formula (in kilometers)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Maximum distance in kilometers to consider a pet "nearby"
const MAX_DISTANCE_KM = 10;

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

const HomeScreen = () => {
  const navigation = useNavigation();
  const [lostPets, setLostPets] = useState([]);
  // const [userLocation, setUserLocation] = useState(null); // Old: Used to store user's actual location
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadPetsNearDefaultLocation();
  }, []);

  // New: Always use default map location for finding nearby pets
  const loadPetsNearDefaultLocation = async () => {
    try {
      setLoading(true);

      // Always use default map location for finding nearby pets
      const currentLocation = DEFAULT_MAP_LOCATION;
      const mapRegion = DEFAULT_MAP_REGION;

      // Load pets from storage
      const pets = await loadLostPets();

      // Convert to display format
      const displayPets = pets.map(convertPetToDisplayFormat);

      // Filter pets that are within the visible map bounds
      const visiblePets = displayPets.filter(
        pet =>
          pet.latitude &&
          pet.longitude &&
          isCoordinateInMapBounds(pet.latitude, pet.longitude, mapRegion)
      );

      // Calculate distance and sort by proximity to default location
      const petsWithDistance = visiblePets
        .map(pet => ({
          ...pet,
          distance: calculateDistance(
            currentLocation.latitude,
            currentLocation.longitude,
            pet.latitude,
            pet.longitude
          ),
        }))
        .sort((a, b) => a.distance - b.distance);

      setLostPets(petsWithDistance);
    } catch (error) {
      console.error('Error loading pets:', error);
      Alert.alert('Error', 'No se pudieron cargar las mascotas perdidas.');
      setLostPets([]);
    } finally {
      setLoading(false);
    }
  };

  // Old: Used to load pets near user's actual location
  // const loadPetsNearUser = async () => {
  //   try {
  //     setLoading(true);
  //
  //     // Get user location first
  //     let currentLocation = null;
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //
  //     if (status === 'granted') {
  //       try {
  //         const location = await Location.getCurrentPositionAsync({});
  //         currentLocation = {
  //           latitude: location.coords.latitude,
  //           longitude: location.coords.longitude,
  //         };
  //         setUserLocation(currentLocation);
  //       } catch (locationError) {
  //         console.error('Error getting location:', locationError);
  //         // Use default location if getting position fails
  //         currentLocation = DEFAULT_MAP_LOCATION;
  //       }
  //     } else {
  //       // Use default location if permission denied
  //       currentLocation = DEFAULT_MAP_LOCATION;
  //       Alert.alert(
  //         'Permisos de ubicación',
  //         'Se necesitan permisos de ubicación para mostrar mascotas cercanas.'
  //       );
  //     }
  //
  //     // Load pets from storage
  //     const pets = await loadLostPets();
  //
  //     // Convert to display format
  //     const displayPets = pets.map(convertPetToDisplayFormat);
  //
  //     // Filter and sort by proximity
  //     const petsWithDistance = displayPets
  //       .filter(pet => pet.latitude && pet.longitude)
  //       .map(pet => ({
  //         ...pet,
  //         distance: calculateDistance(
  //           currentLocation.latitude,
  //           currentLocation.longitude,
  //           pet.latitude,
  //           pet.longitude
  //         ),
  //       }))
  //       .filter(pet => pet.distance <= MAX_DISTANCE_KM)
  //       .sort((a, b) => a.distance - b.distance);
  //
  //     setLostPets(petsWithDistance);
  //   } catch (error) {
  //     console.error('Error loading pets:', error);
  //     Alert.alert('Error', 'No se pudieron cargar las mascotas perdidas.');
  //     setLostPets([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleRegisterPet = () => {
    navigation.navigate('LostPetFlow');
  };

  const handlePetPress = pet => {
    setSelectedPet(pet);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPet(null);
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator size="large" color={colors.primary} />
        </LoadingContainer>
      </Container>
    );
  }

  // New: Always center map on default location
  const mapInitialRegion = DEFAULT_MAP_REGION;

  // Old: Used to center map on user location or default
  // const mapInitialRegion = userLocation
  //   ? {
  //       latitude: userLocation.latitude,
  //       longitude: userLocation.longitude,
  //       latitudeDelta: 0.01,
  //       longitudeDelta: 0.015,
  //     }
  //   : {
  //       latitude: -16.5035295,
  //       longitude: -68.1226286,
  //       latitudeDelta: 0.01,
  //       longitudeDelta: 0.015,
  //     };

  return (
    <Container>
      <StyledScrollView showsVerticalScrollIndicator={false}>
        <MapTitle>Mapa</MapTitle>
        <Map
          pets={lostPets}
          height={300}
          initialRegion={mapInitialRegion}
          onPetPress={handlePetPress}
        />
        <LostPetCarousel pets={lostPets} onPetPress={handlePetPress} />
        <RegisterButton onPress={handleRegisterPet}>
          <MaterialIcons name="pets" size={20} color={colors.surface} />
          <ButtonText>Registro de Perrito/Gatito Perdido</ButtonText>
        </RegisterButton>
      </StyledScrollView>
      <PetDetailModal
        visible={modalVisible}
        onClose={handleCloseModal}
        pet={selectedPet}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
  padding: 16px;
  padding-bottom: 20px;
`;

const MapTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.primary};
  margin-bottom: 8px;
`;

const RegisterButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary};
  border-radius: 12px;
  padding: 12px;
  margin-top: 0px;
  margin-horizontal: 0px;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
  elevation: 4;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.surface};
  margin-left: 8px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default HomeScreen;
