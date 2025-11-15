import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import Map from '../Map';
import FoundPetFormModal from '../FoundPetFormModal';
import SeenPetFormModal from '../SeenPetFormModal';
import { DEFAULT_MAP_LOCATION, DEFAULT_MAP_ZOOM } from '../../utils/constants';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const PetDetailModal = ({ visible, onClose, pet }) => {
  const [foundFormVisible, setFoundFormVisible] = useState(false);
  const [seenFormVisible, setSeenFormVisible] = useState(false);
  const [fullImageVisible, setFullImageVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const fullImageScrollRef = useRef(null);

  // Scroll to selected image when modal opens
  useEffect(() => {
    if (fullImageVisible && fullImageScrollRef.current) {
      setTimeout(() => {
        fullImageScrollRef.current?.scrollTo({
          x: selectedImageIndex * SCREEN_WIDTH,
          animated: false,
        });
      }, 100);
    }
  }, [fullImageVisible, selectedImageIndex]);

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

  const handleImagePress = index => {
    setSelectedImageIndex(index);
    setFullImageVisible(true);
  };

  const handleCloseFullImage = () => {
    setFullImageVisible(false);
  };

  if (!pet) return null;

  // Use pet's actual lost location coordinates if available, otherwise use default
  const petCoordinates = {
    latitude: pet.latitude || DEFAULT_MAP_LOCATION.latitude,
    longitude: pet.longitude || DEFAULT_MAP_LOCATION.longitude,
  };

  // Create region to center map on pet's lost location
  const mapRegion = {
    latitude: petCoordinates.latitude,
    longitude: petCoordinates.longitude,
    ...DEFAULT_MAP_ZOOM,
  };

  // Get all pet images - support both new format (imageUrls array) and old format (imageUrl single)
  const petImages = pet.imageUrls || (pet.imageUrl ? [pet.imageUrl] : []);

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
                  <MaterialIcons
                    name="close"
                    size={24}
                    color={colors.secondaryLight}
                  />
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
                  initialRegion={mapRegion}
                  scrollEnabled={false}
                  zoomEnabled={false}
                  pitchEnabled={false}
                  rotateEnabled={false}
                  showsUserLocation={false}
                  showsCompass={false}
                  showsScale={false}
                />
              </MapSection>

              {petImages.length > 0 && (
                <PhotosSection>
                  <PhotosScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 8 }}
                  >
                    {petImages.map((imageUrl, index) => (
                      <PhotoTouchable
                        key={index}
                        onPress={() => handleImagePress(index)}
                        activeOpacity={0.8}
                      >
                        <PetPhoto
                          source={{ uri: imageUrl }}
                          resizeMode="cover"
                          style={index > 0 && { marginLeft: 8 }}
                        />
                      </PhotoTouchable>
                    ))}
                  </PhotosScrollView>
                </PhotosSection>
              )}

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

      {/* Full-size image viewer modal */}
      <Modal
        visible={fullImageVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseFullImage}
      >
        <FullImageOverlay>
          <FullImageCloseButton onPress={handleCloseFullImage}>
            <MaterialIcons name="close" size={32} color={colors.surface} />
          </FullImageCloseButton>
          <FullImageScrollView
            ref={fullImageScrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={event => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / SCREEN_WIDTH
              );
              setSelectedImageIndex(index);
            }}
          >
            {petImages.map((imageUrl, index) => (
              <FullImageContainer key={index}>
                <FullImage source={{ uri: imageUrl }} resizeMode="contain" />
              </FullImageContainer>
            ))}
          </FullImageScrollView>
          {petImages.length > 1 && (
            <ImageCounter>
              <ImageCounterText>
                {selectedImageIndex + 1} / {petImages.length}
              </ImageCounterText>
            </ImageCounter>
          )}
        </FullImageOverlay>
      </Modal>
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
  color: ${colors.secondaryLight};
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

const PhotosScrollView = styled.ScrollView`
  flex-direction: row;
`;

const PhotoTouchable = styled.TouchableOpacity``;

const PetPhoto = styled.Image`
  width: 120px;
  height: 120px;
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
  background-color: ${colors.primary};
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

const FullImageOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.95);
  justify-content: center;
  align-items: center;
`;

const FullImageCloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  right: 20px;
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const FullImageScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const FullImageContainer = styled.View`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT}px;
  justify-content: center;
  align-items: center;
`;

const FullImage = styled.Image`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT}px;
`;

const ImageCounter = styled.View`
  position: absolute;
  bottom: 40px;
  align-self: center;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  border-radius: 20px;
`;

const ImageCounterText = styled.Text`
  color: ${colors.surface};
  font-size: 14px;
  font-weight: 600;
`;

export default PetDetailModal;
