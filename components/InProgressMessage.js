import React from 'react';
import styled from 'styled-components/native';
import { colors, semanticColors } from '../theme';

const InProgressMessage = ({ tabName }) => {
  return (
    <Container>
      <Icon>⛏️</Icon>
      <Title>En Construcción</Title>
      <Message>La página de {tabName} está en desarrollo</Message>
      <SubMessage>
        Pronto estará disponible con nuevas funcionalidades
      </SubMessage>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: ${colors.background};
`;

const Icon = styled.Text`
  font-size: 80px;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.textPrimary};
  margin-bottom: 16px;
  text-align: center;
`;

const Message = styled.Text`
  font-size: 16px;
  color: ${colors.textSecondary};
  margin-bottom: 8px;
  text-align: center;
  line-height: 22px;
`;

const SubMessage = styled.Text`
  font-size: 14px;
  color: ${colors.textLight};
  text-align: center;
  line-height: 20px;
`;

export default InProgressMessage;
