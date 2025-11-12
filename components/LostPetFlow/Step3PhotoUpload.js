import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../theme';
import * as ImagePicker from 'expo-image-picker';

const Step3PhotoUpload = ({ formData, onFormDataChange, petType }) => {
  const [imageUri, setImageUri] = useState(formData.imageUri || null);

  const petTypeText = petType === 'cat' ? 'Gatito' : 'Perrito';

  const pickImage = async () => {
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
      setImageUri(uri);
      onFormDataChange({
        ...formData,
        imageUri: uri,
      });
    }
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <QuestionText>¿Agrega una foto de tu {petTypeText}?</QuestionText>

        <PhotoUploadContainer onPress={pickImage}>
          {imageUri ? (
            <UploadedImage source={{ uri: imageUri }} resizeMode="cover" />
          ) : (
            <>
              <PetIconContainer>
                <CatIcon>
                  <FontAwesome5 name="cat" size={40} color={colors.textLight} />
                </CatIcon>
                <DogIcon>
                  <FontAwesome5 name="dog" size={40} color={colors.textLight} />
                </DogIcon>
              </PetIconContainer>
              <AddIconContainer>
                <MaterialIcons
                  name="add"
                  size={24}
                  color={colors.textSecondary}
                />
              </AddIconContainer>
            </>
          )}
        </PhotoUploadContainer>

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
            <QRCodePlaceholder>
              <QRCodeGrid>
                {Array.from({ length: 64 }, (_, i) => (
                  <QRCodeSquare key={i} filled={Math.random() > 0.5} />
                ))}
              </QRCodeGrid>
            </QRCodePlaceholder>
          </QRCodeContainer>
        </DonationSection>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

const QuestionText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.info};
  margin-bottom: 16px;
`;

const PhotoUploadContainer = styled.TouchableOpacity`
  width: 100%;
  height: 300px;
  background-color: ${colors.secondaryLight};
  border-radius: 16px;
  margin-bottom: 24px;
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

const PetIconContainer = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
`;

const CatIcon = styled.View`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const DogIcon = styled.View`
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

const AddIconContainer = styled.View`
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
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

const QRCodePlaceholder = styled.View`
  width: 200px;
  height: 200px;
  background-color: ${colors.secondaryLight};
  border-radius: 16px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const QRCodeGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

const QRCodeSquare = styled.View`
  width: 20px;
  height: 20px;
  background-color: ${props =>
    props.filled ? colors.textSecondary : 'transparent'};
  border: 1px solid ${colors.border};
`;

export default Step3PhotoUpload;
