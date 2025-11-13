import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme';
import ProgressIndicator from '../../components/ProgressIndicator';
import Step1PetInfoForm from '../../components/LostPetFlow/Step1PetInfoForm';
import Step2DateTimePicker from '../../components/LostPetFlow/Step2DateTimePicker';
import Step3PhotoUpload from '../../components/LostPetFlow/Step3PhotoUpload';
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
    location: '',
    breed: '',
    characteristics: '',
    date: new Date(),
    hour: 1,
    minute: 30,
    period: 'PM',
    imageUri: null,
  });

  const handleFormDataChange = newData => {
    setFormData(newData);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      handleSubmit();
    }
  };

  const handleCancel = () => {
    // if (navigation?.goBack) {
    navigation.goBack();
    // }
  };

  const handleSubmit = async () => {
    try {
      // Convert date to ISO string if it's a Date object
      const petData = {
        petType,
        name: formData.name,
        location: formData.location,
        breed: formData.breed,
        characteristics: formData.characteristics,
        date:
          formData.date instanceof Date
            ? formData.date.toISOString()
            : formData.date,
        hour: formData.hour,
        minute: formData.minute,
        period: formData.period,
        imageUri: formData.imageUri,
        // Add default coordinates if not provided (can be updated later)
        latitude: null,
        longitude: null,
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
          <Step2DateTimePicker
            formData={formData}
            onFormDataChange={handleFormDataChange}
            petType={petType}
          />
        );
      case 3:
        return (
          <Step3PhotoUpload
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
      <ProgressIndicator currentStep={currentStep} totalSteps={3} />
      <StepContainer>{renderStep()}</StepContainer>
      <ButtonContainer>
        <CancelButton onPress={handleCancel}>
          <ButtonText>Cancelar</ButtonText>
        </CancelButton>
        <NextButton onPress={handleNext}>
          <ButtonText>Siguiente</ButtonText>
        </NextButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const StepContainer = styled.View`
  flex: 1;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  padding: 16px;
  gap: 12px;
  border-top-width: 1px;
  border-top-color: ${colors.border};
  background-color: ${colors.surface};
`;

const NextButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${colors.orange};
  border-radius: 12px;
  padding: 14px;
  align-items: center;
  justify-content: center;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
  elevation: 4;
`;

const CancelButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${colors.orangeLight};
  border-radius: 12px;
  padding: 14px;
  align-items: center;
  justify-content: center;
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
`;

export default LostPetFlowScreen;
