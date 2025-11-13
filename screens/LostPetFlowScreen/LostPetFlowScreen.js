import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import ProgressIndicator from '../../components/ProgressIndicator';
import Step1PetInfoForm from '../../components/LostPetFlow/Step1PetInfoForm';
import Step2MapPicker from '../../components/LostPetFlow/Step2MapPicker';
import Step3DateTimePicker from '../../components/LostPetFlow/Step2DateTimePicker';
import Step4PhotoUpload from '../../components/LostPetFlow/Step3PhotoUpload';
import { addLostPet } from '../../utils/storage';

const PET_TYPES = {
  DOG: 'dog',
  CAT: 'cat',
};

const LostPetFlowScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [petType, setPetType] = useState(PET_TYPES.CAT);
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    characteristics: '',
    latitude: null,
    longitude: null,
    date: new Date(),
    hour: 1,
    minute: 30,
    period: 'PM',
    imageUri: null,
  });

  const handleFormDataChange = newData => {
    setFormData(newData);
  };

  // Validation functions for each step
  const validateStep1 = () => {
    if (!formData.name || !formData.name.trim()) {
      Alert.alert(
        'Campo requerido',
        'Por favor, ingresa el nombre de tu compañerito.'
      );
      return false;
    }
    if (!formData.breed || !formData.breed.trim()) {
      Alert.alert(
        'Campo requerido',
        'Por favor, ingresa la raza de tu compañerito.'
      );
      return false;
    }
    if (!formData.characteristics || !formData.characteristics.trim()) {
      Alert.alert(
        'Campo requerido',
        'Por favor, describe las características de tu compañerito.'
      );
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.latitude || !formData.longitude) {
      Alert.alert(
        'Ubicación requerida',
        'Por favor, selecciona la ubicación en el mapa donde se perdió tu compañerito.'
      );
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.date) {
      Alert.alert(
        'Campo requerido',
        'Por favor, selecciona la fecha cuando se perdió tu compañerito.'
      );
      return false;
    }
    // Date, hour, minute, and period should always have values (they have defaults)
    return true;
  };

  const validateStep4 = () => {
    if (!formData.imageUri) {
      Alert.alert(
        'Foto requerida',
        'Por favor, sube una foto de tu compañerito.'
      );
      return false;
    }
    return true;
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return validateStep1();
      case 2:
        return validateStep2();
      case 3:
        return validateStep3();
      case 4:
        return validateStep4();
      default:
        return true;
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    // Validate current step before proceeding
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form (already validated in step 4)
      handleSubmit();
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    try {
      // Convert date to ISO string if it's a Date object
      const petData = {
        petType,
        name: formData.name,
        breed: formData.breed,
        characteristics: formData.characteristics,
        latitude: formData.latitude,
        longitude: formData.longitude,
        address: formData.location || null, // Save address from reverse geocoding
        date:
          formData.date instanceof Date
            ? formData.date.toISOString()
            : formData.date,
        hour: formData.hour,
        minute: formData.minute,
        period: formData.period,
        imageUri: formData.imageUri,
      };

      await addLostPet(petData);
      console.log('Pet saved to storage:', petData);

      if (navigation?.goBack) {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error saving pet:', error);
      // Still navigate back even if there's an error
      if (navigation?.goBack) {
        navigation.goBack();
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1PetInfoForm
            formData={formData}
            onFormDataChange={handleFormDataChange}
            petType={petType}
            onPetTypeChange={setPetType}
          />
        );
      case 2:
        return (
          <Step2MapPicker
            formData={formData}
            onFormDataChange={handleFormDataChange}
            petType={petType}
          />
        );
      case 3:
        return (
          <Step3DateTimePicker
            formData={formData}
            onFormDataChange={handleFormDataChange}
            petType={petType}
          />
        );
      case 4:
        return (
          <Step4PhotoUpload
            formData={formData}
            onFormDataChange={handleFormDataChange}
            petType={petType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <ModalCard>
        <HeaderRow>
          <ProgressIndicator currentStep={currentStep} totalSteps={4} />
          <CloseButton onPress={handleCancel}>
            <MaterialIcons name="close" size={24} color={colors.info} />
          </CloseButton>
        </HeaderRow>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <StepContainer>{renderStep()}</StepContainer>
        </ScrollView>
        <ButtonContainer>
          {currentStep > 1 && (
            <BackButton onPress={handleBack}>
              <BackButtonText>Regresar</BackButtonText>
            </BackButton>
          )}
          <NextButton hasBack={currentStep > 1} onPress={handleNext}>
            <ButtonText>
              {currentStep === 4 ? 'Enviar' : 'Siguiente'}
            </ButtonText>
          </NextButton>
        </ButtonContainer>
      </ModalCard>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const ModalCard = styled.View`
  width: 90%;
  height: 85%;
  background-color: ${colors.background};
  border-radius: 16px;
  padding: 20px;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 8;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const CloseButton = styled.TouchableOpacity`
  padding: 4px;
`;

const StepContainer = styled.View`
  flex: 1;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  padding-top: 16px;
  gap: 12px;
  border-top-width: 1px;
  border-top-color: ${colors.border};
  margin-top: 16px;
`;

const BackButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${colors.surface};
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: ${colors.orange};
`;

const NextButton = styled.TouchableOpacity`
  flex: ${props => (props.hasBack ? 2 : 1)};
  background-color: ${colors.orange};
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.surface};
`;

const BackButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.orange};
`;

export default LostPetFlowScreen;
