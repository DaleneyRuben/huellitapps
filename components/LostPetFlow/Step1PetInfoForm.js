import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../theme';

const PET_TYPES = {
  DOG: 'dog',
  CAT: 'cat',
};

const Step1PetInfoForm = ({
  formData,
  onFormDataChange,
  petType,
  onPetTypeChange,
}) => {
  const handleInputChange = (field, value) => {
    onFormDataChange({
      ...formData,
      [field]: value,
    });
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <QuestionRow>
          <QuestionText>¿Perdiste a tu Perrito/Gatito?</QuestionText>
          <PetTypeSelector>
            <PetTypeButton
              isSelected={petType === PET_TYPES.CAT}
              onPress={() => onPetTypeChange(PET_TYPES.CAT)}
            >
              <FontAwesome5
                name="cat"
                size={24}
                color={
                  petType === PET_TYPES.CAT
                    ? colors.surface
                    : colors.textSecondary
                }
              />
            </PetTypeButton>
            <PetTypeButton
              isSelected={petType === PET_TYPES.DOG}
              onPress={() => onPetTypeChange(PET_TYPES.DOG)}
            >
              <FontAwesome5
                name="dog"
                size={24}
                color={
                  petType === PET_TYPES.DOG
                    ? colors.surface
                    : colors.textSecondary
                }
              />
            </PetTypeButton>
          </PetTypeSelector>
        </QuestionRow>

        <InputField>
          <InputLabel>Nombre de tu compañerito</InputLabel>
          <InputContainer>
            <StyledTextInput
              value={formData.name}
              onChangeText={value => handleInputChange('name', value)}
              placeholder="Ingresa el nombre"
              placeholderTextColor={colors.textLight}
            />
            <EditIcon>
              <MaterialIcons
                name="edit"
                size={20}
                color={colors.textSecondary}
              />
            </EditIcon>
          </InputContainer>
        </InputField>

        <InputField>
          <InputLabel>Raza</InputLabel>
          <InputContainer>
            <StyledTextInput
              value={formData.breed}
              onChangeText={value => handleInputChange('breed', value)}
              placeholder="Ingresa la raza"
              placeholderTextColor={colors.textLight}
            />
            <EditIcon>
              <MaterialIcons
                name="edit"
                size={20}
                color={colors.textSecondary}
              />
            </EditIcon>
          </InputContainer>
        </InputField>

        <InputField>
          <InputLabel>Características</InputLabel>
          <TextAreaContainer>
            <StyledTextArea
              value={formData.characteristics}
              onChangeText={value =>
                handleInputChange('characteristics', value)
              }
              placeholder="Describe las características de tu compañerito"
              placeholderTextColor={colors.textLight}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <EditIconAbsolute>
              <MaterialIcons
                name="edit"
                size={20}
                color={colors.textSecondary}
              />
            </EditIconAbsolute>
          </TextAreaContainer>
        </InputField>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

const QuestionRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const QuestionText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.info};
  flex: 1;
  margin-right: 12px;
`;

const PetTypeSelector = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const PetTypeButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: ${props =>
    props.isSelected ? colors.info : colors.surface};
  border-width: 1px;
  border-color: ${props => (props.isSelected ? colors.info : colors.border)};
  justify-content: center;
  align-items: center;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const InputField = styled.View`
  margin-bottom: 20px;
`;

const InputLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textPrimary};
  margin-bottom: 8px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  padding: 12px 16px;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${colors.textPrimary};
`;

const EditIcon = styled.View`
  margin-left: 8px;
`;

const TextAreaContainer = styled.View`
  border-radius: 12px;
  padding: 12px 16px;
  min-height: 100px;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
  position: relative;
`;

const StyledTextArea = styled.TextInput`
  font-size: 16px;
  color: ${colors.textPrimary};
  min-height: 80px;
  padding-right: 30px;
`;

const EditIconAbsolute = styled.View`
  position: absolute;
  top: 12px;
  right: 16px;
`;

export default Step1PetInfoForm;
