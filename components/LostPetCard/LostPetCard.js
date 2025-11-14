import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { colors, semanticColors } from '../../theme';
import Card from '../Card';

const LostPetCard = ({
  petName,
  timeLost,
  zone,
  characteristics,
  imageUrl,
  onPress,
}) => {
  const CardWrapper = onPress ? TouchableOpacity : React.Fragment;
  const wrapperProps = onPress ? { onPress, activeOpacity: 0.7 } : {};

  return (
    <CardWrapper {...wrapperProps}>
      <Card>
        <LeftSection>
          <PetImage source={{ uri: imageUrl }} />
        </LeftSection>

        <RightSection>
          <PetName>{petName}</PetName>

          <Label>Tiempo perdido:</Label>
          <Value>{timeLost}</Value>

          <Label>Zona o lugar:</Label>
          <Value>{zone}</Value>

          <Label>Características:</Label>
          <Value>{characteristics}</Value>
        </RightSection>
      </Card>
    </CardWrapper>
  );
};

const LeftSection = styled.View`
  margin-right: 16px;
  align-items: center;
  justify-content: center;
`;

const PetImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  resize-mode: cover;
`;

const RightSection = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const PetName = styled.Text`
  font-size: 12px;
  color: ${colors.secondaryLight};
  margin-bottom: 4px;
`;

const Label = styled.Text`
  font-size: 10px;
  font-weight: 600;
  color: ${semanticColors.labelText};
  margin-bottom: 2px;
`;

const Value = styled.Text`
  font-size: 10px;
  color: ${semanticColors.valueText};
  line-height: 14px;
`;

export default LostPetCard;
