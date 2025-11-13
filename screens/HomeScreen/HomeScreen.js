import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { colors } from '../../theme';
import Map from '../../components/Map';
import LostPetCarousel from '../../components/LostPetCarousel';
import PetDetailModal from '../../components/PetDetailModal';
import { loadLostPets, convertPetToDisplayFormat } from '../../utils/storage';

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

const HomeScreen = () => {
  const navigation = useNavigation();
  const [lostPets, setLostPets] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadPetsNearUser();
  }, []);

  const loadPetsNearUser = async () => {
    try {
      setLoading(true);

      // Get user location first
      let currentLocation = null;
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        try {
          const location = await Location.getCurrentPositionAsync({});
          currentLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setUserLocation(currentLocation);
        } catch (locationError) {
          console.error('Error getting location:', locationError);
          // Use default location if getting position fails
          currentLocation = {
            latitude: -16.5,
            longitude: -68.15,
          };
        }
      } else {
        // Use default location (La Paz, Bolivia) if permission denied
        currentLocation = {
          latitude: -16.5,
          longitude: -68.15,
        };
        Alert.alert(
          'Permisos de ubicación',
          'Se necesitan permisos de ubicación para mostrar mascotas cercanas.'
        );
      }

      // Load pets from storage
      const pets = await loadLostPets();

      // Convert to display format
      const displayPets = pets.map(convertPetToDisplayFormat);

      // Filter and sort by proximity
      const petsWithDistance = displayPets
        .filter(pet => pet.latitude && pet.longitude)
        .map(pet => ({
          ...pet,
          distance: calculateDistance(
            currentLocation.latitude,
            currentLocation.longitude,
            pet.latitude,
            pet.longitude
          ),
        }))
        .filter(pet => pet.distance <= MAX_DISTANCE_KM)
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
          <ActivityIndicator size="large" color={colors.orange} />
        </LoadingContainer>
      </Container>
    );
  }

  // Prepare initial region for map (center on user location or default)
  const mapInitialRegion = userLocation
    ? {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : {
        latitude: -16.5,
        longitude: -68.15,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

  return (
    <Container>
      <StyledScrollView showsVerticalScrollIndicator={false}>
        <MapTitle>Mapa</MapTitle>
        <Map pets={lostPets} height={300} initialRegion={mapInitialRegion} />
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
  color: ${colors.orange};
  margin-bottom: 8px;
`;

const RegisterButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${colors.orange};
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
