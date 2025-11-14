import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../theme';
import * as ImagePicker from 'expo-image-picker';
import QRCodeAsset from '../../assets/QR.png';

const Step3PhotoUpload = ({ formData, onFormDataChange, petType }) => {
  // Support both old format (single imageUri) and new format (imageUris array)
  const initialImages =
    formData.imageUris || (formData.imageUri ? [formData.imageUri] : []);
  const [imageUris, setImageUris] = useState(initialImages);
  const MAX_PHOTOS = 3;

  const petTypeText = petType === 'cat' ? 'Gatito' : 'Perrito';

  // Sync state when formData changes externally
  useEffect(() => {
    const currentImages =
      formData.imageUris || (formData.imageUri ? [formData.imageUri] : []);
    setImageUris(currentImages);
  }, [formData.imageUris, formData.imageUri]);

  const pickImage = async () => {
    if (imageUris.length >= MAX_PHOTOS) {
      alert(`Solo puedes agregar hasta ${MAX_PHOTOS} fotos`);
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se necesita permiso para acceder a las fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      const uri = result.assets[0].uri;
      const newImageUris = [...imageUris, uri];
      setImageUris(newImageUris);
      onFormDataChange({
        ...formData,
        imageUris: newImageUris,
        // Keep imageUri for backward compatibility (use first image)
        imageUri: newImageUris[0],
      });
    }
  };

  const removeImage = index => {
    const newImageUris = imageUris.filter((_, i) => i !== index);
    setImageUris(newImageUris);
    onFormDataChange({
      ...formData,
      imageUris: newImageUris,
      // Keep imageUri for backward compatibility (use first image or null)
      imageUri: newImageUris.length > 0 ? newImageUris[0] : null,
    });
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <QuestionText>
          ¿Agrega fotos de tu {petTypeText}? ({imageUris.length}/{MAX_PHOTOS})
        </QuestionText>

        <PhotosContainer>
          {imageUris.map((uri, index) => (
            <PhotoWrapper key={index}>
              <PhotoItem>
                <UploadedImage source={{ uri }} resizeMode="cover" />
                <RemoveButton onPress={() => removeImage(index)}>
                  <MaterialIcons
                    name="close"
                    size={20}
                    color={colors.surface}
                  />
                </RemoveButton>
              </PhotoItem>
            </PhotoWrapper>
          ))}

          {imageUris.length < MAX_PHOTOS && (
            <PhotoWrapper>
              <PhotoUploadContainer onPress={pickImage}>
                <PetIconContainer>
                  <CatIcon>
                    <FontAwesome5
                      name="cat"
                      size={32}
                      color={colors.textLight}
                    />
                  </CatIcon>
                  <DogIcon>
                    <FontAwesome5
                      name="dog"
                      size={32}
                      color={colors.textLight}
                    />
                  </DogIcon>
                </PetIconContainer>
                <AddIconContainer>
                  <MaterialIcons
                    name="add"
                    size={24}
                    color={colors.textSecondary}
                  />
                </AddIconContainer>
              </PhotoUploadContainer>
            </PhotoWrapper>
          )}
        </PhotosContainer>

        <DonationSection>
          <DonationTitle>Puedes apoyarnos con una donación:</DonationTitle>
          <DonationItem>
            <DonationBullet>•</DonationBullet>
            <DonationText>
              Trayendo comida o ropa para los perritos y gatitos del albergue.
            </DonationText>
          </DonationItem>
          <DonationText style={{ marginTop: 12 }}>
            O dando un apoyo económico en el siguiente QR:
          </DonationText>

          <QRCodeContainer>
            <QRCodeImage source={QRCodeAsset} resizeMode="contain" />
          </QRCodeContainer>
        </DonationSection>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 0;
`;

const QuestionText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.secondaryLight};
  margin-bottom: 16px;
`;

const PhotosContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 24px;
  gap: 12px;
`;

const PhotoWrapper = styled.View`
  width: 48%;
  aspect-ratio: 1;
`;

const PhotoItem = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const PhotoUploadContainer = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background-color: ${colors.primaryLight};
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  justify-content: center;
  align-items: center;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const UploadedImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
`;

const PetIconContainer = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
`;

const CatIcon = styled.View`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const DogIcon = styled.View`
  position: absolute;
  bottom: 16px;
  left: 16px;
`;

const AddIconContainer = styled.View`
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${colors.surface};
  justify-content: center;
  align-items: center;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;

const DonationSection = styled.View`
  margin-top: 8px;
`;

const DonationTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 12px;
`;

const DonationItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const DonationBullet = styled.Text`
  font-size: 16px;
  color: ${colors.textPrimary};
  margin-right: 8px;
`;

const DonationText = styled.Text`
  font-size: 14px;
  color: ${colors.textPrimary};
  flex: 1;
  line-height: 20px;
`;

const QRCodeContainer = styled.View`
  align-items: center;
  margin-top: 16px;
`;

const QRCodeImage = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 16px;
`;

export default Step3PhotoUpload;
