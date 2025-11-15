import React from 'react';
import { Modal, ScrollView, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import QRCodeAsset from '../../assets/QR.png';

const FoundPetDetailModal = ({ visible, onClose, notification }) => {
  if (!notification) return null;

  const petTypeText = notification.petType === 'cat' ? 'Gatito' : 'Perrito';

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
            <ContentCard>
              <Title>¡Se encontro a {notification.petName}!</Title>

              <InfoRow>
                <PhotoSection>
                  <PhotoLabel>Foto de {notification.petName}:</PhotoLabel>
                  <PhotoContainer>
                    {notification.imageUri ? (
                      <PetPhoto source={{ uri: notification.imageUri }} />
                    ) : (
                      <PhotoPlaceholder>
                        <MaterialIcons
                          name="pets"
                          size={48}
                          color={colors.textLight}
                        />
                      </PhotoPlaceholder>
                    )}
                  </PhotoContainer>
                </PhotoSection>

                <DescriptionSection>
                  <DescriptionLabel>Descripción:</DescriptionLabel>
                  <DescriptionContainer>
                    <DescriptionText>
                      {notification.description ||
                        `El ${notification.petType === 'cat' ? 'gatito' : 'perrito'} se encuentra en buen estado.`}
                    </DescriptionText>
                  </DescriptionContainer>
                </DescriptionSection>
              </InfoRow>

              <ShelterMessage>
                El Albergue Mis Amores Patitas se contactara pronto Contigo,
                manten la calma.
              </ShelterMessage>

              <DonationSection>
                <DonationTitle>
                  Puedes apoyarnos con una donacion:
                </DonationTitle>
                <DonationItem>
                  <DonationBullet>•</DonationBullet>
                  <DonationText>
                    Trayendo comida o ropa para los perritos y gatitos del
                    albergue.
                  </DonationText>
                </DonationItem>
                <DonationText style={{ marginTop: 12 }}>
                  O dando un apoyo economico en el siguiente QR:
                </DonationText>

                <QRCodeContainer>
                  <QRCodeImage source={QRCodeAsset} resizeMode="contain" />
                </QRCodeContainer>
              </DonationSection>

              <CloseButton onPress={onClose}>
                <CloseButtonText>Cerrar</CloseButtonText>
              </CloseButton>
            </ContentCard>
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

const ContentCard = styled.View`
  background-color: ${colors.background};
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.secondaryLight};
  margin-bottom: 20px;
  text-align: center;
`;

const InfoRow = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  gap: 12px;
`;

const PhotoSection = styled.View`
  flex: 1;
`;

const PhotoLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 8px;
`;

const PhotoContainer = styled.View`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${colors.surface};
  border-width: 1px;
  border-color: ${colors.border};
`;

const PetPhoto = styled.Image`
  width: 100%;
  height: 100%;
`;

const PhotoPlaceholder = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${colors.surfaceLight};
`;

const DescriptionSection = styled.View`
  flex: 1;
`;

const DescriptionLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 8px;
`;

const DescriptionContainer = styled.View`
  flex: 1;
  background-color: ${colors.surface};
  border-radius: 12px;
  padding: 12px;
  border-width: 1px;
  border-color: ${colors.border};
  min-height: 120px;
`;

const DescriptionText = styled.Text`
  font-size: 14px;
  color: ${colors.textPrimary};
  line-height: 20px;
`;

const ShelterMessage = styled.Text`
  font-size: 14px;
  color: ${colors.textPrimary};
  margin-bottom: 24px;
  line-height: 20px;
  text-align: center;
`;

const DonationSection = styled.View`
  margin-bottom: 24px;
`;

const DonationTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.secondaryLight};
  margin-bottom: 12px;
`;

const DonationItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const DonationBullet = styled.Text`
  font-size: 16px;
  color: ${colors.secondaryLight};
  margin-right: 8px;
`;

const DonationText = styled.Text`
  font-size: 14px;
  color: ${colors.secondaryLight};
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

const CloseButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

const CloseButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.surface};
`;

export default FoundPetDetailModal;
