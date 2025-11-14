import React, { useState, useEffect } from 'react';
import { Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import Map from '../../components/Map';
import PetDetailModal from '../../components/PetDetailModal';
import { loadLostPets, convertPetToDisplayFormat } from '../../utils/storage';
import { colors } from '../../theme';
import { DEFAULT_MAP_REGION } from '../../utils/constants';

const MapScreen = () => {
  const navigation = useNavigation();
  const [allPets, setAllPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const screenHeight = Dimensions.get('window').height;
  // Subtract approximate header and tab bar height (around 120px total)
  const mapHeight = screenHeight - 200;

  useEffect(() => {
    loadAllPets();
  }, []);

  const loadAllPets = async () => {
    try {
      setLoading(true);
      const pets = await loadLostPets();
      const displayPets = pets
        .map(convertPetToDisplayFormat)
        .filter(pet => pet.latitude && pet.longitude);
      setAllPets(displayPets);
    } catch (error) {
      console.error('Error loading pets:', error);
      setAllPets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPetPress = () => {
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

  return (
    <>
      <Map
        pets={allPets}
        height={mapHeight}
        initialRegion={DEFAULT_MAP_REGION}
        onAddPetPress={handleAddPetPress}
        onPetPress={handlePetPress}
      />
      <PetDetailModal
        visible={modalVisible}
        onClose={handleCloseModal}
        pet={selectedPet}
      />
    </>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default MapScreen;
