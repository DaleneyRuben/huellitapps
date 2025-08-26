import React from 'react';
import styled from 'styled-components/native';
import { colors, semanticColors } from '../theme';

const InformationCard = ({ description, place, details, imageUrl }) => {
  return (
    <Card>
      <LeftSection>
        <Image source={{ uri: imageUrl }} />
      </LeftSection>

      <RightSection>
        <Label>Descripcion: </Label>
        <Value>{description}</Value>

        <Label>Zona o lugar de encuentro: </Label>
        <Value>{place}</Value>

        <Label>Características: </Label>
        <Value>{details}</Value>
      </RightSection>
    </Card>
  );
};

const Card = styled.View`
  background-color: ${semanticColors.cardBackground};
  border-radius: 12px;
  border-width: 2px;
  border-color: ${semanticColors.cardBorder};
  padding: 10px;
  margin-bottom: 12px;
  flex-direction: row;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 3;
`;

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

export default InformationCard;
