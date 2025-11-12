import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme';

const ProgressIndicator = ({ currentStep, totalSteps = 3 }) => {
  return (
    <Container>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        return (
          <StepCircle key={stepNumber} isActive={isActive}>
            <StepNumber isActive={isActive}>{stepNumber}</StepNumber>
          </StepCircle>
        );
      })}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px 16px;
  gap: 12px;
`;

const StepCircle = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${props =>
    props.isActive ? colors.info : 'rgba(107, 154, 196, 0.2)'};
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: ${props => (props.isActive ? colors.info : 'transparent')};
`;

const StepNumber = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${props => (props.isActive ? colors.surface : colors.info)};
`;

export default ProgressIndicator;
