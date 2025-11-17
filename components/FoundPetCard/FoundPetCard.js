import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { colors, semanticColors } from '../../theme';
import Card from '../Card';

const FoundPetCard = ({ description, place, details, imageUrl, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card>
        <LeftSection>
          <Image source={{ uri: imageUrl }} />
        </LeftSection>

        <RightSection>
          <Label>Descripcion:</Label>
          <Value>{description}</Value>

          <Label>Zona o lugar de encuentro:</Label>
          <Value>{place}</Value>

          <Label>Características:</Label>
          <Value>{details}</Value>
        </RightSection>
      </Card>
    </TouchableOpacity>
  );
};

const LeftSection = styled.View`
  margin-right: 12px;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 6px;
  resize-mode: cover;
`;

const RightSection = styled.View`
  flex: 1;
  justify-content: space-between;
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

export default FoundPetCard;
