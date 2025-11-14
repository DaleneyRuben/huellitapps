import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

const FoundPetFormModal = ({ visible, onClose, pet }) => {
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleSubmit = () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Por favor, ingresa una descripción.');
      return;
    }

    // Here you would typically send the data to your backend
    Alert.alert('¡Gracias!', 'Tu reporte ha sido enviado exitosamente.', [
      {
        text: 'OK',
        onPress: () => {
          setDescription('');
          setSelectedImage(null);
          onClose();
        },
      },
    ]);
  };

  const handleCancel = () => {
    setDescription('');
    setSelectedImage(null);
    onClose();
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
                ¿Encontraste a <HighlightedText>{pet.petName}</HighlightedText>?
              </Title>

              <Instructions>
                Coloca una breve descripcion sobre el{' '}
                <HighlightedText>estado</HighlightedText> de{' '}
                <HighlightedText>{pet.petName}</HighlightedText>.
              </Instructions>

              <DescriptionContainer>
                <DescriptionInput
                  placeholder="Caracteristicas"
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
                  Sube una foto de{' '}
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

export default FoundPetFormModal;
