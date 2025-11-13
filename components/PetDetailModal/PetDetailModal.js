import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import Map from '../Map';
import FoundPetFormModal from '../FoundPetFormModal';
import SeenPetFormModal from '../SeenPetFormModal';

const PetDetailModal = ({ visible, onClose, pet }) => {
  const [foundFormVisible, setFoundFormVisible] = useState(false);
  const [seenFormVisible, setSeenFormVisible] = useState(false);

  if (!pet) return null;

  const handleFound = () => {
    setFoundFormVisible(true);
  };

  const handleCloseFoundForm = () => {
    setFoundFormVisible(false);
  };

  const handleSeen = () => {
    setSeenFormVisible(true);
  };

  const handleCloseSeenForm = () => {
    setSeenFormVisible(false);
  };

  // Generate coordinates for the map (mock data for now)
  const petCoordinates = {
    latitude: -16.5,
    longitude: -68.12,
  };

  // Use pet image as main photo, duplicate for gallery
  const petImages = [pet.imageUrl, pet.imageUrl];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <ModalOverlay>
        <ModalContent>
          <ScrollView showsVerticalScrollIndicator={false}>
            <OrangeCard>
              <HeaderRow>
                <PetName>Nombre: {pet.petName}</PetName>
                <CloseButton onPress={onClose}>
                  <MaterialIcons name="close" size={24} color={colors.info} />
                </CloseButton>
              </HeaderRow>

              <InfoSection>
                <InfoRow>
                  <InfoLabel>Tiempo perdido:</InfoLabel>
                  <InfoValue>{pet.timeLost}</InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>Zona o lugar:</InfoLabel>
                  <InfoValue>{pet.zone}</InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>Características:</InfoLabel>
                  <InfoValue>{pet.characteristics}</InfoValue>
                </InfoRow>
              </InfoSection>

              <MapSection>
                <Map
                  pets={[
                    {
                      ...pet,
                      latitude: petCoordinates.latitude,
                      longitude: petCoordinates.longitude,
                    },
                  ]}
                  height={250}
                />
              </MapSection>

              <PhotosSection>
                <PhotosRow>
                  {petImages.map((imageUrl, index) => (
                    <PetPhoto
                      key={index}
                      source={{ uri: imageUrl }}
                      resizeMode="cover"
                      style={index > 0 && { marginLeft: 8 }}
                    />
                  ))}
                </PhotosRow>
              </PhotosSection>

              <ActionButtonsRow>
                <ActionButton onPress={handleFound} style={{ marginRight: 8 }}>
                  <ActionButtonText>¡Lo Encontre!</ActionButtonText>
                </ActionButton>
                <ActionButton onPress={handleSeen} style={{ marginLeft: 8 }}>
                  <ActionButtonText>¡Lo Vi!</ActionButtonText>
                </ActionButton>
              </ActionButtonsRow>
            </OrangeCard>
          </ScrollView>
        </ModalContent>
      </ModalOverlay>

      <FoundPetFormModal
        visible={foundFormVisible}
        onClose={handleCloseFoundForm}
        pet={pet}
      />

      <SeenPetFormModal
        visible={seenFormVisible}
        onClose={handleCloseSeenForm}
        pet={pet}
      />
    </Modal>
  );
};

const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.View`
  width: 90%;
  max-height: 90%;
  background-color: transparent;
`;

const OrangeCard = styled.View`
  background-color: ${colors.background};
  border-radius: 16px;
  padding: 20px;
  margin: 20px 0;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const PetName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.info};
  flex: 1;
`;

const CloseButton = styled.TouchableOpacity`
  padding: 4px;
`;

const InfoSection = styled.View`
  margin-bottom: 16px;
`;

const InfoRow = styled.View`
  margin-bottom: 8px;
`;

const InfoLabel = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 2px;
`;

const InfoValue = styled.Text`
  font-size: 12px;
  color: ${colors.textPrimary};
  line-height: 16px;
`;

const MapSection = styled.View`
  margin-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${colors.surface};
`;

const PhotosSection = styled.View`
  margin-bottom: 16px;
`;

const PhotosRow = styled.View`
  flex-direction: row;
`;

const PetPhoto = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  background-color: ${colors.surface};
`;

const ActionButtonsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

const ActionButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${colors.orange};
  border-radius: 8px;
  padding: 12px;
  align-items: center;
  justify-content: center;
`;

const ActionButtonText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.surface};
`;

export default PetDetailModal;
