import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import {
  DEFAULT_MAP_LOCATION,
  DEFAULT_MAP_REGION,
} from '../../utils/constants';
import { addNotification } from '../../utils/storage';

// Import MapView and Marker for native platforms
let MapView, PROVIDER_GOOGLE, Marker;
if (Platform.OS !== 'web') {
  const MapModule = require('react-native-maps');
  MapView = MapModule.default;
  PROVIDER_GOOGLE = MapModule.PROVIDER_GOOGLE;
  Marker = MapModule.Marker;
}

const SeenPetFormModal = ({ visible, onClose, pet }) => {
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [loadingAddress, setLoadingAddress] = useState(false);

  if (!pet) return null;

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permisos necesarios',
        'Se necesitan permisos para acceder a la galería de fotos.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleCancel = () => {
    setDescription('');
    setSelectedImage(null);
    setSelectedLocation(null);
    setAddress(null);
    onClose();
  };

  // Reverse geocode coordinates to get address
  const reverseGeocode = async (latitude, longitude) => {
    if (Platform.OS === 'web') {
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
        return fullAddress;
      } else {
        const fallback = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
        setAddress(fallback);
        return fallback;
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      const fallback = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
      setAddress(fallback);
      return fallback;
    } finally {
      setLoadingAddress(false);
    }
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
    reverseGeocode(latitude, longitude);
  };

  // Use default map region
  const defaultRegion = DEFAULT_MAP_REGION;

  const handleSubmit = async () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Por favor, ingresa una descripción.');
      return;
    }

    if (!selectedLocation) {
      Alert.alert(
        'Error',
        'Por favor, selecciona la ubicación en el mapa donde viste a la mascota.'
      );
      return;
    }

    try {
      // Save notification
      await addNotification({
        type: 'pet_seen',
        petId: pet.id,
        petName: pet.petName,
        petType: pet.type || 'cat', // Default to cat if not specified
        description: description.trim(),
        imageUri: selectedImage,
        location:
          address ||
          `Lat: ${selectedLocation.latitude.toFixed(4)}, Lng: ${selectedLocation.longitude.toFixed(4)}`,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      });

      Alert.alert('¡Gracias!', 'Tu reporte ha sido enviado exitosamente.', [
        {
          text: 'OK',
          onPress: () => {
            setDescription('');
            setSelectedImage(null);
            setSelectedLocation(null);
            setAddress(null);
            onClose();
          },
        },
      ]);
    } catch (error) {
      console.error('Error saving notification:', error);
      Alert.alert(
        'Error',
        'Hubo un problema al guardar el reporte. Por favor, intenta nuevamente.'
      );
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleCancel}
    >
      <ModalOverlay>
        <ModalContent>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FormContainer>
              <Title>
                ¿Viste a <HighlightedText>{pet.petName}</HighlightedText>?
              </Title>

              <Instructions>
                Coloca una breve descripcion sobre como viste a{' '}
                <HighlightedText>{pet.petName}</HighlightedText>.
              </Instructions>

              <DescriptionContainer>
                <DescriptionInput
                  placeholder="Breve descripcion"
                  placeholderTextColor={colors.textLight}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
                <PencilIcon>
                  <MaterialIcons
                    name="edit"
                    size={20}
                    color={colors.textSecondary}
                  />
                </PencilIcon>
              </DescriptionContainer>

              <PhotoSection>
                <PhotoLabel>
                  Sube una del lugar donde viste a{' '}
                  <HighlightedText>{pet.petName}</HighlightedText>:
                </PhotoLabel>
                <PhotoUploadContainer onPress={handleImagePicker}>
                  {selectedImage ? (
                    <SelectedImage source={{ uri: selectedImage }} />
                  ) : (
                    <>
                      <PetIconsContainer>
                        <DogIcon>
                          <MaterialIcons
                            name="pets"
                            size={32}
                            color={colors.textSecondary}
                          />
                        </DogIcon>
                        <CatIcon>
                          <MaterialIcons
                            name="pets"
                            size={32}
                            color={colors.textSecondary}
                          />
                        </CatIcon>
                      </PetIconsContainer>
                      <PlusIcon>
                        <MaterialIcons
                          name="add"
                          size={24}
                          color={colors.textSecondary}
                        />
                      </PlusIcon>
                    </>
                  )}
                </PhotoUploadContainer>
              </PhotoSection>

              <MapSection>
                <MapLabel>
                  Agrega el lugar donde viste a{' '}
                  <HighlightedText>{pet.petName}</HighlightedText>:
                </MapLabel>
                <InstructionsText>
                  Toca el mapa para marcar la ubicación donde viste a{' '}
                  <HighlightedText>{pet.petName}</HighlightedText>
                </InstructionsText>
                <MapContainer>
                  {Platform.OS === 'web' ? (
                    <WebMapPlaceholder>
                      <MaterialIcons
                        name="map"
                        size={48}
                        color={colors.textLight}
                      />
                      <WebMapText>
                        Los mapas están disponibles en la aplicación móvil
                      </WebMapText>
                    </WebMapPlaceholder>
                  ) : (
                    <MapView
                      style={mapStyles.map}
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
                          <ActivityIndicator
                            size="small"
                            color={colors.primary}
                          />
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
              </MapSection>

              <ButtonsRow>
                <SubmitButton onPress={handleSubmit} style={{ marginRight: 6 }}>
                  <ButtonText>Enviar</ButtonText>
                </SubmitButton>
                <CancelButton onPress={handleCancel} style={{ marginLeft: 6 }}>
                  <ButtonText>Cancelar</ButtonText>
                </CancelButton>
              </ButtonsRow>
            </FormContainer>
          </ScrollView>
        </ModalContent>
      </ModalOverlay>
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

const FormContainer = styled.View`
  background-color: ${colors.background};
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.secondaryLight};
  margin-bottom: 12px;
  text-align: center;
`;

const HighlightedText = styled.Text`
  color: ${colors.secondaryLight};
`;

const Instructions = styled.Text`
  font-size: 14px;
  color: ${colors.textSecondary};
  margin-bottom: 20px;
  line-height: 20px;
`;

const DescriptionContainer = styled.View`
  background-color: ${colors.surface};
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 24px;
  min-height: 120px;
  position: relative;
`;

const DescriptionInput = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: ${colors.textPrimary};
  min-height: 100px;
`;

const PencilIcon = styled.View`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const PhotoSection = styled.View`
  margin-bottom: 24px;
`;

const PhotoLabel = styled.Text`
  font-size: 14px;
  color: ${colors.textSecondary};
  margin-bottom: 12px;
`;

const PhotoUploadContainer = styled.TouchableOpacity`
  width: 100%;
  aspect-ratio: 1;
  background-color: ${colors.surface};
  border-radius: 12px;
  border-width: 2px;
  border-color: ${colors.border};
  border-style: dashed;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const SelectedImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

const PetIconsContainer = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
`;

const DogIcon = styled.View`
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

const CatIcon = styled.View`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const PlusIcon = styled.View`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: ${colors.surfaceLight};
  border-radius: 20px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const MapSection = styled.View`
  margin-bottom: 24px;
`;

const MapLabel = styled.Text`
  font-size: 14px;
  color: ${colors.textSecondary};
  margin-bottom: 12px;
`;

const mapStyles = {
  map: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
};

const MapContainer = styled.View`
  width: 100%;
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${colors.surface};
  margin-bottom: 12px;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const InstructionsText = styled.Text`
  font-size: 12px;
  color: ${colors.textSecondary};
  margin-bottom: 8px;
  line-height: 16px;
`;

const WebMapPlaceholder = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${colors.surfaceLight};
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`;

const WebMapText = styled.Text`
  font-size: 12px;
  color: ${colors.textSecondary};
  margin-top: 8px;
  text-align: center;
  padding-horizontal: 16px;
`;

const LocationInfo = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.primaryLight};
  border-radius: 12px;
  padding: 12px 16px;
  margin-top: 8px;
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

const MarkerContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const ButtonsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SubmitButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${colors.primary};
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

const CancelButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${colors.primaryLight};
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.surface};
`;

export default SeenPetFormModal;
