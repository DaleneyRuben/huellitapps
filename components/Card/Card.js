import React from 'react';
import styled from 'styled-components/native';
import { colors, semanticColors } from '../../theme';

const Card = ({ children, style, ...props }) => {
  return (
    <CardContainer style={style} {...props}>
      {children}
    </CardContainer>
  );
};

const CardContainer = styled.View`
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

export default Card;
